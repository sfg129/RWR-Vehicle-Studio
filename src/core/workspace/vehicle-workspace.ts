import type { VehicleWorkspaceEntry } from '../../platform/desktop-api';

export interface WorkspaceRow { entry: VehicleWorkspaceEntry; depth: number }
export interface WorkspacePreferences { root: string; expanded: string[]; panelOpen: boolean }

const STORAGE_KEY = 'rwr-vehicle-studio.vehicle-workspace.v1';

export function flattenWorkspace(entries: VehicleWorkspaceEntry[], expanded: ReadonlySet<string>, depth = 0): WorkspaceRow[] {
  const rows: WorkspaceRow[] = [];
  for (const entry of entries) {
    rows.push({ entry, depth });
    if (entry.isDirectory && expanded.has(entry.path)) rows.push(...flattenWorkspace(entry.children, expanded, depth + 1));
  }
  return rows;
}

export function loadWorkspacePreferences(): WorkspacePreferences {
  if (typeof localStorage === 'undefined') return { root: '', expanded: [], panelOpen: true };
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<WorkspacePreferences>;
    return {
      root: typeof value.root === 'string' ? value.root : '',
      expanded: Array.isArray(value.expanded) ? value.expanded.filter((path): path is string => typeof path === 'string') : [],
      panelOpen: typeof value.panelOpen === 'boolean' ? value.panelOpen : true,
    };
  } catch { return { root: '', expanded: [], panelOpen: true }; }
}

export function saveWorkspacePreferences(preferences: WorkspacePreferences): void {
  if (typeof localStorage === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* non-critical preference */ }
}
