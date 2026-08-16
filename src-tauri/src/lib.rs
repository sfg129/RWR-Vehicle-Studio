use base64::{engine::general_purpose::STANDARD, Engine};
use serde::Serialize;
use std::{collections::{BTreeMap, BTreeSet, HashMap, HashSet}, fs, path::{Path, PathBuf}, sync::Mutex};
use tauri::{AppHandle, State};
use tauri_plugin_dialog::{DialogExt, FilePath};
use walkdir::WalkDir;

#[derive(Default)]
struct AppState { writable: Mutex<HashSet<PathBuf>> }

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct OpenedFile { name: String, path: String, text: String }

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SavedFile { name: String, path: String, backup_path: Option<String> }

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct VehicleWorkspaceEntry {
    name: String,
    path: String,
    is_directory: bool,
    is_vehicle: bool,
    children: Vec<VehicleWorkspaceEntry>,
}

#[derive(Serialize)]
struct VehicleWorkspace { root: String, entries: Vec<VehicleWorkspaceEntry> }

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct VehicleSchema { object_types: Vec<String>, attributes: BTreeMap<String, Vec<String>> }

fn local_path(value: FilePath) -> Result<PathBuf, String> {
    value.into_path().map_err(|_| "只支持本地文件系统路径".to_string())
}

async fn receive_file<F>(start: F) -> Result<Option<FilePath>, String>
where F: FnOnce(Box<dyn FnOnce(Option<FilePath>) + Send>)
{
    let (tx, mut rx) = tauri::async_runtime::channel(1);
    start(Box::new(move |picked| { let _ = tx.try_send(picked); }));
    rx.recv().await.ok_or_else(|| "文件选择窗口意外关闭".to_string())
}

#[tauri::command]
async fn open_vehicle(app: AppHandle, state: State<'_, AppState>) -> Result<Option<OpenedFile>, String> {
    let picked = receive_file(|done| {
        app.dialog().file().add_filter("RWR 载具", &["vehicle", "xml"]).pick_file(done);
    }).await?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    Ok(Some(read_opened_vehicle(path, &state)?))
}

#[tauri::command]
fn resolve_vehicle_base(path: String, reference: String) -> Result<Option<OpenedFile>, String> {
    let current = PathBuf::from(path);
    let Some(parent) = current.parent() else { return Ok(None) };
    let candidate = parent.join(reference);
    if !candidate.is_file() { return Ok(None) }
    Ok(Some(read_vehicle_file(candidate)?))
}

#[tauri::command]
async fn choose_vehicle_base(app: AppHandle) -> Result<Option<OpenedFile>, String> {
    let picked = receive_file(|done| {
        app.dialog().file().add_filter("RWR 基础载具", &["vehicle"]).pick_file(done);
    }).await?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    if !path.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("vehicle")) {
        return Err("所选基础文件不是 .vehicle 文件".into());
    }
    Ok(Some(read_vehicle_file(path)?))
}

#[tauri::command]
fn open_vehicle_path(path: String, state: State<'_, AppState>) -> Result<OpenedFile, String> {
    let path = PathBuf::from(path);
    if !path.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("vehicle")) {
        return Err("所选项目不是 .vehicle 载具文件".into());
    }
    read_opened_vehicle(path, &state)
}

fn read_opened_vehicle(path: PathBuf, state: &AppState) -> Result<OpenedFile, String> {
    let opened = read_vehicle_file(path)?;
    let canonical = PathBuf::from(&opened.path).canonicalize().map_err(|e| format!("无法确认文件路径：{e}"))?;
    state.writable.lock().map_err(|_| "文件权限状态不可用")?.insert(canonical);
    Ok(opened)
}

fn read_vehicle_file(path: PathBuf) -> Result<OpenedFile, String> {
    let path = path.canonicalize().map_err(|e| format!("无法确认文件路径：{e}"))?;
    let bytes = fs::read(&path).map_err(|e| format!("读取载具失败：{e}"))?;
    let text = decode_text(bytes)?;
    Ok(OpenedFile { name: file_name(&path), path: display(&path), text })
}

