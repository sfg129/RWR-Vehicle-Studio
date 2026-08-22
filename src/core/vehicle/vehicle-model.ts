import type { SourceDocument, SourceNode } from '../xml/source-document';
import { vec3, type Vec3 } from '../math';

export interface SceneEntry {
  node: SourceNode;
  kind: 'visual' | 'turret' | 'slot' | 'physics' | 'control' | 'tire' | 'other';
  label: string;
  index: number;
  meta?: string;
}

export interface EditablePosition {
  node: SourceNode;
  attr: string;
  value: Vec3;
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
      const controlledTurrets = kind === 'slot' && a.type === 'gunner'
        ? node.children.filter((child) => child.name === 'turret').map((child) => doc.value(child, 'index')).filter((value): value is string => value !== undefined && value.trim() !== '')
        : [];
      result.push({ node, kind, index, label: `${title}${nodes.length > 1 ? ` ${localIndex}` : ''}${detail ? ` · ${detail}` : ''}`, meta: controlledTurrets.length ? `index ${controlledTurrets.join(', ')}` : undefined });
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

export interface CharacterSlotPositionItem {
  key: 'position' | 'entering' | 'leaving' | 'idle';
  label: string;
  guide?: 'entrance' | 'leaving';
}

/** Build the expandable scene-tree rows that correspond to actually selectable crew guides. */
export function characterSlotPositionItems(doc: SourceDocument, slot: SourceNode): CharacterSlotPositionItem[] {
  const states = slot.children.filter((node) => node.name === 'state');
  const state = (name: string) => states.find((node) => doc.value(node, 'class') === name);
  const result: CharacterSlotPositionItem[] = [];
  const legacyPosition = doc.value(slot, 'enter_position') !== undefined || doc.value(slot, 'exit_rotation') !== undefined;
  const entering = state('entering'); const leaving = state('leaving'); const idle = state('idle');
  if (legacyPosition) result.push({ key: 'position', label: 'position', guide: 'entrance' });
  else if (entering && (doc.value(entering, 'position') !== undefined || doc.value(entering, 'rotation') !== undefined)) result.push({ key: 'entering', label: 'entering', guide: 'entrance' });
  if (leaving && doc.value(leaving, 'position') !== undefined) result.push({ key: 'leaving', label: 'leaving', guide: 'leaving' });
  if (idle) result.push({ key: 'idle', label: 'idle' });
  if (result.length === 1 && result[0].guide) result[0].label = 'position';
  return result;
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

export interface CharacterEntranceRotation {
  /** XML node/attribute that owns the editable angle. */
  node: SourceNode;
  attr: 'rotation' | 'exit_rotation';
  /** Vehicle-space exit direction in radians. */
  worldRotation: number;
  /** Rotation inherited from an attached turret. */
  basisRotation: number;
  /** Convert a dragged vehicle-space exit angle back to the XML value. */
  toXmlRotation: (worldRotation: number) => number;
}

export type CharacterEntranceEdit =
  | { kind: 'position'; node: SourceNode; attr: 'enter_position' | 'position'; value: Vec3 }
  | { kind: 'rotation'; rotation: CharacterEntranceRotation };

export interface CharacterStatePlacement {
  node: SourceNode;
  value: Vec3;
  /** Vehicle-space facing direction. The position itself remains an explicit vehicle-space coordinate. */
  worldRotation: number;
}

/** Resolve a turret's vehicle-space pose, including parent_turret_index chains. */
export function turretWorldPose(doc: SourceDocument, turrets: SourceNode[], index: number, visiting = new Set<number>(), rotationDeltas?: ReadonlyMap<number, number>): TurretPose | null {
  const turret = turrets[index];
  if (!turret || visiting.has(index)) return null;
  const localPosition = vec3(doc.value(turret, 'offset'));
  const localRotation = finiteNumber(doc.value(turret, 'rotation')) + (rotationDeltas?.get(index) ?? 0);
  const parentIndex = integerIndex(doc.value(turret, 'parent_turret_index'));
  if (parentIndex === null || parentIndex === index || !turrets[parentIndex]) return { position: localPosition, rotation: localRotation };

  const next = new Set(visiting); next.add(index);
  const parent = turretWorldPose(doc, turrets, parentIndex, next, rotationDeltas);
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
export function characterSlotPose(doc: SourceDocument, slot: SourceNode, turrets: SourceNode[], rotationDeltas?: ReadonlyMap<number, number>): CharacterSlotPose {
  const idle = idleState(doc, slot);
  const localPosition = vec3((idle ? doc.value(idle, 'position') : undefined) ?? doc.value(slot, 'seat_position') ?? doc.value(slot, 'position'));
  const localRotation = finiteNumber(idle ? doc.value(idle, 'rotation') ?? doc.value(slot, 'rotation') : doc.value(slot, 'rotation'));
  const attachmentIndex = integerIndex(doc.value(slot, 'attached_on_turret'));
  if (attachmentIndex === null) return { position: localPosition, rotation: localRotation, attachmentIndex: null, attachmentRotation: 0 };

  const turret = turretWorldPose(doc, turrets, attachmentIndex, new Set<number>(), rotationDeltas);
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
 * Locate the angle used to draw/edit a crew member's way out of the vehicle.
 * Old vehicle files keep it on character_slot.exit_rotation.  The alternate
 * state form stores the facing direction while entering, so its outward
 * direction is the opposite angle.
 */
export function characterEntranceRotation(doc: SourceDocument, slot: SourceNode, turrets: SourceNode[]): CharacterEntranceRotation | null {
  const pose = characterSlotPose(doc, slot, turrets);
  const entering = slot.children.find((node) => node.name === 'state' && doc.value(node, 'class') === 'entering' && doc.value(node, 'rotation') !== undefined);
  if (entering) {
    const local = finiteNumber(doc.value(entering, 'rotation'));
    return {
      node: entering,
      attr: 'rotation',
      basisRotation: pose.attachmentRotation,
      worldRotation: pose.attachmentRotation + local + Math.PI,
      toXmlRotation: (worldRotation) => normalizeRadians(worldRotation - pose.attachmentRotation - Math.PI),
    };
  }
  if (doc.value(slot, 'exit_rotation') === undefined) return null;
  const local = finiteNumber(doc.value(slot, 'exit_rotation'));
  return {
    node: slot,
    attr: 'exit_rotation',
    basisRotation: pose.attachmentRotation,
    worldRotation: pose.attachmentRotation + local,
    toXmlRotation: (worldRotation) => normalizeRadians(worldRotation - pose.attachmentRotation),
  };
}

/**
 * Explicit entry destinations take priority over inferred directions. Both the
 * legacy enter_position and state/entering.position are vehicle-space values.
 */
export function characterEntranceEdit(doc: SourceDocument, slot: SourceNode, turrets: SourceNode[]): CharacterEntranceEdit | null {
  const explicit = doc.value(slot, 'enter_position');
  if (explicit !== undefined) return { kind: 'position', node: slot, attr: 'enter_position', value: vec3(explicit) };
  const entering = characterStatePlacement(doc, slot, 'entering', turrets);
  if (entering) return { kind: 'position', node: entering.node, attr: 'position', value: entering.value };
  const rotation = characterEntranceRotation(doc, slot, turrets);
  return rotation ? { kind: 'rotation', rotation } : null;
}

/** Resolve an explicit state position plus its facing direction. State positions are vehicle-space. */
export function characterStatePlacement(doc: SourceDocument, slot: SourceNode, stateClass: string, turrets: SourceNode[]): CharacterStatePlacement | null {
  const state = slot.children.find((node) => node.name === 'state' && doc.value(node, 'class') === stateClass);
  if (!state || doc.value(state, 'position') === undefined) return null;
  const pose = characterSlotPose(doc, slot, turrets);
  return {
    node: state,
    value: vec3(doc.value(state, 'position')),
    worldRotation: pose.attachmentRotation + finiteNumber(doc.value(state, 'rotation')),
  };
}

/**
 * Accumulated world rotation (radians, around Y) of the coordinate system in
 * which a node's editable position is expressed. The transform gizmo applies
 * the inverse of this to convert a world-space drag delta back into the local
 * XML delta before writing it.
 */
export function editableBasisRotation(doc: SourceDocument, node: SourceNode, attr?: string): number {
  const turrets = doc.root?.children.filter((n) => n.name === 'turret') ?? [];
  if (node.name === 'character_slot') return characterSlotPose(doc, node, turrets).attachmentRotation;
  if (node.name === 'visual' && doc.value(node, 'class') === 'turret') {
    const index = Number.parseInt(doc.value(node, 'turret_index') ?? '0', 10);
    return turretWorldPose(doc, turrets, index)?.rotation ?? 0;
  }
  if (node.name === 'turret') {
    if (attr === 'weapon_offset') {
      const index = turrets.indexOf(node);
      return index < 0 ? 0 : turretWorldPose(doc, turrets, index)?.rotation ?? 0;
    }
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
export function dragNeedsRebuild(node: SourceNode, attr?: string): boolean {
  return node.name === 'turret' && attr !== 'weapon_offset';
}

export interface TurretPivotUpdate {
  node: SourceNode;
  attr: string;
  value: Vec3;
}

/**
 * Move a turret's logical rotation pivot while preserving the current zero-angle
 * placement of its appearance, weapon and directly attached children.  The
 * turret offset is expressed in its parent's coordinates; all compensated
 * offsets are expressed in the turret's own rotated coordinates.
 */
export function turretPivotUpdates(doc: SourceDocument, turret: SourceNode, nextOffset: Vec3): TurretPivotUpdate[] {
  const root = doc.root;
  if (!root || turret.name !== 'turret') return [];
  const turrets = root.children.filter((node) => node.name === 'turret');
  const turretIndex = turrets.indexOf(turret);
  if (turretIndex < 0) return [];

  const previous = vec3(doc.value(turret, 'offset'));
  const delta: Vec3 = [nextOffset[0] - previous[0], nextOffset[1] - previous[1], nextOffset[2] - previous[2]];
  const localRotation = finiteNumber(doc.value(turret, 'rotation'));
  const correction = rotateY(delta, -localRotation);
  const compensate = (value: string | undefined): Vec3 => {
    const current = vec3(value);
    return [current[0] - correction[0], current[1] - correction[1], current[2] - correction[2]];
  };
  const updates: TurretPivotUpdate[] = [{ node: turret, attr: 'offset', value: nextOffset }];

  if (doc.value(turret, 'weapon_key') !== undefined || doc.value(turret, 'weapon_offset') !== undefined)
    updates.push({ node: turret, attr: 'weapon_offset', value: compensate(doc.value(turret, 'weapon_offset')) });

  for (const visual of root.children.filter((node) => node.name === 'visual' && doc.value(node, 'class') === 'turret')) {
    if (integerIndex(doc.value(visual, 'turret_index') ?? '0') !== turretIndex) continue;
    updates.push({ node: visual, attr: 'offset', value: compensate(doc.value(visual, 'offset')) });
  }

  for (const child of turrets) {
    if (integerIndex(doc.value(child, 'parent_turret_index')) !== turretIndex) continue;
    updates.push({ node: child, attr: 'offset', value: compensate(doc.value(child, 'offset')) });
  }

  for (const slot of root.children.filter((node) => node.name === 'character_slot')) {
    if (integerIndex(doc.value(slot, 'attached_on_turret')) !== turretIndex) continue;
    const idle = idleState(doc, slot);
    if (idle && doc.value(idle, 'position') !== undefined) updates.push({ node: idle, attr: 'position', value: compensate(doc.value(idle, 'position')) });
    else if (doc.value(slot, 'seat_position') !== undefined) updates.push({ node: slot, attr: 'seat_position', value: compensate(doc.value(slot, 'seat_position')) });
    else if (doc.value(slot, 'position') !== undefined) updates.push({ node: slot, attr: 'position', value: compensate(doc.value(slot, 'position')) });
    else updates.push({ node: slot, attr: 'seat_position', value: compensate(undefined) });
  }
  return updates;
}

/** Resolve the XML position edited by the viewport gizmo for a scene node. */
export function editablePosition(doc: SourceDocument, node: SourceNode): EditablePosition | null {
  const idle = node.name === 'character_slot' ? idleState(doc, node) : undefined;
  if (idle && doc.value(idle, 'position') !== undefined) return { node: idle, attr: 'position', value: vec3(doc.value(idle, 'position')) };
  // A scene "turret" entry represents its mounted .weapon. The turret offset
  // remains editable in the inspector, but viewport dragging moves the weapon.
  if (node.name === 'turret') {
    return doc.value(node, 'weapon_offset') === undefined ? null : { node, attr: 'weapon_offset', value: vec3(doc.value(node, 'weapon_offset')) };
  }
  const attrs = node.name === 'physics'
    ? ['collision_model_pos', 'visual_offset', 'offset']
    : node.name === 'character_slot'
      ? ['seat_position', 'position', 'enter_position']
      : ['offset'];
  for (const attr of attrs) if (doc.value(node, attr) !== undefined) return { node, attr, value: vec3(doc.value(node, attr)) };
  return null;
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

export function normalizeRadians(value: number): number {
  const tau = Math.PI * 2;
  let result = (value + Math.PI) % tau;
  if (result < 0) result += tau;
  return result - Math.PI;
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
