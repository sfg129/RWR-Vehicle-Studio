import { describe, expect, it, vi } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SourceDocument } from '../src/core/xml/source-document';
import { parseWeaponDefinition, ResourceCatalog, StaleResourceApplyError } from '../src/core/resources/resource-catalog';
import { parseStaticVoxelModel } from '../src/core/voxel/voxel-model';
import { localDragValue, visualMatchesDamageState, weaponExtentToModel, weaponLogicalToModel, WEAPON_LOGICAL_TO_MODEL_YAW } from '../src/core/vehicle/vehicle-model';
import { composeVehicle } from '../src/core/vehicle/vehicle-composition';
import { desktop, type ResourceFolderScan } from '../src/platform/desktop-api';
import { isValidNonNegativeInteger, isValidNumber, isValidVec3 } from '../src/core/math';
import { SoldierAssets } from '../src/core/soldier/soldier-assets';
import { loadSoldierAssets } from '../src/core/soldier/soldier-loader';

describe('结构编辑', () => {
  it('增加/删除对象和属性并保留可解析 XML', () => {
    const document = new SourceDocument('<vehicle>\n  <visual class="chassis" offset="0 0 0" />\n</vehicle>');
    const visual = document.descendants('visual')[0];
    document.addAttribute(visual, 'key', '0');
    expect(document.value(document.descendants('visual')[0], 'key')).toBe('0');
    document.removeAttribute(document.descendants('visual')[0], 'offset');
    expect(document.value(document.descendants('visual')[0], 'offset')).toBeUndefined();
    document.appendChild(document.root!, 'turret');
    expect(document.descendants('turret')).toHaveLength(1);
    document.removeNode(document.descendants('visual')[0]);
    expect(document.descendants('visual')).toHaveLength(0);
    expect(document.serialize()).toContain('<turret />');
  });
});

describe('恢复本项（RV-009）', () => {
  it('结构操作 materialize 后仍从保存快照恢复节点', () => {
    const document = new SourceDocument('<vehicle><visual class="chassis" offset="1 2 3"/></vehicle>');
    const visual = document.descendants('visual')[0];
    document.set(visual, 'offset', '9 9 9');
    document.appendChild(document.root!, 'turret');
    expect(document.value(document.descendants('visual')[0], 'offset')).toBe('9 9 9');
    document.revertNode(document.descendants('visual')[0]);
    expect(document.value(document.descendants('visual')[0], 'offset')).toBe('1 2 3');
    expect(document.descendants('turret')).toHaveLength(1);
  });
  it('revertNode 保留其它节点的 pending 修改', () => {
    const document = new SourceDocument('<vehicle><visual offset="1 0 0"/><turret offset="2 0 0"/></vehicle>');
    document.set(document.descendants('turret')[0], 'offset', '5 0 0');
    document.set(document.descendants('visual')[0], 'offset', '9 0 0');
    document.revertNode(document.descendants('visual')[0]);
    expect(document.value(document.descendants('visual')[0], 'offset')).toBe('1 0 0');
    expect(document.value(document.descendants('turret')[0], 'offset')).toBe('5 0 0');
  });
  it('delete sibling -> save -> edit survivor -> revert survivor（R4-002）', () => {
    const document = new SourceDocument('<vehicle><visual class="A" offset="1 0 0"/><visual class="B" offset="2 0 0"/></vehicle>');
    document.removeNode(document.descendants('visual')[0]);
    document.markSaved();
    const survivor = document.descendants('visual')[0];
    document.set(survivor, 'offset', '9 9 9');
    document.revertNode(survivor);
    expect(document.value(document.descendants('visual')[0], 'offset')).toBe('2 0 0');
  });
  it('delete sibling -> addAttribute(survivor) -> revert survivor（R4-002）', () => {
    const document = new SourceDocument('<vehicle><visual class="A"/><visual class="B"/></vehicle>');
    document.removeNode(document.descendants('visual')[0]);
    const survivor = document.descendants('visual')[0];
    document.addAttribute(survivor, 'key', '7');
    document.revertNode(survivor);
    expect(document.value(document.descendants('visual')[0], 'key')).toBeUndefined();
    expect(document.value(document.descendants('visual')[0], 'class')).toBe('B');
  });
  it('identical siblings 删除一个后 revert survivor 仍使用 survivor 身份（R4-002）', () => {
    const document = new SourceDocument('<vehicle><visual class="X"/><visual class="X"/></vehicle>');
    document.removeNode(document.descendants('visual')[0]);
    const survivor = document.descendants('visual')[0];
    document.set(survivor, 'class', 'Y');
    document.revertNode(survivor);
    expect(document.value(document.descendants('visual')[0], 'class')).toBe('X');
  });
  it('同级节点删除后 revertNode 仍恢复到原节点的保存快照（R3-008）', () => {
    const document = new SourceDocument('<vehicle><visual class="A" offset="1 0 0"/><visual class="B" offset="2 0 0"/></vehicle>');
    document.removeNode(document.descendants('visual')[0]);
    document.set(document.descendants('visual')[0], 'offset', '9 9 9');
    document.revertNode(document.descendants('visual')[0]);
    expect(document.value(document.descendants('visual')[0], 'offset')).toBe('2 0 0');
  });
  it('restoreSaved 后 revertNode 恢复到真实保存快照而非 undo 快照', () => {
    const saved = '<vehicle><visual offset="1 0 0"/></vehicle>';
    const document = new SourceDocument(saved);
    document.set(document.descendants('visual')[0], 'offset', '9 9 9');
    document.appendChild(document.root!, 'turret');
    const undoSnapshot = document.serialize();
    const undone = new SourceDocument(undoSnapshot);
    undone.restoreSaved(saved);
    undone.revertNode(undone.descendants('visual')[0]);
    expect(undone.value(undone.descendants('visual')[0], 'offset')).toBe('1 0 0');
  });
});

