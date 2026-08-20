import { emptySecondaryFolders, type FolderSettings, type SecondaryFolderSettings } from './resource-catalog';

export const BUILTIN_SUPPORT_MODEL = 'builtin://soldier/model';
export const BUILTIN_SUPPORT_ANIMATIONS = 'builtin://soldier/animations';

export interface ResourceSelection {
  folders: FolderSettings;
  secondaryFolders: SecondaryFolderSettings;
  supportModel: string;
  supportAnimations: string;
}

export interface ResourcePreset extends ResourceSelection {
  id: string;
  name: string;
}

export interface ResourcePreferences {
  presets: ResourcePreset[];
  activePresetId: string;
  lastSelection?: ResourceSelection;
}

export const DEFAULT_RESOURCE_SELECTION: ResourceSelection = {
  folders: { model: '', texture: '', weapon: '' },
  secondaryFolders: emptySecondaryFolders(),
  supportModel: BUILTIN_SUPPORT_MODEL,
  supportAnimations: BUILTIN_SUPPORT_ANIMATIONS,
};

const STORAGE_KEY = 'rwr-vehicle-studio.resource-presets.v1';

export function loadResourcePreferences(): ResourcePreferences {
  if (typeof localStorage === 'undefined') return { presets: [], activePresetId: '' };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Partial<ResourcePreferences>;
    return {
      presets: Array.isArray(parsed.presets) ? parsed.presets.map(normalizePreset).filter((preset): preset is ResourcePreset => !!preset) : [],
      activePresetId: typeof parsed.activePresetId === 'string' ? parsed.activePresetId : '',
      lastSelection: parsed.lastSelection ? normalizeSelection(parsed.lastSelection) : undefined,
    };
  } catch {
    return { presets: [], activePresetId: '' };
  }
}

export function saveResourcePreferences(preferences: ResourcePreferences): void {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
}

export function cloneResourceSelection(selection: ResourceSelection): ResourceSelection {
  return {
    folders: { ...selection.folders },
    secondaryFolders: cloneSecondaryFolders(selection.secondaryFolders),
    supportModel: selection.supportModel || BUILTIN_SUPPORT_MODEL,
    supportAnimations: selection.supportAnimations || BUILTIN_SUPPORT_ANIMATIONS,
  };
}

export function isBuiltinSupport(path: string): boolean {
  return path === BUILTIN_SUPPORT_MODEL || path === BUILTIN_SUPPORT_ANIMATIONS;
}

export function presetId(): string {
  return `preset-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizePreset(value: unknown): ResourcePreset | undefined {
  if (!value || typeof value !== 'object') return undefined;
  const item = value as Partial<ResourcePreset>;
  if (typeof item.id !== 'string' || typeof item.name !== 'string' || !item.name.trim()) return undefined;
  return { id: item.id, name: item.name.trim(), ...normalizeSelection(item) };
}

function normalizeSelection(value: Partial<ResourceSelection>): ResourceSelection {
  const folders = value.folders ?? DEFAULT_RESOURCE_SELECTION.folders;
  const secondary = value.secondaryFolders;
  return {
    folders: {
      model: typeof folders.model === 'string' ? folders.model : '',
      texture: typeof folders.texture === 'string' ? folders.texture : '',
      weapon: typeof folders.weapon === 'string' ? folders.weapon : '',
    },
    secondaryFolders: {
      model: stringArray(secondary?.model),
      texture: stringArray(secondary?.texture),
      weapon: stringArray(secondary?.weapon),
    },
    supportModel: typeof value.supportModel === 'string' && value.supportModel ? value.supportModel : BUILTIN_SUPPORT_MODEL,
    supportAnimations: typeof value.supportAnimations === 'string' && value.supportAnimations ? value.supportAnimations : BUILTIN_SUPPORT_ANIMATIONS,
  };
}
function cloneSecondaryFolders(value: SecondaryFolderSettings | undefined): SecondaryFolderSettings {
  return {
    model: [...(value?.model ?? [])],
    texture: [...(value?.texture ?? [])],
    weapon: [...(value?.weapon ?? [])],
  };
}
function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}
