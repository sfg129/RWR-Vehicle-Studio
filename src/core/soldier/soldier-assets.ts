import { SourceDocument } from '../xml/source-document';

export interface SoldierVoxel { x: number; y: number; z: number; r: number; g: number; b: number; a: number }
export interface Particle { id: string; name: string; x: number; y: number; z: number }
export interface Stick { a: string; b: string }
export interface AnimationFrame { time: number; positions: Float32Array }
export interface SoldierAnimation { name: string; loop: boolean; end: number; speed: number; frames: AnimationFrame[] }
export const SOLDIER_GAME_SCALE = 0.04;

// RWR 的人物 XML 保存线性 RGB。显式转换成屏幕 sRGB，避免低亮度军服被再次压暗。
export function rwrLinearToDisplay(value: number): number {
  const linear = Math.max(0, Math.min(1, value));
  if (linear === 0 || linear === 1) return linear;
  return linear <= 0.0031308 ? linear * 12.92 : 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
}

interface VoxelBinding {
  a: number;
  b: number;
  along: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

export class SoldierAssets {
  voxels: SoldierVoxel[] = [];
  particles: Particle[] = [];
  sticks: Stick[] = [];
  constraintByVoxel: (number | null)[] = [];
  animations: SoldierAnimation[] = [];
  private particleIndex = new Map<string, number>();
  private voxelBindings: VoxelBinding[] = [];

  static parse(modelText: string, animationsText: string): SoldierAssets {
    const result = new SoldierAssets(); const model = new SourceDocument(modelText); if (model.root?.name !== 'model') throw new Error('人物模型 XML 根元素不是 <model>');
    result.voxels = model.descendants('voxel').filter((e) => e.parent?.name === 'voxels').map((e) => ({
      x: num(model.value(e, 'x')), y: num(model.value(e, 'y')), z: num(model.value(e, 'z')), r: num(model.value(e, 'r'), 1), g: num(model.value(e, 'g'), 1), b: num(model.value(e, 'b'), 1), a: num(model.value(e, 'a'), 1),
    }));
    const skeleton = model.descendants('skeleton')[0];
    if (skeleton) for (const e of skeleton.children) {
      if (e.name === 'particle') result.particles.push({ id: model.value(e, 'id') ?? `${result.particles.length}`, name: model.value(e, 'name') ?? '', x: num(model.value(e, 'x')), y: num(model.value(e, 'y')), z: num(model.value(e, 'z')) });
      if (e.name === 'stick') result.sticks.push({ a: model.value(e, 'a') ?? '', b: model.value(e, 'b') ?? '' });
    }
    result.particleIndex = new Map(result.particles.map((p, i) => [p.id, i]));
    result.constraintByVoxel = Array(result.voxels.length).fill(null);
    const groups = model.descendants('group').filter((e) => e.parent?.name === 'skeletonVoxelBindings');
    for (const group of groups) {
      const constraint = Math.trunc(num(model.value(group, 'constraintIndex'), -1));
      for (const ref of group.children.filter((e) => e.name === 'voxel')) {
        const index = Math.trunc(num(model.value(ref, 'index'), -1)); if (index >= 0 && index < result.voxels.length) result.constraintByVoxel[index] = constraint;
      }
    }
    const animations = new SourceDocument(animationsText);
    result.animations = animations.root?.children.filter((e) => e.name === 'animation').map((a, index) => ({
      name: animations.value(a, 'comment') || `animation ${index}`, loop: animations.value(a, 'loop') !== '0', end: num(animations.value(a, 'end')), speed: num(animations.value(a, 'speed'), 1),
      frames: a.children.filter((e) => e.name === 'frame').map((f) => ({
        time: num(animations.value(f, 'time')),
        positions: new Float32Array(f.children.filter((e) => e.name === 'position').flatMap((p) => [num(animations.value(p, 'x')), num(animations.value(p, 'y')), num(animations.value(p, 'z'))])),
      })),
    })) ?? [];
    result.prepareVoxelBindings();
    return result;
  }

  animation(id?: string, key?: string): SoldierAnimation | undefined {
    if (key) return this.animations.find((a) => a.name === key) ?? this.animations.find((a) => a.name.toLowerCase() === key.toLowerCase());
    if (id !== undefined) { const n = Number.parseInt(id, 10); if (Number.isInteger(n)) return this.animations[n]; }
    return this.animations.find((a) => a.name === 'still') ?? this.animations[1];
  }

