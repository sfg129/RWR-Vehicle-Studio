export type Vec3 = [number, number, number];
export function vec3(value?: string): Vec3 {
  const p = (value ?? '').trim().split(/\s+/).filter(Boolean).map(Number);
  return [finite(p[0]), finite(p[1]), finite(p[2])];
}
export function vec3Text(v: Vec3): string { return v.map((n) => Number(n.toFixed(5)).toString()).join(' '); }
export function finite(v?: number): number { return Number.isFinite(v) ? v! : 0; }
