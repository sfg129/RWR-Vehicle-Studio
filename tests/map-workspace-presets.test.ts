import { describe, expect, it } from 'vitest';
import { loadMapWorkspacePreferences, MAP_PREFERENCES_KEY, normalizeMapSettings, saveMapWorkspacePreferences } from '../src/core/map/map-workspace-presets';

function memoryStorage() {
  const values = new Map<string, string>();
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } };
}

describe('map folder presets', () => {
  it('retains all existing directories and the selected map when migrating old settings', () => {
    const storage = memoryStorage();
    const settings = { sourceMapsFolder: 'D:\\game\\maps', outputMapsFolder: 'C:\\mod\\maps', selectedMap: 'island2', vehicleFolder: 'C:\\mod\\vehicles', factionFolder: 'C:\\mod\\factions' };
    storage.setItem('rwr-vehicle-studio.map-object-settings.v2', JSON.stringify(settings));
    expect(loadMapWorkspacePreferences(storage).lastSettings).toEqual(settings);
  });

  it('persists independent folder sets and unsaved path edits without modifying saved presets', () => {
    const storage = memoryStorage();
    const settings = normalizeMapSettings({ selectedMap: 'edelweiss6', outputMapsFolder: 'C:\\mod\\edelweiss\\maps' });
    const preset = { id: 'europe', name: '欧洲', settings: normalizeMapSettings(settings) };
    settings.outputMapsFolder = 'C:\\another-mod\\maps';
    saveMapWorkspacePreferences({ presets: [preset], activePresetId: preset.id, lastSettings: settings }, storage);
    const reloaded = loadMapWorkspacePreferences(storage);
    expect(reloaded.activePresetId).toBe('europe');
    expect(reloaded.presets[0].settings.outputMapsFolder).toBe('C:\\mod\\edelweiss\\maps');
    expect(reloaded.lastSettings.outputMapsFolder).toBe('C:\\another-mod\\maps');
    expect(reloaded.presets[0].settings.selectedMap).toBe('edelweiss6');
  });

  it('recovers usable old paths when a new preferences record is damaged', () => {
    const storage = memoryStorage();
    storage.setItem('rwr-vehicle-studio.map-object-settings.v2', JSON.stringify({ sourceMapsFolder: 'D:\\pacific\\maps' }));
    storage.setItem(MAP_PREFERENCES_KEY, '{incomplete');
    expect(loadMapWorkspacePreferences(storage).lastSettings.sourceMapsFolder).toBe('D:\\pacific\\maps');
  });
});