#[tauri::command]
async fn choose_vehicle_workspace(app: AppHandle) -> Result<Option<VehicleWorkspace>, String> {
    let (tx, mut rx) = tauri::async_runtime::channel(1);
    app.dialog().file().pick_folder(move |picked| { let _ = tx.try_send(picked); });
    let picked = rx.recv().await.ok_or_else(|| "文件夹选择窗口意外关闭".to_string())?;
    let Some(picked) = picked else { return Ok(None) };
    Ok(Some(build_vehicle_workspace(local_path(picked)?)?))
}

#[tauri::command]
fn scan_vehicle_workspace(path: String) -> Result<VehicleWorkspace, String> {
    build_vehicle_workspace(PathBuf::from(path))
}

#[tauri::command]
fn scan_vehicle_schema(path: String) -> Result<VehicleSchema, String> {
    let root = PathBuf::from(path);
    if !root.is_dir() { return Err("载具工作区路径不是文件夹".into()) }
    let mut object_types = BTreeSet::new();
    let mut attributes: BTreeMap<String, BTreeSet<String>> = BTreeMap::new();
    let mut count = 0usize;
    for entry in WalkDir::new(root).max_depth(13).follow_links(false).into_iter().filter_map(Result::ok) {
        if !entry.file_type().is_file() || !entry.path().extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("vehicle")) { continue }
        count += 1; if count > 10_000 { return Err("载具文件超过 10000 个；请选择更具体的工作区".into()) }
        let text = decode_text(fs::read(entry.path()).map_err(|e| format!("读取载具结构失败：{e}"))?)?;
        scan_xml_schema(&text, &mut object_types, &mut attributes);
    }
    attributes.remove("vehicle");
    Ok(VehicleSchema {
        object_types: object_types.into_iter().collect(),
        attributes: attributes.into_iter().map(|(name, values)| (name, values.into_iter().collect())).collect(),
    })
}

fn scan_xml_schema(text: &str, object_types: &mut BTreeSet<String>, attributes: &mut BTreeMap<String, BTreeSet<String>>) {
    let bytes = text.as_bytes(); let mut index = 0usize; let mut depth = 0usize;
    while index < bytes.len() {
        let Some(relative) = text[index..].find('<') else { break }; let start = index + relative;
        if text[start..].starts_with("<!--") { index = text[start + 4..].find("-->").map_or(bytes.len(), |value| start + 4 + value + 3); continue }
        let mut end = start + 1; let mut quote = 0u8;
        while end < bytes.len() { let byte = bytes[end]; if quote != 0 { if byte == quote { quote = 0; } } else if byte == b'\'' || byte == b'"' { quote = byte; } else if byte == b'>' { break } end += 1; }
        if end >= bytes.len() { break }
        let inner = text[start + 1..end].trim(); index = end + 1;
        if inner.is_empty() || inner.starts_with('?') || inner.starts_with('!') { continue }
        if inner.starts_with('/') { depth = depth.saturating_sub(1); continue }
        let self_closing = inner.trim_end().ends_with('/');
        let name_end = inner.find(|character: char| character.is_whitespace() || character == '/').unwrap_or(inner.len());
        let name = &inner[..name_end]; if name.is_empty() { continue }
        if depth == 1 { object_types.insert(name.to_string()); }
        let values = attributes.entry(name.to_string()).or_default();
        let tail = &inner[name_end..]; let tail_bytes = tail.as_bytes(); let mut cursor = 0usize;
        while cursor < tail_bytes.len() {
            while cursor < tail_bytes.len() && (tail_bytes[cursor].is_ascii_whitespace() || tail_bytes[cursor] == b'/') { cursor += 1; }
            let attr_start = cursor;
            while cursor < tail_bytes.len() && (tail_bytes[cursor].is_ascii_alphanumeric() || matches!(tail_bytes[cursor], b'_' | b':' | b'.' | b'-')) { cursor += 1; }
            if cursor == attr_start { cursor += 1; continue }
            let attr = &tail[attr_start..cursor]; while cursor < tail_bytes.len() && tail_bytes[cursor].is_ascii_whitespace() { cursor += 1; }
            if cursor < tail_bytes.len() && tail_bytes[cursor] == b'=' { values.insert(attr.to_string()); cursor += 1; }
            while cursor < tail_bytes.len() && tail_bytes[cursor].is_ascii_whitespace() { cursor += 1; }
            if cursor < tail_bytes.len() && (tail_bytes[cursor] == b'\'' || tail_bytes[cursor] == b'"') { let q = tail_bytes[cursor]; cursor += 1; while cursor < tail_bytes.len() && tail_bytes[cursor] != q { cursor += 1; } cursor += usize::from(cursor < tail_bytes.len()); }
        }
        if !self_closing { depth += 1; }
    }
}

