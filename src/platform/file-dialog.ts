import { readonly, ref } from 'vue';
import { FileDialogGate } from '../core/editor/file-dialog-gate';

const active = ref(false);
export const fileDialogOpen = readonly(active);
export const fileDialogGate = new FileDialogGate(open => {
  active.value = open;
  if (typeof document === 'undefined') return;
  document.documentElement.classList.toggle('file-dialog-open', open);
  document.getElementById('app')?.toggleAttribute('inert', open);
  if (open) window.dispatchEvent(new window.Event('blur'));
});
export const withFileDialog = <T>(choose: () => Promise<T>): Promise<T | null> => fileDialogGate.run(choose);
