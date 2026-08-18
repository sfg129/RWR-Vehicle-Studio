import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SourceDocument } from '../src/core/xml/source-document';
import { characterSlotHidden, characterSlotPose, editableBasisRotation, rotateY, sceneEntries, tireVisualPosition, turretWorldPose } from '../src/core/vehicle/vehicle-model';
import { composeVehicle, vehicleBaseReference } from '../src/core/vehicle/vehicle-composition';
import { parseOgreMesh } from '../src/core/ogre/mesh-reader';
import { SoldierAssets, SOLDIER_GAME_SCALE, rwrLinearToDisplay } from '../src/core/soldier/soldier-assets';
import { BUILTIN_SUPPORT_ANIMATIONS, BUILTIN_SUPPORT_MODEL, cloneResourceSelection } from '../src/core/resources/resource-presets';
import { flattenWorkspace } from '../src/core/workspace/vehicle-workspace';

const root = String.raw`D:\steam\steamapps\common\RunningWithRifles\media\packages\ww2_base`;
const stuart = join(root, 'vehicles', 'stuart_base.vehicle');
const sdkfz = join(root, 'vehicles', 'sdkfz251_mortar.vehicle');
const m10 = join(root, 'vehicles', 'm10.vehicle');
const pak40Base = join(root, 'vehicles', 'at_gun_pak40_base.vehicle');
const pak40Overlay = join(root, 'vehicles', 'at_gun_pak40_2.vehicle');
const soldierModel = join(process.cwd(), 'src-tauri', 'resources', 'soldier_army_normandy_ranger_1.xml');
const soldierAnimations = join(process.cwd(), 'src-tauri', 'resources', 'soldier_animations.xml');

describe.skipIf(!existsSync(stuart) || !existsSync(sdkfz) || !existsSync(m10) || !existsSync(pak40Base) || !existsSync(pak40Overlay))('实物载具 XML', () => {
  it('解析 Stuart 的基础、炮塔、外观和乘员，并保真修改一个属性', () => {
    const text = readFileSync(stuart, 'utf8'); const doc = new SourceDocument(text); const entries = sceneEntries(doc);
    expect(entries.filter((e) => e.kind === 'turret')).toHaveLength(4);
    const visuals = entries.filter((e) => e.kind === 'visual'); expect(visuals.length).toBeGreaterThanOrEqual(7);
    expect(visuals.some((entry) => doc.value(entry.node, 'class') === 'chassis')).toBe(true);
    expect(visuals.filter((entry) => doc.value(entry.node, 'class') === 'track')).toHaveLength(2);
    expect(visuals.some((entry) => doc.value(entry.node, 'key') === 'broken')).toBe(true);
    expect(entries.filter((e) => e.kind === 'slot')).toHaveLength(4);
    const physics = doc.descendants('physics')[0]; const beforeComment = '<!-- one weapon per turret';
    doc.set(physics, 'visual_offset', '0 0.3 0'); const saved = doc.serialize();
    expect(saved).toContain('visual_offset="0 0.3 0"'); expect(saved).toContain(beforeComment);
    expect(text.replace('visual_offset="0 0.28 0.0"', 'visual_offset="0 0.3 0"')).toBe(saved);
  });
  it('解析 Sdkfz251 的嵌套 state 乘员与炮塔绑定', () => {
    const doc = new SourceDocument(readFileSync(sdkfz, 'utf8')); const slots = doc.descendants('character_slot');
    expect(slots.length).toBeGreaterThanOrEqual(7);
    expect(slots.some((s) => s.children.some((n) => n.name === 'state' && doc.value(n, 'class') === 'idle'))).toBe(true);
    expect(slots.some((s) => doc.value(s, 'attached_on_turret') === '1')).toBe(true);
    const tires = doc.descendants('visual').filter((v) => doc.value(v, 'class') === 'tire');
    expect(tireVisualPosition(doc, tires[0])).toEqual([1.05, 0, 2.4]);
    expect(tireVisualPosition(doc, tires[1])).toEqual([-1.05, 0, 2.4]);
    expect(tireVisualPosition(doc, tires[2])).toEqual([1.05, 0, -0.2]);
    const turrets = doc.root!.children.filter((node) => node.name === 'turret');
    const rearGunner = slots.find((slot) => doc.value(slot, 'attached_on_turret') === '1')!;
    expect(characterSlotPose(doc, rearGunner, turrets).rotation).toBe(6);
  });
  it('M10 attached_on_turret="0" 使用 0 号炮塔作为座位坐标基准', () => {
    const doc = new SourceDocument(readFileSync(m10, 'utf8'));
    const turrets = doc.root!.children.filter((node) => node.name === 'turret');
    const slots = doc.root!.children.filter((node) => node.name === 'character_slot');
    const firstGunner = characterSlotPose(doc, slots[1], turrets);
    const secondGunner = characterSlotPose(doc, slots[2], turrets);
    expect(firstGunner.attachmentIndex).toBe(0);
    expect(firstGunner.position).toEqual([0.5, 1.33, 0.38]);
    expect(secondGunner.attachmentIndex).toBe(0);
    expect(secondGunner.position[0]).toBeCloseTo(-0.6);
    expect(secondGunner.position[1]).toBeCloseTo(1.93);
    expect(secondGunner.position[2]).toBeCloseTo(-0.32);
    expect(doc.value(slots[2].children.find((node) => node.name === 'turret')!, 'index')).toBe('1');
    const childTurret = turretWorldPose(doc, turrets, 1)!;
    expect(childTurret.position[0]).toBeCloseTo(-0.57);
    expect(childTurret.position[1]).toBeCloseTo(3.03);
    expect(childTurret.position[2]).toBeCloseTo(0.68);
  });
  it('稀疏载具覆盖基础载具，同时保留覆盖文件的独立写回', () => {
    const base = new SourceDocument(readFileSync(pak40Base, 'utf8'));
    const leaf = new SourceDocument(readFileSync(pak40Overlay, 'utf8'));
    const composed = composeVehicle(base, leaf);
    const entries = sceneEntries(composed.document);
    expect(entries.filter((entry) => entry.kind === 'physics')).toHaveLength(1);
    expect(entries.filter((entry) => entry.kind === 'visual')).toHaveLength(4);
    expect(entries.filter((entry) => entry.kind === 'slot')).toHaveLength(2);
    const turret = entries.find((entry) => entry.kind === 'turret')!;
    expect(composed.document.value(turret.node, 'weapon_key')).toBe('at_gun_pak40_2.weapon');
    expect(composed.editableNode(turret.node)).toBeDefined();
    expect(composed.inherited(entries.find((entry) => entry.kind === 'physics')!.node)).toBe(true);
    expect(leaf.serialize()).toBe(readFileSync(pak40Overlay, 'utf8'));
  });
});

