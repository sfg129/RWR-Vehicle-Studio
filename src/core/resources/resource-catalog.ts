import { desktop, type ResourceFolderScan, type ResourceKind } from '../../platform/desktop-api';
import { SourceDocument } from '../xml/source-document';
import { vec3, type Vec3 } from '../math';

const EMPTY_SCAN = (): ResourceFolderScan => ({ index: {}, duplicates: [], warnings: [] });

export interface FolderSettings { model: string; texture: string; weapon: string }
export interface SecondaryFolderSettings { model: string[]; texture: string[]; weapon: string[] }
export interface WeaponShield { offset: Vec3; extent: Vec3 }
export interface WeaponModel { sourcePath: string; mesh?: string; voxelModel?: string; texture?: string; shields: WeaponShield[] }
export type ResourceFailureKind = 'missing' | 'read_error' | 'parse_error';
export type ResourceResult<T> = { ok: true; value: T } | { ok: false; kind: ResourceFailureKind; message: string };
export interface ApplyFoldersResult { changed: boolean; version: number }

/** Thrown when an older applyFolders() invocation loses to a newer one (R3-005). */
export class StaleResourceApplyError extends Error {
  constructor() { super('Resource scan superseded by a newer apply'); this.name = 'StaleResourceApplyError'; }
}

export function parseWeaponDefinition(source: string, sourcePath: string): WeaponModel {
  const xml = new SourceDocument(source);
  if (xml.root?.name !== 'weapon') throw new Error(`${sourcePath} 的根元素不是 <weapon>`);
  if (xml.structuralErrors.length) throw new Error(`${sourcePath} 结构问题：${xml.structuralErrors[0]}`);
  const model = xml.descendants('model')[0];
  const filename = model ? xml.value(model, 'filename') : undefined;
  const mesh = model ? xml.value(model, 'mesh_filename') ?? (filename?.toLowerCase().endsWith('.mesh') ? filename : undefined) : undefined;
  const voxelModel = filename?.toLowerCase().endsWith('.xml') ? filename : undefined;
  const shields = xml.descendants('shield').map((shield) => ({ offset: vec3(xml.value(shield, 'offset')), extent: vec3(xml.value(shield, 'extent')) }));
  return { sourcePath, mesh, voxelModel, texture: model ? xml.value(model, 'texture_filename') : undefined, shields };
}

export class ResourceCatalog {
  folders: FolderSettings = { model: '', texture: '', weapon: '' };
  secondaryFolders: SecondaryFolderSettings = emptySecondaryFolders();
  indexes: Record<ResourceKind, Record<string, string>> = { model: {}, texture: {}, weapon: {} };
  overrides: Record<string, string> = {};
  private weaponCache = new Map<string, ResourceResult<WeaponModel>>();
  private scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
  private scanned = false;
  private applyGeneration = 0;
  private resourceVersion = 0;

  /** Non-fatal diagnostics from the last folder scan, aggregated across the three kinds. */
  get scanDiagnostics(): { duplicates: string[]; warnings: string[] } {
    const kinds = ['model', 'texture', 'weapon'] as ResourceKind[];
    return { duplicates: kinds.flatMap((kind) => this.scans[kind].duplicates), warnings: kinds.flatMap((kind) => this.scans[kind].warnings) };
  }

