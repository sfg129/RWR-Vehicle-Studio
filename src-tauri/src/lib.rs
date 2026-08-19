use base64::{engine::general_purpose::STANDARD, Engine};
use serde::Serialize;
use std::{collections::{BTreeMap, BTreeSet, HashMap, HashSet}, fs, path::{Path, PathBuf}, sync::Mutex};
use tauri::{AppHandle, Manager, State};
use tauri_plugin_dialog::{DialogExt, FilePath};
use tauri_plugin_fs::FsExt;
use walkdir::WalkDir;

#[derive(Default)]
struct AppState {
    writable: Mutex<HashSet<PathBuf>>,
    writable_weapons: Mutex<HashSet<PathBuf>>,
    schema_cache: Mutex<HashMap<PathBuf, SchemaCacheEntry>>,
}

struct SchemaCacheEntry { fingerprint: u64, schema: VehicleSchema }

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

#[derive(Serialize, Clone)]
#[serde(rename_all = "camelCase")]
struct VehicleSchema { object_types: Vec<String>, attributes: BTreeMap<String, Vec<String>>, skipped: Vec<String> }

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ResourceFolderScan { index: HashMap<String, String>, duplicates: Vec<String>, warnings: Vec<String> }

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
    let path = allow_read_file(&app, &path)?;
    Ok(Some(read_opened_vehicle(path, &state)?))
}

fn resolve_vehicle_base_candidate(current: &Path, reference: &str) -> Result<Option<PathBuf>, String> {
    let parent = current.parent().ok_or_else(|| "当前载具没有父目录".to_string())?.canonicalize().map_err(|e| format!("无法确认载具目录：{e}"))?;
    let parts = reference.trim().split(|c| c == '/' || c == '\\').filter(|part| !part.is_empty()).collect::<Vec<_>>();
    if parts.iter().any(|part| *part == "..") { return Err("基础载具引用不能包含 ..".into()); }
    let mut candidate = parent.clone();
    for part in parts {
        if part != "." { candidate.push(part); }
    }
    let candidate = match candidate.canonicalize() { Ok(value) => value, Err(_) => return Ok(None) };
    if !candidate.starts_with(&parent) { return Err("基础载具引用超出当前载具目录".into()); }
    if !is_vehicle_file(&candidate) {
        return Err("基础载具不是 .vehicle / .xml 文件".into());
    }
    Ok(Some(candidate))
}

#[tauri::command]
fn resolve_vehicle_base(app: AppHandle, state: State<'_, AppState>, path: String, reference: String) -> Result<Option<OpenedFile>, String> {
    let current = PathBuf::from(path).canonicalize().map_err(|e| format!("无法确认当前载具路径：{e}"))?;
    let writable = state.writable.lock().map_err(|_| "载具权限状态不可用")?;
    if !writable.contains(&current) {
        return Err("拒绝解析基础载具：当前载具不属于本次编辑会话".into());
    }
    drop(writable);

    let Some(candidate) = resolve_vehicle_base_candidate(&current, &reference)? else { return Ok(None) };
    app.fs_scope().allow_file(&candidate).map_err(|e| format!("无法授权基础载具读取：{e}"))?;
    Ok(Some(read_vehicle_file(candidate)?))
}

#[tauri::command]
async fn choose_vehicle_base(app: AppHandle) -> Result<Option<OpenedFile>, String> {
    let picked = receive_file(|done| {
        app.dialog().file().add_filter("RWR 基础载具", &["vehicle", "xml"]).pick_file(done);
    }).await?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    if !is_vehicle_file(&path) {
        return Err("所选基础文件不是 .vehicle / .xml 文件".into());
    }
    let path = allow_read_file(&app, &path)?;
    Ok(Some(read_vehicle_file(path)?))
}

