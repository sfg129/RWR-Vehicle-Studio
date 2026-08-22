<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
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
  DEFAULT_WW2_BASE_MODEL_FOLDER,
  setWw2BaseModelFallback,
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
const resourceRows: { kind: ResourceKind; label: string }[] = [
  { kind: 'model', label: '模型文件夹' },
  { kind: 'texture', label: '纹理文件夹' },
  { kind: 'weapon', label: '武器文件夹' },
];
const secondaryFolders = reactive({
  model: secondaryDraft(props.catalog.secondaryFolders.model),
  texture: secondaryDraft(props.catalog.secondaryFolders.texture),
  weapon: secondaryDraft(props.catalog.secondaryFolders.weapon),
});
const model = ref(props.supportModel || BUILTIN_SUPPORT_MODEL);
const animations = ref(props.supportAnimations || BUILTIN_SUPPORT_ANIMATIONS);
const busy = ref(''); const indexing = ref(false); let applyToken = 0;
const selectedPreset = computed(() => presets.value.find((preset) => preset.id === selectedPresetId.value));
async function choose(kind: ResourceKind, secondaryIndex?: number) {
  const path = await desktop.chooseFolder(); if (!path) return;
  if (secondaryIndex === undefined) folders[kind] = path; else secondaryFolders[kind][secondaryIndex] = path;
}
async function support(kind: 'model' | 'animation') { const path = await desktop.chooseSupportFile(kind); if (path) (kind === 'model' ? model : animations).value = path; }
function currentSelection(): ResourceSelection {
  return {
    folders: { ...folders },
    secondaryFolders: {
      model: [...secondaryFolders.model],
      texture: [...secondaryFolders.texture],
      weapon: [...secondaryFolders.weapon],
    },
    supportModel: model.value,
    supportAnimations: animations.value,
  };
}
function persistPresets(activePresetId = preferences.activePresetId) {
  saveResourcePreferences({ presets: presets.value, activePresetId, lastSelection: preferences.lastSelection });
}
function loadPreset() {
  const preset = selectedPreset.value; if (!preset) return;
  Object.assign(folders, preset.folders); assignSecondaryDraft(preset.secondaryFolders); model.value = preset.supportModel; animations.value = preset.supportAnimations; presetName.value = preset.name;
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
function addSecondary(kind: ResourceKind) { secondaryFolders[kind].push(''); }
function removeSecondary(kind: ResourceKind, index: number) { secondaryFolders[kind].splice(index, 1); }
function secondaryDraft(paths: string[]): string[] { return paths.length ? [...paths] : ['']; }
function assignSecondaryDraft(paths: ResourceSelection['secondaryFolders']) {
  for (const { kind } of resourceRows) secondaryFolders[kind].splice(0, secondaryFolders[kind].length, ...secondaryDraft(paths[kind]));
}
async function apply() {
  const token = ++applyToken;
  const fallbackAvailable = await desktop.directoryExists(DEFAULT_WW2_BASE_MODEL_FOLDER);
  if (token !== applyToken) return;
  const selection = setWw2BaseModelFallback(currentSelection(), fallbackAvailable);

  indexing.value = true; busy.value = '正在递归建立资源索引…';
  try {
    await props.catalog.applyFolders(selection.folders, true, selection.secondaryFolders);
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
onMounted(async () => {
  if (await desktop.directoryExists(DEFAULT_WW2_BASE_MODEL_FOLDER)) return;
  secondaryFolders.model.splice(0, secondaryFolders.model.length, ...secondaryDraft(secondaryFolders.model.filter((path) => path.toLocaleLowerCase() !== DEFAULT_WW2_BASE_MODEL_FOLDER.toLocaleLowerCase())));
});
</script>
<template>
  <div class="modal-backdrop"><section class="dialog resource-dialog">
    <header><div><small>RESOURCE WORKSPACE</small><h2>资源文件夹与人物预览</h2></div><button class="icon" :disabled="indexing" @click="$emit('close')">×</button></header>
    <p class="muted">每类资源先检索主文件夹，未找到时再按编号依次检索次要来源；所有文件夹都会递归索引。单文件例外请在主界面“文件覆盖”中指定。</p>
    <fieldset class="dialog-fields" :disabled="indexing">
    <section class="preset-box">
      <strong>资源路径预设</strong>
      <div class="field-row preset-row"><select v-model="selectedPresetId" @change="presetName = selectedPreset?.name ?? ''"><option value="">选择已保存预设</option><option v-for="preset in presets" :key="preset.id" :value="preset.id">{{ preset.name }}</option></select><button :disabled="!selectedPreset" @click="loadPreset">载入预设</button><button :disabled="!selectedPreset" @click="removePreset">删除</button></div>
      <div class="field-row preset-row"><input v-model="presetName" placeholder="新预设名称；同名时覆盖更新" /><button @click="savePreset">保存当前路径</button></div>
      <small>预设包含模型、纹理、武器的主文件夹及全部有序次要来源，以及人物模型和动画选择；最后使用的配置会在下次打开载具时自动载入。</small>
    </section>
    <section v-for="row in resourceRows" :key="row.kind" class="resource-source-group">
      <label class="field-row path-row primary-source-row">
        <span>{{ row.label }}</span><input v-model="folders[row.kind]" /><button @click="choose(row.kind)">浏览</button>
      </label>
      <label v-for="(_, index) in secondaryFolders[row.kind]" :key="index" class="field-row path-row secondary-source-row">
        <span>次要来源 {{ index + 1 }}</span><input v-model="secondaryFolders[row.kind][index]" placeholder="可选；主来源未找到时检索" /><button @click="choose(row.kind, index)">浏览</button><button class="source-adjust source-remove" title="删除此来源" @click="removeSecondary(row.kind, index)">−</button>
      </label>
      <div class="secondary-source-actions"><button class="source-adjust" title="增加次要来源" @click="addSecondary(row.kind)">＋</button><small>增加{{ row.label.replace('文件夹', '') }}次要来源</small></div>
    </section>
    <hr />
    <label class="field-row path-row support-row"><span>乘员模型</span><input :value="supportLabel(model, 'model')" readonly /><button @click="support('model')">更改</button><button :disabled="model === BUILTIN_SUPPORT_MODEL" @click="restoreSupport('model')">恢复默认</button></label>
    <label class="field-row path-row support-row"><span>动画文件</span><input :value="supportLabel(animations, 'animation')" readonly /><button @click="support('animation')">更改</button><button :disabled="animations === BUILTIN_SUPPORT_ANIMATIONS" @click="restoreSupport('animation')">恢复默认</button></label>
    </fieldset>
    <footer><span class="muted">{{ busy }}</span><button :disabled="indexing" @click="$emit('close')">取消</button><button class="primary" :disabled="indexing" @click="apply">建立索引并载入</button></footer>
  </section></div>
</template>