fn build_vehicle_workspace(path: PathBuf) -> Result<VehicleWorkspace, String> {
    let root = path.canonicalize().map_err(|e| format!("无法恢复载具工作区：{e}"))?;
    if !root.is_dir() { return Err("载具工作区路径不是文件夹".into()) }
    let mut count = 0usize;
    let entries = scan_workspace_entries(&root, 0, &mut count)?;
    Ok(VehicleWorkspace { root: display(&root), entries })
}

fn scan_workspace_entries(path: &Path, depth: usize, count: &mut usize) -> Result<Vec<VehicleWorkspaceEntry>, String> {
    if depth > 12 { return Ok(Vec::new()) }
    let mut paths = fs::read_dir(path).map_err(|e| format!("无法读取工作区目录 {}：{e}", display(path)))?
        .filter_map(Result::ok).map(|entry| entry.path()).collect::<Vec<_>>();
    paths.sort_by(|a, b| {
        let a_dir = a.is_dir(); let b_dir = b.is_dir();
        b_dir.cmp(&a_dir).then_with(|| file_name(a).to_ascii_lowercase().cmp(&file_name(b).to_ascii_lowercase()))
    });
    let mut result = Vec::with_capacity(paths.len());
    for child in paths {
        *count += 1;
        if *count > 10_000 { return Err("载具工作区项目超过 10000 个；请选择更具体的文件夹".into()) }
        let metadata = match fs::symlink_metadata(&child) { Ok(value) => value, Err(_) => continue };
        if metadata.file_type().is_symlink() { continue }
        let is_directory = metadata.is_dir();
        let is_vehicle = metadata.is_file() && child.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("vehicle"));
        let children = if is_directory { scan_workspace_entries(&child, depth + 1, count)? } else { Vec::new() };
        result.push(VehicleWorkspaceEntry { name: file_name(&child), path: display(&child), is_directory, is_vehicle, children });
    }
    Ok(result)
}

#[tauri::command]
async fn choose_folder(app: AppHandle) -> Result<Option<String>, String> {
    let (tx, mut rx) = tauri::async_runtime::channel(1);
    app.dialog().file().pick_folder(move |picked| { let _ = tx.try_send(picked); });
    let picked = rx.recv().await.ok_or_else(|| "文件夹选择窗口意外关闭".to_string())?;
    Ok(picked.map(local_path).transpose()?.map(|p| display(&p)))
}

#[tauri::command]
async fn choose_override_file(app: AppHandle) -> Result<Option<String>, String> {
    let picked = receive_file(|done| { app.dialog().file().pick_file(done); }).await?;
    Ok(picked.map(local_path).transpose()?.map(|p| display(&p)))
}

#[tauri::command]
async fn choose_support_file(app: AppHandle, kind: String) -> Result<Option<String>, String> {
    let label = if kind == "animation" { "人物动画 XML" } else { "人物模型 XML" };
    let picked = receive_file(|done| { app.dialog().file().add_filter(label, &["xml"]).pick_file(done); }).await?;
    Ok(picked.map(local_path).transpose()?.map(|p| display(&p)))
}

