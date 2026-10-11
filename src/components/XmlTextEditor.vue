<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { EditorState, Compartment, RangeSetBuilder } from '@codemirror/state';
import { EditorView, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection, keymap, gutter, GutterMarker, rectangularSelection, crosshairCursor } from '@codemirror/view';
import { xml } from '@codemirror/lang-xml';
import { bracketMatching, foldGutter, indentOnInput, syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { defaultKeymap, indentWithTab, selectAll } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches, openSearchPanel } from '@codemirror/search';
import { tags } from '@lezer/highlight';
import { changedLines, type LineChange } from '../core/editor/xml-editor';
import { studioSettings } from '../core/editor/studio-settings';
import { matchShortcut, shortcutDefaults, secondaryShortcutDefaults, shortcutFromEvent, type StudioShortcutAction } from '../core/editor/shortcuts';
const props = defineProps<{ text: string; savedText: string; fileId: string; name: string; readOnly: boolean }>();
const emit = defineEmits<{ change: [text: string]; close: []; undo: []; redo: []; shortcut: [StudioShortcutAction] }>();
const host = ref<HTMLElement>();
let view: EditorView | undefined;
let synchronizing = false;
let shortcutChord = '';
let shortcutTimer: ReturnType<typeof setTimeout> | undefined;
const readonly = new Compartment();
const appearance = new Compartment();
const changes = new Compartment();
const positions = new Map<string, { anchor: number; head: number; top: number }>();
const title = computed(() => props.name);
class ChangeMarker extends GutterMarker {
  constructor(readonly kind: LineChange) { super(); }
  eq(other: ChangeMarker) { return other.kind === this.kind; }
  toDOM() { const marker = document.createElement('span'); marker.className = 'xml-change ' + this.kind; return marker; }
}
function differenceGutter() {
  return gutter({ class: 'xml-diff-gutter', markers: (editor) => {
    const builder = new RangeSetBuilder<GutterMarker>();
    for (const [number, kind] of changedLines(props.savedText, editor.state.doc.toString())) {
      if (number <= editor.state.doc.lines) builder.add(editor.state.doc.line(number).from, editor.state.doc.line(number).from, new ChangeMarker(kind));
    }
    return builder.finish();
  } });
}
function theme() {
  const light = studioSettings.theme === 'light';
  return EditorView.theme({
    '&': { height: '100%', fontSize: (14 * studioSettings.fontSize / 16) + 'px', color: light ? '#27313d' : '#d4d4d4', backgroundColor: light ? '#fafafa' : '#1e1e1e' },
    '.cm-scroller': { fontFamily: '"Cascadia Code", "Consolas", monospace', overflow: 'auto' },
    '.cm-content': { caretColor: light ? '#222' : '#fff', padding: '10px 0' },
    '.cm-gutters': { backgroundColor: light ? '#f3f3f3' : '#1e1e1e', color: '#858585', border: 'none' },
    '.cm-activeLine, .cm-activeLineGutter': { backgroundColor: light ? '#e8edf5' : '#ffffff08' },
    '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': { backgroundColor: light ? '#b9d6fc' : '#264f78' },
    '.cm-cursor': { borderLeftColor: light ? '#222' : '#fff' },
  }, { dark: !light });
}
const highlight = HighlightStyle.define([
  { tag: [tags.tagName, tags.angleBracket], color: '#569cd6' },
  { tag: tags.attributeName, color: '#9cdcfe' },
  { tag: [tags.attributeValue, tags.string], color: '#ce9178' },
  { tag: tags.comment, color: '#6a9955' },
  { tag: tags.processingInstruction, color: '#c586c0' },
]);
function updateGutter() { view?.dispatch({ effects: changes.reconfigure(differenceGutter()) }); }
async function runCommand(action: StudioShortcutAction) {
  if (!view) return;
  view.focus();
  if (action === 'selectAll') { selectAll(view); return; }
  if (action === 'find') { openSearchPanel(view); return; }
  const range = view.state.selection.main;
  if (action === 'copy' || action === 'cut') {
    await navigator.clipboard.writeText(view.state.sliceDoc(range.from, range.to));
    if (action === 'cut' && !props.readOnly) view.dispatch({ changes: { from: range.from, to: range.to, insert: '' } });
  } else if (action === 'paste' && !props.readOnly) {
    const insert = await navigator.clipboard.readText();
    if (!props.readOnly) view.dispatch(view.state.replaceSelection(insert));
  }
}
defineExpose({ runCommand });
onMounted(() => {
  view = new EditorView({ parent: host.value, state: EditorState.create({ doc: props.text, extensions: [
    xml(), lineNumbers(), highlightActiveLine(), highlightActiveLineGutter(), drawSelection(), rectangularSelection(), crosshairCursor(),
    bracketMatching(), foldGutter(), indentOnInput(), highlightSelectionMatches(), syntaxHighlighting(highlight),
    readonly.of(EditorState.readOnly.of(props.readOnly)), appearance.of(theme()), changes.of(differenceGutter()),
    EditorView.domEventHandlers({ keydown(event) {
      const stroke = shortcutFromEvent(event); if (!stroke) return false;
      const match = matchShortcut(studioSettings.shortcuts, stroke, shortcutChord, studioSettings.secondaryShortcuts);
      shortcutChord = match.prefix ?? ''; clearTimeout(shortcutTimer);
      if (match.prefix) { event.preventDefault(); event.stopPropagation(); shortcutTimer = setTimeout(() => shortcutChord = '', 2000); return true; }
      const action = match.action;
      if (action === 'undo' || action === 'redo') {
        event.preventDefault(); event.stopPropagation();
        if (action === 'undo') emit('undo'); else emit('redo');
        return true;
      }
      const textActions = ['copy','cut','paste','selectAll','find','undo','redo'];
      if (action && textActions.includes(action)) {
        if (['copy','cut','paste'].includes(action) && stroke === shortcutDefaults[action]) return false;
        event.preventDefault(); event.stopPropagation(); void runCommand(action).catch(() => {}); return true;
      }
      if (action) { event.preventDefault(); event.stopPropagation(); emit('shortcut', action); return true; }
      if ([...Object.entries(shortcutDefaults), ...Object.entries(secondaryShortcutDefaults)].some(([id, binding]) => textActions.includes(id) && binding === stroke)) {
        event.preventDefault(); event.stopPropagation(); return true;
      }
      return false;
    } }),
    keymap.of([indentWithTab, ...defaultKeymap, ...searchKeymap]),
    EditorView.updateListener.of((update) => { if (update.docChanged && !synchronizing) { emit('change', update.state.doc.toString()); } }),
  ] }) });
});
watch(() => [props.fileId, props.text] as const, ([id, text], [previous]) => {
  if (!view) return;
  if (id !== previous) {
    const selection = view.state.selection.main;
    positions.set(previous, { anchor: selection.anchor, head: selection.head, top: view.scrollDOM.scrollTop });
  }
  if (view.state.doc.toString() !== text) {
    synchronizing = true; view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } }); synchronizing = false;
  }
  if (id !== previous) {
    const position = positions.get(id);
    view.dispatch({ selection: { anchor: Math.min(position?.anchor ?? 0, view.state.doc.length), head: Math.min(position?.head ?? 0, view.state.doc.length) } });
    view.scrollDOM.scrollTop = position?.top ?? 0;
  }
  updateGutter();
});
watch(() => props.savedText, updateGutter);
watch(() => props.readOnly, (value) => view?.dispatch({ effects: readonly.reconfigure(EditorState.readOnly.of(value)) }));
watch(() => [studioSettings.theme, studioSettings.fontSize], () => view?.dispatch({ effects: appearance.reconfigure(theme()) }));
onBeforeUnmount(() => { clearTimeout(shortcutTimer); view?.destroy(); });
</script>
<template>
  <section class="xml-text-editor">
    <header><b data-no-localize>{{ title }}</b><button class="small" @click="$emit('close')">返回预览</button></header>
    <div ref="host" class="xml-editor-host" data-no-localize />
  </section>
</template>
