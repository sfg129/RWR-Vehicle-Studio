import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { desktop } from '../platform/desktop-api';
import { parseOgreMesh, type OgreMesh } from '../core/ogre/mesh-reader';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import type { SourceDocument, SourceNode } from '../core/xml/source-document';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import { characterEntranceEdit, characterSlotHidden, characterSlotPose, characterStatePlacement, dragNeedsRebuild, editableBasisRotation, editablePosition, idleState, localDragValue, rotateY, SHIELD_LOGICAL_TO_MODEL_YAW, tireVisualPosition, turretWorldPose, visualMatchesDamageState, WEAPON_LOGICAL_TO_MODEL_YAW } from '../core/vehicle/vehicle-model';
import { vec3, type Vec3 } from '../core/math';
import { SoldierAssets, SOLDIER_GAME_SCALE, rwrLinearToDisplay, type SoldierAnimation } from '../core/soldier/soldier-assets';
import { parseStaticVoxelModel, type StaticVoxel } from '../core/voxel/voxel-model';
import { comparePickRank, synchronizeOffsetBindings, updateOffsetBindings, type PickRank } from './scene-interaction';

export type CrewGuideKind = 'entrance' | 'leaving';
export interface ViewOptions { showBroken: boolean; showOccupants: boolean; showOccupantPositions: boolean; showVisualBounds: boolean; showBounds: boolean; showShields: boolean; showEntrances: boolean; animate: boolean }
interface Occupant { mesh: THREE.InstancedMesh; slot: SourceNode; animation?: SoldierAnimation; assets: SoldierAssets; pose: Float32Array; dynamic: boolean }
interface PositionDrag { kind: 'position'; node: SourceNode; attr: string; value: Vec3; start: THREE.Vector3; basisRotation: number }
interface PivotDrag { kind: 'pivot'; node: SourceNode; value: Vec3; start: THREE.Vector3; basisRotation: number; marker: THREE.Object3D }
type EntranceEdit = { kind: 'position'; node: SourceNode; attr: 'enter_position' | 'position'; value: Vec3 } | { kind: 'rotation'; node: SourceNode; attr: 'rotation' | 'exit_rotation'; toXmlRotation: (worldRotation: number) => number };
interface EntranceDrag { kind: 'entrance'; edit: EntranceEdit; anchor: THREE.Vector3; handle: THREE.Mesh; guideGeometry: THREE.BufferGeometry }
type DragInfo = PositionDrag | PivotDrag | EntranceDrag;
interface EntranceGuide { handle: THREE.Mesh; guideGeometry: THREE.BufferGeometry; edit: EntranceEdit; anchor: THREE.Vector3 }
interface TurretObjectBinding { object: THREE.Object3D; turretIndex: number; nodeId: number; attr: 'offset' | 'weapon_offset'; localOffset: Vec3 }
interface SlotObjectBinding { object: THREE.Object3D; slotId: number; yOffset: number }
interface PickCandidate extends PickRank { id: number; guide?: CrewGuideKind; hit: THREE.Intersection<THREE.Object3D> }

const ASSET_CONCURRENCY = 6;
/** Run an async task over items with a bounded number of in-flight workers (RV-027). */
async function mapLimit<T>(items: T[], limit: number, fn: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  const workers = Array.from({ length: Math.min(Math.max(1, limit), items.length) }, async () => {
    while (next < items.length) { const item = items[next++]; await fn(item); }
  });
  await Promise.all(workers);
}

export class SceneController {
  private scene = new THREE.Scene(); private camera = new THREE.PerspectiveCamera(45, 1, 0.05, 1000);
  private renderer: THREE.WebGLRenderer; private controls: OrbitControls; private transform: TransformControls;
  private root = new THREE.Group(); private selectedHelper?: THREE.BoxHelper; private proxy = new THREE.Object3D(); private drag?: DragInfo;
  private doc?: SourceDocument; private catalog?: ResourceCatalog; private soldier?: SoldierAssets; private options?: ViewOptions;
  private meshCache = new Map<string, Promise<OgreMesh>>(); private textureCache = new Map<string, Promise<THREE.Texture>>(); private voxelCache = new Map<string, Promise<StaticVoxel[]>>(); private resolvedTextures = new Set<THREE.Texture>(); private resolvedTexturePaths = new Map<THREE.Texture, string>();
  private geometryCache = new Map<string, THREE.BufferGeometry>(); private sharedAssets = new Set<THREE.BufferGeometry | THREE.Material>();
  private nodeObjects = new Map<number, THREE.Object3D>(); private entranceGuides = new Map<string, EntranceGuide>(); private visualObjects: THREE.Object3D[] = []; private turretObjects: TurretObjectBinding[] = []; private slotObjects: SlotObjectBinding[] = []; private occupants: Occupant[] = []; private startTime = performance.now();
  private turrets: SourceNode[] = []; private globalOffset: Vec3 = [0, 0, 0]; private previewTurretIndex?: number; private previewRotation = 0; private pivotMarker?: THREE.Object3D;
  private sceneGeneration = 0;
  private pickTargets: THREE.Object3D[] = []; private raycaster = new THREE.Raycaster(); private pointer = new THREE.Vector2(); private frame = 0;
  private lastAnimationUpdate = -Infinity; private readonly animationIntervalMs = 50;
  private pointerDownPos = new THREE.Vector2(); private readonly pickThreshold = 5;
  private transformPointerGesture = false;
  private resizeObserver?: ResizeObserver; private disposed = false;
  private fpsFrames = 0; private fpsStarted = performance.now();