describe.skipIf(!existsSync(join(root, 'models', 'stuart_chassis.mesh')))('实物 OGRE mesh', () => {
  for (const name of ['stuart_chassis.mesh', 'stuart_track.mesh', 'stuart_turret.mesh', 'sdkfz251_chassis.mesh', 'sdkfz251_track.mesh', 'heavy_mortar_base.mesh']) {
    it(`解析 ${name}`, () => {
      const b = readFileSync(join(root, 'models', name)); const data = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer;
      const mesh = parseOgreMesh(data); expect(mesh.submeshes.length).toBeGreaterThan(0);
      expect(mesh.submeshes.reduce((sum, s) => sum + (s.geometry ?? mesh.sharedGeometry)?.vertexCount!, 0)).toBeGreaterThan(0);
    });
  }
});

describe.skipIf(!existsSync(soldierModel) || !existsSync(soldierAnimations))('内置人物和动画', () => {
  it('按 0 起始 animation_id 映射载具乘员动画', () => {
    const assets = SoldierAssets.parse(readFileSync(soldierModel, 'utf8'), readFileSync(soldierAnimations, 'utf8'));
    expect(assets.voxels.length).toBe(1814); expect(assets.particles.length).toBe(15); expect(assets.sticks.length).toBe(17);
    expect(assets.animation('36')?.name).toBe('driving car');
    expect(assets.animation('37')?.name).toBe('travelling car, aiming');
    expect(assets.animation(undefined, 'tank mg still')?.name).toBe('tank mg still');
    expect(assets.isStatic(assets.animation('36'))).toBe(false);
    expect(assets.isStatic(assets.animation('37'))).toBe(true);
    const pose = assets.createPoseBuffer(), matrices = new Float32Array(assets.voxels.length * 16);
    assets.initializeInstanceMatrices(matrices); assets.sampleInto(assets.animation('36'), 8.5, pose);
    const started = performance.now(); for (let i = 0; i < 200; i++) assets.writePoseMatrices(pose, matrices);
    expect(performance.now() - started).toBeLessThan(1000);
    expect(Number.isFinite(matrices[12])).toBe(true);
    expect(assets.voxels.some((voxel) => voxel.r > 0.3 || voxel.g > 0.3 || voxel.b > 0.3)).toBe(true);
  });
  it('将人物 XML 的线性色值显式提升到屏幕 sRGB', () => {
    expect(rwrLinearToDisplay(0)).toBe(0);
    expect(rwrLinearToDisplay(1)).toBe(1);
    expect(rwrLinearToDisplay(0.128681)).toBeGreaterThan(0.39);
    expect(rwrLinearToDisplay(0.128681)).toBeLessThan(0.4);
  });
  it('资源选择副本保留文件夹、人物模型和动画', () => {
    const selection = cloneResourceSelection({
      folders: { model: 'models', texture: 'textures', weapon: 'weapons' },
      supportModel: BUILTIN_SUPPORT_MODEL,
      supportAnimations: BUILTIN_SUPPORT_ANIMATIONS,
    });
    expect(selection.folders).toEqual({ model: 'models', texture: 'textures', weapon: 'weapons' });
    expect(selection.supportModel).toBe(BUILTIN_SUPPORT_MODEL);
    expect(selection.supportAnimations).toBe(BUILTIN_SUPPORT_ANIMATIONS);
  });
  it('人物显示比例固定为最终校准值 0.04', () => {
    expect(SOLDIER_GAME_SCALE).toBe(0.04);
  });
});