describe('武器预览资源', () => {
  it('parseWeaponDefinition 拒绝根元素不是 weapon 或存在结构问题的武器 XML（R3-010）', () => {
    expect(() => parseWeaponDefinition('<model/>', 'bad.weapon')).toThrow('根元素不是 <weapon>');
    expect(() => parseWeaponDefinition('<weapon><shield offset="1 2 3"></weapon>', 'bad.weapon')).toThrow('结构问题');
    expect(() => parseWeaponDefinition('<weapon/>', 'ok.weapon')).not.toThrow();
  });
  it('识别 XML 体素模型和全部护盾范围', () => {
    const weapon = parseWeaponDefinition('<weapon><model filename="weapon_m18.xml"/><shield offset="0 0.55 0.7" extent="0.75 4 4"/><shield offset="1 2 3" extent="4 5 6"/></weapon>', 'test.weapon');
    expect(weapon.voxelModel).toBe('weapon_m18.xml');
    expect(weapon.mesh).toBeUndefined();
    expect(weapon.shields).toEqual([{ offset: [0, 0.55, 0.7], extent: [0.75, 4, 4] }, { offset: [1, 2, 3], extent: [4, 5, 6] }]);
  });

  it('读取静态体素颜色和位置', () => {
    expect(parseStaticVoxelModel('<model><voxels><voxel x="1" y="2" z="3" r="0.5" g="0.4" b="0.3" a="1"/></voxels></model>')).toEqual([
      { x: 1, y: 2, z: 3, r: 0.5, g: 0.4, b: 0.3, a: 1 },
    ]);
  });

  const packageRoot = 'D:/steam/steamapps/common/RunningWithRifles/media/packages/ww2_base';
  it.skipIf(!existsSync(`${packageRoot}/weapons/stuart_recce_s.weapon`))('按实际 stuart 武器的当前内容读取护盾', () => {
    const text = readFileSync(`${packageRoot}/weapons/stuart_recce_s.weapon`, 'utf8'); const source = new SourceDocument(text);
    const weapon = parseWeaponDefinition(text, 'stuart_recce_s.weapon'); expect(weapon.shields).toHaveLength(source.descendants('shield').length);
  });
  it.skipIf(!existsSync(`${packageRoot}/weapons/willys_mb_recoilless_rifle.weapon`) || !existsSync(`${packageRoot}/models/weapon_m18_recoilless_rifle.xml`))('从实际武器引用读取 M18 体素模型', () => {
    const weapon = parseWeaponDefinition(readFileSync(`${packageRoot}/weapons/willys_mb_recoilless_rifle.weapon`, 'utf8'), 'willys_mb_recoilless_rifle.weapon');
    expect(weapon.voxelModel).toBe('weapon_m18_recoilless_rifle.xml');
    const voxels = parseStaticVoxelModel(readFileSync(`${packageRoot}/models/${weapon.voxelModel}`, 'utf8')); expect(voxels.length).toBeGreaterThan(0);
    const xSize = Math.max(...voxels.map((voxel) => voxel.x)) - Math.min(...voxels.map((voxel) => voxel.x));
    const zSize = Math.max(...voxels.map((voxel) => voxel.z)) - Math.min(...voxels.map((voxel) => voxel.z)); expect(xSize).toBeGreaterThan(zSize * 4);
    const transformed = voxels.map((voxel) => weaponLogicalToModel([voxel.x, voxel.y, voxel.z]));
    const modelXSize = Math.max(...transformed.map((voxel) => voxel[0])) - Math.min(...transformed.map((voxel) => voxel[0]));
    const modelZSize = Math.max(...transformed.map((voxel) => voxel[2])) - Math.min(...transformed.map((voxel) => voxel[2])); expect(modelZSize).toBeGreaterThan(modelXSize * 4);
  });
  it.skipIf(!existsSync(`${packageRoot}/weapons/m4_m2.weapon`))('按实际 m4_m2 多 shield 格式增加、修改和删除', () => {
    const text = readFileSync(`${packageRoot}/weapons/m4_m2.weapon`, 'utf8'); const document = new SourceDocument(text);
    expect(document.descendants('shield')).toHaveLength(3);
    document.appendChild(document.root!, 'shield', { offset: '0 0 0', extent: '1 1 1' });
    const added = document.descendants('shield').at(-1)!; document.set(added, 'offset', '1 2 3');
    expect(parseWeaponDefinition(document.serialize(), 'm4_m2.weapon').shields.at(-1)).toEqual({ offset: [1, 2, 3], extent: [1, 1, 1] });
    document.removeNode(document.descendants('shield')[1]);
    expect(new SourceDocument(document.serialize()).descendants('shield')).toHaveLength(3);
  });
  it('将 X 前向的武器逻辑 shield 转换到 Z 前向模型坐标', () => {
    expect(WEAPON_LOGICAL_TO_MODEL_YAW).toBe(-Math.PI / 2);
    const forward = weaponLogicalToModel([4.6, 0, 0]); expect(forward[0]).toBeCloseTo(0); expect(forward[1]).toBe(0); expect(forward[2]).toBeCloseTo(4.6);
    const leftPlate = weaponLogicalToModel([0.65, 0.1, 0.5]); expect(leftPlate[0]).toBeCloseTo(-0.5); expect(leftPlate[1]).toBeCloseTo(0.1); expect(leftPlate[2]).toBeCloseTo(0.65);
    expect(weaponExtentToModel([0.3, 0.9, 1.2])).toEqual([1.2, 0.9, 0.3]);
  });
});