  constructor(private host: HTMLElement, private onSelect: (id: number, guide?: CrewGuideKind) => void, private onMove: (node: SourceNode, attr: string, value: Vec3, needsRebuild: boolean) => void,
    private onPivotMove: (node: SourceNode, value: Vec3) => void,
    private onRotate: (node: SourceNode, attr: 'rotation' | 'exit_rotation', value: number) => void,
    private onStats: (fps: number, dynamicOccupants: number) => void, private onDiagnostic: (message: string) => void = () => {}) {
    this.scene.background = new THREE.Color(0x0d1115); this.scene.fog = new THREE.Fog(0x0d1115, 80, 250);
    this.camera.position.set(16, 11, 18);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace; this.renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
    this.renderer.shadowMap.enabled = false;
    this.host.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement); this.controls.enableDamping = true; this.controls.target.set(0, 1.6, 0); this.controls.screenSpacePanning = true;
    this.transform = new TransformControls(this.camera, this.renderer.domElement); this.transform.setMode('translate'); this.transform.setSize(0.75);
    this.scene.add(this.transform.getHelper()); this.scene.add(this.root);
    this.transform.addEventListener('dragging-changed', (e: any) => { this.controls.enabled = !e.value; });
    this.transform.addEventListener('mouseDown', () => {
      // TransformControls clears `dragging` before the same pointerup reaches the canvas.
      // Remember the whole gesture so releasing a gizmo cannot also select the object below it.
      this.transformPointerGesture = true;
      if (this.drag?.kind === 'position' || this.drag?.kind === 'pivot') this.drag.start.copy(this.proxy.position);
    });
    this.transform.addEventListener('objectChange', () => {
      if (this.drag?.kind === 'pivot') { this.drag.marker.position.copy(this.proxy.position); return; }
      if (this.drag?.kind !== 'entrance') return;
      const y = this.drag.handle.position.y; this.proxy.position.y = y; this.drag.handle.position.set(this.proxy.position.x, y, this.proxy.position.z);
      const positions = this.drag.guideGeometry.getAttribute('position') as THREE.BufferAttribute;
      positions.setXYZ(1, this.proxy.position.x, this.drag.anchor.y, this.proxy.position.z);
      positions.setXYZ(2, this.proxy.position.x, this.drag.anchor.y, this.proxy.position.z);
      positions.setXYZ(3, this.proxy.position.x, y, this.proxy.position.z); positions.needsUpdate = true;
    });
    this.transform.addEventListener('mouseUp', () => {
      if (!this.drag) return;
      if (this.drag.kind === 'entrance') {
        const delta = this.proxy.position.clone().sub(this.drag.anchor); delta.y = 0;
        if (this.drag.edit.kind === 'position') {
          const original = this.drag.edit.value;
          this.onMove(this.drag.edit.node, this.drag.edit.attr, [this.proxy.position.x, original[1], this.proxy.position.z], true);
        } else if (delta.lengthSq() > 0.0025) {
          this.onRotate(this.drag.edit.node, this.drag.edit.attr, this.drag.edit.toXmlRotation(Math.atan2(delta.x, delta.z)));
        }
        return;
      }
      const worldDelta = this.proxy.position.clone().sub(this.drag.start);
      const value = localDragValue([worldDelta.x, worldDelta.y, worldDelta.z], this.drag.basisRotation, this.drag.value);
      if (this.drag.kind === 'pivot') {
        this.drag.value = value;
        this.onPivotMove(this.drag.node, value);
        return;
      }
      // RV-025: when the dragged node has a direct scene object, move it in place and skip the full rebuild.
      // R3-002: turret offsets are coordinate parents for dependent objects, so a full rebuild is required.
      if (dragNeedsRebuild(this.drag.node, this.drag.attr)) {
        this.drag.value = value;
        this.onMove(this.drag.node, this.drag.attr, value, true);
        return;
      }
      const object = this.nodeObjects.get(this.drag.node.id);
      if (object) {
        object.position.add(worldDelta);
        this.drag.value = value;
        updateOffsetBindings(this.turretObjects, this.drag.node.id, this.drag.attr, value);
        this.onMove(this.drag.node, this.drag.attr, value, false);
      } else {
        this.onMove(this.drag.node, this.drag.attr, value, true);
      }
    });
    this.sharedAssets.add(VOXEL_CUBE_GEOMETRY).add(OCCUPANT_MATERIAL);
    this.renderer.domElement.addEventListener('pointerdown', (e) => {
      // Clear a gesture left behind by a pointer released outside the canvas. Capture phase
      // runs before TransformControls marks a new gizmo gesture on this same pointerdown.
      this.transformPointerGesture = false;
      this.pointerDownPos.set(e.clientX, e.clientY);
    }, true);
    this.renderer.domElement.addEventListener('pointerup', (e) => {
      if (this.transformPointerGesture) { this.transformPointerGesture = false; return; }
      if (this.transform.dragging) return;
      if (Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y) > this.pickThreshold) return;
      this.pick(e);
    });
    this.renderer.domElement.addEventListener('pointercancel', () => { this.transformPointerGesture = false; });
    this.resizeObserver = new ResizeObserver(() => this.resize()); this.resizeObserver.observe(host);
    this.addEnvironment(); this.resetCamera(); this.loop();
  }

  async setDocument(doc: SourceDocument, catalog: ResourceCatalog, soldier: SoldierAssets | undefined, options: ViewOptions): Promise<void> {
    const generation = ++this.sceneGeneration;
    this.doc = doc; this.catalog = catalog; this.soldier = soldier; this.options = options; this.transform.detach(); this.drag = undefined; this.transformPointerGesture = false; this.startTime = performance.now(); this.lastAnimationUpdate = -Infinity;
    this.clearRoot(); const root = doc.root; if (!root) return;
    const physics = root.children.find((n) => n.name === 'physics'); const globalOffset = vec3(physics ? doc.value(physics, 'visual_offset') : undefined);
    const turrets = root.children.filter((n) => n.name === 'turret'); this.globalOffset = globalOffset; this.turrets = turrets;
    const visuals = root.children.filter((n) => n.name === 'visual')
      .filter((visual) => visualMatchesDamageState(doc, visual, options.showBroken))
      .flatMap((visual) => {
        const path = catalog.resolve(doc.attrs(visual).mesh_filename, 'model');
        return path ? [{ visual, a: doc.attrs(visual), path }] : [];
      });
    await mapLimit(visuals, ASSET_CONCURRENCY, async ({ visual, a, path }) => {
      if (generation !== this.sceneGeneration) return;
      try {
        const mesh = await this.loadMesh(path); if (generation !== this.sceneGeneration) return;
        const object = await this.buildMesh(path, mesh, visual, generation); if (generation !== this.sceneGeneration) return; const own = vec3(a.offset);
        let origin: Vec3 = [globalOffset[0] + own[0], globalOffset[1] + own[1], globalOffset[2] + own[2]];
        if (a.class === 'tire') {
          const tire = tireVisualPosition(doc, visual);
          if (tire) origin = [globalOffset[0] + own[0] + tire[0], globalOffset[1] + own[1] + tire[1], globalOffset[2] + own[2] + tire[2]];
        }
        if (a.class === 'turret') {
          const turretIndex = Number.parseInt(a.turret_index ?? '0', 10);
          const pose = turretWorldPose(doc, turrets, turretIndex);
          if (pose) {
            const rotatedOwn = rotateY(own, pose.rotation);
            origin = [globalOffset[0] + pose.position[0] + rotatedOwn[0], globalOffset[1] + pose.position[1] + rotatedOwn[1], globalOffset[2] + pose.position[2] + rotatedOwn[2]];
            object.rotation.y = pose.rotation;
          }
          if (Number.isInteger(turretIndex) && turretIndex >= 0) this.turretObjects.push({ object, turretIndex, nodeId: visual.id, attr: 'offset', localOffset: own });
        }
        if (generation !== this.sceneGeneration) return;
        object.position.set(...origin); object.userData.nodeId = visual.id; object.traverse((o) => o.userData.nodeId = visual.id); this.root.add(object); if (options.showVisualBounds) this.pickTargets.push(object); this.nodeObjects.set(visual.id, object); this.visualObjects.push(object);
      } catch (error) { if (generation === this.sceneGeneration) { console.warn(`模型加载失败：${a.mesh_filename}`, error); this.onDiagnostic(`模型加载失败：${a.mesh_filename}`); } }
    });
    await mapLimit(turrets.map((turret, index) => ({ turret, index })), ASSET_CONCURRENCY, ({ turret, index }) => this.addWeapon(turret, index, globalOffset, generation));
    if (options.showBounds && physics) this.addBounds(physics);
    if (options.showOccupants && soldier) for (const slot of root.children.filter((n) => n.name === 'character_slot')) this.addOccupant(slot, turrets);
    if (options.showOccupantPositions) for (const slot of root.children.filter((n) => n.name === 'character_slot')) this.addOccupantPositionMarker(slot, turrets);
    if (options.showEntrances) {
      const vehicleBounds = this.visibleVehicleBounds();
      for (const slot of root.children.filter((n) => n.name === 'character_slot')) {
        this.addEntranceGuide(slot, turrets, vehicleBounds);
        this.addLeavingGuide(slot, turrets);
      }
    }
    if (generation === this.sceneGeneration) this.enforceAssetLimits();
  }

  /** Refresh transform caches from the newly composed working document without rebuilding GPU objects. */
  updateDocument(doc: SourceDocument): void {
    this.doc = doc;
    this.turrets = doc.root?.children.filter((node) => node.name === 'turret') ?? [];
    synchronizeOffsetBindings(doc, this.turretObjects);
    this.applyTurretPreview();
  }

  /** Rotate the selected turret and its descendants for preview only. */
  setTurretPreviewDegrees(value: number): void {
    this.previewRotation = Number.isFinite(value) ? THREE.MathUtils.degToRad(value) : 0;
    this.applyTurretPreview();
  }

  /** Enable/disable gizmo editing (e.g. while a save is in flight, R4-001). */
  setEditingEnabled(enabled: boolean): void {
    this.transform.enabled = enabled;
    if (!enabled) { this.transform.detach(); this.drag = undefined; }
  }

  /** Drop promise and GPU geometry caches after a forced resource reindex (R3-014/015/016). */
  invalidateAssetCaches(): void {
    this.meshCache.clear();
    this.textureCache.clear();
    this.voxelCache.clear();
    for (const texture of this.resolvedTextures) texture.dispose();
    this.resolvedTextures.clear();
    this.resolvedTexturePaths.clear();
    for (const geometry of this.geometryCache.values()) {
      this.sharedAssets.delete(geometry);
      geometry.dispose();
    }
    this.geometryCache.clear();
  }

  select(node?: SourceNode, guideKind?: CrewGuideKind, turretPivot = false): void {
    this.transform.detach(); this.drag = undefined; if (this.selectedHelper) { this.root.remove(this.selectedHelper); this.selectedHelper.dispose(); this.selectedHelper = undefined; }
    if (this.pivotMarker) { this.root.remove(this.pivotMarker); this.pivotMarker = undefined; }
    this.previewTurretIndex = undefined; this.previewRotation = 0; this.applyTurretPreview();
    if (!node || !this.doc) return;
    if (turretPivot && node.name === 'turret') {
      const index = this.turrets.indexOf(node); const pose = turretWorldPose(this.doc, this.turrets, index);
      if (index < 0 || !pose) return;
      this.previewTurretIndex = index;
      const world = new THREE.Vector3(this.globalOffset[0] + pose.position[0], this.globalOffset[1] + pose.position[1], this.globalOffset[2] + pose.position[2]);
      const marker = turretPivotMarker(); marker.position.copy(world); this.root.add(marker); this.pivotMarker = marker;
      this.proxy.position.copy(world); this.scene.add(this.proxy); this.transform.showX = true; this.transform.showY = true; this.transform.showZ = true; this.transform.attach(this.proxy);
      this.drag = { kind: 'pivot', node, value: vec3(this.doc.value(node, 'offset')), start: world.clone(), basisRotation: editableBasisRotation(this.doc, node, 'offset'), marker };
      return;
    }
    if (guideKind) {
      const guide = this.entranceGuides.get(crewGuideKey(node.id, guideKind)); if (!guide) return;
      this.selectedHelper = new THREE.BoxHelper(guide.handle, 0xffd36a); this.root.add(this.selectedHelper);
      this.proxy.position.copy(guide.handle.position); this.scene.add(this.proxy); this.transform.showX = true; this.transform.showY = false; this.transform.showZ = true; this.transform.attach(this.proxy);
      this.drag = { kind: 'entrance', edit: guide.edit, anchor: guide.anchor.clone(), handle: guide.handle, guideGeometry: guide.guideGeometry };
      return;
    }
    this.transform.showX = true; this.transform.showY = true; this.transform.showZ = true;
    const appearanceInteractionDisabled = (node.name === 'visual' || node.name === 'turret') && this.options?.showVisualBounds === false;
    const object = this.nodeObjects.get(node.id); if (object && !appearanceInteractionDisabled) { this.selectedHelper = new THREE.BoxHelper(object, 0xf0b84b); this.root.add(this.selectedHelper); }
    if (appearanceInteractionDisabled) return;
    const target = editablePosition(this.doc, node); if (!target) return;
    const world = object?.position.clone() ?? new THREE.Vector3(...target.value);
    this.proxy.position.copy(world); this.scene.add(this.proxy); this.transform.attach(this.proxy);
    const basisRotation = editableBasisRotation(this.doc, node, target.attr);
    this.drag = { kind: 'position', node: target.node, attr: target.attr, value: target.value, start: world.clone(), basisRotation };
  }
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.controls.dispose();
    this.transform.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
  resetCamera(): void { this.camera.position.set(14, 10, 17); this.controls.target.set(0, 1.5, 0); this.controls.update(); }
  topView(): void { this.camera.position.set(0, 28, 0.01); this.controls.target.set(0, 0, 0); this.controls.update(); }
  sideView(): void { this.camera.position.set(28, 4, 0); this.controls.target.set(0, 1.5, 0); this.controls.update(); }

  private applyTurretPreview(): void {
    if (!this.doc) return;
    const rotations = this.previewTurretIndex === undefined || this.previewRotation === 0
      ? undefined
      : new Map<number, number>([[this.previewTurretIndex, this.previewRotation]]);
    for (const binding of this.turretObjects) {
      const pose = turretWorldPose(this.doc, this.turrets, binding.turretIndex, new Set<number>(), rotations); if (!pose) continue;
      const local = rotateY(binding.localOffset, pose.rotation);
      binding.object.position.set(this.globalOffset[0] + pose.position[0] + local[0], this.globalOffset[1] + pose.position[1] + local[1], this.globalOffset[2] + pose.position[2] + local[2]);
      binding.object.rotation.y = pose.rotation;
    }
    for (const binding of this.slotObjects) {
      const slot = this.doc.nodes[binding.slotId]; if (!slot || slot.id !== binding.slotId) continue;
      const pose = characterSlotPose(this.doc, slot, this.turrets, rotations);
      binding.object.position.set(pose.position[0], pose.position[1] + binding.yOffset, pose.position[2]); binding.object.rotation.y = pose.rotation;
    }
  }

  /** Keep app-lifetime caches bounded; never evict geometries/textures used by the current scene (R3-016 / R4-009c). */
  private enforceAssetLimits(): void {
    const geometryLimit = 256;
    const textureLimit = 128;
    const assetLimit = 128;
    const usedGeometries = new Set<THREE.BufferGeometry>();
    const usedTextures = new Set<THREE.Texture>();
    this.root.traverse((object: any) => {
      if (object.geometry) usedGeometries.add(object.geometry);
      const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      for (const material of materials) if (material?.map) usedTextures.add(material.map);
    });
    for (const [key, geometry] of this.geometryCache) {
      if (this.geometryCache.size <= geometryLimit) break;
      if (usedGeometries.has(geometry)) continue;
      this.geometryCache.delete(key);
      this.sharedAssets.delete(geometry);
      geometry.dispose();
    }
    for (const [texture, path] of this.resolvedTexturePaths) {
      if (this.resolvedTexturePaths.size <= textureLimit) break;
      if (usedTextures.has(texture)) continue;
      this.resolvedTexturePaths.delete(texture);
      this.resolvedTextures.delete(texture);
      this.textureCache.delete(path);
      texture.dispose();
    }
    if (this.meshCache.size > assetLimit) {
      let extra = this.meshCache.size - assetLimit;
      for (const key of this.meshCache.keys()) { if (extra <= 0) break; this.meshCache.delete(key); extra--; }
    }
    if (this.voxelCache.size > assetLimit) {
      let extra = this.voxelCache.size - assetLimit;
      for (const key of this.voxelCache.keys()) { if (extra <= 0) break; this.voxelCache.delete(key); extra--; }
    }
  }

  private async addWeapon(turret: SourceNode, index: number, global: Vec3, generation: number): Promise<void> {
    if (!this.doc || !this.catalog) return; const a = this.doc.attrs(turret); const weaponResult = await this.catalog.weapon(a.weapon_key); if (generation !== this.sceneGeneration || !weaponResult.ok) return; const weapon = weaponResult.value;
    try {
      const pose = turretWorldPose(this.doc, this.doc.root?.children.filter((n) => n.name === 'turret') ?? [], index);
      if (!pose) return;
      const group = new THREE.Group(); const weaponOffset = vec3(a.weapon_offset); const rotatedWeaponOffset = rotateY(weaponOffset, pose.rotation);
      group.position.set(global[0] + pose.position[0] + rotatedWeaponOffset[0], global[1] + pose.position[1] + rotatedWeaponOffset[1], global[2] + pose.position[2] + rotatedWeaponOffset[2]); group.rotation.y = pose.rotation;
      if (weapon.mesh) {
        const path = this.catalog.resolve(weapon.mesh, 'model');
        if (path) { const mesh = await this.loadMesh(path); if (generation !== this.sceneGeneration) return; const object = await this.buildMeshWithTextures(path, mesh, weapon.texture ? [weapon.texture] : [], generation); if (generation !== this.sceneGeneration) return; group.add(object); }
      }
      if (weapon.voxelModel) {
        const path = this.catalog.resolve(weapon.voxelModel, 'model');
        if (path) { const voxels = await this.loadVoxels(path); if (generation !== this.sceneGeneration) return; const object = this.buildVoxelModel(voxels); object.rotation.y = WEAPON_LOGICAL_TO_MODEL_YAW; group.add(object); }
      }
      if (this.options?.showShields) {
        const shieldFrame = new THREE.Group(); shieldFrame.rotation.y = SHIELD_LOGICAL_TO_MODEL_YAW;
        for (const shield of weapon.shields) {
          if (!shield.extent.some((value) => Math.abs(value) > 0)) continue;
          const geometry = new THREE.BoxGeometry(Math.abs(shield.extent[0]), Math.abs(shield.extent[1]), Math.abs(shield.extent[2]));
          const line = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xd96cff, transparent: true, opacity: 0.95 }));
          line.position.set(...shield.offset); shieldFrame.add(line);
        }
        if (shieldFrame.children.length) group.add(shieldFrame);
      }
      if (!group.children.length) return;
      group.userData.nodeId = turret.id; group.traverse((object) => object.userData.nodeId = turret.id); this.root.add(group); if (this.options?.showVisualBounds) this.pickTargets.push(group); this.nodeObjects.set(turret.id, group); this.turretObjects.push({ object: group, turretIndex: index, nodeId: turret.id, attr: 'weapon_offset', localOffset: weaponOffset });
    } catch (error) { console.warn(`武器模型加载失败：${weapon.mesh ?? weapon.voxelModel ?? a.weapon_key}`, error); this.onDiagnostic(`武器模型加载失败：${weapon.mesh ?? weapon.voxelModel ?? a.weapon_key}`); }
  }

  private buildVoxelModel(voxels: StaticVoxel[]): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(VOXEL_CUBE_GEOMETRY, OCCUPANT_MATERIAL, voxels.length); const matrix = new THREE.Matrix4();
    voxels.forEach((voxel, index) => { matrix.makeTranslation(voxel.x, voxel.y, voxel.z); mesh.setMatrixAt(index, matrix); mesh.setColorAt(index, new THREE.Color(rwrLinearToDisplay(voxel.r), rwrLinearToDisplay(voxel.g), rwrLinearToDisplay(voxel.b))); });
    mesh.instanceMatrix.needsUpdate = true; if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true; mesh.scale.setScalar(SOLDIER_GAME_SCALE); return mesh;
  }

  private addBounds(physics: SourceNode): void {
    if (!this.doc) return; const a = this.doc.attrs(physics); const add = (extentName: string, posName: string, color: number) => {
      const e = vec3(a[extentName]), p = vec3(a[posName]); if (!e.some((n) => n > 0)) return;
      const geo = new THREE.BoxGeometry(Math.abs(e[0]), Math.max(0.05, Math.abs(e[1])), Math.abs(e[2])); const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85 })); line.position.set(...p); line.userData.nodeId = physics.id; this.root.add(line);
    };
    add('collision_model_extent', 'collision_model_pos', 0xff5d5d); add('extent', 'offset', 0x50c8ff);
  }

  private addOccupant(slot: SourceNode, turrets: SourceNode[]): void {
    if (!this.doc || !this.soldier || !this.options || characterSlotHidden(this.doc, slot)) return; const idle = idleState(this.doc, slot); const a = this.doc.attrs(slot); const ia = idle ? this.doc.attrs(idle) : {};
    const slotPose = characterSlotPose(this.doc, slot, turrets); const position = new THREE.Vector3(...slotPose.position); const rotation = slotPose.rotation;
    const geometry = VOXEL_CUBE_GEOMETRY; const material = OCCUPANT_MATERIAL;
    const mesh = new THREE.InstancedMesh(geometry, material, this.soldier.voxels.length); mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.position.copy(position); mesh.rotation.y = rotation; mesh.scale.setScalar(SOLDIER_GAME_SCALE);
    this.soldier.voxels.forEach((v, i) => mesh.setColorAt(i, new THREE.Color(rwrLinearToDisplay(v.r), rwrLinearToDisplay(v.g), rwrLinearToDisplay(v.b))));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    const animation = this.soldier.animation(ia.animation_id ?? a.animation_id, ia.animation_key ?? a.animation_key); const poseBuffer = this.soldier.createPoseBuffer();
    const matrices = mesh.instanceMatrix.array as Float32Array; this.soldier.initializeInstanceMatrices(matrices); this.soldier.sampleInto(animation, 0, poseBuffer); this.soldier.writePoseMatrices(poseBuffer, matrices); mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.nodeId = slot.id; this.root.add(mesh); this.nodeObjects.set(slot.id, mesh);
    this.occupants.push({ mesh, slot, animation, assets: this.soldier, pose: poseBuffer, dynamic: !this.soldier.isStatic(animation) }); this.slotObjects.push({ object: mesh, slotId: slot.id, yOffset: 0 });
  }

  private addOccupantPositionMarker(slot: SourceNode, turrets: SourceNode[]): void {
    if (!this.doc) return;
    const pose = characterSlotPose(this.doc, slot, turrets);
    const marker = occupantBox(0xf1c84b, 0.08); marker.position.set(pose.position[0], pose.position[1] + OCCUPANT_BOX_HEIGHT / 2, pose.position[2]);
    marker.rotation.y = pose.rotation; marker.add(facingArrow(0xf1c84b));
    marker.userData.nodeId = slot.id; marker.traverse((object) => object.userData.nodeId = slot.id);
    this.root.add(marker); this.pickTargets.push(marker); this.slotObjects.push({ object: marker, slotId: slot.id, yOffset: OCCUPANT_BOX_HEIGHT / 2 });
  }

  private visibleVehicleBounds(): THREE.Box3 {
    const bounds = new THREE.Box3();
    for (const object of this.visualObjects) bounds.union(new THREE.Box3().setFromObject(object));
    return bounds;
  }

  private addEntranceGuide(slot: SourceNode, turrets: SourceNode[], vehicleBounds: THREE.Box3): void {
    if (!this.doc) return;
    const pose = characterSlotPose(this.doc, slot, turrets); const anchor = new THREE.Vector3(...pose.position);
    const entrance = characterEntranceEdit(this.doc, slot, turrets); if (!entrance) return;
    let endX: number, endZ: number, boxBottom: number, edit: EntranceEdit;
    if (entrance.kind === 'position') {
      // Both enter_position and state/entering.position are vehicle-space destinations.
      const target = entrance.value; [endX, boxBottom, endZ] = target;
      edit = { kind: 'position', node: entrance.node, attr: entrance.attr, value: target };
    } else {
      const editable = entrance.rotation;
      const direction = new THREE.Vector3(Math.sin(editable.worldRotation), 0, Math.cos(editable.worldRotation));
      let distance = 1.1;
      if (!vehicleBounds.isEmpty()) {
        const diagonal = Math.hypot(vehicleBounds.max.x - vehicleBounds.min.x, vehicleBounds.max.z - vehicleBounds.min.z);
        const maxDistance = Math.max(3, diagonal + 2);
        distance = 0.35;
        while (distance < maxDistance) {
          const x = anchor.x + direction.x * distance, z = anchor.z + direction.z * distance;
          const overlapsXz = x + OCCUPANT_BOX_HALF_WIDTH >= vehicleBounds.min.x && x - OCCUPANT_BOX_HALF_WIDTH <= vehicleBounds.max.x
            && z + OCCUPANT_BOX_HALF_WIDTH >= vehicleBounds.min.z && z - OCCUPANT_BOX_HALF_WIDTH <= vehicleBounds.max.z;
          if (!overlapsXz) break;
          distance += 0.12;
        }
      }
      endX = anchor.x + direction.x * distance; endZ = anchor.z + direction.z * distance;
      boxBottom = vehicleBounds.isEmpty() ? 0 : vehicleBounds.min.y;
      edit = { kind: 'rotation', node: editable.node, attr: editable.attr, toXmlRotation: editable.toXmlRotation };
    }
    const boxCenter = new THREE.Vector3(endX, boxBottom + OCCUPANT_BOX_HEIGHT / 2, endZ);
    const horizontalEnd = new THREE.Vector3(endX, anchor.y, endZ);
    const guideGeometry = new THREE.BufferGeometry().setFromPoints([anchor, horizontalEnd, horizontalEnd, new THREE.Vector3(endX, boxCenter.y, endZ)]);
    const guideLine = new THREE.LineSegments(guideGeometry, new THREE.LineBasicMaterial({ color: 0x66e0c2, transparent: true, opacity: 0.9 }));
    const handle = occupantBox(0x66e0c2, 0.12);
    handle.position.copy(boxCenter); handle.userData.nodeId = slot.id; handle.userData.crewGuideKind = 'entrance'; handle.traverse((object) => object.userData.nodeId = slot.id);
    this.root.add(guideLine, handle); this.pickTargets.push(handle);
    this.entranceGuides.set(crewGuideKey(slot.id, 'entrance'), { handle, guideGeometry, edit, anchor });
  }

  /** Multi-state slots provide a separate vehicle-space leaving point and facing direction. */
  private addLeavingGuide(slot: SourceNode, turrets: SourceNode[]): void {
    if (!this.doc) return;
    const leaving = characterStatePlacement(this.doc, slot, 'leaving', turrets); if (!leaving) return;
    const pose = characterSlotPose(this.doc, slot, turrets); const anchor = new THREE.Vector3(...pose.position);
    const [endX, boxBottom, endZ] = leaving.value;
    const boxCenter = new THREE.Vector3(endX, boxBottom + OCCUPANT_BOX_HEIGHT / 2, endZ);
    const horizontalEnd = new THREE.Vector3(endX, anchor.y, endZ);
    const guideGeometry = new THREE.BufferGeometry().setFromPoints([anchor, horizontalEnd, horizontalEnd, new THREE.Vector3(endX, boxCenter.y, endZ)]);
    const guideLine = new THREE.LineSegments(guideGeometry, new THREE.LineBasicMaterial({ color: 0xff72b6, transparent: true, opacity: 0.9 }));
    const handle = occupantBox(0xff72b6, 0.12); handle.position.copy(boxCenter); handle.rotation.y = leaving.worldRotation; handle.add(facingArrow(0xff72b6));
    handle.userData.nodeId = slot.id; handle.userData.crewGuideKind = 'leaving'; handle.traverse((object) => object.userData.nodeId = slot.id);
    const edit: EntranceEdit = { kind: 'position', node: leaving.node, attr: 'position', value: leaving.value };
    this.root.add(guideLine, handle); this.pickTargets.push(handle);
    this.entranceGuides.set(crewGuideKey(slot.id, 'leaving'), { handle, guideGeometry, edit, anchor });
  }

  private async buildMesh(meshPath: string, mesh: OgreMesh, visual: SourceNode, generation: number): Promise<THREE.Group> {
    if (!this.doc) return new THREE.Group(); const a = this.doc.attrs(visual);
    const parts = visual.children.filter((n) => n.name === 'part').map((n) => this.doc!.value(n, 'texture_filename') ?? '');
    return this.buildMeshWithTextures(meshPath, mesh, parts.length ? parts : [a.texture_filename ?? ''], generation);
  }
  private async buildMeshWithTextures(meshPath: string, mesh: OgreMesh, textures: string[], generation: number): Promise<THREE.Group> {
    const group = new THREE.Group(); if (!this.catalog) return group;
    for (let i = 0; i < mesh.submeshes.length; i++) {
      const sub = mesh.submeshes[i], data = sub.useSharedVertices ? mesh.sharedGeometry : sub.geometry; if (!data || sub.operationType !== 4) continue;
      const cacheKey = `${meshPath}:${i}`;
      let geometry = this.geometryCache.get(cacheKey);
      if (!geometry) {
        geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
        if (data.normals.length === data.positions.length) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3)); else geometry.computeVertexNormals();
        if (data.uvs.length >= data.vertexCount * 2) geometry.setAttribute('uv', new THREE.Float32BufferAttribute(data.uvs, 2)); geometry.setIndex(sub.indices); geometry.computeBoundingSphere();
        this.geometryCache.set(cacheKey, geometry); this.sharedAssets.add(geometry);
      }
      const textureName = textures[Math.min(i, textures.length - 1)] || textures[0]; const texturePath = this.catalog.resolve(textureName, 'texture');
      let map: THREE.Texture | undefined; if (texturePath) try { map = await this.loadTexture(texturePath); if (generation !== this.sceneGeneration) return group; } catch (error) { if (generation === this.sceneGeneration) this.onDiagnostic(`纹理加载失败：${texturePath}`); }
      const material = new THREE.MeshStandardMaterial({ map, color: map ? 0xffffff : colorFromName(sub.materialName), roughness: 0.78, metalness: 0.08, side: THREE.DoubleSide });
      const part = new THREE.Mesh(geometry, material); part.castShadow = false; part.receiveShadow = false; part.name = sub.name; group.add(part);
    }
    return group;
  }
  private loadCached<T>(cache: Map<string, Promise<T>>, path: string, load: () => Promise<T>): Promise<T> {
    const cached = cache.get(path); if (cached) return cached;
    const pending = load().catch((error) => { cache.delete(path); throw error; });
    cache.set(path, pending); return pending;
  }
  private loadMesh(path: string): Promise<OgreMesh> { return this.loadCached(this.meshCache, path, () => desktop.readBinary(path).then(parseOgreMesh)); }
  private loadVoxels(path: string): Promise<StaticVoxel[]> { return this.loadCached(this.voxelCache, path, () => desktop.readText(path).then(parseStaticVoxelModel)); }
  private loadTexture(path: string): Promise<THREE.Texture> {
    const ext = path.split('.').at(-1)?.toLowerCase();
    if (ext === 'dds') return this.loadCached(this.textureCache, path, () => desktop.readBinary(path).then((buffer) => new Promise<THREE.Texture>((resolve, reject) => {
      const url = URL.createObjectURL(new Blob([buffer]));
      new DDSLoader().load(url, (texture) => {
        URL.revokeObjectURL(url); texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true;
        this.resolvedTextures.add(texture); this.resolvedTexturePaths.set(texture, path); resolve(texture);
      }, undefined, (e) => { URL.revokeObjectURL(url); reject(e); });
    })));
    if (ext === 'tga') return this.loadCached(this.textureCache, path, () => desktop.readBinary(path).then((buffer) => new Promise<THREE.Texture>((resolve, reject) => {
      const url = URL.createObjectURL(new Blob([buffer]));
      new TGALoader().load(url, (texture) => {
        URL.revokeObjectURL(url); texture.colorSpace = THREE.SRGBColorSpace; texture.flipY = false; texture.needsUpdate = true;
        this.resolvedTextures.add(texture); this.resolvedTexturePaths.set(texture, path); resolve(texture);
      }, undefined, (e) => { URL.revokeObjectURL(url); reject(e); });
    })));
    if (!['png', 'jpg', 'jpeg', 'bmp'].includes(ext ?? '')) return Promise.reject(new Error(`暂不支持浏览器纹理格式 ${ext ?? '未知'}`));
    return this.loadCached(this.textureCache, path, () => desktop.readBinary(path).then((buffer) => new Promise<THREE.Texture>((resolve, reject) => {
      const url = URL.createObjectURL(new Blob([buffer]));
      new THREE.TextureLoader().load(url,
        (texture) => { URL.revokeObjectURL(url); texture.colorSpace = THREE.SRGBColorSpace; texture.flipY = false; this.resolvedTextures.add(texture); this.resolvedTexturePaths.set(texture, path); resolve(texture); },
        undefined,
        (e) => { URL.revokeObjectURL(url); reject(e); });
    })));
  }
  private addEnvironment(): void {
    this.scene.add(new THREE.HemisphereLight(0xbacaff, 0x282016, 1.45)); const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(18, 28, 20); key.castShadow = false; this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x769dff, 0.7); rim.position.set(-20, 12, -18); this.scene.add(rim); const grid = new THREE.GridHelper(80, 80, 0x69727c, 0x252c33); grid.position.y = -0.02; this.scene.add(grid);
    const axes = new THREE.AxesHelper(3); this.scene.add(axes);
  }
  private clearRoot(): void {
    this.occupants = []; this.pickTargets = []; this.nodeObjects.clear(); this.entranceGuides.clear(); this.visualObjects = []; this.turretObjects = []; this.slotObjects = []; this.pivotMarker = undefined; this.previewTurretIndex = undefined; this.previewRotation = 0;
    while (this.root.children.length) {
      const child = this.root.children.pop()!;
      child.traverse((o: any) => {
        if (o.geometry && !this.sharedAssets.has(o.geometry)) o.geometry.dispose?.();
        if (Array.isArray(o.material)) o.material.forEach((m: any) => { if (!this.sharedAssets.has(m)) m.dispose?.(); });
        else if (o.material && !this.sharedAssets.has(o.material)) o.material.dispose?.();
      });
    }
  }
  private resize(): void { const w = this.host.clientWidth, h = this.host.clientHeight; if (!w || !h) return; this.camera.aspect = w / h; this.camera.updateProjectionMatrix(); this.renderer.setSize(w, h, false); }
  private pick(e: PointerEvent): void {
    if (this.transform.dragging || !this.doc) return;
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const candidates = new Map<string, PickCandidate>();
    for (const hit of this.raycaster.intersectObjects(this.pickTargets, true)) {
      const id = findNodeId(hit.object); if (id === undefined) continue;
      const guide = findCrewGuideKind(hit.object); const key = `${id}:${guide ?? ''}`;
      if (candidates.has(key)) continue;
      const node = this.doc.nodes[id]; if (!node || node.id !== id) continue;
      const object = this.nodeObjects.get(id) ?? hit.object;
      const size = new THREE.Box3().setFromObject(object).getSize(new THREE.Vector3());
      const volume = Math.max(0.000001, Math.abs(size.x * size.y * size.z));
      const priority = guide ? 400
        : node.name === 'turret' ? 300
          : node.name === 'character_slot' ? 250
            : node.name === 'visual' && this.doc.value(node, 'class') === 'turret' ? 200
              : node.name === 'visual' ? 100 : 150;
      candidates.set(key, { id, guide, hit, priority, volume, distance: hit.distance });
    }
    const all = [...candidates.values()]; if (!all.length) return;
    // Do not select an editable target hidden deep behind the vehicle; only arbitrate nearby overlaps.
    const nearestDistance = Math.min(...all.map((candidate) => candidate.distance));
    const selected = all.filter((candidate) => candidate.distance <= nearestDistance + 0.75).sort(comparePickRank)[0];
    if (selected) this.onSelect(selected.id, selected.guide);
  }
  private loop = (): void => {
    if (this.disposed) return;
    this.frame = requestAnimationFrame(this.loop); this.controls.update(); const now = performance.now();
    if (this.options?.animate && now - this.lastAnimationUpdate >= this.animationIntervalMs) { this.updateOccupants((now - this.startTime) / 1000); this.lastAnimationUpdate = now; }
    this.selectedHelper?.update(); this.renderer.render(this.scene, this.camera); this.fpsFrames++;
    if (now - this.fpsStarted >= 750) { this.onStats(Math.round(this.fpsFrames * 1000 / (now - this.fpsStarted)), this.occupants.filter((o) => o.dynamic).length); this.fpsFrames = 0; this.fpsStarted = now; }
  };
  private updateOccupants(time: number): void {
    for (const occupant of this.occupants) {
      if (!occupant.dynamic) continue;
      occupant.assets.sampleInto(occupant.animation, time, occupant.pose);
      occupant.assets.writePoseMatrices(occupant.pose, occupant.mesh.instanceMatrix.array as Float32Array);
      occupant.mesh.instanceMatrix.needsUpdate = true;
    }
  }
}

