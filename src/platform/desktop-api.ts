import { invoke } from '@tauri-apps/api/core';

export interface OpenedFile { name: string; path: string; text: string }
export interface SavedFile { name: string; path: string; backupPath?: string }
export interface VehicleWorkspaceEntry { name: string; path: string; isDirectory: boolean; isVehicle: boolean; children: VehicleWorkspaceEntry[] }
export interface VehicleWorkspace { root: string; entries: VehicleWorkspaceEntry[] }
export interface VehicleSchema { objectTypes: string[]; attributes: Record<string, string[]>; skipped: string[] }
export interface ResourceFolderScan { index: Record<string, string>; duplicates: string[]; warnings: string[] }
export type ResourceKind = 'model' | 'texture' | 'weapon';

export const desktop = {
  openVehicle: () => invoke<OpenedFile | null>('open_vehicle'),
  openVehiclePath: (path: string) => invoke<OpenedFile>('open_vehicle_path', { path }),
  resolveVehicleBase: (path: string, reference: string) => invoke<OpenedFile | null>('resolve_vehicle_base', { path, reference }),
  chooseVehicleBase: () => invoke<OpenedFile | null>('choose_vehicle_base'),
  chooseVehicleWorkspace: () => invoke<VehicleWorkspace | null>('choose_vehicle_workspace'),
  scanVehicleWorkspace: (path: string) => invoke<VehicleWorkspace>('scan_vehicle_workspace', { path }),
  listWorkspaceDir: (path: string) => invoke<VehicleWorkspaceEntry[]>('list_workspace_dir', { path }),
  scanVehicleSchema: (path: string) => invoke<VehicleSchema>('scan_vehicle_schema', { path }),
  chooseFolder: () => invoke<string | null>('choose_folder'),
  chooseOverrideFile: () => invoke<string | null>('choose_override_file'),
  chooseSupportFile: (kind: 'model' | 'animation') => invoke<string | null>('choose_support_file', { kind }),
  readBuiltinSupport: (kind: 'model' | 'animation') => invoke<string>('read_builtin_support', { kind }),
  scanFolder: (path: string, kind: ResourceKind) => invoke<ResourceFolderScan>('scan_resource_folder', { path, kind }),
  readText: (path: string) => invoke<string>('read_text_path', { path }),
  readBinary: async (path: string): Promise<ArrayBuffer> => {
    const base64 = await invoke<string>('read_binary_base64', { path });
    const raw = atob(base64);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
    return bytes.buffer;
  },
  saveVehicle: (path: string, text: string, saveAs = false) =>
    invoke<SavedFile | null>('save_vehicle', { path, text, saveAs }),
  saveWeapon: (path: string, text: string) => invoke<SavedFile>('save_weapon', { path, text }),
};