describe('损毁外观', () => {
  it('正常与损毁状态互斥', () => {
    const document = new SourceDocument('<vehicle><visual key="broken"/><visual class="chassis"/></vehicle>'); const [broken, normal] = document.descendants('visual');
    expect(visualMatchesDamageState(document, normal, false)).toBe(true);
    expect(visualMatchesDamageState(document, broken, false)).toBe(false);
    expect(visualMatchesDamageState(document, normal, true)).toBe(false);
    expect(visualMatchesDamageState(document, broken, true)).toBe(true);
  });
});

describe('资源覆盖重解析（RV-006）', () => {
  it('override 后 weapon() 返回新的物理路径，旧缓存被清除', async () => {
    const readText = vi.spyOn(desktop, 'readText').mockImplementation(async (path: string) =>
      path === 'B/gun.weapon' ? '<weapon><shield offset="2 2 2" extent="3 3 3"/></weapon>' : '<weapon><shield offset="1 1 1" extent="1 1 1"/></weapon>');
    try {
      const catalog = new ResourceCatalog();
      catalog.indexes.weapon['gun.weapon'] = 'A/gun.weapon';
      const before = await catalog.weapon('gun.weapon');
      expect(before.ok).toBe(true); if (!before.ok) return;
      expect(before.value.sourcePath).toBe('A/gun.weapon');
      expect(before.value.shields[0].offset).toEqual([1, 1, 1]);
      catalog.override('B/gun.weapon');
      const after = await catalog.weapon('gun.weapon');
      expect(after.ok).toBe(true); if (!after.ok) return;
      expect(after.value.sourcePath).toBe('B/gun.weapon');
      expect(after.value.shields[0].offset).toEqual([2, 2, 2]);
    } finally { readText.mockRestore(); }
  });
});

