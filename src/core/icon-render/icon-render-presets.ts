import type { Vec3 } from '../math';

export interface IconRenderSettings {
  framingMode: 'body' | 'full';
  cameraAzimuth: number;
  cameraElevation: number;
  cameraFov: number;
  vehicleYaw: number;
  turretYaw: number;
  lightAzimuth: number;
  lightElevation: number;
  ambient: number;
  threshold: number;
  padding: number;
  outputSize: number;
  background: string;
}

export interface IconRenderPreset {
  id: string;
  name: string;
  settings: IconRenderSettings;
}

export interface IconRenderPreferences {
  presets: IconRenderPreset[];
  activePresetId: string;
  lastSettings: IconRenderSettings;
}

export type IconPartOffsets = Record<string, Vec3>;

export const DEFAULT_ICON_RENDER_SETTINGS: IconRenderSettings = {
  framingMode: 'body',
  cameraAzimuth: -40,
  cameraElevation: 55,
  cameraFov: 90,
  vehicleYaw: 0,
  turretYaw: 0,
  lightAzimuth: -35,
  lightElevation: 60,
  ambient: 0.04,
  threshold: 0.52,
  padding: 0.04,
  outputSize: 512,
  background: '#181818',
};

const STORAGE_KEY = 'rwr-vehicle-studio.icon-render-presets.v1';

export function loadIconRenderPreferences(): IconRenderPreferences {
  const fallback: IconRenderPreferences = { presets: [], activePresetId: '', lastSettings: cloneIconRenderSettings(DEFAULT_ICON_RENDER_SETTINGS) };
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<IconRenderPreferences>;
    return {
      presets: Array.isArray(parsed.presets) ? parsed.presets.map(normalizePreset).filter((value): value is IconRenderPreset => !!value) : [],
      activePresetId: typeof parsed.activePresetId === 'string' ? parsed.activePresetId : '',
      lastSettings: normalizeIconRenderSettings(parsed.lastSettings),
    };
  } catch {
    return fallback;
  }
}

export function saveIconRenderPreferences(value: IconRenderPreferences): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    presets: value.presets.map((preset) => ({ ...preset, settings: normalizeIconRenderSettings(preset.settings) })),
    activePresetId: value.activePresetId,
    lastSettings: normalizeIconRenderSettings(value.lastSettings),
  }));
}

export function normalizeIconRenderSettings(value?: Partial<IconRenderSettings>): IconRenderSettings {
  const source = value ?? {};
  return {
    framingMode: source.framingMode === 'full' ? 'full' : DEFAULT_ICON_RENDER_SETTINGS.framingMode,
    cameraAzimuth: bounded(source.cameraAzimuth, -180, 180, DEFAULT_ICON_RENDER_SETTINGS.cameraAzimuth),
    cameraElevation: bounded(source.cameraElevation, 5, 89, DEFAULT_ICON_RENDER_SETTINGS.cameraElevation),
    cameraFov: bounded(source.cameraFov, 15, 150, DEFAULT_ICON_RENDER_SETTINGS.cameraFov),
    vehicleYaw: bounded(source.vehicleYaw, -180, 180, DEFAULT_ICON_RENDER_SETTINGS.vehicleYaw),
    turretYaw: bounded(source.turretYaw, -180, 180, DEFAULT_ICON_RENDER_SETTINGS.turretYaw),
    lightAzimuth: bounded(source.lightAzimuth, -180, 180, DEFAULT_ICON_RENDER_SETTINGS.lightAzimuth),
    lightElevation: bounded(source.lightElevation, 0, 90, DEFAULT_ICON_RENDER_SETTINGS.lightElevation),
    ambient: bounded(source.ambient, 0, 1, DEFAULT_ICON_RENDER_SETTINGS.ambient),
    threshold: bounded(source.threshold, 0, 1, DEFAULT_ICON_RENDER_SETTINGS.threshold),
    padding: bounded(source.padding, 0, 0.5, DEFAULT_ICON_RENDER_SETTINGS.padding),
    outputSize: integerChoice(source.outputSize, [64, 80, 96, 128, 256, 512], DEFAULT_ICON_RENDER_SETTINGS.outputSize),
    background: validHex(source.background) ? source.background!.toLowerCase() : DEFAULT_ICON_RENDER_SETTINGS.background,
  };
}

export function cloneIconRenderSettings(value: IconRenderSettings): IconRenderSettings {
  return { ...normalizeIconRenderSettings(value) };
}

export function iconRenderPresetId(): string {
  return `icon-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizePreset(value: unknown): IconRenderPreset | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const preset = value as Partial<IconRenderPreset>;
  if (typeof preset.id !== 'string' || typeof preset.name !== 'string' || !preset.name.trim()) return undefined;
  return { id: preset.id, name: preset.name.trim(), settings: normalizeIconRenderSettings(preset.settings) };
}

function bounded(value: unknown, minimum: number, maximum: number, fallback: number): number {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}

function integerChoice(value: unknown, choices: number[], fallback: number): number {
  const number = Math.round(typeof value === 'number' ? value : Number(value));
  return choices.includes(number) ? number : fallback;
}

function validHex(value: unknown): value is string {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}