#[tauri::command]
fn scan_resource_folder(path: String, kind: String) -> Result<HashMap<String, String>, String> {
    let root = PathBuf::from(path);
    if !root.is_dir() { return Err("所选资源文件夹不存在".into()) }
    let extensions: &[&str] = match kind.as_str() {
        "model" => &["mesh", "xml"],
        "texture" => &["png", "jpg", "jpeg", "dds", "tga", "bmp"],
        "weapon" => &["weapon"],
        _ => return Err("未知资源类型".into()),
    };
    let mut result = HashMap::new();
    for entry in WalkDir::new(root).follow_links(false).into_iter().filter_map(Result::ok) {
        if !entry.file_type().is_file() { continue }
        let p = entry.path();
        let ext = p.extension().and_then(|v| v.to_str()).unwrap_or("");
        if extensions.iter().any(|v| ext.eq_ignore_ascii_case(v)) {
            result.entry(file_name(p).to_ascii_lowercase()).or_insert_with(|| display(p));
        }
    }
    Ok(result)
}

#[tauri::command]
fn read_text_path(path: String) -> Result<String, String> {
    decode_text(fs::read(&path).map_err(|e| format!("读取文本失败：{e}"))?)
}

#[tauri::command]
fn read_builtin_support(kind: String) -> Result<String, String> {
    match kind.as_str() {
        "model" => Ok(include_str!("../resources/soldier_army_normandy_ranger_1.xml").to_string()),
        "animation" => Ok(include_str!("../resources/soldier_animations.xml").to_string()),
        _ => Err("未知的内置人物资源类型".into()),
    }
}

#[tauri::command]
fn read_binary_base64(path: String) -> Result<String, String> {
    let bytes = fs::read(&path).map_err(|e| format!("读取二进制资源失败：{e}"))?;
    Ok(STANDARD.encode(bytes))
}

#[tauri::command]
async fn save_vehicle(app: AppHandle, state: State<'_, AppState>, path: String, text: String, save_as: bool) -> Result<Option<SavedFile>, String> {
    let target = if save_as {
        let default_name = Path::new(&path).file_name().and_then(|v| v.to_str()).unwrap_or("edited.vehicle").to_string();
        let (tx, mut rx) = tauri::async_runtime::channel(1);
        app.dialog().file().add_filter("RWR 载具", &["vehicle", "xml"]).set_file_name(&default_name)
            .save_file(move |picked| { let _ = tx.try_send(picked); });
        let Some(picked) = rx.recv().await.ok_or_else(|| "保存窗口意外关闭".to_string())? else { return Ok(None) };
        local_path(picked)?
    } else {
        let requested = PathBuf::from(&path).canonicalize().map_err(|e| format!("无法确认保存路径：{e}"))?;
        if !state.writable.lock().map_err(|_| "文件权限状态不可用")?.contains(&requested) {
            return Err("拒绝覆盖：该文件不是本次会话打开或另存的载具".into())
        }
        requested
    };
    let target = ensure_vehicle_extension(target);
    let backup = if target.exists() {
        let b = PathBuf::from(format!("{}.bak", display(&target)));
        fs::copy(&target, &b).map_err(|e| format!("创建备份失败：{e}"))?;
        Some(b)
    } else { None };
    let temp = PathBuf::from(format!("{}.rwrstudio.tmp", display(&target)));
    fs::write(&temp, text.as_bytes()).map_err(|e| format!("写入临时文件失败：{e}"))?;
    fs::copy(&temp, &target).map_err(|e| format!("替换载具文件失败：{e}"))?;
    let _ = fs::remove_file(&temp);
    let canonical = target.canonicalize().map_err(|e| format!("无法确认已保存文件：{e}"))?;
    state.writable.lock().map_err(|_| "文件权限状态不可用")?.insert(canonical.clone());
    Ok(Some(SavedFile { name: file_name(&canonical), path: display(&canonical), backup_path: backup.map(|p| display(&p)) }))
}

