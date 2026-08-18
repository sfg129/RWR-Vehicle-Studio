import { desktop, type ResourceFolderScan, type ResourceKind } from '../../platform/desktop-api';
import { SourceDocument } from '../xml/source-document';
import { vec3, type Vec3 } from '../math';

const EMPTY_SCAN = (): ResourceFolderScan => ({ index: {}, duplicates: [], warnings: [] });

export interface FolderSettings { model: string; texture: string; weapon: string }
export interface WeaponShield { offset: Vec3; extent: Vec3 }
export interface WeaponModel { sourcePath: string; mesh?: string; voxelModel?: string; texture?: string; shields: WeaponShield[] }
export type ResourceFailureKind = 'missing' | 'read_error' | 'parse_error';
export type ResourceResult<T> = { ok: true; value: T } | { ok: false; kind: ResourceFailureKind; message: string };

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
  private weaponCache = new Map<string, ResourceResult<WeaponModel>>();
  private scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
  private scanned = false;

  /** Non-fatal diagnostics from the last folder scan, aggregated across the three kinds. */
  get scanDiagnostics(): { duplicates: string[]; warnings: string[] } {
    const kinds = ['model', 'texture', 'weapon'] as ResourceKind[];
    return { duplicates: kinds.flatMap((kind) => this.scans[kind].duplicates), warnings: kinds.flatMap((kind) => this.scans[kind].warnings) };
  }

  async setFolder(kind: ResourceKind, folder: string): Promise<void> {
    if (this.scanned && folder === this.folders[kind]) return; // same-path fast path (RV-014)
    const scan = folder ? await desktop.scanFolder(folder, kind) : EMPTY_SCAN();
    this.folders[kind] = folder;
    this.indexes[kind] = scan.index;
    this.scans[kind] = scan;
    this.scanned = true;
    this.weaponCache.clear();
  }
  /** Scan all three folders first, then commit atomically; a failed scan leaves the catalog untouched. Unchanged paths are reused (RV-014). */
  async applyFolders(folders: FolderSettings, force = false): Promise<void> {
    const indexes: Record<ResourceKind, Record<string, string>> = { model: {}, texture: {}, weapon: {} };
    const scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
    let changed = false;
    for (const kind of ['model', 'texture', 'weapon'] as ResourceKind[]) {
      if (!force && this.scanned && folders[kind] === this.folders[kind]) { indexes[kind] = this.indexes[kind]; scans[kind] = this.scans[kind]; continue; }
      const scan = folders[kind] ? await desktop.scanFolder(folders[kind], kind) : EMPTY_SCAN();
      indexes[kind] = scan.index;
      scans[kind] = scan;
      changed = true;
    }
    this.folders = { ...folders };
    this.indexes = indexes;
    this.scans = scans;
    this.scanned = true;
    if (changed) this.weaponCache.clear();
  }
  /** Re-scan the currently configured folders (explicit refresh, bypasses the same-path fast path). */
  async refreshFolders(): Promise<void> {
    const scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
    for (const kind of ['model', 'texture', 'weapon'] as ResourceKind[]) {
      scans[kind] = this.folders[kind] ? await desktop.scanFolder(this.folders[kind], kind) : EMPTY_SCAN();
    }
    this.indexes = { model: scans.model.index, texture: scans.texture.index, weapon: scans.weapon.index };
    this.scans = scans;
    this.scanned = true;
    this.weaponCache.clear();
  }
  override(path: string): void { this.overrides[fileName(path).toLowerCase()] = path; this.weaponCache.clear(); }
  resolve(name: string | undefined, kind: ResourceKind): string | undefined {
    if (!name) return undefined;
    const key = fileName(name).toLowerCase();
    return this.overrides[key] ?? this.indexes[kind][key];
  }
  async weapon(key: string | undefined): Promise<ResourceResult<WeaponModel>> {
    if (!key) return { ok: false, kind: 'missing', message: '未指定武器' };
    const cacheKey = key.toLowerCase();
    if (this.weaponCache.has(cacheKey)) return this.weaponCache.get(cacheKey)!;
    const sourcePath = this.resolve(key, 'weapon');
    if (!sourcePath) { const result = fail('missing', `未找到武器：${key}`); this.weaponCache.set(cacheKey, result); return result; }
    let source: string;
    try { source = await desktop.readText(sourcePath); }
    catch (e) { return fail('read_error', `读取武器文件失败：${sourcePath}（${describe(e)}）`); }
    try {
      const value = parseWeaponDefinition(source, sourcePath);
      const result: ResourceResult<WeaponModel> = { ok: true, value };
      this.weaponCache.set(cacheKey, result); return result;
    } catch (e) { return fail('parse_error', `解析武器文件失败：${sourcePath}（${describe(e)}）`); }
  }
  setWeaponPreview(key: string, sourcePath: string, source: string): WeaponModel {
    const result = parseWeaponDefinition(source, sourcePath); this.weaponCache.set(key.toLowerCase(), { ok: true, value: result }); return result;
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
      const result = await this.weapon(key);
      if (!result.ok) missing.add(result.kind === 'missing' ? `武器：${key}` : `武器：${key}（${result.kind === 'read_error' ? '读取失败' : '解析失败'}）`);
      else {
        const weapon = result.value;
        if (weapon.mesh?.toLowerCase().endsWith('.mesh') && !this.resolve(weapon.mesh, 'model')) missing.add(`武器模型：${weapon.mesh}`);
        if (weapon.voxelModel && !this.resolve(weapon.voxelModel, 'model')) missing.add(`武器体素模型：${weapon.voxelModel}`);
        if (weapon.texture && !this.resolve(weapon.texture, 'texture')) missing.add(`武器纹理：${weapon.texture}`);
      }
    }
    return [...missing].sort();
  }
}
function fail(kind: ResourceFailureKind, message: string): { ok: false; kind: ResourceFailureKind; message: string } { return { ok: false, kind, message }; }
function describe(e: unknown): string { return e instanceof Error ? e.message : String(e); }
function fileName(path: string): string { return path.replaceAll('\\', '/').split('/').at(-1) ?? path; }