#[tauri::command]
fn open_vehicle_path(app: AppHandle, state: State<'_, AppState>, path: String) -> Result<OpenedFile, String> {
    let path = require_read_scope(&app, Path::new(&path))?;
    if !is_vehicle_file(&path) {
        return Err("所选项目不是 .vehicle / .xml 载具文件".into());
    }
    read_opened_vehicle(path, &state)
}

fn read_opened_vehicle(path: PathBuf, state: &AppState) -> Result<OpenedFile, String> {
    let opened = read_vehicle_file(path)?;
    let canonical = PathBuf::from(&opened.path).canonicalize().map_err(|e| format!("无法确认文件路径：{e}"))?;
    state.writable.lock().map_err(|_| "文件权限状态不可用")?.insert(canonical);
    Ok(opened)
}

fn has_vehicle_extension(path: &Path) -> bool {
    path.extension()
        .and_then(|value| value.to_str())
        .is_some_and(|ext| {
            ext.eq_ignore_ascii_case("vehicle")
                || ext.eq_ignore_ascii_case("xml")
        })
}

fn is_workspace_vehicle_path(path: &Path) -> bool {
    path.extension()
        .and_then(|value| value.to_str())
        .is_some_and(|ext| ext.eq_ignore_ascii_case("vehicle"))
}

fn is_vehicle_file(path: &Path) -> bool {
    path.is_file() && has_vehicle_extension(path)
}

fn read_vehicle_file(path: PathBuf) -> Result<OpenedFile, String> {
    let path = path.canonicalize().map_err(|e| format!("无法确认文件路径：{e}"))?;
    let bytes = fs::read(&path).map_err(|e| format!("读取载具失败：{e}"))?;
    let text = decode_text(bytes)?;
    Ok(OpenedFile { name: file_name(&path), path: display(&path), text })
}

fn allow_read_file(app: &AppHandle, path: &Path) -> Result<PathBuf, String> {
    let canonical = path.canonicalize().map_err(|e| format!("无法确认文件路径：{e}"))?;
    app.fs_scope().allow_file(&canonical).map_err(|e| format!("无法授权文件读取：{e}"))?;
    Ok(canonical)
}

fn allow_read_directory(app: &AppHandle, path: &Path) -> Result<PathBuf, String> {
    let canonical = path.canonicalize().map_err(|e| format!("无法确认文件夹路径：{e}"))?;
    if !canonical.is_dir() { return Err("所选路径不是文件夹".into()); }
    app.fs_scope().allow_directory(&canonical, true).map_err(|e| format!("无法授权文件夹读取：{e}"))?;
    Ok(canonical)
}

fn require_read_scope(app: &AppHandle, path: &Path) -> Result<PathBuf, String> {
    let canonical = path.canonicalize().map_err(|e| format!("无法确认读取路径：{e}"))?;
    if !app.fs_scope().is_allowed(&canonical) {
        return Err(format!("拒绝读取：路径不在当前 Tauri 文件系统授权范围内：{}", display(&canonical)));
    }
    Ok(canonical)
}

#[tauri::command]
async fn choose_vehicle_workspace(app: AppHandle) -> Result<Option<VehicleWorkspace>, String> {
    let (tx, mut rx) = tauri::async_runtime::channel(1);
    app.dialog().file().pick_folder(move |picked| { let _ = tx.try_send(picked); });
    let picked = rx.recv().await.ok_or_else(|| "文件夹选择窗口意外关闭".to_string())?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    let path = allow_read_directory(&app, &path)?;
    Ok(Some(build_vehicle_workspace(path)?))
}

#[tauri::command]
fn scan_vehicle_workspace(app: AppHandle, path: String) -> Result<VehicleWorkspace, String> {
    let path = require_read_scope(&app, Path::new(&path))?;
    build_vehicle_workspace(path)
}

