import type { SourceDocument, SourceNode } from '../xml/source-document';
import { vec3, type Vec3 } from '../math';

export interface SceneEntry {
  node: SourceNode;
  kind: 'visual' | 'turret' | 'slot' | 'physics' | 'control' | 'tire' | 'other';
  label: string;
  index: number;
}

export function sceneEntries(doc: SourceDocument): SceneEntry[] {
  const root = doc.root; if (!root || root.name !== 'vehicle') throw new Error('根元素不是 <vehicle>');
  const result: SceneEntry[] = [];
  const types: [string, SceneEntry['kind'], string][] = [
    ['physics', 'physics', '物理 / 碰撞'], ['modifier', 'physics', '物理修正'], ['control', 'control', '操控'], ['tire_set', 'tire', '轮组'],
    ['turret', 'turret', '炮塔'], ['visual', 'visual', '外观'], ['character_slot', 'slot', '乘员'],
  ];
  const kindCounts: Record<SceneEntry['kind'], number> = { visual: 0, turret: 0, slot: 0, physics: 0, control: 0, tire: 0, other: 0 };
  for (const [tag, kind, title] of types) {
    const nodes = root.children.filter((n) => n.name === tag);
    nodes.forEach((node, localIndex) => {
      const index = kindCounts[kind]++;
      const a = doc.attrs(node); const detail = tag === 'modifier' ? a.class || '未指定 class'
        : kind === 'visual' ? `${a.class ?? 'visual'} · ${a.mesh_filename || '无模型'}`
          : kind === 'turret' ? a.weapon_key || '无武器' : kind === 'slot' ? a.type || 'unknown' : '';
      result.push({ node, kind, index, label: `${title}${nodes.length > 1 ? ` ${localIndex}` : ''}${detail ? ` · ${detail}` : ''}` });
    });
  }
  const recognized = new Set(types.map(([tag]) => tag));
  const others = root.children.filter((node) => !recognized.has(node.name));
  others.forEach((node, index) => {
    const detail = doc.value(node, 'key') ?? doc.value(node, 'class') ?? doc.value(node, 'type') ?? '';
    result.push({ node, kind: 'other', index, label: `${node.name}${detail ? ` · ${detail}` : ''}` });
  });
  return result;
}

export function visualMatchesDamageState(doc: SourceDocument, visual: SourceNode, showBroken: boolean): boolean {
  return (doc.value(visual, 'key') === 'broken') === showBroken;
}

export function nodePosition(doc: SourceDocument, node: SourceNode): { attr: string; value: Vec3 } | null {
  const a = doc.attrs(node);
  for (const key of ['offset', 'seat_position', 'position', 'visual_offset', 'collision_model_pos', 'enter_position'])
    if (a[key] !== undefined) return { attr: key, value: vec3(a[key]) };
  const idle = node.children.find((n) => n.name === 'state' && doc.value(n, 'class') === 'idle');
  if (idle) return { attr: 'position', value: vec3(doc.value(idle, 'position')) };
  return null;
}

export function idleState(doc: SourceDocument, slot: SourceNode): SourceNode | undefined {
  return slot.children.find((n) => n.name === 'state' && doc.value(n, 'class') === 'idle');
}

export function characterSlotHidden(doc: SourceDocument, slot: SourceNode): boolean {
  return slot.name === 'character_slot' && doc.value(slot, 'hiding') === '1';
}

export interface TurretPose {
  position: Vec3;
  rotation: number;
}

export interface CharacterSlotPose extends TurretPose {
  attachmentIndex: number | null;
  attachmentRotation: number;
}

/** Resolve a turret's vehicle-space pose, including parent_turret_index chains. */
export function turretWorldPose(doc: SourceDocument, turrets: SourceNode[], index: number, visiting = new Set<number>()): TurretPose | null {
  const turret = turrets[index];
  if (!turret || visiting.has(index)) return null;
  const localPosition = vec3(doc.value(turret, 'offset'));
  const localRotation = finiteNumber(doc.value(turret, 'rotation'));
  const parentIndex = integerIndex(doc.value(turret, 'parent_turret_index'));
  if (parentIndex === null || parentIndex === index || !turrets[parentIndex]) return { position: localPosition, rotation: localRotation };

  const next = new Set(visiting); next.add(index);
  const parent = turretWorldPose(doc, turrets, parentIndex, next);
  if (!parent) return { position: localPosition, rotation: localRotation };
  const rotated = rotateY(localPosition, parent.rotation);
  return {
    position: [parent.position[0] + rotated[0], parent.position[1] + rotated[1], parent.position[2] + rotated[2]],
    rotation: parent.rotation + localRotation,
  };
}

/**
 * RWR treats attached_on_turret as a zero-based turret index. The child <turret
 * index="N"> nodes describe which turrets the occupant controls and are unrelated
 * to the seat coordinate system. When the attribute is absent, the seat remains
 * in vehicle space.
 */
