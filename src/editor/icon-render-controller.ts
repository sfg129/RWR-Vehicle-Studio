import * as THREE from 'three';
import { desktop } from '../platform/desktop-api';
import { parseOgreMesh, type OgreMesh } from '../core/ogre/mesh-reader';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import type { SourceDocument, SourceNode } from '../core/xml/source-document';
import { vec3, type Vec3 } from '../core/math';
import { parseStaticVoxelModel, type StaticVoxel } from '../core/voxel/voxel-model';
import { SOLDIER_GAME_SCALE } from '../core/soldier/soldier-assets';
import { rotateY, tireVisualPosition, turretWorldPose, visualMatchesDamageState, WEAPON_LOGICAL_TO_MODEL_YAW } from '../core/vehicle/vehicle-model';
import { normalizeIconRenderSettings, type IconPartOffsets, type IconRenderSettings } from '../core/icon-render/icon-render-presets';

export interface IconRenderPart {
  key: string;
  kind: 'visual' | 'weapon';
  nodeId: number;
  label: string;
  resourceName: string;
}

interface VisualBinding {
  kind: 'visual';
  key: string;
  node: SourceNode;
  object: THREE.Object3D;
  localOffset: Vec3;
  tireOffset?: Vec3;
  turretIndex?: number;
}

interface WeaponBinding {
  kind: 'weapon';
  key: string;
  node: SourceNode;
  object: THREE.Object3D;
  localOffset: Vec3;
  turretIndex: number;
}

type PartBinding = VisualBinding | WeaponBinding;

export interface IconPixelBounds { x: number; y: number; width: number; height: number }
export interface IconOutputRect { x: number; y: number; width: number; height: number }

const ASSET_CONCURRENCY = 6;

export function iconRenderParts(document: SourceDocument): IconRenderPart[] {
  const root = document.root;
  if (!root) return [];
  const visuals = root.children.filter((node) => node.name === 'visual' && visualMatchesDamageState(document, node, false));
  const turrets = root.children.filter((node) => node.name === 'turret');
  return [
    ...visuals.map((node, index) => {
      const attrs = document.attrs(node);
      return {
        key: `visual:${node.id}`,
        kind: 'visual' as const,
        nodeId: node.id,
        label: `外观 ${index} · ${attrs.class ?? 'visual'}`,
        resourceName: attrs.mesh_filename ?? '未指定模型',
      };
    }),
    ...turrets.map((node, index) => ({
      key: `weapon:${node.id}`,
      kind: 'weapon' as const,
      nodeId: node.id,
      label: `武器 ${index}`,
      resourceName: document.value(node, 'weapon_key') ?? '未指定武器',
    })),
  ];
}

