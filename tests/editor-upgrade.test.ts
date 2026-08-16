import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { SourceDocument } from '../src/core/xml/source-document';
import { parseWeaponDefinition } from '../src/core/resources/resource-catalog';
import { parseStaticVoxelModel } from '../src/core/voxel/voxel-model';
import { visualMatchesDamageState, weaponExtentToModel, weaponLogicalToModel, WEAPON_LOGICAL_TO_MODEL_YAW } from '../src/core/vehicle/vehicle-model';

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

describe('武器预览资源', () => {
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