describe('武器解析错误分类（RV-022）', () => {
  it('缺失/读取失败/解析失败分别返回对应 kind', async () => {
    const readText = vi.spyOn(desktop, 'readText').mockImplementation(async (path: string) => {
      if (path === 'parse/gun.weapon') return '<weapon><model'; // 未闭合标签 -> 解析失败
      if (path === 'ok/gun.weapon') return '<weapon><shield offset="0 0 0" extent="1 1 1"/></weapon>';
      throw new Error('EACCES');
    });
    try {
      const catalog = new ResourceCatalog();
      // 缺失：index 里没有该 key
      expect(await catalog.weapon('nope.weapon')).toMatchObject({ ok: false, kind: 'missing' });
      // 读取失败：物理路径存在但 readText 抛错
      catalog.indexes.weapon['gun.weapon'] = 'read/gun.weapon';
      expect(await catalog.weapon('gun.weapon')).toMatchObject({ ok: false, kind: 'read_error' });
      // 解析失败：文件存在但内容非法
      catalog.indexes.weapon['gun.weapon'] = 'parse/gun.weapon';
      expect(await catalog.weapon('gun.weapon')).toMatchObject({ ok: false, kind: 'parse_error' });
      // 成功
      catalog.indexes.weapon['gun.weapon'] = 'ok/gun.weapon';
      expect(await catalog.weapon('gun.weapon')).toMatchObject({ ok: true, value: { sourcePath: 'ok/gun.weapon' } });
    } finally { readText.mockRestore(); }
  });
  it('读取/解析失败不写入缓存，修复后重试可成功', async () => {
    let failing = true;
    const readText = vi.spyOn(desktop, 'readText').mockImplementation(async () => {
      if (failing) throw new Error('EIO'); else return '<weapon><shield offset="1 2 3" extent="4 5 6"/></weapon>';
    });
    try {
      const catalog = new ResourceCatalog();
      catalog.indexes.weapon['gun.weapon'] = 'gun.weapon';
      expect(await catalog.weapon('gun.weapon')).toMatchObject({ ok: false, kind: 'read_error' });
      failing = false;
      const retry = await catalog.weapon('gun.weapon');
      expect(retry.ok).toBe(true); if (!retry.ok) return;
      expect(retry.value.shields[0].offset).toEqual([1, 2, 3]);
    } finally { readText.mockRestore(); }
  });
});

describe('资源目录事务（RV-011）', () => {
  it('applyFolders 任一目录扫描失败时保持旧状态不变', async () => {
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string, kind: string) => {
      if (kind === 'weapon') throw new Error('weapon scan failed');
      return { index: { [`${kind}_file`]: `${path}/${kind}_file` }, duplicates: [], warnings: [] };
    });
    try {
      const catalog = new ResourceCatalog();
      catalog.folders = { model: 'old-model', texture: 'old-texture', weapon: 'old-weapon' };
      catalog.indexes = { model: { a: 'old-a' }, texture: { b: 'old-b' }, weapon: { c: 'old-c' } };
      await expect(catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' })).rejects.toThrow('weapon scan failed');
      expect(catalog.folders).toEqual({ model: 'old-model', texture: 'old-texture', weapon: 'old-weapon' });
      expect(catalog.indexes.model).toEqual({ a: 'old-a' });
      expect(catalog.indexes.weapon).toEqual({ c: 'old-c' });
    } finally { scan.mockRestore(); }
  });

  it('applyFolders 旧调用输给新调用时抛出 StaleResourceApplyError 且不提交旧状态（R3-005）', async () => {
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string, kind: string) => ({ index: { [`${kind}-${path}`]: `${path}/${kind}` }, duplicates: [], warnings: [] }));
    try {
      const catalog = new ResourceCatalog();
      const oldApply = catalog.applyFolders({ model: 'old', texture: 'old', weapon: 'old' });
      const newApply = catalog.applyFolders({ model: 'new', texture: 'new', weapon: 'new' });
      await newApply;
      await expect(oldApply).rejects.toBeInstanceOf(StaleResourceApplyError);
      expect(catalog.folders).toEqual({ model: 'new', texture: 'new', weapon: 'new' });
      expect(catalog.indexes.model).toEqual({ 'model-new': 'new/model' });
      expect(catalog.indexes.weapon).toEqual({ 'weapon-new': 'new/weapon' });
    } finally { scan.mockRestore(); }
  });

  it('applyFolders 全部成功时原子提交，空目录得到空索引', async () => {
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string, kind: string) => ({ index: { [`${kind}_file`]: `${path}/${kind}_file` }, duplicates: [], warnings: [] }));
    try {
      const catalog = new ResourceCatalog();
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: '' });
      expect(catalog.folders).toEqual({ model: 'm', texture: 't', weapon: '' });
      expect(catalog.indexes.model).toEqual({ model_file: 'm/model_file' });
      expect(catalog.indexes.texture).toEqual({ texture_file: 't/texture_file' });
      expect(catalog.indexes.weapon).toEqual({});
    } finally { scan.mockRestore(); }
  });
});

