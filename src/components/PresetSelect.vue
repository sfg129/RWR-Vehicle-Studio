<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: { value: string; label: string }[];
  label: string;
  placeholder: string;
}>();
// Selecting the current value is an action too, not just a model-value change.
const emit = defineEmits<{ select: [value: string] }>();
const root = ref<HTMLElement>(), trigger = ref<HTMLButtonElement>();
const open = ref(false), active = ref(-1);
const listId = useId();
const selected = computed(() => props.options.find(option => option.value === props.modelValue));
function show() {
  active.value = props.options.findIndex(option => option.value === props.modelValue);
  if (active.value < 0 && props.options.length) active.value = 0;
  open.value = true;
}
function choose(index: number) {
  const option = props.options[index];
  if (!option) return;
  open.value = false;
  emit('select', option.value);
  trigger.value?.focus({ preventScroll: true });
}
function keydown(event: KeyboardEvent) {
  const key = event.key;
  if (key === 'Tab') { open.value = false; return; }
  if (key === 'Escape') { if (open.value) { event.preventDefault(); event.stopPropagation(); } open.value = false; return; }
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(key)) return;
  event.preventDefault(); event.stopPropagation();
  if (!open.value) { show(); return; }
  if (key === 'Enter' || key === ' ') { choose(active.value); return; }
  const last = props.options.length - 1;
  if (last < 0) return;
  active.value = key === 'Home' ? 0 : key === 'End' ? last : Math.max(0, Math.min(last, active.value + (key === 'ArrowDown' ? 1 : -1)));
}
function dismiss(event: PointerEvent) {
  if (event.target instanceof Node && !root.value?.contains(event.target)) open.value = false;
}
function focusout(event: FocusEvent) {
  if (!(event.relatedTarget instanceof Node) || !root.value?.contains(event.relatedTarget)) open.value = false;
}
watch(() => props.options, () => { open.value = false; });
onMounted(() => document.addEventListener('pointerdown', dismiss, true));
onBeforeUnmount(() => document.removeEventListener('pointerdown', dismiss, true));
</script>

<template>
  <div ref="root" class="preset-select" @focusout="focusout">
    <button ref="trigger" type="button" class="preset-select-trigger" role="combobox" :aria-label="label" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="listId" :aria-activedescendant="open && active >= 0 ? `${listId}-${active}` : undefined" @click="open ? open = false : show()" @keydown="keydown">
      <span v-if="selected" data-no-localize>{{ selected.label }}</span><span v-else>{{ placeholder }}</span><span aria-hidden="true">▾</span>
    </button>
    <div v-if="open" :id="listId" class="preset-select-options" role="listbox" :aria-label="label">
      <button v-for="(option, index) in options" :id="`${listId}-${index}`" :key="option.value" type="button" role="option" :aria-selected="option.value === modelValue" :class="{ active: index === active }" tabindex="-1" @pointermove="active = index" @mousedown.prevent @click="choose(index)"><span data-no-localize>{{ option.label }}</span></button>
    </div>
  </div>
</template>