export class IconRenderController {
  private modelScene = new THREE.Scene();
  private outputScene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.01, 2000);
  private exportCamera = new THREE.PerspectiveCamera(35, 1, 0.01, 2000);
  private outputCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private renderer: THREE.WebGLRenderer;
  private target: THREE.WebGLRenderTarget;
  private root = new THREE.Group();
  private ambientLight = new THREE.AmbientLight(0xffffff, 0.04);
  private keyLight = new THREE.DirectionalLight(0xffffff, 1);
  private material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  private postMaterial: THREE.ShaderMaterial;
  private outputQuad: THREE.Mesh;
  private resizeObserver?: ResizeObserver;
  private frame = 0;
  private disposed = false;
  private sceneGeneration = 0;
  private document?: SourceDocument;
  private catalog?: ResourceCatalog;
  private settings: IconRenderSettings;
  private offsets: IconPartOffsets = {};
  private bindings: PartBinding[] = [];
  private meshCache = new Map<string, Promise<OgreMesh>>();
  private voxelCache = new Map<string, Promise<StaticVoxel[]>>();
  private geometryCache = new Map<string, THREE.BufferGeometry>();
  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();
  private pointerDown = new THREE.Vector2();

  constructor(
    private host: HTMLElement,
    settings: IconRenderSettings,
    private onSelect: (key: string) => void,
    private onDiagnostic: (message: string) => void = () => {},
  ) {
    this.settings = normalizeIconRenderSettings(settings);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.shadowMap.enabled = false;
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.host.appendChild(this.renderer.domElement);

    this.target = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true, stencilBuffer: false, samples: 4 });
    this.target.texture.colorSpace = THREE.SRGBColorSpace;
    this.postMaterial = createPostMaterial(this.target.texture, this.settings);
    this.outputQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.postMaterial);
    this.outputScene.add(this.outputQuad);
    this.modelScene.add(this.root, this.ambientLight, this.keyLight, this.keyLight.target);

    this.renderer.domElement.addEventListener('pointerdown', this.pointerDownHandler);
    this.renderer.domElement.addEventListener('pointerup', this.pointerUpHandler);
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(host);
    this.resize();
    this.updateSettings(this.settings);
  }

  async setDocument(document: SourceDocument, catalog: ResourceCatalog, offsets: IconPartOffsets = {}): Promise<void> {
    const generation = ++this.sceneGeneration;
    this.document = document;
    this.catalog = catalog;
    this.offsets = cloneOffsets(offsets);
    this.bindings = [];
    this.clearRoot();
    const root = document.root;
    if (!root) { this.invalidate(); return; }
    const physics = root.children.find((node) => node.name === 'physics');
    const globalOffset = vec3(physics ? document.value(physics, 'visual_offset') : undefined);
    const turrets = root.children.filter((node) => node.name === 'turret');
    const visuals = root.children.filter((node) => node.name === 'visual' && visualMatchesDamageState(document, node, false));

    await mapLimit(visuals, ASSET_CONCURRENCY, async (visual) => {
      const attrs = document.attrs(visual);
      const path = catalog.resolve(attrs.mesh_filename, 'model');
      if (!path) { this.onDiagnostic(`图标渲染缺少模型：${attrs.mesh_filename ?? '未指定'}`); return; }
      try {
        const mesh = await this.loadMesh(path);
        if (generation !== this.sceneGeneration) return;
        const object = this.buildMesh(path, mesh);
        const key = `visual:${visual.id}`;
        object.userData.iconPartKey = key;
        object.traverse((child) => { child.userData.iconPartKey = key; });
        const turretIndex = attrs.class === 'turret' ? parseIndex(attrs.turret_index ?? '0') : undefined;
        const tireOffset = attrs.class === 'tire' ? tireVisualPosition(document, visual) ?? undefined : undefined;
        this.bindings.push({ kind: 'visual', key, node: visual, object, localOffset: vec3(attrs.offset), turretIndex, tireOffset });
        this.root.add(object);
      } catch (error) {
        if (generation === this.sceneGeneration) this.onDiagnostic(`图标模型加载失败：${attrs.mesh_filename ?? path}（${describe(error)}）`);
      }
    });

    await mapLimit(turrets.map((node, index) => ({ node, index })), ASSET_CONCURRENCY, async ({ node, index }) => {
      const attrs = document.attrs(node);
      const weaponResult = await catalog.weapon(attrs.weapon_key);
      if (generation !== this.sceneGeneration) return;
      if (!weaponResult.ok) { if (attrs.weapon_key) this.onDiagnostic(`图标武器加载失败：${attrs.weapon_key}（${weaponResult.message}）`); return; }
      const weapon = weaponResult.value;
      const group = new THREE.Group();
      try {
        if (weapon.mesh) {
          const path = catalog.resolve(weapon.mesh, 'model');
          if (path) {
            const mesh = await this.loadMesh(path);
            if (generation !== this.sceneGeneration) return;
            group.add(this.buildMesh(path, mesh));
          }
          else this.onDiagnostic(`图标渲染缺少武器模型：${weapon.mesh}`);
        }
        if (weapon.voxelModel) {
          const path = catalog.resolve(weapon.voxelModel, 'model');
          if (path) {
            const voxels = await this.loadVoxels(path);
            if (generation !== this.sceneGeneration) return;
            const voxel = this.buildVoxelModel(voxels); voxel.rotation.y = WEAPON_LOGICAL_TO_MODEL_YAW; group.add(voxel);
          }
          else this.onDiagnostic(`图标渲染缺少武器体素模型：${weapon.voxelModel}`);
        }
        if (generation !== this.sceneGeneration || !group.children.length) return;
        const key = `weapon:${node.id}`;
        group.userData.iconPartKey = key;
        group.traverse((child) => { child.userData.iconPartKey = key; });
        this.bindings.push({ kind: 'weapon', key, node, object: group, localOffset: vec3(attrs.weapon_offset), turretIndex: index });
        this.root.add(group);
      } catch (error) {
        if (generation === this.sceneGeneration) this.onDiagnostic(`图标武器模型加载失败：${weapon.mesh ?? weapon.voxelModel ?? attrs.weapon_key}（${describe(error)}）`);
      }
    });

    if (generation !== this.sceneGeneration) return;
    this.applyPartTransforms(globalOffset, turrets);
    this.fitCamera();
    this.invalidate();
  }

  updateSettings(settings: IconRenderSettings): void {
    this.settings = normalizeIconRenderSettings(settings);
    this.ambientLight.intensity = this.settings.ambient;
    this.root.rotation.y = THREE.MathUtils.degToRad(this.settings.vehicleYaw);
    const lightDirection = sphericalDirection(this.settings.lightAzimuth, this.settings.lightElevation);
    this.keyLight.position.copy(lightDirection.multiplyScalar(100));
    this.postMaterial.uniforms.threshold.value = this.settings.threshold;
    this.postMaterial.uniforms.background.value.set(this.settings.background);
    this.applyCurrentTransforms();
    this.fitCamera();
    this.invalidate();
  }

  updateOffsets(offsets: IconPartOffsets): void {
    this.offsets = cloneOffsets(offsets);
    this.applyCurrentTransforms();
    this.fitCamera();
    this.invalidate();
  }

  invalidateAssetCaches(): void {
    this.meshCache.clear();
    this.voxelCache.clear();
    for (const geometry of this.geometryCache.values()) geometry.dispose();
    this.geometryCache.clear();
  }

  async exportPng(): Promise<string> {
    const previousSize = this.renderer.getSize(new THREE.Vector2());
    const previousPixelRatio = this.renderer.getPixelRatio();
    const size = this.settings.outputSize;
    const renderSize = Math.min(2048, Math.max(1024, size * 4));
    try {
      this.renderer.setPixelRatio(1);
      this.renderer.setSize(renderSize, renderSize, false);
      this.target.setSize(renderSize, renderSize);
      this.prepareSquareExportCamera();

      // Measure the pixels actually drawn instead of trusting OGRE geometry bounds.
      // Magenta cannot occur in the binary black/white model and is used only for
      // this hidden measurement pass; the user's requested background is restored
      // before the final capture.
      const measurementBackground = '#ff00ff';
      this.renderNow(this.exportCamera, measurementBackground);
      const bounds = foregroundBoundsFromCanvas(this.renderer.domElement, measurementBackground);
      if (!bounds) throw new Error('导出画面中没有检测到载具像素');

      // The preview deliberately uses a solid background, but exported map icons
      // must preserve only the model coverage. Black model pixels remain opaque;
      // pixels outside the vehicle become transparent RGBA pixels.
      this.renderNow(this.exportCamera, this.settings.background, true);
      const output = document.createElement('canvas');
      output.width = size; output.height = size;
      const context = output.getContext('2d');
      if (!context) throw new Error('无法创建 PNG 二维输出画布');
      context.clearRect(0, 0, size, size);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      const source = expandedPixelBounds(bounds, renderSize, renderSize, 2);
      const destination = fittedIconOutputRect(source, size, this.settings.padding);
      context.drawImage(this.renderer.domElement, source.x, source.y, source.width, source.height, destination.x, destination.y, destination.width, destination.height);
      const dataUrl = output.toDataURL('image/png');
      const separator = dataUrl.indexOf(',');
      if (separator < 0) throw new Error('浏览器没有返回有效的 PNG Data URL');
      return dataUrl.slice(separator + 1);
    } finally {
      this.renderer.setPixelRatio(previousPixelRatio);
      this.renderer.setSize(previousSize.x, previousSize.y, false);
      this.resizeTarget(previousSize.x, previousSize.y, previousPixelRatio);
      this.postMaterial.uniforms.background.value.set(this.settings.background);
      this.invalidate();
    }
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    cancelAnimationFrame(this.frame);
    this.resizeObserver?.disconnect();
    this.renderer.domElement.removeEventListener('pointerdown', this.pointerDownHandler);
    this.renderer.domElement.removeEventListener('pointerup', this.pointerUpHandler);
    this.clearRoot();
    this.invalidateAssetCaches();
    this.material.dispose();
    this.target.dispose();
    this.outputQuad.geometry.dispose();
    this.postMaterial.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }

  private applyCurrentTransforms(): void {
    if (!this.document?.root) return;
    const physics = this.document.root.children.find((node) => node.name === 'physics');
    const global = vec3(physics ? this.document.value(physics, 'visual_offset') : undefined);
    const turrets = this.document.root.children.filter((node) => node.name === 'turret');
    this.applyPartTransforms(global, turrets);
  }

  private applyPartTransforms(global: Vec3, turrets: SourceNode[]): void {
    if (!this.document) return;
    const rotationDeltas = this.settings.turretYaw === 0 || !turrets.length
      ? undefined
      : new Map<number, number>([[0, THREE.MathUtils.degToRad(this.settings.turretYaw)]]);
    for (const binding of this.bindings) {
      const delta = this.offsets[binding.key] ?? [0, 0, 0];
      const local: Vec3 = [binding.localOffset[0] + delta[0], binding.localOffset[1] + delta[1], binding.localOffset[2] + delta[2]];
      if (binding.kind === 'visual') {
        if (binding.turretIndex !== undefined) {
          const pose = turretWorldPose(this.document, turrets, binding.turretIndex, new Set<number>(), rotationDeltas);
          if (!pose) continue;
          const rotated = rotateY(local, pose.rotation);
          binding.object.position.set(global[0] + pose.position[0] + rotated[0], global[1] + pose.position[1] + rotated[1], global[2] + pose.position[2] + rotated[2]);
          binding.object.rotation.y = pose.rotation;
        } else {
          const tire = binding.tireOffset ?? [0, 0, 0];
          binding.object.position.set(global[0] + local[0] + tire[0], global[1] + local[1] + tire[1], global[2] + local[2] + tire[2]);
          binding.object.rotation.y = 0;
        }
      } else {
        const pose = turretWorldPose(this.document, turrets, binding.turretIndex, new Set<number>(), rotationDeltas);
        if (!pose) continue;
        const rotated = rotateY(local, pose.rotation);
        binding.object.position.set(global[0] + pose.position[0] + rotated[0], global[1] + pose.position[1] + rotated[1], global[2] + pose.position[2] + rotated[2]);
        binding.object.rotation.y = pose.rotation;
      }
    }
    this.root.rotation.y = THREE.MathUtils.degToRad(this.settings.vehicleYaw);
    this.root.updateMatrixWorld(true);
  }

  private buildMesh(path: string, mesh: OgreMesh): THREE.Group {
    const group = new THREE.Group();
    mesh.submeshes.forEach((submesh, index) => {
      const data = submesh.useSharedVertices ? mesh.sharedGeometry : submesh.geometry;
      if (!data || submesh.operationType !== 4) return;
      const cacheKey = `${path}:${index}`;
      let geometry = this.geometryCache.get(cacheKey);
      if (!geometry) {
        geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
        if (data.normals.length === data.positions.length) geometry.setAttribute('normal', new THREE.Float32BufferAttribute(data.normals, 3));
        else geometry.computeVertexNormals();
        geometry.setIndex(submesh.indices);
        geometry.computeBoundingBox();
        geometry.computeBoundingSphere();
        this.geometryCache.set(cacheKey, geometry);
      }
      const part = new THREE.Mesh(geometry, this.material);
      part.name = submesh.name;
      group.add(part);
    });
    return group;
  }

  private buildVoxelModel(voxels: StaticVoxel[]): THREE.InstancedMesh {
    const geometry = new THREE.BoxGeometry(0.96, 0.96, 0.96);
    const mesh = new THREE.InstancedMesh(geometry, this.material, voxels.length);
    const matrix = new THREE.Matrix4();
    voxels.forEach((voxel, index) => { matrix.makeTranslation(voxel.x, voxel.y, voxel.z); mesh.setMatrixAt(index, matrix); });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.scale.setScalar(SOLDIER_GAME_SCALE);
    return mesh;
  }

  private loadMesh(path: string): Promise<OgreMesh> {
    return loadCached(this.meshCache, path, () => desktop.readBinary(path).then(parseOgreMesh));
  }

  private loadVoxels(path: string): Promise<StaticVoxel[]> {
    return loadCached(this.voxelCache, path, () => desktop.readText(path).then(parseStaticVoxelModel));
  }

  private clearRoot(): void {
    while (this.root.children.length) {
      const child = this.root.children[this.root.children.length - 1];
      this.root.remove(child);
      child.traverse((object: THREE.Object3D & { geometry?: THREE.BufferGeometry }) => {
        if (object instanceof THREE.InstancedMesh && object.geometry && !this.geometryCacheHas(object.geometry)) object.geometry.dispose();
      });
    }
  }

  private geometryCacheHas(geometry: THREE.BufferGeometry): boolean {
    for (const cached of this.geometryCache.values()) if (cached === geometry) return true;
    return false;
  }

  private resize(): void {
    const width = this.host.clientWidth;
    const height = this.host.clientHeight;
    if (!width || !height) return;
    this.renderer.setSize(width, height, false);
    this.resizeTarget(width, height, this.renderer.getPixelRatio());
    this.fitCamera(width / height);
    this.invalidate();
  }

  private resizeTarget(width: number, height: number, pixelRatio: number): void {
    this.target.setSize(Math.max(1, Math.round(width * pixelRatio)), Math.max(1, Math.round(height * pixelRatio)));
  }

  /**
   * Keep the user's live preview framing for export. Changing to a square aspect may
   * narrow the horizontal FOV, so move backwards only when a projected bounds corner
   * would actually leave the image. Re-running the general auto-fit here used to make
   * the vehicle occupy only a small patch in the center of exported PNGs.
   */
  private prepareSquareExportCamera(): void {
    const bounds = new THREE.Box3().setFromObject(this.root);
    this.exportCamera.copy(this.camera, false);
    this.exportCamera.aspect = 1;
    if (bounds.isEmpty()) { this.exportCamera.updateProjectionMatrix(); return; }

    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const direction = this.exportCamera.position.clone().sub(center).normalize();
    let distance = Math.max(0.01, this.exportCamera.position.distanceTo(center));
    const corners = boxCorners(bounds);
    const ndcLimit = 0.96;

    for (let attempt = 0; attempt < 8; attempt++) {
      this.exportCamera.position.copy(center).addScaledVector(direction, distance);
      this.exportCamera.lookAt(center);
      this.exportCamera.updateProjectionMatrix();
      this.exportCamera.updateMatrixWorld(true);
      let maximum = 0;
      for (const corner of corners) {
        const projected = corner.clone().project(this.exportCamera);
        maximum = Math.max(maximum, Math.abs(projected.x), Math.abs(projected.y));
      }
      if (!Number.isFinite(maximum) || maximum <= ndcLimit) break;
      distance *= Math.max(1.01, maximum / ndcLimit * 1.01);
    }

    const depth = Math.max(1, size.length());
    this.exportCamera.near = Math.max(0.01, distance - depth);
    this.exportCamera.far = distance + depth + 1;
    this.exportCamera.updateProjectionMatrix();
    this.exportCamera.updateMatrixWorld(true);
  }

  private fitCamera(forcedAspect?: number): void {
    const width = this.renderer.domElement.clientWidth || this.renderer.domElement.width || 1;
    const height = this.renderer.domElement.clientHeight || this.renderer.domElement.height || 1;
    const aspect = forcedAspect ?? width / Math.max(1, height);
    const bounds = new THREE.Box3().setFromObject(this.root);
    const center = bounds.isEmpty() ? new THREE.Vector3(0, 1, 0) : bounds.getCenter(new THREE.Vector3());
    const size = bounds.isEmpty() ? new THREE.Vector3(4, 3, 6) : bounds.getSize(new THREE.Vector3());
    const direction = sphericalDirection(this.settings.cameraAzimuth, this.settings.cameraElevation);
    this.keyLight.target.position.copy(center);
    this.keyLight.position.copy(center).add(sphericalDirection(this.settings.lightAzimuth, this.settings.lightElevation).multiplyScalar(100));
    this.keyLight.target.updateMatrixWorld(true);
    this.camera.fov = this.settings.cameraFov;
    this.camera.aspect = Math.max(0.01, aspect);
    // Establish the final view rotation first, then solve the minimum ordinary-perspective
    // camera distance that keeps every bounds corner inside both the horizontal and vertical FOV.
    this.camera.position.copy(center).add(direction);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(center);
    this.camera.updateMatrixWorld(true);
    const corners = boxCorners(bounds.isEmpty() ? new THREE.Box3(center.clone().sub(size.clone().multiplyScalar(0.5)), center.clone().add(size.clone().multiplyScalar(0.5))) : bounds);
    const inverseRotation = this.camera.quaternion.clone().invert();
    const localCorners = corners.map((corner) => corner.clone().sub(center).applyQuaternion(inverseRotation));
    const verticalTangent = Math.tan(THREE.MathUtils.degToRad(this.settings.cameraFov) / 2);
    const horizontalTangent = verticalTangent * Math.max(0.01, aspect);
    const margin = 1 + this.settings.padding;
    let distance = 1;
    for (const point of localCorners) {
      distance = Math.max(
        distance,
        point.z + Math.abs(point.x) * margin / Math.max(0.001, horizontalTangent),
        point.z + Math.abs(point.y) * margin / Math.max(0.001, verticalTangent),
      );
    }
    const depth = Math.max(1, ...localCorners.map((point) => Math.abs(point.z)));
    distance += Math.max(0.05, depth * this.settings.padding);
    this.camera.position.copy(center).add(direction.multiplyScalar(distance));
    this.camera.lookAt(center);
    this.camera.near = Math.max(0.01, distance - depth - size.length() * 0.1);
    this.camera.far = distance + depth + size.length() * 0.5 + 1;
    this.camera.updateProjectionMatrix();
    this.camera.updateMatrixWorld(true);
  }

  private invalidate(): void {
    if (this.disposed || this.frame) return;
    this.frame = requestAnimationFrame(() => { this.frame = 0; this.renderNow(); });
  }

  private renderNow(modelCamera: THREE.PerspectiveCamera = this.camera, background = this.settings.background, transparentOutput = false): void {
    if (this.disposed) return;
    this.postMaterial.uniforms.background.value.set(background);
    this.postMaterial.uniforms.transparentOutput.value = transparentOutput ? 1 : 0;
    this.renderer.setRenderTarget(this.target);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.clear(true, true, true);
    this.renderer.render(this.modelScene, modelCamera);
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(transparentOutput ? 0x000000 : background, transparentOutput ? 0 : 1);
    this.renderer.clear(true, true, true);
    this.renderer.render(this.outputScene, this.outputCamera);
  }

  private pointerDownHandler = (event: PointerEvent): void => {
    this.pointerDown.set(event.clientX, event.clientY);
  };

  private pointerUpHandler = (event: PointerEvent): void => {
    if (Math.hypot(event.clientX - this.pointerDown.x, event.clientY - this.pointerDown.y) > 5) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    for (const hit of this.raycaster.intersectObject(this.root, true)) {
      const key = findPartKey(hit.object);
      if (key) { this.onSelect(key); return; }
    }
  };
}

