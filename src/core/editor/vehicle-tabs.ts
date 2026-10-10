import type { OpenedFile } from '../../platform/desktop-api';
import type { SourceDocument } from '../xml/source-document';

export interface VehicleTabDocument { opened: OpenedFile; document: SourceDocument; savedText: string }
export interface VehicleTab<T extends VehicleTabDocument = VehicleTabDocument> { id: string; preview: boolean; pinned?: boolean; state: T }

export function vehicleDisplayPath(path: string): string {
  let result = path.replaceAll('\\', '/');
  if (result.startsWith('//?/UNC/')) result = '//' + result.slice(8);
  else if (result.startsWith('//?/')) result = result.slice(4);
  return result;
}

export function vehiclePathKey(path: string): string { return vehicleDisplayPath(path).toLocaleLowerCase(); }

export function relativeVehiclePath(path: string, root: string): string {
  const display = vehicleDisplayPath(path);
  const normalizedRoot = vehicleDisplayPath(root).replace(/\/$/, '');
  return display.toLocaleLowerCase().startsWith(normalizedRoot.toLocaleLowerCase() + '/')
    ? display.slice(normalizedRoot.length + 1) : path;
}

export function vehicleTabDirty(tab: VehicleTab): boolean { return tab.state.document.serialize() !== tab.state.savedText; }

export function insertVehicleTab<T extends VehicleTabDocument>(tabs: VehicleTab<T>[], state: T): { tabs: VehicleTab<T>[]; id: string } {
  const existing = tabs.find((tab) => vehiclePathKey(tab.state.opened.path) === vehiclePathKey(state.opened.path));
  if (existing) return { tabs, id: existing.id };
  const tab: VehicleTab<T> = { id: crypto.randomUUID(), preview: true, state };
  const replaceIndex = tabs.findIndex((item) => item.preview && !item.pinned && !vehicleTabDirty(item));
  const result = tabs.map((item) => item.preview && vehicleTabDirty(item) ? { ...item, preview: false } : item);
  if (replaceIndex < 0) result.push(tab); else result.splice(replaceIndex, 1, tab);
  return { tabs: result, id: tab.id };
}