  async setFolder(kind: ResourceKind, folder: string): Promise<void> {
    await this.applyFolders({ ...this.folders, [kind]: folder }, false, this.secondaryFolders);
  }
  /**
   * Scan all configured source chains before committing atomically. Within each
   * kind the primary folder wins, followed by secondary folders in UI order.
   * A failed scan leaves the previous catalog untouched.
   */
  async applyFolders(folders: FolderSettings, force = false, secondaryFolders: SecondaryFolderSettings = emptySecondaryFolders()): Promise<ApplyFoldersResult> {
    const generation = ++this.applyGeneration;
    const stale = () => generation !== this.applyGeneration;
    const indexes: Record<ResourceKind, Record<string, string>> = { model: {}, texture: {}, weapon: {} };
    const scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
    const normalizedSecondary = normalizeSecondaryFolders(secondaryFolders);
    let changed = false;
    for (const kind of ['model', 'texture', 'weapon'] as ResourceKind[]) {
      const requestedSources = sourceChain(folders[kind], normalizedSecondary[kind]);
      const currentSources = sourceChain(this.folders[kind], this.secondaryFolders[kind]);
      if (!force && this.scanned && sameSources(requestedSources, currentSources)) { indexes[kind] = this.indexes[kind]; scans[kind] = this.scans[kind]; continue; }
      const scan = await scanSourceChain(kind, requestedSources);
      if (stale()) throw new StaleResourceApplyError();
      indexes[kind] = scan.index;
      scans[kind] = scan;
      changed = true;
    }
    if (stale()) throw new StaleResourceApplyError();
    this.folders = { ...folders };
    this.secondaryFolders = normalizedSecondary;
    this.indexes = indexes;
    this.scans = scans;
    this.scanned = true;
    if (changed) { this.resourceVersion++; this.weaponCache.clear(); }
    return { changed, version: this.resourceVersion };
  }
  /** Re-scan the currently configured folders (explicit refresh, bypasses the same-path fast path). */
  async refreshFolders(): Promise<void> {
    const scans: Record<ResourceKind, ResourceFolderScan> = { model: EMPTY_SCAN(), texture: EMPTY_SCAN(), weapon: EMPTY_SCAN() };
    for (const kind of ['model', 'texture', 'weapon'] as ResourceKind[]) {
      scans[kind] = await scanSourceChain(kind, sourceChain(this.folders[kind], this.secondaryFolders[kind]));
    }
    this.indexes = { model: scans.model.index, texture: scans.texture.index, weapon: scans.weapon.index };
    this.scans = scans;
    this.scanned = true;
    this.weaponCache.clear();
  }
  override(path: string): void { this.overrides[fileName(path).toLowerCase()] = path; this.weaponCache.clear(); }
  removeOverride(name: string): void {
    const key = fileName(name).toLowerCase();
    if (this.overrides[key]) { delete this.overrides[key]; this.weaponCache.clear(); }
  }
  clearOverrides(): void { this.overrides = {}; this.weaponCache.clear(); }
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
export function emptySecondaryFolders(): SecondaryFolderSettings { return { model: [], texture: [], weapon: [] }; }
function normalizeSecondaryFolders(value: SecondaryFolderSettings): SecondaryFolderSettings {
  return {
    model: sourceChain('', value.model),
    texture: sourceChain('', value.texture),
    weapon: sourceChain('', value.weapon),
  };
}
function sourceChain(primary: string, secondary: string[]): string[] {
  return [primary, ...secondary].filter((path) => typeof path === 'string' && path.trim().length > 0);
}
function sameSources(left: string[], right: string[]): boolean {
  return left.length === right.length && left.every((path, index) => path === right[index]);
}
async function scanSourceChain(kind: ResourceKind, sources: string[]): Promise<ResourceFolderScan> {
  if (!sources.length) return EMPTY_SCAN();
  const sourceScans = await Promise.all(sources.map((folder) => desktop.scanFolder(folder, kind)));
  const merged = EMPTY_SCAN();
  for (const scan of sourceScans) {
    for (const [name, path] of Object.entries(scan.index)) if (!Object.hasOwn(merged.index, name)) merged.index[name] = path;
    merged.duplicates.push(...scan.duplicates);
    merged.warnings.push(...scan.warnings);
  }
  return merged;
}
function fail(kind: ResourceFailureKind, message: string): { ok: false; kind: ResourceFailureKind; message: string } { return { ok: false, kind, message }; }
function describe(e: unknown): string { return e instanceof Error ? e.message : String(e); }
function fileName(path: string): string { return path.replaceAll('\\', '/').split('/').at(-1) ?? path; }