describe('载具工作区', () => {
  it('只在目录展开时显示子项，并保留 vehicle 类型', () => {
    const child = { name: 'tank.vehicle', path: 'C:\\mod\\vehicles\\tank.vehicle', isDirectory: false, isVehicle: true, children: [] };
    const folder = { name: 'vehicles', path: 'C:\\mod\\vehicles', isDirectory: true, isVehicle: false, children: [child] };
    expect(flattenWorkspace([folder], new Set())).toHaveLength(1);
    const rows = flattenWorkspace([folder], new Set([folder.path]));
    expect(rows).toHaveLength(2); expect(rows[1].depth).toBe(1); expect(rows[1].entry.isVehicle).toBe(true);
  });
});

describe('基础载具引用', () => {
  it('排除无实际作用的 vehicle_base.vehicle 占位符', () => {
    expect(vehicleBaseReference(new SourceDocument('<vehicle file="vehicle_base.vehicle"/>'))).toBeUndefined();
    expect(vehicleBaseReference(new SourceDocument('<vehicle file="folder/VEHICLE_BASE.VEHICLE"/>'))).toBeUndefined();
    expect(vehicleBaseReference(new SourceDocument('<vehicle file="at_gun_pak40_base.vehicle"/>'))).toBe('at_gun_pak40_base.vehicle');
  });
});

describe('基础载具组合（pending 属性）', () => {
  it('组合 preview 包含 leaf 顶层节点的 pending 属性修改（RV-002）', () => {
    const base = new SourceDocument('<vehicle><physics mass="1"/></vehicle>');
    const leaf = new SourceDocument('<vehicle><physics mass="2"/></vehicle>');
    leaf.set(leaf.descendants('physics')[0], 'mass', '3');
    const composed = composeVehicle(base, leaf);
    const previewPhysics = composed.document.descendants('physics')[0];
    expect(composed.document.value(previewPhysics, 'mass')).toBe('3');
    expect(composed.editableNode(previewPhysics)).toBe(leaf.descendants('physics')[0]);
  });
  it('组合 preview 包含 leaf 嵌套子节点的 pending 修改，且不污染 base/历史（RV-002）', () => {
    const base = new SourceDocument('<vehicle><turret><visual offset="1 0 0"/></turret></vehicle>');
    const leaf = new SourceDocument('<vehicle><turret><visual offset="1 0 0"/></turret></vehicle>');
    const visual = leaf.descendants('visual')[0];
    leaf.set(visual, 'offset', '9 9 9');
    const composed = composeVehicle(base, leaf);
    const previewVisual = composed.document.descendants('visual')[0];
    expect(composed.document.value(previewVisual, 'offset')).toBe('9 9 9');
    expect(composed.editableNode(previewVisual)).toBe(visual);
    expect(leaf.raw(visual)).toBe('<visual offset="1 0 0"/>');
    expect(leaf.serialize()).toBe('<vehicle><turret><visual offset="9 9 9"/></turret></vehicle>');
  });
});