describe('资源扫描诊断（RV-019 / RV-057）', () => {
  it('applyFolders 聚合重复文件与扫描警告到 scanDiagnostics', async () => {
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string, kind: string): Promise<ResourceFolderScan> => {
      if (kind === 'weapon') return { index: { 'gun.weapon': `${path}/gun.weapon` }, duplicates: ['gun.weapon 重复出现 2 次：a、b'], warnings: ['资源扫描跳过：权限不足'] };
      return { index: {}, duplicates: [], warnings: [] };
    });
    try {
      const catalog = new ResourceCatalog();
      await catalog.applyFolders({ model: '', texture: '', weapon: 'w' });
      expect(catalog.scanDiagnostics.duplicates).toEqual(['gun.weapon 重复出现 2 次：a、b']);
      expect(catalog.scanDiagnostics.warnings).toEqual(['资源扫描跳过：权限不足']);
      expect(catalog.indexes.weapon).toEqual({ 'gun.weapon': 'w/gun.weapon' });
    } finally { scan.mockRestore(); }
  });
  it('空文件夹扫描不产生诊断', async () => {
    const scan = vi.spyOn(desktop, 'scanFolder').mockResolvedValue({ index: {}, duplicates: [], warnings: [] });
    try {
      const catalog = new ResourceCatalog();
      await catalog.applyFolders({ model: '', texture: '', weapon: '' });
      expect(catalog.scanDiagnostics).toEqual({ duplicates: [], warnings: [] });
    } finally { scan.mockRestore(); }
  });
});

describe('资源目录 same-path 快路径（RV-014）', () => {
  it('路径未变时 applyFolders 不再重扫；force=true 或 refreshFolders 强制重扫', async () => {
    let calls = 0;
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string) => { calls++; return { index: { [`${path}-file`]: path }, duplicates: [], warnings: [] }; });
    try {
      const catalog = new ResourceCatalog();
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' });
      expect(calls).toBe(3);
      // 相同路径再次应用 -> 不重扫
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' });
      expect(calls).toBe(3);
      expect(catalog.indexes.model).toEqual({ 'm-file': 'm' });
      // force=true 强制重扫
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' }, true);
      expect(calls).toBe(6);
      // 显式 refreshFolders 也重扫
      await catalog.refreshFolders();
      expect(calls).toBe(9);
      // 只改变 model 路径 -> 仅重扫 model，其余复用
      await catalog.applyFolders({ model: 'm2', texture: 't', weapon: 'w' });
      expect(calls).toBe(10);
      expect(catalog.indexes.model).toEqual({ 'm2-file': 'm2' });
      expect(catalog.indexes.texture).toEqual({ 't-file': 't' });
    } finally { scan.mockRestore(); }
  });
  it('预置 folders 但从未扫描时，applyFolders 首次仍会扫描（不误触发快路径）', async () => {
    let calls = 0;
    const scan = vi.spyOn(desktop, 'scanFolder').mockImplementation(async (path: string) => { calls++; return { index: { [`${path}-file`]: path }, duplicates: [], warnings: [] }; });
    try {
      const catalog = new ResourceCatalog();
      // 模拟 App 启动时预先设置 folders（尚未扫描）
      catalog.folders = { model: 'm', texture: 't', weapon: 'w' };
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' });
      expect(calls).toBe(3);
      expect(catalog.indexes.model).toEqual({ 'm-file': 'm' });
      // 已扫描后再次应用相同路径 -> 才走快路径
      await catalog.applyFolders({ model: 'm', texture: 't', weapon: 'w' });
      expect(calls).toBe(3);
    } finally { scan.mockRestore(); }
  });
});

