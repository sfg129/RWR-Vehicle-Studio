import { describe, expect, it } from 'vitest';
import { ref, shallowRef } from 'vue';
import { SourceDocument } from '../src/core/xml/source-document';
import { createDirtyComputed, createEditorRevisions } from '../src/core/editor/revision-state';

describe('编辑 revision 拆分（R3-001）', () => {
  it('增量修改不会让 dirty 变 true，markDocumentChanged 后才变 true', () => {
    const { documentRevision, sceneRevision, markDocumentChanged } = createEditorRevisions();
    const document = shallowRef<SourceDocument | undefined>(new SourceDocument('<vehicle><visual offset="1 2 3"/></vehicle>'));
    const savedText = ref(document.value!.serialize());
    const dirty = createDirtyComputed(documentRevision, document, savedText);

    expect(dirty.value).toBe(false);
    const visual = document.value!.descendants('visual')[0];
    document.value!.set(visual, 'offset', '4 5 6');
    // SourceDocument 不是 Vue reactive，所以没有显式 invalidation 时 dirty 仍缓存旧值。
    expect(dirty.value).toBe(false);

    markDocumentChanged();
    expect(dirty.value).toBe(true);
    expect(documentRevision.value).toBe(1);
    expect(sceneRevision.value).toBe(0);
  });

  it('sceneRevision 用于触发全量重建，不应影响 dirty', () => {
    const { documentRevision, sceneRevision, markSceneChanged } = createEditorRevisions();
    const document = shallowRef<SourceDocument | undefined>(new SourceDocument('<vehicle><visual offset="1 2 3"/></vehicle>'));
    const savedText = ref(document.value!.serialize());
    const dirty = createDirtyComputed(documentRevision, document, savedText);

    expect(dirty.value).toBe(false);
    markSceneChanged();
    expect(sceneRevision.value).toBe(1);
    expect(dirty.value).toBe(false);
  });
});
