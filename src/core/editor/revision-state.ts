import { computed, ref, type ComputedRef, type Ref } from 'vue';
import type { SourceDocument } from '../xml/source-document';

/**
 * RV-025 follow-up (R3-001): keep "the working document changed" and
 * "the 3D scene needs a full rebuild" as separate reactive signals.
 * A SourceDocument is not Vue-reactive, so incremental transform edits must
 * invalidate dirty tracking explicitly via markDocumentChanged().
 */
export interface EditorRevisions {
  documentRevision: Ref<number>;
  sceneRevision: Ref<number>;
  markDocumentChanged: () => void;
  markSceneChanged: () => void;
}

export function createEditorRevisions(): EditorRevisions {
  const documentRevision = ref(0);
  const sceneRevision = ref(0);
  return {
    documentRevision,
    sceneRevision,
    markDocumentChanged: () => { documentRevision.value++; },
    markSceneChanged: () => { sceneRevision.value++; },
  };
}

export function createDirtyComputed(
  documentRevision: Ref<number>,
  document: Ref<SourceDocument | undefined>,
  savedText: Ref<string>,
): ComputedRef<boolean> {
  return computed(() => {
    void documentRevision.value;
    return document.value ? document.value.serialize() !== savedText.value : false;
  });
}
