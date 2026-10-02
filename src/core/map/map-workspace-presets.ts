export interface MapSettings {
  sourceMapsFolder: string;
  outputMapsFolder: string;
  selectedMap: string;
  vehicleFolder: string;
  factionFolder: string;
}

export interface MapWorkspacePreset { id: string; name: string; settings: MapSettings }
export interface MapWorkspacePreferences { presets: MapWorkspacePreset[]; activePresetId: string; lastSettings: MapSettings }

export const MAP_PREFERENCES_KEY = 'rwr-vehicle-studio.map-workspace-presets.v1';
const LEGACY_SETTINGS_KEY = 'rwr-vehicle-studio.map-object-settings.v2';

export function defaultMapSettings(): MapSettings {
  return {
    sourceMapsFolder: 'D:\\steam\\steamapps\\common\\RunningWithRifles\\media\\packages\\edelweiss\\maps',
    outputMapsFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\edelweiss\\maps',
    selectedMap: '',
    vehicleFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\vehicles',
    factionFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\factions',
  };
}

export function normalizeMapSettings(value: unknown): MapSettings {
  const result = defaultMapSettings();
  if (!value || typeof value !== 'object') return result;
  for (const key of Object.keys(result) as (keyof MapSettings)[]) {
    const field = (value as Record<string, unknown>)[key];
    if (typeof field === 'string') result[key] = field;
  }
  return result;
}

export function loadMapWorkspacePreferences(storage: Pick<Storage, 'getItem'> = localStorage): MapWorkspacePreferences {
  let legacy: unknown;
  try { legacy = JSON.parse(storage.getItem(LEGACY_SETTINGS_KEY) ?? 'null'); } catch { /* old settings unavailable */ }
  const fallback: MapWorkspacePreferences = { presets: [], activePresetId: '', lastSettings: normalizeMapSettings(legacy) };
  try {
    const value = JSON.parse(storage.getItem(MAP_PREFERENCES_KEY) ?? 'null');
    if (!value || typeof value !== 'object') return fallback;
    const presets: MapWorkspacePreset[] = [];
    for (const item of Array.isArray(value.presets) ? value.presets : []) {
      if (!item || typeof item.id !== 'string' || typeof item.name !== 'string' || !item.name.trim()) continue;
      if (presets.some((preset) => preset.id === item.id)) continue;
      presets.push({ id: item.id, name: item.name.trim(), settings: normalizeMapSettings(item.settings) });
    }
    return {
      presets,
      activePresetId: presets.some((preset) => preset.id === value.activePresetId) ? value.activePresetId : '',
      lastSettings: value.lastSettings ? normalizeMapSettings(value.lastSettings) : fallback.lastSettings,
    };
  } catch { return fallback; }
}

export function saveMapWorkspacePreferences(value: MapWorkspacePreferences, storage: Pick<Storage, 'setItem'> = localStorage): void {
  storage.setItem(MAP_PREFERENCES_KEY, JSON.stringify(value));
}