describe('乘员显示规则', () => {
  it('character_slot 的 hiding="1" 表示完全隐藏', () => {
    const doc = new SourceDocument('<vehicle><character_slot type="passenger" hiding="1"/><character_slot type="driver" hiding="0"/></vehicle>');
    const slots = doc.descendants('character_slot');
    expect(characterSlotHidden(doc, slots[0])).toBe(true);
    expect(characterSlotHidden(doc, slots[1])).toBe(false);
  });
  it('炮塔父链及乘员局部位置会继承平移和旋转', () => {
    const doc = new SourceDocument('<vehicle><turret offset="10 2 0" rotation="1.5707963267948966"/><turret offset="1 3 0" rotation="0.5" parent_turret_index="0"/><character_slot attached_on_turret="1" seat_position="1 0 0" rotation="0.25"><turret index="0"/></character_slot><character_slot seat_position="2 4 6"/></vehicle>');
    const turrets = doc.root!.children.filter((node) => node.name === 'turret');
    const slots = doc.root!.children.filter((node) => node.name === 'character_slot');
    const turret = turretWorldPose(doc, turrets, 1)!;
    expect(turret.position[0]).toBeCloseTo(10);
    expect(turret.position[1]).toBeCloseTo(5);
    expect(turret.position[2]).toBeCloseTo(-1);
    const attached = characterSlotPose(doc, slots[0], turrets);
    expect(attached.position[0]).toBeCloseTo(10 + Math.cos(Math.PI / 2 + 0.5));
    expect(attached.position[1]).toBeCloseTo(5);
    expect(attached.position[2]).toBeCloseTo(-1 - Math.sin(Math.PI / 2 + 0.5));
    expect(attached.rotation).toBeCloseTo(Math.PI / 2 + 0.75);
    expect(characterSlotPose(doc, slots[1], turrets).position).toEqual([2, 4, 6]);
  });
});

describe('局部坐标编辑基准（RV-003）', () => {
  it('无父炮塔的 offset 基准为 0，子炮塔基准为父炮塔累计旋转', () => {
    const doc = new SourceDocument('<vehicle><turret offset="10 0 0" rotation="1.5707963267948966"/><turret offset="1 0 0" parent_turret_index="0"/></vehicle>');
    const turrets = doc.root!.children.filter((n) => n.name === 'turret');
    expect(editableBasisRotation(doc, turrets[0])).toBe(0);
    expect(editableBasisRotation(doc, turrets[1])).toBeCloseTo(Math.PI / 2);
  });
  it('turret visual 的 offset 基准是 turret_index 炮塔的累计旋转', () => {
    const doc = new SourceDocument('<vehicle><turret rotation="1.5707963267948966"/><visual class="turret" turret_index="0" offset="1 0 0"/></vehicle>');
    expect(editableBasisRotation(doc, doc.descendants('visual')[0])).toBeCloseTo(Math.PI / 2);
  });
  it('普通外观、未 attach 乘员基准为 0；attached 乘员基准为所附炮塔累计旋转', () => {
    const doc = new SourceDocument('<vehicle><turret rotation="0.5"/><visual class="chassis" offset="1 0 0"/><character_slot seat_position="0 0 0"/><character_slot attached_on_turret="0" seat_position="1 0 0"/></vehicle>');
    const chassis = doc.descendants('visual').find((v) => doc.value(v, 'class') === 'chassis')!;
    const [plain, attached] = doc.descendants('character_slot');
    expect(editableBasisRotation(doc, chassis)).toBe(0);
    expect(editableBasisRotation(doc, plain)).toBe(0);
    expect(editableBasisRotation(doc, attached)).toBeCloseTo(0.5);
  });
  it('父炮塔 90° 时子炮塔世界 +X 拖拽写回 local +Z', () => {
    const doc = new SourceDocument('<vehicle><turret offset="0 0 0" rotation="1.5707963267948966"/><turret offset="0 0 0" parent_turret_index="0"/></vehicle>');
    const turrets = doc.root!.children.filter((n) => n.name === 'turret');
    const basis = editableBasisRotation(doc, turrets[1]);
    expect(basis).toBeCloseTo(Math.PI / 2);
    const local = rotateY([1, 0, 0], -basis);
    expect(local[0]).toBeCloseTo(0);
    expect(local[1]).toBeCloseTo(0);
    expect(local[2]).toBeCloseTo(1);
  });
});