fn schema_fingerprint(root: &Path) -> Result<u64, String> {
    use std::hash::{Hash, Hasher};
    let mut hasher = std::collections::hash_map::DefaultHasher::new();
    for entry in WalkDir::new(root).max_depth(13).follow_links(false).into_iter() {
        let entry = match entry { Ok(value) => value, Err(_) => continue };
        if !entry.file_type().is_file() || !is_workspace_vehicle_path(entry.path()) { continue }
        let path = entry.path();
        let Ok(meta) = entry.metadata() else { continue };
        path.hash(&mut hasher);
        meta.len().hash(&mut hasher);
        let modified = meta.modified().ok().and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok()).map(|d| d.as_nanos()).unwrap_or_default();
        modified.hash(&mut hasher);
    }
    Ok(hasher.finish())
}

fn scan_vehicle_schema_impl(path: String, state: &AppState, force: bool) -> Result<VehicleSchema, String> {
    let root = PathBuf::from(path).canonicalize().map_err(|e| format!("无法确认工作区路径：{e}"))?;
    if !root.is_dir() { return Err("载具工作区路径不是文件夹".into()) }
    let fingerprint = schema_fingerprint(&root)?;
    if !force {
        if let Ok(cache) = state.schema_cache.lock() {
            if let Some(entry) = cache.get(&root) {
                if entry.fingerprint == fingerprint { return Ok(entry.schema.clone()) }
            }
        }
    }
    let schema = scan_vehicle_schema_root(root.clone())?;
    if let Ok(mut cache) = state.schema_cache.lock() { cache.insert(root, SchemaCacheEntry { fingerprint, schema: schema.clone() }); }
    Ok(schema)
}

#[tauri::command]
fn scan_vehicle_schema(app: AppHandle, path: String, force: bool, state: State<'_, AppState>) -> Result<VehicleSchema, String> {
    let root = require_read_scope(&app, Path::new(&path))?;
    scan_vehicle_schema_impl(display(&root), state.inner(), force)
}