describe('人物资源身份缓存（RV-015）', () => {
  it('相同 model+animation 身份只读取解析一次', async () => {
    const readText = vi.spyOn(desktop, 'readText').mockResolvedValue('<model/>');
    const parse = vi.spyOn(SoldierAssets, 'parse');
    try {
      const first = await loadSoldierAssets('cache-model.xml', 'cache-anim.xml');
      const second = await loadSoldierAssets('cache-model.xml', 'cache-anim.xml');
      expect(first).toBe(second);
      expect(readText).toHaveBeenCalledTimes(2);
      expect(parse).toHaveBeenCalledTimes(1);
    } finally { readText.mockRestore(); parse.mockRestore(); }
  });
  it('读取失败被驱逐，下次重试可成功', async () => {
    let fail = true;
    const readText = vi.spyOn(desktop, 'readText').mockImplementation(async () => { if (fail) throw new Error('EIO'); return '<model/>'; });
    try {
      await expect(loadSoldierAssets('retry-model.xml', 'retry-anim.xml')).rejects.toThrow('EIO');
      fail = false;
      await expect(loadSoldierAssets('retry-model.xml', 'retry-anim.xml')).resolves.toBeInstanceOf(SoldierAssets);
    } finally { readText.mockRestore(); }
  });
});

describe('局部拖拽增量写回（RV-025）', () => {
  it('world delta 按 basis 逆旋转叠加到当前 local 值', () => {
    // basis 90°：world +X -> local +Z
    const a = localDragValue([1, 0, 0], Math.PI / 2, [10, 20, 30]);
    expect(a[0]).toBeCloseTo(10); expect(a[1]).toBeCloseTo(20); expect(a[2]).toBeCloseTo(31);
    // basis -90°：world +X -> local -Z
    const b = localDragValue([1, 0, 0], -Math.PI / 2, [10, 20, 30]);
    expect(b[0]).toBeCloseTo(10); expect(b[1]).toBeCloseTo(20); expect(b[2]).toBeCloseTo(29);
    // basis 0：world delta 直接叠加
    const c = localDragValue([1, 2, 3], 0, [0, 0, 0]);
    expect(c[0]).toBeCloseTo(1); expect(c[1]).toBeCloseTo(2); expect(c[2]).toBeCloseTo(3);
  });
});

describe('XML 结构诊断（RV-031）', () => {
  it('不匹配的闭合标签与未闭合标签会产生 structuralErrors', () => {
    const mismatched = new SourceDocument('<vehicle><turret></visual></vehicle>');
    expect(mismatched.structuralErrors.some((e) => e.includes('不匹配'))).toBe(true);
    const unclosed = new SourceDocument('<vehicle><turret>');
    expect(unclosed.structuralErrors.some((e) => e.includes('未闭合'))).toBe(true);
    const orphan = new SourceDocument('<vehicle></vehicle></turret>');
    expect(orphan.structuralErrors.some((e) => e.includes('意外'))).toBe(true);
    const multiRoot = new SourceDocument('<vehicle/><vehicle/>');
    expect(multiRoot.structuralErrors.some((e) => e.includes('根元素数量'))).toBe(true);
  });
  it('未闭合的声明 / 注释 / CDATA 不挂死并产生 structuralErrors（R4-010）', () => {
    const declaration = new SourceDocument('<?xml version="1.0"');
    expect(declaration.structuralErrors.some((e) => e.includes('声明'))).toBe(true);
    const comment = new SourceDocument('<vehicle><!-- broken');
    expect(comment.structuralErrors.some((e) => e.includes('注释'))).toBe(true);
    const cdata = new SourceDocument('<vehicle><![CDATA[broken');
    expect(cdata.structuralErrors.some((e) => e.includes('CDATA'))).toBe(true);
  });
  it('结构良好的 XML 不产生 structuralErrors，且提交后仍保持良好', () => {
    const doc = new SourceDocument('<vehicle><turret weapon_key="x"/><visual class="a"/></vehicle>');
    expect(doc.structuralErrors).toEqual([]);
    doc.appendChild(doc.root!, 'slot', { position: '0 0 0' });
    expect(doc.structuralErrors).toEqual([]);
  });
});

