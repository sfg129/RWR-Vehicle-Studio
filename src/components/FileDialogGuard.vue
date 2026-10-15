<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import { fileDialogOpen } from '../platform/file-dialog';
const events = ['keydown', 'keyup', 'wheel', 'drop'] as const;
function block(event: Event): void {
  if (!fileDialogOpen.value) return;
  event.preventDefault(); event.stopImmediatePropagation();
}
onMounted(() => { for (const type of events) window.addEventListener(type, block, { capture: true, passive: false }); });
onBeforeUnmount(() => { for (const type of events) window.removeEventListener(type, block, true); });
</script>
<template>
  <Teleport to="body"><div v-if="fileDialogOpen" class="file-dialog-interaction-guard" aria-hidden="true" @contextmenu.prevent /></Teleport>
</template>
<style>
html.file-dialog-open #app { filter: blur(3px); pointer-events: none; user-select: none; }
.file-dialog-interaction-guard { position: fixed; inset: 0; z-index: 2147483647; background: transparent; cursor: default; }
</style>
