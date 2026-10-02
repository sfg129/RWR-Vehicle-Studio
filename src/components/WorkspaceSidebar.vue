<script setup lang="ts">
import { ref } from 'vue';

defineProps<{ collapsed: boolean }>();
const STORAGE_KEY = 'rwr-vehicle-studio.sidebar-ratio.v1';
function clamp(value: number) { return Number.isFinite(value) ? Math.max(0.15, Math.min(0.8, value)) : 0.4; }
function loadRatio() {
  try { const saved = localStorage.getItem(STORAGE_KEY); return saved === null ? 0.4 : clamp(Number(saved)); }
  catch { return 0.4; }
}
const ratio = ref(loadRatio()); const host = ref<HTMLElement>(); const dragging = ref(false);
let pointerId: number | undefined; let grabOffset = 0;
function persist() { try { localStorage.setItem(STORAGE_KEY, String(ratio.value)); } catch { /* optional preference */ } }
function start(event: PointerEvent) {
  if (event.button !== 0 || pointerId !== undefined || !host.value) return;
  event.preventDefault();
  const handle = event.currentTarget as HTMLElement;
  grabOffset = event.clientY - handle.getBoundingClientRect().top;
  pointerId = event.pointerId; dragging.value = true; handle.setPointerCapture(event.pointerId);
}
function move(event: PointerEvent) {
  if (event.pointerId !== pointerId || !host.value) return;
  const rect = host.value.getBoundingClientRect();
  ratio.value = clamp((event.clientY - rect.top - grabOffset) / Math.max(1, rect.height - 7));
}
function finish(event: PointerEvent) {
  if (event.pointerId !== pointerId) return;
  pointerId = undefined; dragging.value = false; persist();
  const handle = event.currentTarget as HTMLElement;
  if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
}
function keydown(event: KeyboardEvent) {
  if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault();
  ratio.value = clamp(event.key === 'Home' ? 0.15 : event.key === 'End' ? 0.8 : ratio.value + (event.key === 'ArrowUp' ? -0.025 : 0.025));
  persist();
}
</script>

<template>
  <aside ref="host" class="scene-panel split-sidebar" :class="{ collapsed, dragging }" :style="{ gridTemplateRows: collapsed ? 'auto 0 minmax(0, 1fr)' : `minmax(80px, ${ratio}fr) 7px minmax(80px, ${1 - ratio}fr)` }">
    <div class="workspace-pane"><slot name="workspace" /></div>
    <div v-show="!collapsed" class="workspace-splitter" role="separator" aria-label="调整载具工作区与场景对象比例" aria-orientation="horizontal" :aria-valuenow="Math.round(ratio * 100)" :aria-valuemin="15" :aria-valuemax="80" tabindex="0" @pointerdown="start" @pointermove="move" @pointerup="finish" @pointercancel="finish" @lostpointercapture="finish" @keydown="keydown" />
    <div class="scene-objects-pane"><slot /></div>
  </aside>
</template>