export function characterSlotPose(doc: SourceDocument, slot: SourceNode, turrets: SourceNode[]): CharacterSlotPose {
  const idle = idleState(doc, slot);
  const localPosition = vec3((idle ? doc.value(idle, 'position') : undefined) ?? doc.value(slot, 'seat_position') ?? doc.value(slot, 'position'));
  const localRotation = finiteNumber(idle ? doc.value(idle, 'rotation') ?? doc.value(slot, 'rotation') : doc.value(slot, 'rotation'));
  const attachmentIndex = integerIndex(doc.value(slot, 'attached_on_turret'));
  if (attachmentIndex === null) return { position: localPosition, rotation: localRotation, attachmentIndex: null, attachmentRotation: 0 };

  const turret = turretWorldPose(doc, turrets, attachmentIndex);
  if (!turret) return { position: localPosition, rotation: localRotation, attachmentIndex, attachmentRotation: 0 };
  const rotated = rotateY(localPosition, turret.rotation);
  return {
    position: [turret.position[0] + rotated[0], turret.position[1] + rotated[1], turret.position[2] + rotated[2]],
    rotation: turret.rotation + localRotation,
    attachmentIndex,
    attachmentRotation: turret.rotation,
  };
}

/**
 * Accumulated world rotation (radians, around Y) of the coordinate system in
 * which a node's editable position is expressed. The transform gizmo applies
 * the inverse of this to convert a world-space drag delta back into the local
 * XML delta before writing it.
 */
export function editableBasisRotation(doc: SourceDocument, node: SourceNode): number {
  const turrets = doc.root?.children.filter((n) => n.name === 'turret') ?? [];
  if (node.name === 'character_slot') return characterSlotPose(doc, node, turrets).attachmentRotation;
  if (node.name === 'visual' && doc.value(node, 'class') === 'turret') {
    const index = Number.parseInt(doc.value(node, 'turret_index') ?? '0', 10);
    return turretWorldPose(doc, turrets, index)?.rotation ?? 0;
  }
  if (node.name === 'turret') {
    const parentIndex = integerIndex(doc.value(node, 'parent_turret_index'));
    if (parentIndex === null || parentIndex === turrets.indexOf(node)) return 0;
    return turretWorldPose(doc, turrets, parentIndex)?.rotation ?? 0;
  }
  return 0;
}

export function rotateY(value: Vec3, angle: number): Vec3 {
  const cosine = Math.cos(angle), sine = Math.sin(angle);
  return [cosine * value[0] + sine * value[2], value[1], -sine * value[0] + cosine * value[2]];
}

/** Convert a world-space gizmo drag delta into the new local attribute value (world -> local via inverse basis Y rotation). */
export function localDragValue(worldDelta: Vec3, basisRotation: number, current: Vec3): Vec3 {
  const local = rotateY(worldDelta, -basisRotation);
  return [current[0] + local[0], current[1] + local[1], current[2] + local[2]];
}

/**
 * True when moving this node's editable transform requires a full scene rebuild.
 * Turret offsets parent other turrets / turret visuals / attached occupants, so
 * an in-place Object3D move would leave all dependent world poses stale (R3-002).
 */
export function dragNeedsRebuild(node: SourceNode): boolean {
  return node.name === 'turret';
}

/** Static voxel weapons point toward -X; vehicle-mounted weapons point toward +Z. */
export const WEAPON_LOGICAL_TO_MODEL_YAW = Math.PI / 2;
export function weaponLogicalToModel(value: Vec3): Vec3 { return rotateY(value, WEAPON_LOGICAL_TO_MODEL_YAW); }

/**
 * Game-side verification maps shield right/front to model right/front by
 * rotating the shield frame +90 degrees around Y.
 */
export const SHIELD_LOGICAL_TO_MODEL_YAW = Math.PI / 2;
export function shieldLogicalToModel(value: Vec3): Vec3 { return rotateY(value, SHIELD_LOGICAL_TO_MODEL_YAW); }
export function weaponExtentToModel(value: Vec3): Vec3 { return [Math.abs(value[2]), Math.abs(value[1]), Math.abs(value[0])]; }

function integerIndex(value: string | undefined): number | null {
  if (value === undefined || value.trim() === '') return null;
  const index = Number(value);
  return Number.isInteger(index) && index >= 0 ? index : null;
}

function finiteNumber(value: string | undefined): number {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

/** RWR tire visuals use two indexes per tire_set: even = +X, odd = -X. */
export function tireVisualPosition(doc: SourceDocument, visual: SourceNode): Vec3 | null {
  if (doc.value(visual, 'class') !== 'tire' || !doc.root) return null;
  const visualIndex = Number.parseInt(doc.value(visual, 'index') ?? '', 10);
  if (!Number.isInteger(visualIndex) || visualIndex < 0) return null;
  const tireSet = doc.root.children.filter((n) => n.name === 'tire_set')[Math.floor(visualIndex / 2)];
  if (!tireSet) return null;
  const offset = vec3(doc.value(tireSet, 'offset'));
  return [visualIndex % 2 === 0 ? offset[0] : -offset[0], offset[1], offset[2]];
}
