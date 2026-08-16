import { SourceDocument } from '../xml/source-document';

export interface StaticVoxel { x: number; y: number; z: number; r: number; g: number; b: number; a: number }

export function parseStaticVoxelModel(text: string): StaticVoxel[] {
  const document = new SourceDocument(text);
  if (document.root?.name !== 'model') throw new Error('体素武器模型的根元素不是 <model>');
  return document.descendants('voxel').filter((node) => node.parent?.name === 'voxels').map((node) => ({
    x: number(document.value(node, 'x')), y: number(document.value(node, 'y')), z: number(document.value(node, 'z')),
    r: number(document.value(node, 'r'), 1), g: number(document.value(node, 'g'), 1), b: number(document.value(node, 'b'), 1), a: number(document.value(node, 'a'), 1),
  })).filter((voxel) => voxel.a > 0);
}

function number(value: string | undefined, fallback = 0): number {
  const parsed = Number(value); return Number.isFinite(parsed) ? parsed : fallback;
}
