import { desktop, type ResourceKind } from '../../platform/desktop-api';
import { SourceDocument } from '../xml/source-document';
import { vec3, type Vec3 } from '../math';

export interface FolderSettings { model: string; texture: string; weapon: string }
export interface WeaponShield { offset: Vec3; extent: Vec3 }
export interface WeaponModel { sourcePath: string; mesh?: string; voxelModel?: string; texture?: string; shields: WeaponShield[] }

export function parseWeaponDefinition(source: string, sourcePath: string): WeaponModel {
  const xml = new SourceDocument(source); const model = xml.descendants('model')[0];
  const filename = model ? xml.value(model, 'filename') : undefined;
  const mesh = model ? xml.value(model, 'mesh_filename') ?? (filename?.toLowerCase().endsWith('.mesh') ? filename : undefined) : undefined;
  const voxelModel = filename?.toLowerCase().endsWith('.xml') ? filename : undefined;
  const shields = xml.descendants('shield').map((shield) => ({ offset: vec3(xml.value(shield, 'offset')), extent: vec3(xml.value(shield, 'extent')) }));
  return { sourcePath, mesh, voxelModel, texture: model ? xml.value(model, 'texture_filename') : undefined, shields };
}

export class ResourceCatalog {
  folders: FolderSettings = { model: '', texture: '', weapon: '' };
  indexes: Record<ResourceKind, Record<string, string>> = { model: {}, texture: {}, weapon: {} };
  overrides: Record<string, string> = {};
  private weaponCache = new Map<string, WeaponModel | null>();

  async setFolder(kind: ResourceKind, folder: string): Promise<void> {
    this.folders[kind] = folder;
    this.indexes[kind] = folder ? await desktop.scanFolder(folder, kind) : {};
    this.weaponCache.clear();
  }
  override(path: string): void { this.overrides[fileName(path).toLowerCase()] = path; this.weaponCache.clear(); }
  resolve(name: string | undefined, kind: ResourceKind): string | undefined {
    if (!name) return undefined;
    const key = fileName(name).toLowerCase();
    return this.overrides[key] ?? this.indexes[kind][key];
  }
  async weapon(key: string | undefined): Promise<WeaponModel | null> {
    if (!key) return null;
    const cacheKey = key.toLowerCase();
    if (this.weaponCache.has(cacheKey)) return this.weaponCache.get(cacheKey)!;
    const sourcePath = this.resolve(key, 'weapon');
    if (!sourcePath) { this.weaponCache.set(cacheKey, null); return null; }
    try {
      const source = await desktop.readText(sourcePath); const result = parseWeaponDefinition(source, sourcePath);
      this.weaponCache.set(cacheKey, result); return result;
    } catch { this.weaponCache.set(cacheKey, null); return null; }
  }
  setWeaponPreview(key: string, sourcePath: string, source: string): WeaponModel {
    const result = parseWeaponDefinition(source, sourcePath); this.weaponCache.set(key.toLowerCase(), result); return result;
  }
  async missing(document: SourceDocument): Promise<string[]> {
    const missing = new Set<string>();
    for (const node of document.descendants('visual')) {
      const a = document.attrs(node); if (a.mesh_filename && !this.resolve(a.mesh_filename, 'model')) missing.add(`模型：${a.mesh_filename}`);
      if (a.texture_filename && !this.resolve(a.texture_filename, 'texture')) missing.add(`纹理：${a.texture_filename}`);
      for (const part of node.children.filter((n) => n.name === 'part')) {
        const texture = document.value(part, 'texture_filename'); if (texture && !this.resolve(texture, 'texture')) missing.add(`纹理：${texture}`);
      }
    }
    for (const node of document.descendants('turret')) {
      if (node.parent?.name !== 'vehicle') continue;
      const key = document.value(node, 'weapon_key'); if (!key) continue;
      const weapon = await this.weapon(key); if (!weapon) missing.add(`武器：${key}`);
      else {
        if (weapon.mesh?.toLowerCase().endsWith('.mesh') && !this.resolve(weapon.mesh, 'model')) missing.add(`武器模型：${weapon.mesh}`);
        if (weapon.voxelModel && !this.resolve(weapon.voxelModel, 'model')) missing.add(`武器体素模型：${weapon.voxelModel}`);
        if (weapon.texture && !this.resolve(weapon.texture, 'texture')) missing.add(`武器纹理：${weapon.texture}`);
      }
    }
    return [...missing].sort();
  }
}
function fileName(path: string): string { return path.replaceAll('\\', '/').split('/').at(-1) ?? path; }