  isStatic(animation: SoldierAnimation | undefined): boolean {
    if (!animation || animation.frames.length <= 1) return true;
    const first = animation.frames[0].positions;
    return animation.frames.slice(1).every((frame) => frame.positions.length === first.length && frame.positions.every((value, index) => value === first[index]));
  }

  createPoseBuffer(): Float32Array { return new Float32Array(this.particles.length * 3); }

  sampleInto(animation: SoldierAnimation | undefined, elapsed: number, target: Float32Array): void {
    if (!animation?.frames.length) {
      this.particles.forEach((p, i) => { const at = i * 3; target[at] = p.x; target[at + 1] = p.y; target[at + 2] = p.z; });
      return;
    }
    const duration = animation.end || animation.frames.at(-1)!.time || 1;
    const t = animation.loop ? (elapsed * animation.speed) % duration : Math.min(elapsed * animation.speed, duration);
    let b = animation.frames.findIndex((f) => f.time >= t); if (b < 0) b = animation.frames.length - 1;
    const a = Math.max(0, b - 1); const fa = animation.frames[a], fb = animation.frames[b];
    const mix = a === b || fb.time === fa.time ? 0 : (t - fa.time) / (fb.time - fa.time);
    const amount = Math.max(0, Math.min(1, mix));
    this.particles.forEach((p, i) => {
      const at = i * 3; const ax = fa.positions[at] ?? p.x, ay = fa.positions[at + 1] ?? p.y, az = fa.positions[at + 2] ?? p.z;
      target[at] = ax + ((fb.positions[at] ?? ax) - ax) * amount;
      target[at + 1] = ay + ((fb.positions[at + 1] ?? ay) - ay) * amount;
      target[at + 2] = az + ((fb.positions[at + 2] ?? az) - az) * amount;
    });
  }

  initializeInstanceMatrices(matrices: Float32Array): void {
    for (let i = 0; i < this.voxels.length; i++) {
      const at = i * 16; matrices[at] = 1; matrices[at + 5] = 1; matrices[at + 10] = 1; matrices[at + 15] = 1;
    }
  }

  writePoseMatrices(pose: Float32Array, matrices: Float32Array): void {
    for (let i = 0; i < this.voxelBindings.length; i++) {
      const binding = this.voxelBindings[i]; const at = i * 16; const a = binding.a * 3;
      let x = pose[a], y = pose[a + 1], z = pose[a + 2];
      if (binding.b >= 0) {
        const b = binding.b * 3;
        x += (pose[b] - x) * binding.along;
        y += (pose[b + 1] - y) * binding.along;
        z += (pose[b + 2] - z) * binding.along;
      }
      matrices[at + 12] = x + binding.offsetX;
      matrices[at + 13] = y + binding.offsetY;
      matrices[at + 14] = z + binding.offsetZ;
    }
  }

  private prepareVoxelBindings(): void {
    this.voxelBindings = this.voxels.map((voxel, index) => {
      const constraint = this.constraintByVoxel[index]; const stick = constraint === null ? undefined : this.sticks[constraint];
      const a = stick ? this.particleIndex.get(stick.a) : undefined; const b = stick ? this.particleIndex.get(stick.b) : undefined;
      if (a !== undefined && b !== undefined) {
        const pa = this.particles[a], pb = this.particles[b]; const x = pb.x - pa.x, y = pb.y - pa.y, z = pb.z - pa.z; const denom = x * x + y * y + z * z;
        const along = denom ? ((voxel.x - pa.x) * x + (voxel.y - pa.y) * y + (voxel.z - pa.z) * z) / denom : 0;
        return { a, b, along, offsetX: voxel.x - (pa.x + x * along), offsetY: voxel.y - (pa.y + y * along), offsetZ: voxel.z - (pa.z + z * along) };
      }
      let nearest = 0, distance = Infinity;
      this.particles.forEach((p, particleIndex) => { const d = (p.x - voxel.x) ** 2 + (p.y - voxel.y) ** 2 + (p.z - voxel.z) ** 2; if (d < distance) { distance = d; nearest = particleIndex; } });
      const p = this.particles[nearest] ?? { x: voxel.x, y: voxel.y, z: voxel.z };
      return { a: nearest, b: -1, along: 0, offsetX: voxel.x - p.x, offsetY: voxel.y - p.y, offsetZ: voxel.z - p.z };
    });
  }
}

function num(value: string | undefined, fallback = 0): number { const v = Number.parseFloat(value ?? ''); return Number.isFinite(v) ? v : fallback; }