const OCCUPANT_BOX_HALF_WIDTH = 0.42;
const OCCUPANT_BOX_HEIGHT = 1.75;
function turretPivotMarker(): THREE.Group {
  const group = new THREE.Group();
  const material = new THREE.MeshBasicMaterial({ color: 0xffc247, depthTest: false, transparent: true, opacity: 0.95 });
  const center = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 8), material); center.renderOrder = 10; group.add(center);
  const ringMaterial = new THREE.LineBasicMaterial({ color: 0xffc247, depthTest: false, transparent: true, opacity: 0.9 });
  for (const rotation of [[Math.PI / 2, 0, 0], [0, 0, 0]] as const) {
    const points = Array.from({ length: 49 }, (_, index) => {
      const angle = index / 48 * Math.PI * 2; return new THREE.Vector3(Math.cos(angle) * 0.34, 0, Math.sin(angle) * 0.34);
    });
    const ring = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), ringMaterial); ring.rotation.set(rotation[0], rotation[1], rotation[2]); ring.renderOrder = 10; group.add(ring);
  }
  return group;
}
function occupantBox(color: number, opacity: number): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(OCCUPANT_BOX_HALF_WIDTH * 2, OCCUPANT_BOX_HEIGHT, OCCUPANT_BOX_HALF_WIDTH * 2);
  const box = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
  box.add(new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })));
  return box;
}

