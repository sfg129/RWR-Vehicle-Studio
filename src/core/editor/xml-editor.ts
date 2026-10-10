import { diff } from '@codemirror/merge';
import { SourceDocument } from '../xml/source-document';

export type LineChange = 'added' | 'modified' | 'deleted';
export function changedLines(saved: string, working: string): Map<number, LineChange> {
  const marks = new Map<number, LineChange>();
  const lineAt = (text: string, offset: number) => text.slice(0, offset).split('\n').length;
  for (const change of diff(saved, working)) {
    const kind = change.fromA === change.toA ? 'added' : change.fromB === change.toB ? 'deleted' : 'modified';
    const start = lineAt(working, change.fromB);
    const end = lineAt(working, Math.max(change.fromB, change.toB - 1));
    for (let line = start; line <= end; line++) {
      const previous = marks.get(line);
      marks.set(line, previous && previous !== kind ? 'modified' : kind);
    }
  }
  return marks;
}
export function renderableVehicle(doc: SourceDocument | undefined): boolean {
  if (!doc || doc.root?.name !== 'vehicle' || doc.roots.length !== 1 || doc.structuralErrors.length) return false;
  if (typeof DOMParser !== 'undefined') {
    return !new DOMParser().parseFromString(doc.serialize(), 'application/xml').querySelector('parsererror');
  }
  return true;
}
