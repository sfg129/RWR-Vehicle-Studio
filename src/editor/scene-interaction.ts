import { vec3, type Vec3 } from '../core/math';
import type { SourceDocument } from '../core/xml/source-document';

export interface OffsetBindingState {
  nodeId: number;
  attr: string;
  localOffset: Vec3;
}

/** Keep the scene-side transform cache aligned with a drag before UI reactivity runs. */
export function updateOffsetBindings(bindings: OffsetBindingState[], nodeId: number, attr: string, value: Vec3): void {
  for (const binding of bindings) {
    if (binding.nodeId === nodeId && binding.attr === attr) binding.localOffset = [...value];
  }
}

/** Refresh cached offsets from a newly composed preview document without rebuilding GPU objects. */
export function synchronizeOffsetBindings(doc: SourceDocument, bindings: OffsetBindingState[]): void {
  for (const binding of bindings) {
    const node = doc.nodes[binding.nodeId];
    if (!node || node.id !== binding.nodeId) continue;
    const value = doc.value(node, binding.attr);
    if (value !== undefined) binding.localOffset = vec3(value);
  }
}

export interface PickRank {
  priority: number;
  volume: number;
  distance: number;
}

/** Higher semantic priority wins; equally editable objects prefer the smaller target. */
export function comparePickRank(a: PickRank, b: PickRank): number {
  return b.priority - a.priority || a.volume - b.volume || a.distance - b.distance;
}