function facingArrow(color: number): THREE.ArrowHelper {
  return new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 0.95, color, 0.22, 0.14);
}

const VOXEL_CUBE_GEOMETRY = new THREE.BoxGeometry(0.96, 0.96, 0.96);
const OCCUPANT_MATERIAL = createOccupantMaterial();
function createOccupantMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: { occupantOpacity: { value: 1 } },
    vertexShader: `
      varying vec3 vOccupantColor;
      void main() {
        #ifdef USE_INSTANCING_COLOR
          vOccupantColor = instanceColor;
        #else
          vOccupantColor = vec3(1.0);
        #endif
        vec4 modelPosition = vec4(position, 1.0);
        #ifdef USE_INSTANCING
          modelPosition = instanceMatrix * modelPosition;
        #endif
        gl_Position = projectionMatrix * modelViewMatrix * modelPosition;
      }
    `,
    fragmentShader: `
      uniform float occupantOpacity;
      varying vec3 vOccupantColor;
      void main() { gl_FragColor = vec4(vOccupantColor, occupantOpacity); }
    `,
    transparent: false,
    depthWrite: true,
    toneMapped: false,
  });
}

function findNodeId(object: THREE.Object3D): number | undefined { let o: THREE.Object3D | null = object; while (o) { if (typeof o.userData.nodeId === 'number') return o.userData.nodeId; o = o.parent; } return undefined; }
function crewGuideKey(slotId: number, kind: CrewGuideKind): string { return `${slotId}:${kind}`; }
function findCrewGuideKind(object: THREE.Object3D): CrewGuideKind | undefined { let o: THREE.Object3D | null = object; while (o) { if (o.userData.crewGuideKind === 'entrance' || o.userData.crewGuideKind === 'leaving') return o.userData.crewGuideKind; o = o.parent; } return undefined; }
function colorFromName(name: string): THREE.Color { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0; return new THREE.Color().setHSL((h % 360) / 360, 0.2, 0.42); }
