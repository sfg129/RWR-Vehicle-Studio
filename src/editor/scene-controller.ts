import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { desktop } from '../platform/desktop-api';
import { parseOgreMesh, type OgreMesh } from '../core/ogre/mesh-reader';
import type { SourceDocument, SourceNode } from '../core/xml/source-document';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import { characterSlotHidden, characterSlotPose, editableBasisRotation, idleState, localDragValue, rotateY, tireVisualPosition, turretWorldPose, visualMatchesDamageState, WEAPON_LOGICAL_TO_MODEL_YAW } from '../core/vehicle/vehicle-model';
import { vec3, type Vec3 } from '../core/math';
import { SoldierAssets, SOLDIER_GAME_SCALE, rwrLinearToDisplay, type SoldierAnimation } from '../core/soldier/soldier-assets';
import { parseStaticVoxelModel, type StaticVoxel } from '../core/voxel/voxel-model';

export interface ViewOptions { showBroken: boolean; showOccupants: boolean; showBounds: boolean; showShields: boolean; animate: boolean }
interface Occupant { mesh: THREE.InstancedMesh; animation?: SoldierAnimation; assets: SoldierAssets; pose: Float32Array; dynamic: boolean }
interface DragInfo { node: SourceNode; attr: string; value: Vec3; start: THREE.Vector3; basisRotation: number }

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
  private meshCache = new Map<string, Promise<OgreMesh>>(); private textureCache = new Map<string, Promise<THREE.Texture>>(); private voxelCache = new Map<string, Promise<StaticVoxel[]>>();
  private geometryCache = new Map<string, THREE.BufferGeometry>(); private sharedAssets = new Set<THREE.BufferGeometry | THREE.Material>();
  private nodeObjects = new Map<number, THREE.Object3D>(); private occupants: Occupant[] = []; private startTime = performance.now();
  private sceneGeneration = 0;
  private pickTargets: THREE.Object3D[] = []; private raycaster = new THREE.Raycaster(); private pointer = new THREE.Vector2(); private frame = 0;
  private lastAnimationUpdate = -Infinity; private readonly animationIntervalMs = 50;
  private fpsFrames = 0; private fpsStarted = performance.now();

  constructor(private host: HTMLElement, private onSelect: (id: number) => void, private onMove: (node: SourceNode, attr: string, value: Vec3, needsRebuild: boolean) => void,
    private onStats: (fps: number, dynamicOccupants: number) => void) {
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
    this.transform.addEventListener('mouseDown', () => { if (this.drag) this.drag.start.copy(this.proxy.position); });
    this.transform.addEventListener('mouseUp', () => {
      if (!this.drag) return;
      const worldDelta = this.proxy.position.clone().sub(this.drag.start);
      const value = localDragValue([worldDelta.x, worldDelta.y, worldDelta.z], this.drag.basisRotation, this.drag.value);
      // RV-025: when the dragged node has a direct scene object, move it in place and skip the full rebuild.
      const object = this.nodeObjects.get(this.drag.node.id);
      if (object) {
        object.position.add(worldDelta);
        this.drag.value = value;
        this.onMove(this.drag.node, this.drag.attr, value, false);
      } else {
        this.onMove(this.drag.node, this.drag.attr, value, true);
      }
    });
    this.sharedAssets.add(VOXEL_CUBE_GEOMETRY).add(OCCUPANT_MATERIAL);
    this.renderer.domElement.addEventListener('pointerdown', (e) => this.pick(e));
    const observer = new ResizeObserver(() => this.resize()); observer.observe(host);
    this.addEnvironment(); this.resetCamera(); this.loop();
  }

  async setDocument(doc: SourceDocument, catalog: ResourceCatalog, soldier: SoldierAssets | undefined, options: ViewOptions): Promise<void> {
    const generation = ++this.sceneGeneration;
    this.doc = doc; this.catalog = catalog; this.soldier = soldier; this.options = options; this.transform.detach(); this.drag = undefined; this.startTime = performance.now(); this.lastAnimationUpdate = -Infinity;
    this.clearRoot(); const root = doc.root; if (!root) return;
    const physics = root.children.find((n) => n.name === 'physics'); const globalOffset = vec3(physics ? doc.value(physics, 'visual_offset') : undefined);
    const turrets = root.children.filter((n) => n.name === 'turret');
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
          const pose = turretWorldPose(doc, turrets, Number.parseInt(a.turret_index ?? '0', 10));
          if (pose) {
            const rotatedOwn = rotateY(own, pose.rotation);
            origin = [globalOffset[0] + pose.position[0] + rotatedOwn[0], globalOffset[1] + pose.position[1] + rotatedOwn[1], globalOffset[2] + pose.position[2] + rotatedOwn[2]];
            object.rotation.y = pose.rotation;
          }
        }
        if (generation !== this.sceneGeneration) return;
        object.position.set(...origin); object.userData.nodeId = visual.id; object.traverse((o) => o.userData.nodeId = visual.id); this.root.add(object); this.pickTargets.push(object); this.nodeObjects.set(visual.id, object);
      } catch (error) { if (generation === this.sceneGeneration) console.warn(`模型加载失败：${a.mesh_filename}`, error); }
    });
    await mapLimit(turrets.map((turret, index) => ({ turret, index })), ASSET_CONCURRENCY, ({ turret, index }) => this.addWeapon(turret, index, globalOffset, generation));
    if (options.showBounds && physics) this.addBounds(physics);
    if (options.showOccupants && soldier) for (const slot of root.children.filter((n) => n.name === 'character_slot')) this.addOccupant(slot, turrets);
  }

  /** Refresh only the working document reference after a transform-only edit; the scene objects are updated in place (RV-025). */
  updateDocument(doc: SourceDocument): void { this.doc = doc; }

  select(node?: SourceNode): void {
    this.transform.detach(); this.drag = undefined; if (this.selectedHelper) { this.root.remove(this.selectedHelper); this.selectedHelper.dispose(); this.selectedHelper = undefined; }
    if (!node || !this.doc) return;
    const object = this.nodeObjects.get(node.id); if (object) { this.selectedHelper = new THREE.BoxHelper(object, 0xf0b84b); this.root.add(this.selectedHelper); }
    const target = editablePosition(this.doc, node); if (!target) return;
    const world = object?.position.clone() ?? new THREE.Vector3(...target.value);
    this.proxy.position.copy(world); this.scene.add(this.proxy); this.transform.attach(this.proxy);
    const basisRotation = editableBasisRotation(this.doc, node);
    this.drag = { node: target.node, attr: target.attr, value: target.value, start: world.clone(), basisRotation };
  }
  resetCamera(): void { this.camera.position.set(14, 10, 17); this.controls.target.set(0, 1.5, 0); this.controls.update(); }
  topView(): void { this.camera.position.set(0, 28, 0.01); this.controls.target.set(0, 0, 0); this.controls.update(); }
  sideView(): void { this.camera.position.set(28, 4, 0); this.controls.target.set(0, 1.5, 0); this.controls.update(); }

  private async addWeapon(turret: SourceNode, index: number, global: Vec3, generation: number): Promise<void> {
    if (!this.doc || !this.catalog) return; const a = this.doc.attrs(turret); const weaponResult = await this.catalog.weapon(a.weapon_key); if (generation !== this.sceneGeneration || !weaponResult.ok) return; const weapon = weaponResult.value;
    try {
      const pose = turretWorldPose(this.doc, this.doc.root?.children.filter((n) => n.name === 'turret') ?? [], index);
      if (!pose) return;
      const group = new THREE.Group(); const weaponOffset = vec3(a.weapon_offset);
      group.position.set(global[0] + pose.position[0], global[1] + pose.position[1], global[2] + pose.position[2]); group.rotation.y = pose.rotation;
      if (weapon.mesh) {
        const path = this.catalog.resolve(weapon.mesh, 'model');
        if (path) { const mesh = await this.loadMesh(path); if (generation !== this.sceneGeneration) return; const object = await this.buildMeshWithTextures(path, mesh, weapon.texture ? [weapon.texture] : [], generation); if (generation !== this.sceneGeneration) return; object.position.set(...weaponOffset); group.add(object); }
      }
      if (weapon.voxelModel) {
        const path = this.catalog.resolve(weapon.voxelModel, 'model');
        if (path) { const voxels = await this.loadVoxels(path); if (generation !== this.sceneGeneration) return; const object = this.buildVoxelModel(voxels); object.position.set(...weaponOffset); object.rotation.y = WEAPON_LOGICAL_TO_MODEL_YAW; group.add(object); }
      }
      if (this.options?.showShields) {
        const shieldFrame = new THREE.Group(); shieldFrame.position.set(...weaponOffset); shieldFrame.rotation.y = WEAPON_LOGICAL_TO_MODEL_YAW;
        for (const shield of weapon.shields) {
          if (!shield.extent.some((value) => Math.abs(value) > 0)) continue;
          const geometry = new THREE.BoxGeometry(Math.abs(shield.extent[0]), Math.abs(shield.extent[1]), Math.abs(shield.extent[2]));
          const line = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xd96cff, transparent: true, opacity: 0.95 }));
          line.position.set(...shield.offset); shieldFrame.add(line);
        }
        if (shieldFrame.children.length) group.add(shieldFrame);
      }
      if (!group.children.length) return;
      group.userData.nodeId = turret.id; group.traverse((object) => object.userData.nodeId = turret.id); this.root.add(group); this.pickTargets.push(group); this.nodeObjects.set(turret.id, group);
    } catch (error) { console.warn(`武器模型加载失败：${weapon.mesh ?? weapon.voxelModel ?? a.weapon_key}`, error); }
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
    this.occupants.push({ mesh, animation, assets: this.soldier, pose: poseBuffer, dynamic: !this.soldier.isStatic(animation) });
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
      let map: THREE.Texture | undefined; if (texturePath) try { map = await this.loadTexture(texturePath); if (generation !== this.sceneGeneration) return group; } catch { /* fallback material */ }
      const material = new THREE.MeshStandardMaterial({ map, color: map ? 0xffffff : colorFromName(sub.materialName), roughness: 0.78, metalness: 0.08, side: THREE.DoubleSide });
      const part = new THREE.Mesh(geometry, material); part.castShadow = false; part.receiveShadow = false; part.name = sub.name; group.add(part);
    }
    return group;
  }
  private loadMesh(path: string): Promise<OgreMesh> { let value = this.meshCache.get(path); if (!value) { value = desktop.readBinary(path).then(parseOgreMesh); this.meshCache.set(path, value); } return value; }
  private loadVoxels(path: string): Promise<StaticVoxel[]> { let value = this.voxelCache.get(path); if (!value) { value = desktop.readText(path).then(parseStaticVoxelModel); this.voxelCache.set(path, value); } return value; }
  private loadTexture(path: string): Promise<THREE.Texture> {
    let value = this.textureCache.get(path); if (!value) value = desktop.readBinary(path).then((buffer) => new Promise<THREE.Texture>((resolve, reject) => {
      const ext = path.split('.').at(-1)?.toLowerCase(); if (!['png', 'jpg', 'jpeg', 'bmp'].includes(ext ?? '')) { reject(new Error(`暂不支持浏览器纹理格式 ${ext}`)); return; }
      const url = URL.createObjectURL(new Blob([buffer])); new THREE.TextureLoader().load(url, (texture) => { URL.revokeObjectURL(url); texture.colorSpace = THREE.SRGBColorSpace; texture.flipY = false; resolve(texture); }, undefined, (e) => { URL.revokeObjectURL(url); reject(e); });
    })); this.textureCache.set(path, value); return value;
  }
  private addEnvironment(): void {
    this.scene.add(new THREE.HemisphereLight(0xbacaff, 0x282016, 1.45)); const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(18, 28, 20); key.castShadow = false; this.scene.add(key);
    const rim = new THREE.DirectionalLight(0x769dff, 0.7); rim.position.set(-20, 12, -18); this.scene.add(rim); const grid = new THREE.GridHelper(80, 80, 0x69727c, 0x252c33); grid.position.y = -0.02; this.scene.add(grid);
    const axes = new THREE.AxesHelper(3); this.scene.add(axes);
  }
  private clearRoot(): void {
    this.occupants = []; this.pickTargets = []; this.nodeObjects.clear();
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
  private pick(e: PointerEvent): void { if (this.transform.dragging) return; const r = this.renderer.domElement.getBoundingClientRect(); this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1); this.raycaster.setFromCamera(this.pointer, this.camera); const hit = this.raycaster.intersectObjects(this.pickTargets, true).find((x) => findNodeId(x.object) !== undefined); const id = hit ? findNodeId(hit.object) : undefined; if (id !== undefined) this.onSelect(id); }
  private loop = (): void => {
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

function editablePosition(doc: SourceDocument, node: SourceNode): { node: SourceNode; attr: string; value: Vec3 } | null {
  const idle = node.name === 'character_slot' ? idleState(doc, node) : undefined; if (idle && doc.value(idle, 'position') !== undefined) return { node: idle, attr: 'position', value: vec3(doc.value(idle, 'position')) };
  const attrs = node.name === 'physics' ? ['collision_model_pos', 'visual_offset', 'offset'] : node.name === 'character_slot' ? ['seat_position', 'position', 'enter_position'] : ['offset'];
  for (const attr of attrs) if (doc.value(node, attr) !== undefined) return { node, attr, value: vec3(doc.value(node, attr)) }; return null;
}
function findNodeId(object: THREE.Object3D): number | undefined { let o: THREE.Object3D | null = object; while (o) { if (typeof o.userData.nodeId === 'number') return o.userData.nodeId; o = o.parent; } return undefined; }
function colorFromName(name: string): THREE.Color { let h = 0; for (const c of name) h = (h * 31 + c.charCodeAt(0)) >>> 0; return new THREE.Color().setHSL((h % 360) / 360, 0.2, 0.42); }
