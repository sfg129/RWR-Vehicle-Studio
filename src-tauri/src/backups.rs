use serde::{Deserialize, Serialize};
use std::{collections::BTreeMap, fs, path::{Path, PathBuf}};

#[derive(Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct BackupSettings { pub enabled: bool, pub directory: String, pub default_directory: String }

pub struct BackupStore { pub settings: BackupSettings, preferences: Option<PathBuf> }

impl Default for BackupStore {
    fn default() -> Self {
        let directory = std::env::current_exe().ok().and_then(|p| p.parent().map(|p| p.join("bak")))
            .unwrap_or_else(|| PathBuf::from("bak")).to_string_lossy().into_owned();
        Self { settings: BackupSettings { enabled: true, default_directory: directory.clone(), directory }, preferences: None }
    }
}

impl BackupStore {
    pub fn load(preferences: PathBuf) -> Result<Self, String> {
        let mut store = Self::default();
        if preferences.exists() {
            let saved: BackupSettings = serde_json::from_slice(&fs::read(&preferences).map_err(|e| e.to_string())?).map_err(|e| format!("备份设置读取失败：{e}"))?;
            store.settings.enabled = saved.enabled;
            // A default directory follows the executable when a portable install moves.
            if saved.directory != saved.default_directory { store.settings.directory = saved.directory; }
        }
        store.preferences = Some(preferences);
        Ok(store)
    }

    pub fn configure(&mut self, enabled: bool, directory: Option<String>) -> Result<BackupSettings, String> {
        let mut settings = self.settings.clone();
        settings.enabled = enabled;
        if let Some(value) = directory {
            settings.directory = if value.is_empty() { settings.default_directory.clone() } else {
                let path = PathBuf::from(value).canonicalize().map_err(|e| format!("备份目录不可用：{e}"))?;
                if !path.is_dir() { return Err("备份路径不是文件夹".into()); }
                path.to_string_lossy().into_owned()
            };
        }
        if let Some(path) = &self.preferences {
            fs::create_dir_all(path.parent().ok_or("备份设置目录不可用")?).map_err(|e| e.to_string())?;
            super::atomic_write(path, &serde_json::to_vec(&settings).map_err(|e| e.to_string())?)?;
        }
        self.settings = settings.clone();
        Ok(settings)
    }

    pub fn write(&self, target: &Path) -> Result<Option<PathBuf>, String> {
        if !self.settings.enabled || !target.exists() { return Ok(None); }
        let source = target.canonicalize().map_err(|e| e.to_string())?;
        let source_text = source.to_string_lossy().into_owned();
        let key = if cfg!(windows) { source_text.to_lowercase() } else { source_text.clone() };
        // Stable across runs; validate the metadata as well so even a hash collision cannot mix files.
        let hash = key.as_bytes().iter().fold(0xcbf29ce484222325u64, |hash, byte| (hash ^ *byte as u64).wrapping_mul(0x100000001b3));
        let bucket = Path::new(&self.settings.directory).join(format!("{hash:016x}"));
        fs::create_dir_all(&bucket).map_err(|e| format!("无法创建备份目录：{e}"))?;
        let metadata = bucket.join("source.json");
        if metadata.exists() {
            let existing: String = serde_json::from_slice(&fs::read(&metadata).map_err(|e| e.to_string())?).map_err(|e| e.to_string())?;
            if Path::new(&existing) != source { return Err("备份路径发生冲突，未覆盖任何备份".into()); }
        } else {
            super::atomic_write(&metadata, &serde_json::to_vec(&source_text).map_err(|e| e.to_string())?)?;
        }
        let name = source.file_name().ok_or("源文件名不可用")?.to_string_lossy();
        let backup = bucket.join(format!("{name}.bak"));
        let previous = bucket.join(format!("{name}.bak1"));
        let bytes = fs::read(&source).map_err(|e| format!("读取备份源文件失败：{e}"))?;
        if backup.exists() {
            super::atomic_write(&previous, &fs::read(&backup).map_err(|e| e.to_string())?)?;
        }
        super::atomic_write(&backup, &bytes)?;
        Ok(Some(backup))
    }

    pub fn entries(&self) -> Result<BTreeMap<PathBuf, PathBuf>, String> {
        let root = Path::new(&self.settings.directory);
        let mut result = BTreeMap::new();
        if !root.exists() { return Ok(result); }
        for entry in fs::read_dir(root).map_err(|e| format!("读取备份目录失败：{e}"))?.filter_map(Result::ok) {
            if !entry.file_type().is_ok_and(|t| t.is_dir()) { continue; }
            let bucket = entry.path();
            let Ok(bytes) = fs::read(bucket.join("source.json")) else { continue; };
            let Ok(source) = serde_json::from_slice::<String>(&bytes) else { continue; };
            let source = PathBuf::from(source);
            if !source.is_absolute() || !source.extension().and_then(|v| v.to_str()).is_some_and(|v| ["vehicle", "weapon", "xml"].iter().any(|ext| v.eq_ignore_ascii_case(ext))) { continue; }
            let Some(name) = source.file_name() else { continue; };
            for suffix in [".bak", ".bak1"] {
                let backup = bucket.join(format!("{}{suffix}", name.to_string_lossy()));
                if backup.is_file() { result.insert(backup.canonicalize().map_err(|e| e.to_string())?, source.clone()); }
            }
        }
        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    fn fixture() -> (PathBuf, BackupStore) {
        let root = std::env::temp_dir().join(format!("rwr-backups-{}-{}", std::process::id(), std::time::SystemTime::now().duration_since(std::time::UNIX_EPOCH).unwrap().as_nanos()));
        fs::create_dir_all(&root).unwrap();
        let mut store = BackupStore::default();
        store.settings.directory = root.join("bak").to_string_lossy().into_owned();
        (root, store)
    }
    #[test]
    fn disabled_creates_nothing_and_enabled_separates_same_names() {
        let (root, mut store) = fixture();
        for folder in ["a", "b"] { fs::create_dir(root.join(folder)).unwrap(); fs::write(root.join(folder).join("tank.vehicle"), folder).unwrap(); }
        store.settings.enabled = false;
        assert!(store.write(&root.join("a/tank.vehicle")).unwrap().is_none());
        assert!(!root.join("bak").exists());
        store.settings.enabled = true;
        let a = store.write(&root.join("a/tank.vehicle")).unwrap().unwrap();
        let b = store.write(&root.join("b/tank.vehicle")).unwrap().unwrap();
        assert_ne!(a, b);
        assert_eq!(fs::read_to_string(a).unwrap(), "a");
        assert_eq!(fs::read_to_string(b).unwrap(), "b");
        assert_eq!(store.entries().unwrap().len(), 2);
        assert!(!root.join("a/tank.vehicle.bak").exists());
        fs::remove_dir_all(root).unwrap();
    }
    #[test]
    fn settings_persist_and_do_not_create_backup_directory() {
        let (root, mut store) = fixture();
        store.preferences = Some(root.join("preferences.json"));
        store.configure(false, Some(root.to_string_lossy().into_owned())).unwrap();
        let restored = BackupStore::load(root.join("preferences.json")).unwrap();
        assert!(!restored.settings.enabled);
        assert_eq!(restored.settings.directory, root.canonicalize().unwrap().to_string_lossy());
        assert!(!root.join("bak").exists());
        fs::remove_dir_all(root).unwrap();
    }
}
