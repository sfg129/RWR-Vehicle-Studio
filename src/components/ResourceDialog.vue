<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { desktop, type ResourceKind } from '../platform/desktop-api';
import { StaleResourceApplyError, type ResourceCatalog } from '../core/resources/resource-catalog';
import {
  BUILTIN_SUPPORT_ANIMATIONS,
  BUILTIN_SUPPORT_MODEL,
  cloneResourceSelection,
  isBuiltinSupport,
  loadResourcePreferences,
  presetId,
  saveResourcePreferences,
  type ResourcePreset,
  type ResourceSelection,
} from '../core/resources/resource-presets';

const props = defineProps<{ catalog: ResourceCatalog; supportModel: string; supportAnimations: string }>();
const emit = defineEmits<{ close: []; apply: [ResourceSelection] }>();
const preferences = loadResourcePreferences();
const presets = ref<ResourcePreset[]>(preferences.presets);
const selectedPresetId = ref(preferences.activePresetId);
const presetName = ref(presets.value.find((preset) => preset.id === selectedPresetId.value)?.name ?? '');
const folders = reactive({ ...props.catalog.folders });
const model = ref(props.supportModel || BUILTIN_SUPPORT_MODEL);
const animations = ref(props.supportAnimations || BUILTIN_SUPPORT_ANIMATIONS);
const busy = ref(''); const indexing = ref(false); let applyToken = 0;
const selectedPreset = computed(() => presets.value.find((preset) => preset.id === selectedPresetId.value));
async function choose(kind: ResourceKind) { const path = await desktop.chooseFolder(); if (path) folders[kind] = path; }
async function support(kind: 'model' | 'animation') { const path = await desktop.chooseSupportFile(kind); if (path) (kind === 'model' ? model : animations).value = path; }
function currentSelection(): ResourceSelection { return { folders: { ...folders }, supportModel: model.value, supportAnimations: animations.value }; }
function persistPresets(activePresetId = preferences.activePresetId) {
  saveResourcePreferences({ presets: presets.value, activePresetId, lastSelection: preferences.lastSelection });
}
function loadPreset() {
  const preset = selectedPreset.value; if (!preset) return;
  Object.assign(folders, preset.folders); model.value = preset.supportModel; animations.value = preset.supportAnimations; presetName.value = preset.name;
}
function savePreset() {
  const name = presetName.value.trim(); if (!name) { busy.value = '请先填写预设名称'; return; }
  const existing = presets.value.find((preset) => preset.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  const saved: ResourcePreset = { id: existing?.id ?? presetId(), name, ...cloneResourceSelection(currentSelection()) };
  presets.value = existing ? presets.value.map((preset) => preset.id === existing.id ? saved : preset) : [...presets.value, saved];
  selectedPresetId.value = saved.id; busy.value = `已保存预设“${name}”`;
  persistPresets(saved.id);
}
function removePreset() {
  const preset = selectedPreset.value; if (!preset || !confirm(`删除资源预设“${preset.name}”？`)) return;
  presets.value = presets.value.filter((item) => item.id !== preset.id); selectedPresetId.value = ''; presetName.value = ''; busy.value = '已删除预设';
  persistPresets('');
}
function restoreSupport(kind: 'model' | 'animation') { if (kind === 'model') model.value = BUILTIN_SUPPORT_MODEL; else animations.value = BUILTIN_SUPPORT_ANIMATIONS; }
function supportLabel(path: string, kind: 'model' | 'animation'): string { return isBuiltinSupport(path) ? `内置：${kind === 'model' ? 'Normandy Ranger 人物模型' : 'RWR 人物动画'}` : path; }
async function apply() {
  const token = ++applyToken;
  indexing.value = true; busy.value = '正在递归建立资源索引…';
  try {
    const selection = cloneResourceSelection(currentSelection());
    await props.catalog.applyFolders(selection.folders, true);
    if (token !== applyToken) return;
    saveResourcePreferences({ presets: presets.value, activePresetId: selectedPresetId.value, lastSelection: cloneResourceSelection(selection) });
    emit('apply', selection);
  } catch (error) {
    if (token !== applyToken) return;
    busy.value = error instanceof StaleResourceApplyError
      ? '资源索引已被更新操作接管。'
      : `载入失败：${error instanceof Error ? error.message : String(error)}`;
  } finally { if (token === applyToken) indexing.value = false; }
}
</script>
<template>
  <div class="modal-backdrop"><section class="dialog resource-dialog">
    <header><div><small>RESOURCE WORKSPACE</small><h2>资源文件夹与人物预览</h2></div><button class="icon" :disabled="indexing" @click="$emit('close')">×</button></header>
    <p class="muted">选择三个上层文件夹后会递归索引同名资源；不要求逐个选取。单文件例外请在主界面“文件覆盖”中指定。</p>
    <fieldset class="dialog-fields" :disabled="indexing">
    <section class="preset-box">
      <strong>资源路径预设</strong>
      <div class="field-row preset-row"><select v-model="selectedPresetId" @change="presetName = selectedPreset?.name ?? ''"><option value="">选择已保存预设</option><option v-for="preset in presets" :key="preset.id" :value="preset.id">{{ preset.name }}</option></select><button :disabled="!selectedPreset" @click="loadPreset">载入预设</button><button :disabled="!selectedPreset" @click="removePreset">删除</button></div>
      <div class="field-row preset-row"><input v-model="presetName" placeholder="新预设名称；同名时覆盖更新" /><button @click="savePreset">保存当前路径</button></div>
      <small>预设包含模型、纹理、武器文件夹以及人物模型和动画选择；最后使用的配置会在下次打开载具时自动载入。</small>
    </section>
    <label v-for="(label, kind) in { model: '模型文件夹', texture: '纹理文件夹', weapon: '武器文件夹' }" :key="kind" class="field-row path-row">
      <span>{{ label }}</span><input v-model="folders[kind as ResourceKind]" /><button @click="choose(kind as ResourceKind)">浏览</button>
    </label>
    <hr />
    <label class="field-row path-row support-row"><span>乘员模型</span><input :value="supportLabel(model, 'model')" readonly /><button @click="support('model')">更改</button><button :disabled="model === BUILTIN_SUPPORT_MODEL" @click="restoreSupport('model')">恢复默认</button></label>
    <label class="field-row path-row support-row"><span>动画文件</span><input :value="supportLabel(animations, 'animation')" readonly /><button @click="support('animation')">更改</button><button :disabled="animations === BUILTIN_SUPPORT_ANIMATIONS" @click="restoreSupport('animation')">恢复默认</button></label>
    </fieldset>
    <footer><span class="muted">{{ busy }}</span><button :disabled="indexing" @click="$emit('close')">取消</button><button class="primary" :disabled="indexing" @click="apply">建立索引并载入</button></footer>
  </section></div>
</template>