function createPostMaterial(texture: THREE.Texture, settings: IconRenderSettings): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      sourceTexture: { value: texture },
      threshold: { value: settings.threshold },
      background: { value: new THREE.Color(settings.background) },
      transparentOutput: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
    `,
    fragmentShader: `
      uniform sampler2D sourceTexture;
      uniform float threshold;
      uniform vec3 background;
      uniform float transparentOutput;
      varying vec2 vUv;
      void main() {
        vec4 source = texture2D(sourceTexture, vUv);
        float luminance = dot(source.rgb, vec3(0.2126, 0.7152, 0.0722));
        vec3 binaryColor = vec3(step(threshold, luminance));
        float coverage = smoothstep(0.02, 0.98, source.a);
        if (transparentOutput > 0.5) {
          gl_FragColor = vec4(binaryColor, coverage);
        } else {
          gl_FragColor = vec4(mix(background, binaryColor, coverage), 1.0);
        }
      }
    `,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
}

async function mapLimit<T>(items: T[], limit: number, callback: (item: T) => Promise<void>): Promise<void> {
  let next = 0;
  const workers = Array.from({ length: Math.min(Math.max(1, limit), items.length) }, async () => {
    while (next < items.length) await callback(items[next++]);
  });
  await Promise.all(workers);
}

function loadCached<T>(cache: Map<string, Promise<T>>, path: string, load: () => Promise<T>): Promise<T> {
  const cached = cache.get(path);
  if (cached) return cached;
  const pending = load().catch((error) => { cache.delete(path); throw error; });
  cache.set(path, pending);
  return pending;
}

function sphericalDirection(azimuthDegrees: number, elevationDegrees: number): THREE.Vector3 {
  const azimuth = THREE.MathUtils.degToRad(azimuthDegrees);
  const elevation = THREE.MathUtils.degToRad(elevationDegrees);
  const horizontal = Math.cos(elevation);
  return new THREE.Vector3(Math.sin(azimuth) * horizontal, Math.sin(elevation), Math.cos(azimuth) * horizontal).normalize();
}

function boxCorners(bounds: THREE.Box3): THREE.Vector3[] {
  const { min, max } = bounds;
  return [
    new THREE.Vector3(min.x, min.y, min.z), new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(min.x, max.y, min.z), new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z), new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(min.x, max.y, max.z), new THREE.Vector3(max.x, max.y, max.z),
  ];
}

function cloneOffsets(offsets: IconPartOffsets): IconPartOffsets {
  return Object.fromEntries(Object.entries(offsets).map(([key, value]) => [key, [value[0], value[1], value[2]] as Vec3]));
}

function findPartKey(object: THREE.Object3D): string | undefined {
  let current: THREE.Object3D | null = object;
  while (current) {
    if (typeof current.userData.iconPartKey === 'string') return current.userData.iconPartKey;
    current = current.parent;
  }
  return undefined;
}

function parseIndex(value: string): number | undefined {
  const index = Number.parseInt(value, 10);
  return Number.isInteger(index) && index >= 0 ? index : undefined;
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function foregroundPixelBounds(data: Uint8ClampedArray, width: number, height: number, background: [number, number, number], tolerance = 6): IconPixelBounds | undefined {
  let minimumX = width, minimumY = height, maximumX = -1, maximumY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const difference = Math.max(Math.abs(data[offset] - background[0]), Math.abs(data[offset + 1] - background[1]), Math.abs(data[offset + 2] - background[2]));
      if (difference <= tolerance) continue;
      minimumX = Math.min(minimumX, x); maximumX = Math.max(maximumX, x);
      minimumY = Math.min(minimumY, y); maximumY = Math.max(maximumY, y);
    }
  }
  return maximumX < minimumX || maximumY < minimumY ? undefined : { x: minimumX, y: minimumY, width: maximumX - minimumX + 1, height: maximumY - minimumY + 1 };
}

export function fittedIconOutputRect(source: IconPixelBounds, outputSize: number, padding: number): IconOutputRect {
  const safePadding = Math.min(0.5, Math.max(0, padding));
  const available = outputSize / (1 + safePadding * 2);
  const scale = Math.min(available / Math.max(1, source.width), available / Math.max(1, source.height));
  const width = source.width * scale, height = source.height * scale;
  return { x: (outputSize - width) / 2, y: (outputSize - height) / 2, width, height };
}

function foregroundBoundsFromCanvas(canvas: HTMLCanvasElement, backgroundHex: string): IconPixelBounds | undefined {
  const copy = document.createElement('canvas');
  copy.width = canvas.width; copy.height = canvas.height;
  const context = copy.getContext('2d', { willReadFrequently: true });
  if (!context) return undefined;
  context.drawImage(canvas, 0, 0);
  const background = new THREE.Color(backgroundHex);
  return foregroundPixelBounds(context.getImageData(0, 0, copy.width, copy.height).data, copy.width, copy.height, [
    Math.round(background.r * 255), Math.round(background.g * 255), Math.round(background.b * 255),
  ]);
}

function expandedPixelBounds(bounds: IconPixelBounds, width: number, height: number, amount: number): IconPixelBounds {
  const x = Math.max(0, bounds.x - amount), y = Math.max(0, bounds.y - amount);
  const right = Math.min(width, bounds.x + bounds.width + amount), bottom = Math.min(height, bounds.y + bounds.height + amount);
  return { x, y, width: right - x, height: bottom - y };
}
