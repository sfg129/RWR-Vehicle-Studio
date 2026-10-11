export function loadBindings<K extends string>(value: unknown, defaults: Record<K, string>): Record<K, string> {
  const saved: Partial<Record<K, unknown>> = value && typeof value === 'object' ? value as Partial<Record<K, unknown>> : {};
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [key, typeof saved[key as K] === 'string' ? (saved[key as K] as string).trim() : fallback])) as Record<K, string>;
}
export function bindingEntries<K extends string>(primary: Record<K, string>, secondary: Record<K, string>): [K, string][] {
  return (Object.keys(primary) as K[]).flatMap(action => [primary[action], secondary[action]].filter(Boolean).map(key => [action, key] as [K, string]));
}
export function conflictingBindings<K extends string>(primary: Record<K, string>, secondary: Record<K, string>): Set<string> {
  const counts = new Map<string, number>();
  for (const [, key] of bindingEntries(primary, secondary)) counts.set(key, (counts.get(key) ?? 0) + 1);
  return new Set([...counts].filter(([, count]) => count > 1).map(([key]) => key));
}
export function shortcutLabel<K extends string>(primary: Record<K, string>, secondary: Record<K, string>, action: K): string {
  return [primary[action], secondary[action]].filter(Boolean).join(' / ');
}
export function matchBindings<K extends string>(primary: Record<K, string>, secondary: Record<K, string>, stroke: string, prefix = ''): { action?: K; prefix?: string } {
  if (!stroke) return {};
  const entries = bindingEntries(primary, secondary), sequence = prefix ? prefix + ' ' + stroke : stroke;
  let action = entries.find(([, key]) => key === sequence)?.[0];
  if (!action && prefix && stroke.startsWith('Ctrl+')) action = entries.find(([, key]) => key === prefix + ' ' + stroke.slice(5))?.[0];
  if (action) return { action };
  if (!prefix && entries.some(([, key]) => key.startsWith(stroke + ' '))) return { prefix: stroke };
  return {};
}
// A focused slot can record either a single stroke or two consecutive strokes.
export class ShortcutCapture {
  private first = '';
  private started = 0;
  reset() { this.first = ''; this.started = 0; }
  stroke(key: string, now = performance.now()): string {
    if (now - this.started > 1200) this.first = '';
    const value = this.first ? this.first + ' ' + key : key;
    this.first = this.first ? '' : key; this.started = now;
    return value;
  }
}
