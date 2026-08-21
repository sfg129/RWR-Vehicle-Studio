import { invoke } from '@tauri-apps/api/core';

export interface OpenedFile { name: string; path: string; text: string }
export interface SavedFile { name: string; path: string; backupPath?: string }
export interface VehicleWorkspaceEntry { name: string; path: string; isDirectory: boolean; isVehicle: boolean; children: VehicleWorkspaceEntry[] }
export interface VehicleWorkspace { root: string; entries: VehicleWorkspaceEntry[] }
export interface VehicleSchema { objectTypes: string[]; attributes: Record<string, string[]>; skipped: string[] }
export interface ResourceFolderScan { index: Record<string, string>; duplicates: string[]; warnings: string[] }
export interface BackupEntry { backupPath: string; sourcePath: string; sourceName: string; backupName: string; modifiedMs: number; size: number; sourceExists: boolean }
export interface BackupRestoreResult { backupPath: string; sourcePath: string }
export type ResourceKind = 'model' | 'texture' | 'weapon';

function decodeBase64(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export const desktop = {
  openVehicle: () => invoke<OpenedFile | null>('open_vehicle'),
  openVehiclePath: (path: string) => invoke<OpenedFile>('open_vehicle_path', { path }),
  resolveVehicleBase: (path: string, reference: string) => invoke<OpenedFile | null>('resolve_vehicle_base', { path, reference }),
  chooseVehicleBase: () => invoke<OpenedFile | null>('choose_vehicle_base'),
  chooseVehicleWorkspace: () => invoke<VehicleWorkspace | null>('choose_vehicle_workspace'),
  scanVehicleWorkspace: (path: string) => invoke<VehicleWorkspace>('scan_vehicle_workspace', { path }),
  listWorkspaceDir: (path: string) => invoke<VehicleWorkspaceEntry[]>('list_workspace_dir', { path }),
  scanVehicleSchema: (path: string, force = false) => invoke<VehicleSchema>('scan_vehicle_schema', { path, force }),
  chooseFolder: () => invoke<string | null>('choose_folder'),
  chooseOverrideFile: () => invoke<string | null>('choose_override_file'),
  chooseSupportFile: (kind: 'model' | 'animation') => invoke<string | null>('choose_support_file', { kind }),
  readBuiltinSupport: (kind: 'model' | 'animation') => invoke<string>('read_builtin_support', { kind }),
  scanFolder: (path: string, kind: ResourceKind) => invoke<ResourceFolderScan>('scan_resource_folder', { path, kind }),
  readText: (path: string) => invoke<string>('read_text_path', { path }),
  readBinary: async (path: string): Promise<ArrayBuffer> => decodeBase64(await invoke<string>('read_binary_base64', { path })),
  saveVehicle: (path: string, text: string, saveAs = false) =>
    invoke<SavedFile | null>('save_vehicle', { path, text, saveAs }),
  registerVehicleSession: (path: string) => invoke<void>('register_vehicle_session', { path }),
  registerWeaponSession: (path: string) => invoke<void>('register_weapon_session', { path }),
  saveWeapon: (path: string, text: string) => invoke<SavedFile>('save_weapon', { path, text }),
  listBackups: (roots: string[]) => invoke<BackupEntry[]>('list_backups', { roots }),
  readBackup: (path: string) => invoke<string>('read_backup', { path }),
  restoreBackup: (path: string) => invoke<BackupRestoreResult>('restore_backup', { path }),
  deleteBackups: (paths: string[]) => invoke<number>('delete_backups', { paths }),
};