fn scan_vehicle_schema_root(root: PathBuf) -> Result<VehicleSchema, String> {
    if !root.is_dir() { return Err("载具工作区路径不是文件夹".into()) }
    let mut object_types = BTreeSet::new();
    let mut attributes: BTreeMap<String, BTreeSet<String>> = BTreeMap::new();
    let mut skipped = Vec::new();
    let mut count = 0usize;
    for entry in WalkDir::new(root).max_depth(13).follow_links(false).into_iter().filter_map(Result::ok) {
        if !entry.file_type().is_file() || !is_workspace_vehicle_path(entry.path()) { continue }
        count += 1; if count > 10_000 { return Err("载具文件超过 10000 个；请选择更具体的工作区".into()) }
        match fs::read(entry.path()).map_err(|e| e.to_string()).and_then(decode_text) {
            Ok(text) => scan_xml_schema(&text, &mut object_types, &mut attributes),
            Err(_) => skipped.push(display(entry.path())),
        }
    }
    Ok(VehicleSchema {
        object_types: object_types.into_iter().collect(),
        attributes: attributes.into_iter().map(|(name, values)| (name, values.into_iter().collect())).collect(),
        skipped,
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
    let entries = list_dir_entries(&root)?;
    Ok(VehicleWorkspace { root: display(&root), entries })
}

/// List a single directory's immediate children (no recursion); children are populated lazily by the frontend (RV-016).
fn list_dir_entries(path: &Path) -> Result<Vec<VehicleWorkspaceEntry>, String> {
    let mut paths = fs::read_dir(path).map_err(|e| format!("无法读取工作区目录 {}：{e}", display(path)))?
        .filter_map(Result::ok).map(|entry| entry.path()).collect::<Vec<_>>();
    paths.sort_by(|a, b| {
        let a_dir = a.is_dir(); let b_dir = b.is_dir();
        b_dir.cmp(&a_dir).then_with(|| file_name(a).to_ascii_lowercase().cmp(&file_name(b).to_ascii_lowercase()))
    });
    let mut result = Vec::with_capacity(paths.len());
    for child in paths {
        let metadata = match fs::symlink_metadata(&child) { Ok(value) => value, Err(_) => continue };
        if metadata.file_type().is_symlink() { continue }
        let is_directory = metadata.is_dir();
        let is_vehicle = metadata.is_file() && is_workspace_vehicle_path(&child);
        result.push(VehicleWorkspaceEntry { name: file_name(&child), path: display(&child), is_directory, is_vehicle, children: Vec::new() });
    }
    Ok(result)
}

fn list_workspace_dir_impl(path: String) -> Result<Vec<VehicleWorkspaceEntry>, String> {
    let dir = PathBuf::from(path).canonicalize().map_err(|e| format!("无法恢复目录：{e}"))?;
    if !dir.is_dir() { return Err("路径不是文件夹".into()) }
    list_dir_entries(&dir)
}

#[tauri::command]
fn list_workspace_dir(app: AppHandle, path: String) -> Result<Vec<VehicleWorkspaceEntry>, String> {
    let dir = require_read_scope(&app, Path::new(&path))?;
    list_workspace_dir_impl(display(&dir))
}

#[tauri::command]
async fn choose_folder(app: AppHandle) -> Result<Option<String>, String> {
    let (tx, mut rx) = tauri::async_runtime::channel(1);
    app.dialog().file().pick_folder(move |picked| { let _ = tx.try_send(picked); });
    let picked = rx.recv().await.ok_or_else(|| "文件夹选择窗口意外关闭".to_string())?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    let path = allow_read_directory(&app, &path)?;
    Ok(Some(display(&path)))
}

#[tauri::command]
async fn choose_override_file(app: AppHandle) -> Result<Option<String>, String> {
    let picked = receive_file(|done| { app.dialog().file().pick_file(done); }).await?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    let path = allow_read_file(&app, &path)?;
    Ok(Some(display(&path)))
}

#[tauri::command]
async fn choose_support_file(app: AppHandle, kind: String) -> Result<Option<String>, String> {
    let label = if kind == "animation" { "人物动画 XML" } else { "人物模型 XML" };
    let picked = receive_file(|done| { app.dialog().file().add_filter(label, &["xml"]).pick_file(done); }).await?;
    let Some(picked) = picked else { return Ok(None) };
    let path = local_path(picked)?;
    let path = allow_read_file(&app, &path)?;
    Ok(Some(display(&path)))
}

fn scan_resource_folder_impl(path: String, kind: String) -> Result<ResourceFolderScan, String> {
    let root = PathBuf::from(path);
    if !root.is_dir() { return Err("所选资源文件夹不存在".into()) }
    let extensions: &[&str] = match kind.as_str() {
        "model" => &["mesh", "xml"],
        "texture" => &["png", "jpg", "jpeg", "dds", "tga", "bmp"],
        "weapon" => &["weapon"],
        _ => return Err("未知资源类型".into()),
    };
    let mut index = HashMap::new();
    let mut by_name: HashMap<String, Vec<String>> = HashMap::new();
    let mut warnings = Vec::new();
    for entry in WalkDir::new(root).sort_by_file_name().follow_links(false) {
        let entry = match entry { Ok(value) => value, Err(e) => { warnings.push(format!("资源扫描跳过：{e}")); continue } };
        if !entry.file_type().is_file() { continue }
        let p = entry.path();
        let ext = p.extension().and_then(|v| v.to_str()).unwrap_or("");
        if extensions.iter().any(|v| ext.eq_ignore_ascii_case(v)) {
            let name = file_name(p).to_ascii_lowercase();
            by_name.entry(name.clone()).or_default().push(display(p));
            index.entry(name).or_insert_with(|| display(p));
        }
    }
    let mut duplicates: Vec<String> = by_name.into_iter().filter_map(|(name, mut paths)| {
        if paths.len() <= 1 { return None }
        paths.sort();
        Some(format!("{name} 重复出现 {} 次：{}", paths.len(), paths.join("、")))
    }).collect();
    duplicates.sort();
    warnings.sort();
    Ok(ResourceFolderScan { index, duplicates, warnings })
}

#[tauri::command]
fn scan_resource_folder(app: AppHandle, path: String, kind: String) -> Result<ResourceFolderScan, String> {
    let root = require_read_scope(&app, Path::new(&path))?;
    scan_resource_folder_impl(display(&root), kind)
}

#[tauri::command]
fn is_path_readable(app: AppHandle, path: String) -> bool {
    let Ok(path) = PathBuf::from(path).canonicalize() else { return false };
    app.fs_scope().is_allowed(path)
}

#[tauri::command]
fn read_text_path(app: AppHandle, path: String) -> Result<String, String> {
    let path = require_read_scope(&app, Path::new(&path))?;
    let bytes = fs::read(&path).map_err(|e| format!("读取文本失败：{e}"))?;
    decode_text(bytes)
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
fn read_binary_base64(app: AppHandle, path: String) -> Result<String, String> {
    let path = require_read_scope(&app, Path::new(&path))?;
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
    let target = normalize_vehicle_save_path(target)?;
    if save_as {
        app.fs_scope().allow_file(&target).map_err(|e| format!("无法授权另存文件：{e}"))?;
    }
    let backup = write_backup(&target)?;
    atomic_write(&target, text.as_bytes())?;
    let canonical = target.canonicalize().map_err(|e| format!("无法确认已保存文件：{e}"))?;
    state.writable.lock().map_err(|_| "文件权限状态不可用")?.insert(canonical.clone());
    Ok(Some(SavedFile { name: file_name(&canonical), path: display(&canonical), backup_path: backup.map(|p| display(&p)) }))
}

fn save_weapon_impl(path: String, text: String, state: &AppState) -> Result<SavedFile, String> {
    let target = PathBuf::from(path).canonicalize().map_err(|e| format!("无法确认武器保存路径：{e}"))?;
    if !target.is_file() || !target.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("weapon")) {
        return Err("拒绝保存：目标不是现有的 .weapon 文件".into())
    }
    if !state.writable_weapons.lock().map_err(|_| "武器写入权限状态不可用")?.contains(&target) {
        return Err("拒绝保存：该武器文件不是本次会话打开的武器".into())
    }
    let backup = write_backup(&target)?;
    atomic_write(&target, text.as_bytes())?;
    Ok(SavedFile { name: file_name(&target), path: display(&target), backup_path: backup.map(|p| display(&p)) })
}

#[tauri::command]
fn register_vehicle_session(app: AppHandle, path: String, state: State<'_, AppState>) -> Result<(), String> {
    let canonical = require_read_scope(&app, Path::new(&path))?;
    if !is_vehicle_file(&canonical) {
        return Err("拒绝注册：目标不是现有的 .vehicle / .xml 载具文件".into())
    }
    state.writable.lock().map_err(|_| "载具写入权限状态不可用")?.insert(canonical);
    Ok(())
}

#[tauri::command]
fn register_weapon_session(app: AppHandle, path: String, state: State<'_, AppState>) -> Result<(), String> {
    let canonical = require_read_scope(&app, Path::new(&path))?;
    if !canonical.is_file() || !canonical.extension().and_then(|value| value.to_str()).is_some_and(|ext| ext.eq_ignore_ascii_case("weapon")) {
        return Err("拒绝注册：目标不是现有的 .weapon 文件".into())
    }
    state.writable_weapons.lock().map_err(|_| "武器写入权限状态不可用")?.insert(canonical);
    Ok(())
}

#[tauri::command]
fn save_weapon(path: String, text: String, state: State<'_, AppState>) -> Result<SavedFile, String> {
    let state_ref = state.inner();
    save_weapon_impl(path, text, state_ref)
}

/// Keep a rolling chain of backups (`.bak`, `.bak1`, `.bak2`); returns the newest backup path.
fn write_backup(target: &Path) -> Result<Option<PathBuf>, String> {
    if !target.exists() { return Ok(None) }
    const GENERATIONS: usize = 3;
    let backup = PathBuf::from(format!("{}.bak", display(target)));
    for i in (1..GENERATIONS).rev() {
        let older = PathBuf::from(format!("{}{i}", display(&backup)));
        let _ = fs::remove_file(&older);
        let newer = if i == 1 { backup.clone() } else { PathBuf::from(format!("{}{}", display(&backup), i - 1)) };
        if newer.exists() { let _ = fs::rename(&newer, &older); }
    }
    fs::copy(target, &backup).map_err(|e| format!("创建备份失败：{e}"))?;
    Ok(Some(backup))
}

/// Write bytes to a unique same-directory temp file, fsync, then replace the target.
fn atomic_write(path: &Path, bytes: &[u8]) -> Result<(), String> {
    use std::io::Write;
    let parent = path.parent().filter(|p| !p.as_os_str().is_empty()).unwrap_or_else(|| Path::new("."));
    let name = path.file_name().and_then(|v| v.to_str()).unwrap_or("file");
    let unique = format!(".{name}.{}.{}.tmp", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap_or_default().as_nanos());
    let temp = parent.join(unique);
    let result = (|| -> Result<(), String> {
        let mut file = fs::File::create(&temp).map_err(|e| format!("创建临时文件失败：{e}"))?;
        file.write_all(bytes).map_err(|e| format!("写入临时文件失败：{e}"))?;
        file.sync_all().map_err(|e| format!("同步临时文件失败：{e}"))?;
        drop(file);
        fs::rename(&temp, path).map_err(|e| format!("原子替换文件失败：{e}"))?;
        Ok(())
    })();
    if result.is_err() { let _ = fs::remove_file(&temp); }
    result
}

fn decode_text(mut bytes: Vec<u8>) -> Result<String, String> {
    if bytes.starts_with(&[0xEF, 0xBB, 0xBF]) { bytes.drain(..3); }
    String::from_utf8(bytes).map_err(|_| "文件不是有效 UTF-8；请先转为 UTF-8 后再编辑".to_string())
}
fn normalize_vehicle_save_path(mut path: PathBuf) -> Result<PathBuf, String> {
    match path.extension().and_then(|v| v.to_str()) {
        None => {
            path.set_extension("vehicle");
            Ok(path)
        }
        Some(ext) if ext.eq_ignore_ascii_case("vehicle") || ext.eq_ignore_ascii_case("xml") => Ok(path),
        Some(_) => Err("载具只能另存为 .vehicle 或 .xml 文件".into()),
    }
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
        assert!(attributes["vehicle"].contains("name"));
    }

    #[test]
    fn resolve_base_normalizes_windows_separators() {
        let unique = format!("rwrstudio-base-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(dir.join("subdir")).unwrap();
        fs::write(dir.join("subdir").join("base.vehicle"), "<vehicle/>").unwrap();
        let leaf = dir.join("leaf.vehicle");
        fs::write(&leaf, r#"<vehicle file="subdir\base.vehicle"/>"#).unwrap();
        let leaf_canonical = leaf.canonicalize().unwrap();
        let resolved = resolve_vehicle_base_candidate(&leaf_canonical, r"subdir\base.vehicle").expect("base should resolve").expect("base file should exist");
        assert!(resolved.ends_with("base.vehicle"));
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn schema_cache_returns_fingerprint_hit_without_rescanning() {
        let unique = format!("rwrstudio-schema-cache-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(&dir).unwrap();
        let root = dir.canonicalize().unwrap();
        let fingerprint = schema_fingerprint(&root).unwrap();
        let dummy = VehicleSchema { object_types: vec!["dummy".to_string()], attributes: BTreeMap::new(), skipped: vec![] };
        let state = AppState::default();
        state.schema_cache.lock().unwrap().insert(root.clone(), SchemaCacheEntry { fingerprint, schema: dummy });
        let schema = scan_vehicle_schema_impl(display(&root), &state, false).unwrap();
        assert_eq!(schema.object_types, vec!["dummy".to_string()]);
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn schema_scan_skips_undecodable_files() {
        let unique = format!("rwrstudio-schema-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(&dir).unwrap();
        fs::write(dir.join("good.vehicle"), "<vehicle><turret weapon_key=\"x\"/></vehicle>").unwrap();
        fs::write(dir.join("bad.vehicle"), [0xFFu8, 0xFE, 0x00, 0xFF]).unwrap();
        fs::write(dir.join("note.txt"), "ignored").unwrap();
        let schema = scan_vehicle_schema_impl(display(&dir), &AppState::default(), false).expect("无法解析的文件应被跳过而非整体失败");
        assert!(schema.object_types.contains(&"turret".to_string()));
        assert_eq!(schema.skipped.len(), 1);
        assert!(schema.skipped[0].ends_with("bad.vehicle"));
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn resource_scan_reports_duplicate_basenames() {
        let unique = format!("rwrstudio-scan-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(dir.join("a")).unwrap();
        fs::create_dir_all(dir.join("b")).unwrap();
        fs::write(dir.join("a/gun.weapon"), "a").unwrap();
        fs::write(dir.join("b/gun.weapon"), "b").unwrap();
        fs::write(dir.join("a/rifle.weapon"), "r").unwrap();
        let scan = scan_resource_folder_impl(display(&dir), "weapon".into()).unwrap();
        assert_eq!(scan.index.len(), 2);
        assert!(scan.index.contains_key("gun.weapon") && scan.index.contains_key("rifle.weapon"));
        assert_eq!(scan.duplicates.len(), 1);
        assert!(scan.duplicates[0].contains("gun.weapon") && scan.duplicates[0].contains("2 次"));
        assert!(scan.warnings.is_empty());
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn workspace_scan_lists_top_level_without_vehicle_limit() {
        let unique = format!("rwrstudio-ws-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(&dir).unwrap();
        // A flat directory with many non-.vehicle files must not fail the (now lazy) workspace listing.
        for i in 0..10_001 { fs::write(dir.join(format!("asset{i}.mesh")), "").unwrap(); }
        fs::write(dir.join("tank.vehicle"), "<vehicle/>").unwrap();
        let workspace = build_vehicle_workspace(PathBuf::from(display(&dir))).expect("非 .vehicle 文件不应让工作区列举失败");
        assert_eq!(workspace.entries.len(), 10_002);
        assert!(workspace.entries.iter().any(|e| e.name == "tank.vehicle" && e.is_vehicle));
        assert!(workspace.entries.iter().all(|e| e.children.is_empty()));
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn list_workspace_dir_returns_immediate_children_only() {
        let unique = format!("rwrstudio-list-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let dir = std::env::temp_dir().join(&unique);
        fs::create_dir_all(dir.join("sub")).unwrap();
        fs::write(dir.join("a.vehicle"), "<vehicle/>").unwrap();
        fs::write(dir.join("readme.txt"), "x").unwrap();
        fs::write(dir.join("sub/inner.vehicle"), "<vehicle/>").unwrap();
        let entries = list_workspace_dir_impl(display(&dir)).expect("应能列举单个目录");
        let names = entries.iter().map(|e| e.name.as_str()).collect::<Vec<_>>();
        assert_eq!(names, vec!["sub", "a.vehicle", "readme.txt"]);
        assert!(entries.iter().all(|e| e.children.is_empty()));
        let vehicle = entries.iter().find(|e| e.name == "a.vehicle").unwrap();
        assert!(vehicle.is_vehicle && !vehicle.is_directory);
        let sub = entries.iter().find(|e| e.name == "sub").unwrap();
        assert!(sub.is_directory && !sub.is_vehicle);
        let _ = fs::remove_dir_all(&dir);
    }

    #[test]
    fn weapon_save_rejects_unregistered_session() {
        let unique = format!("rwrstudio-weapon-auth-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let path = std::env::temp_dir().join(format!("{unique}.weapon"));
        fs::write(&path, "<weapon/>").unwrap();
        let state = AppState::default();
        let result = save_weapon_impl(display(&path), "<weapon/>".into(), &state);
        assert!(matches!(result, Err(ref e) if e.contains("不是本次会话打开的武器")));
        let _ = fs::remove_file(path);
    }

    #[test]
    fn weapon_save_creates_backup_and_replaces_text() {
        let unique = format!("rwrstudio-weapon-save-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let path = std::env::temp_dir().join(format!("{unique}.weapon")); let backup = PathBuf::from(format!("{}.bak", display(&path)));
        fs::write(&path, "<weapon><shield offset=\"0 0 0\" extent=\"1 1 1\"/></weapon>").unwrap();
        let state = AppState::default();
        state.writable_weapons.lock().unwrap().insert(path.canonicalize().unwrap());
        let saved = save_weapon_impl(display(&path), "<weapon><shield offset=\"1 2 3\" extent=\"4 5 6\"/></weapon>".into(), &state).unwrap();
        assert_eq!(fs::read_to_string(&path).unwrap(), "<weapon><shield offset=\"1 2 3\" extent=\"4 5 6\"/></weapon>");
        assert!(fs::read_to_string(&backup).unwrap().contains("offset=\"0 0 0\"")); assert!(saved.backup_path.as_deref().is_some_and(|value| value.ends_with(".weapon.bak")));
        let _ = fs::remove_file(path); let _ = fs::remove_file(backup);
    }

    #[test]
    fn save_rotates_backup_generations_and_leaves_no_temp() {
        let unique = format!("rwrstudio-rolling-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos());
        let path = std::env::temp_dir().join(format!("{unique}.weapon"));
        fs::write(&path, "<weapon>v0</weapon>").unwrap();
        let state = AppState::default();
        state.writable_weapons.lock().unwrap().insert(path.canonicalize().unwrap());
        for v in 1..=4 { save_weapon_impl(display(&path), format!("<weapon>v{v}</weapon>"), &state).unwrap(); }
        assert_eq!(fs::read_to_string(&path).unwrap(), "<weapon>v4</weapon>");
        let bak = PathBuf::from(format!("{}.bak", display(&path)));
        let bak1 = PathBuf::from(format!("{}.bak1", display(&path)));
        let bak2 = PathBuf::from(format!("{}.bak2", display(&path)));
        assert_eq!(fs::read_to_string(&bak).unwrap(), "<weapon>v3</weapon>");
        assert_eq!(fs::read_to_string(&bak1).unwrap(), "<weapon>v2</weapon>");
        assert_eq!(fs::read_to_string(&bak2).unwrap(), "<weapon>v1</weapon>");
        let parent = path.parent().unwrap();
        let leftover_temp = fs::read_dir(parent).unwrap().filter_map(Result::ok)
            .any(|e| e.file_name().to_string_lossy().starts_with(&format!(".{unique}.weapon.")) && e.file_name().to_string_lossy().ends_with(".tmp"));
        assert!(!leftover_temp, "临时文件未被清理");
        let _ = fs::remove_file(&path); let _ = fs::remove_file(&bak); let _ = fs::remove_file(&bak1); let _ = fs::remove_file(&bak2);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _args, _cwd| {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.unminimize();
                let _ = window.show();
                let _ = window.set_focus();
            }
        }))
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_persisted_scope::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_window_state::Builder::default().build())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![open_vehicle, open_vehicle_path, resolve_vehicle_base, choose_vehicle_base, choose_vehicle_workspace, scan_vehicle_workspace, scan_vehicle_schema, list_workspace_dir,
            choose_folder, choose_override_file, choose_support_file,
            scan_resource_folder, is_path_readable, read_text_path, read_builtin_support, read_binary_base64, save_vehicle, register_vehicle_session, register_weapon_session, save_weapon])
        .run(tauri::generate_context!())
        .expect("RWR Vehicle Studio failed to start");
}
