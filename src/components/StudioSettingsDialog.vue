<script setup lang="ts">
import { displayPath } from '../core/editor/display-path';
import { computed, onMounted, ref } from 'vue';
import LanguageSelect from './LanguageSelect.vue';
import { studioSettings, applySettings, resetShortcuts } from '../core/editor/studio-settings';
import { desktop, type BackupSettings } from '../platform/desktop-api';
import { studioShortcutGroups, shortcutFromEvent, type StudioShortcutAction } from '../core/editor/shortcuts';
import { conflictingBindings, ShortcutCapture } from '../core/editor/shortcut-bindings';
const emit = defineEmits<{ close: []; settingsChanged: [BackupSettings] }>();
const section = ref('settings');
const backup = ref<BackupSettings>();
const error = ref('');
const busy = ref(false);
const conflicts = computed(() => conflictingBindings(studioSettings.shortcuts, studioSettings.secondaryShortcuts));
const capture = new ShortcutCapture();
function binding(action: StudioShortcutAction, slot: number) { return (slot ? studioSettings.secondaryShortcuts : studioSettings.shortcuts)[action]; }
function setBinding(action: StudioShortcutAction, slot: number, value: string) {
  (slot ? studioSettings.secondaryShortcuts : studioSettings.shortcuts)[action] = value; applySettings();
}
function clearShortcut(action: StudioShortcutAction, slot: number) { capture.reset(); setBinding(action, slot, ''); }
function editShortcut(event: KeyboardEvent, action: StudioShortcutAction, slot: number) {
  event.preventDefault(); event.stopPropagation();
  if (event.key === 'Escape') { capture.reset(); (event.target as HTMLInputElement).blur(); return; }
  if (event.key === 'Delete' && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) { clearShortcut(action, slot); return; }
  if (event.repeat) return;
  const binding = shortcutFromEvent(event); if (!binding) return;
  setBinding(action, slot, capture.stroke(binding)); error.value = '';
}
onMounted(async () => { try { backup.value = await desktop.getBackupSettings(); } catch (e) { error.value = String(e); } });
async function configure(enabled: boolean, directory?: string) {
  busy.value = true;
  try { backup.value = await desktop.configureBackups(enabled, directory); emit('settingsChanged', backup.value); error.value = ''; }
  catch (e) { error.value = String(e); } finally { busy.value = false; }
}
async function chooseDirectory() {
  try { const path = await desktop.chooseFolder(backup.value?.directory); if (path) await configure(backup.value?.enabled ?? false, path); }
  catch (e) { error.value = String(e); }
}
async function openDirectory() { try { await desktop.openBackupDirectory(); } catch (e) { error.value = String(e); } }
async function openRepository(event: MouseEvent) {
  if (!('__TAURI_INTERNALS__' in window)) return;
  event.preventDefault();
  try { await desktop.openRepository(); } catch (e) { error.value = String(e); }
}
</script>
<template>
  <div class="modal-backdrop" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <section class="dialog studio-settings" role="dialog" aria-modal="true" aria-label="设置">
      <header><h2>设置</h2><button class="icon" @click="$emit('close')">×</button></header>
      <div class="studio-settings-body">
      <nav class="settings-tabs"><button v-for="item in [['settings','设置'],['shortcuts','快捷键'],['about','关于']]" :key="item[0]" :class="{ active: section === item[0] }" @click="section = item[0]!">{{ item[1] }}</button></nav>
      <div class="studio-settings-pages">
      <div v-if="section === 'settings'" class="settings-content">
        <label for="settings-language"><span>界面语言</span><LanguageSelect id="settings-language" v-model="studioSettings.language" @update:model-value="applySettings" /></label>
        <label><span>主题</span><select v-model="studioSettings.theme" @change="applySettings"><option value="dark">深色模式</option><option value="light">浅色模式</option></select></label>
        <label><span>主题颜色</span><input v-model="studioSettings.accent" type="color" @input="applySettings" /></label>
        <label><span>字体大小</span><div class="font-slider"><input v-model.number="studioSettings.fontSize" type="range" min="12" max="20" @input="applySettings" /><output>{{ studioSettings.fontSize }}px</output></div></label>
        <label><span>界面缩放</span><div class="font-slider"><input v-model.number="studioSettings.uiScale" type="range" min="85" max="120" step="5" @input="applySettings" /><output>{{ studioSettings.uiScale }}%</output></div></label>
        <label class="backup-toggle"><span>启用备份</span><input type="checkbox" :checked="backup?.enabled" :disabled="busy || !backup" @change="configure(($event.target as HTMLInputElement).checked)" /></label>
        <div v-if="backup?.enabled" class="settings-directory"><span>备份位置</span><button class="ellipsis" :title="displayPath(backup.directory)" @click="openDirectory" data-no-localize>{{ displayPath(backup.directory) }}</button><div><button :disabled="busy" @click="chooseDirectory">选择目录</button><button :disabled="busy" @click="configure(backup!.enabled, '')">默认目录</button><button @click="openDirectory">在资源管理器中打开</button></div></div>
      </div>
      <div v-else-if="section === 'shortcuts'" class="settings-content shortcut-list">
        <div class="shortcut-reset-row"><button @click="resetShortcuts(); error = ''">恢复默认</button></div>
        <section v-for="group in studioShortcutGroups" :key="group.title" class="shortcut-group"><h3>{{ group.title }}</h3><div v-for="row in group.rows" :key="row[0]"><span>{{ row[1] }}</span><div class="shortcut-slots"><span v-for="slot in [0, 1]" :key="slot" class="shortcut-slot"><input readonly data-no-localize :aria-label="row[1]" :data-shortcut-input="row[0]" :data-shortcut-slot="slot" :class="{ duplicate: conflicts.has(binding(row[0], slot)) }" :value="binding(row[0], slot)" @focus="capture.reset()" @blur="capture.reset()" @keydown="editShortcut($event, row[0], slot)" /><button type="button" class="shortcut-clear" aria-label="清除" @pointerdown.prevent @click="clearShortcut(row[0], slot)">×</button></span></div></div></section>
      </div>
      <div v-else class="settings-content studio-about"><b>RWR Vehicle Studio</b><p>0.91.3 · GPL-3.0</p><a class="repository-button" href="https://github.com/sfg129/RWR-Vehicle-Studio" target="_blank" rel="noopener noreferrer" @click="openRepository">访问 GitHub 仓库</a></div>
      <p v-if="error" class="backup-error">{{ error }}</p>
      </div></div>
      <footer><button class="primary" @click="$emit('close')">完成</button></footer>
    </section>
  </div>
</template>
