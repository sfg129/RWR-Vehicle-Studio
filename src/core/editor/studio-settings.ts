import { reactive } from 'vue';
import { isAppLanguage, type AppLanguage } from '../../i18n/languages';
import { setLanguage } from '../../i18n/runtime';
import { loadShortcuts, loadSecondaryShortcuts, secondaryShortcutDefaults, shortcutDefaults, type StudioShortcuts } from './shortcuts';

const key = 'rwr-vehicle-studio.settings.v1';
export interface StudioSettings { language: AppLanguage; theme: 'dark' | 'light'; fontSize: number; accent: string; uiScale: number; shortcuts: StudioShortcuts; secondaryShortcuts: StudioShortcuts }
function load(): StudioSettings {
  let value: Partial<StudioSettings> = {};
  try { value = JSON.parse(localStorage.getItem(key) ?? '{}'); } catch { /* defaults */ }
  const shortcuts = loadShortcuts(value.shortcuts);
  return { language: isAppLanguage(value.language) ? value.language : 'zh-CN', theme: value.theme === 'light' ? 'light' : 'dark', fontSize: Math.max(12, Math.min(20, Number(value.fontSize) || 16)), accent: /^#[0-9a-f]{6}$/i.test(value.accent ?? '') && value.accent?.toLowerCase() !== '#f0b84b' ? value.accent! : '#74a5c3', uiScale: Math.max(85, Math.min(120, Number(value.uiScale) || 100)), shortcuts, secondaryShortcuts: loadSecondaryShortcuts(value.secondaryShortcuts, shortcuts) };
}
export const studioSettings = reactive(load());
export function resetShortcuts() { studioSettings.shortcuts = { ...shortcutDefaults }; studioSettings.secondaryShortcuts = { ...secondaryShortcutDefaults }; applySettings(); }
export function applySettings() {
  try { localStorage.setItem(key, JSON.stringify(studioSettings)); } catch { /* restricted storage */ }
  document.documentElement.dataset.theme = studioSettings.theme;
  document.documentElement.style.setProperty('--ui-scale', String(studioSettings.uiScale / 100));
  document.documentElement.style.setProperty('--font-scale', String(studioSettings.fontSize / 16));
  document.documentElement.style.setProperty('--accent', studioSettings.accent);
  setLanguage(studioSettings.language);
}