describe('保存 CAS（R4-001）', () => {
  it('restoreSaved(savedText) 保留 save 飞行期间产生的更晚 pending 修改', () => {
    const document = new SourceDocument('<vehicle><visual offset="1 0 0"/></vehicle>');
    const savedSnapshot = document.serialize();
    const saveText = document.serialize();
    // save 飞行期间用户继续编辑
    document.set(document.descendants('visual')[0], 'offset', '9 9 9');
    document.restoreSaved(saveText);
    expect(document.serialize()).toBe('<vehicle><visual offset="9 9 9"/></vehicle>');
    expect(document.serialize()).not.toBe(saveText);
    const reparsed = new SourceDocument(document.serialize());
    expect(reparsed.value(reparsed.descendants('visual')[0], 'offset')).toBe('9 9 9');
    void savedSnapshot;
  });
});

describe('严格数值/vec3 输入（RV-032）', () => {
  it('isValidNumber 与 isValidVec3 拒绝非法输入', () => {
    expect(isValidNumber('1.5')).toBe(true);
    expect(isValidNumber('-0.25')).toBe(true);
    expect(isValidNumber('abc')).toBe(false);
    expect(isValidNumber('')).toBe(false);
    expect(isValidNumber('1 2')).toBe(false);
    expect(isValidVec3('1 2 3')).toBe(true);
    expect(isValidVec3(' 0 -1.5  2 ')).toBe(true);
    expect(isValidVec3('1 2')).toBe(false);
    expect(isValidVec3('1 2 abc')).toBe(false);
    expect(isValidVec3('1 2 3 4')).toBe(false);
    expect(isValidVec3('')).toBe(false);
    expect(isValidNonNegativeInteger('0')).toBe(true);
    expect(isValidNonNegativeInteger('12')).toBe(true);
    expect(isValidNonNegativeInteger('-1')).toBe(false);
    expect(isValidNonNegativeInteger('1.5')).toBe(false);
    expect(isValidNonNegativeInteger('abc')).toBe(false);
  });
});

describe('根元素属性合成（RV-034）', () => {
  it('leaf 根属性覆盖 base，base 独有属性标记为 inherited', () => {
    const base = new SourceDocument('<vehicle file="pak40_base.vehicle" name="base-name"><visual class="chassis"/></vehicle>');
    const leaf = new SourceDocument('<vehicle file="pak40_base.vehicle" key="leaf-key"><visual class="chassis"/></vehicle>');
    const composed = composeVehicle(base, leaf);
    const root = composed.document.root!;
    expect(composed.document.value(root, 'file')).toBe('pak40_base.vehicle');
    expect(composed.document.value(root, 'key')).toBe('leaf-key');
    expect(composed.document.value(root, 'name')).toBe('base-name');
    expect(composed.rootSource).toBe(leaf.root);
    expect(composed.rootInheritedAttrs.has('name')).toBe(true);
    expect(composed.rootInheritedAttrs.has('key')).toBe(false);
    expect(composed.rootInheritedAttrs.has('file')).toBe(false);
  });
  it('无 base 时根属性直接来自 leaf，且无 inherited', () => {
    const leaf = new SourceDocument('<vehicle name="solo"><visual class="chassis"/></vehicle>');
    const composed = composeVehicle(undefined, leaf);
    expect(composed.document.root?.name).toBe('vehicle');
    expect(composed.document.value(composed.document.root!, 'name')).toBe('solo');
    expect(composed.rootSource).toBe(leaf.root);
    expect(composed.rootInheritedAttrs.size).toBe(0);
  });
});