#[tauri::command]
fn save_weapon(path: String, text: String) -> Result<SavedFile, String> {
    let target = PathBuf::from(path).canonicalize().map_err(|e| format!("无法确认武器保存路径：{e}"))?;
    if !target.is_file() || !target.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("weapon")) {
        return Err("拒绝保存：目标不是现有的 .weapon 文件".into())
    }
    let backup = PathBuf::from(format!("{}.bak", display(&target)));
    fs::copy(&target, &backup).map_err(|e| format!("创建武器备份失败：{e}"))?;
    let temp = PathBuf::from(format!("{}.rwrstudio.tmp", display(&target)));
    fs::write(&temp, text.as_bytes()).map_err(|e| format!("写入武器临时文件失败：{e}"))?;
    fs::copy(&temp, &target).map_err(|e| format!("替换武器文件失败：{e}"))?;
    let _ = fs::remove_file(&temp);
    Ok(SavedFile { name: file_name(&target), path: display(&target), backup_path: Some(display(&backup)) })
}

fn decode_text(mut bytes: Vec<u8>) -> Result<String, String> {
    if bytes.starts_with(&[0xEF, 0xBB, 0xBF]) { bytes.drain(..3); }
    String::from_utf8(bytes).map_err(|_| "文件不是有效 UTF-8；请先转为 UTF-8 后再编辑".to_string())
}
fn ensure_vehicle_extension(mut p: PathBuf) -> PathBuf {
    if p.extension().is_none() { p.set_extension("vehicle"); }
    p
}
fn display(p: &Path) -> String { p.to_string_lossy().into_owned() }
fn file_name(p: &Path) -> String { p.file_name().and_then(|v| v.to_str()).unwrap_or("unnamed").to_string() }

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn schema_uses_root_objects_and_collects_attributes() {
        let xml = r#"<vehicle name="test"><visual class="chassis"><part texture_filename="a.png"/></visual><turret weapon_key="gun"><state class="idle"/></turret></vehicle>"#;
        let mut objects = BTreeSet::new(); let mut attributes = BTreeMap::new(); scan_xml_schema(xml, &mut objects, &mut attributes);
        assert_eq!(objects.into_iter().collect::<Vec<_>>(), vec!["turret", "visual"]);
        assert!(attributes["visual"].contains("class"));
        assert!(attributes["part"].contains("texture_filename"));
        assert!(attributes["turret"].contains("weapon_key"));
    }

    #[test]
    fn weapon_save_creates_backup_and_replaces_text() {
        let unique = format!("rwrstudio-weapon-save-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let path = std::env::temp_dir().join(format!("{unique}.weapon")); let backup = PathBuf::from(format!("{}.bak", display(&path)));
        fs::write(&path, "<weapon><shield offset=\"0 0 0\" extent=\"1 1 1\"/></weapon>").unwrap();
        let saved = save_weapon(display(&path), "<weapon><shield offset=\"1 2 3\" extent=\"4 5 6\"/></weapon>".into()).unwrap();
        assert_eq!(fs::read_to_string(&path).unwrap(), "<weapon><shield offset=\"1 2 3\" extent=\"4 5 6\"/></weapon>");
        assert!(fs::read_to_string(&backup).unwrap().contains("offset=\"0 0 0\"")); assert!(saved.backup_path.as_deref().is_some_and(|value| value.ends_with(".weapon.bak")));
        let _ = fs::remove_file(path); let _ = fs::remove_file(backup);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![open_vehicle, open_vehicle_path, resolve_vehicle_base, choose_vehicle_base, choose_vehicle_workspace, scan_vehicle_workspace, scan_vehicle_schema,
            choose_folder, choose_override_file, choose_support_file,
            scan_resource_folder, read_text_path, read_builtin_support, read_binary_base64, save_vehicle, save_weapon])
        .run(tauri::generate_context!())
        .expect("RWR Vehicle Studio failed to start");
}
