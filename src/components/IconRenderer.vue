<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import type { SourceDocument } from '../core/xml/source-document';
import type { Vec3 } from '../core/math';
import {
  cloneIconRenderSettings,
  iconRenderPresetId,
  loadIconRenderPreferences,
  normalizeIconRenderSettings,
  saveIconRenderPreferences,
  type IconPartOffsets,
  type IconRenderPreset,
  type IconRenderSettings,
} from '../core/icon-render/icon-render-presets';
import { IconRenderController, iconRenderParts } from '../editor/icon-render-controller';
import { desktop } from '../platform/desktop-api';

const props = defineProps<{
  document?: SourceDocument;
  catalog: ResourceCatalog;
  revision: number;
  resourceGeneration: number;
  vehicleKey?: string;
  vehicleName?: string;
}>();

const preferences = loadIconRenderPreferences();
const settings = reactive<IconRenderSettings>(cloneIconRenderSettings(preferences.lastSettings));
const presets = ref<IconRenderPreset[]>(preferences.presets);
const selectedPresetId = ref(preferences.activePresetId);
const presetName = ref(presets.value.find((preset) => preset.id === selectedPresetId.value)?.name ?? '');
const selectedKey = ref('');
const offsets = reactive<IconPartOffsets>({});
const host = ref<HTMLElement>();
const status = ref('等待载具与资源');
const diagnostics = ref<string[]>([]);
const exporting = ref(false);
let controller: IconRenderController | undefined;
let sceneToken = 0;
let persistTimer: number | undefined;

const parts = computed(() => props.document ? iconRenderParts(props.document) : []);
const selectedPart = computed(() => parts.value.find((part) => part.key === selectedKey.value));
const selectedOffset = computed<Vec3>(() => offsets[selectedKey.value] ?? [0, 0, 0]);
const selectedPreset = computed(() => presets.value.find((preset) => preset.id === selectedPresetId.value));

onMounted(() => {
  if (!host.value) return;
  controller = new IconRenderController(host.value, settings, (key) => { selectedKey.value = key; }, pushDiagnostic);
  void rebuildScene();
});

onBeforeUnmount(() => {
  if (persistTimer !== undefined) window.clearTimeout(persistTimer);
  persistPreferences();
  controller?.dispose();
  controller = undefined;
});

watch(() => [props.document, props.revision], () => { void rebuildScene(); });
watch(() => props.resourceGeneration, () => {
  controller?.invalidateAssetCaches();
  void rebuildScene();
});
watch(() => props.vehicleKey, () => {
  for (const key of Object.keys(offsets)) delete offsets[key];
  selectedKey.value = '';
  diagnostics.value = [];
  void rebuildScene();
});
watch(settings, () => {
  controller?.updateSettings(settings);
  schedulePersist();
}, { deep: true });
watch(parts, (value) => {
  if (!value.some((part) => part.key === selectedKey.value)) selectedKey.value = value[0]?.key ?? '';
}, { immediate: true });

async function rebuildScene(): Promise<void> {
  const token = ++sceneToken;
  await nextTick();
  if (!controller || !props.document) { status.value = '请先打开 .vehicle 载具'; return; }
  status.value = '正在组合外观与武器模型…';
  diagnostics.value = [];
  try {
    await controller.setDocument(props.document, props.catalog, offsets);
    if (token !== sceneToken) return;
    const loaded = parts.value.length;
    status.value = diagnostics.value.length ? `预览已更新；${diagnostics.value.length} 项资源诊断` : `实时预览已更新 · ${loaded} 个可调部件`;
  } catch (error) {
    if (token === sceneToken) status.value = `图标场景构建失败：${message(error)}`;
  }
}

function setOffset(axis: number, event: Event): void {
  if (!selectedKey.value) return;
  const number = Number((event.target as HTMLInputElement).value);
  if (!Number.isFinite(number)) return;
  const current = offsets[selectedKey.value] ?? [0, 0, 0];
  offsets[selectedKey.value] = current.map((value, index) => index === axis ? number : value) as Vec3;
  controller?.updateOffsets(offsets);
}

function nudgeOffset(axis: number, delta: number): void {
  if (!selectedKey.value) return;
  const current = offsets[selectedKey.value] ?? [0, 0, 0];
  offsets[selectedKey.value] = current.map((value, index) => index === axis ? value + delta : value) as Vec3;
  controller?.updateOffsets(offsets);
}

function resetSelectedOffset(): void {
  if (!selectedKey.value) return;
  delete offsets[selectedKey.value];
  controller?.updateOffsets(offsets);
}

function resetAllOffsets(): void {
  for (const key of Object.keys(offsets)) delete offsets[key];
  controller?.updateOffsets(offsets);
}

function savePreset(): void {
  const name = presetName.value.trim();
  if (!name) { status.value = '请先填写渲染预设名称'; return; }
  const existing = presets.value.find((preset) => preset.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  const saved: IconRenderPreset = { id: existing?.id ?? iconRenderPresetId(), name, settings: cloneIconRenderSettings(settings) };
  presets.value = existing ? presets.value.map((preset) => preset.id === existing.id ? saved : preset) : [...presets.value, saved];
  selectedPresetId.value = saved.id;
  persistPreferences();
  status.value = `已保存渲染预设“${name}”`;
}

function loadPreset(): void {
  const preset = selectedPreset.value;
  if (!preset) return;
  Object.assign(settings, cloneIconRenderSettings(preset.settings));
  presetName.value = preset.name;
  persistPreferences();
  status.value = `已载入渲染预设“${preset.name}”`;
}

function removePreset(): void {
  const preset = selectedPreset.value;
  if (!preset || !confirm(`删除渲染预设“${preset.name}”？`)) return;
  presets.value = presets.value.filter((item) => item.id !== preset.id);
  selectedPresetId.value = '';
  presetName.value = '';
  persistPreferences();
  status.value = '渲染预设已删除';
}

function resetSettings(): void {
  Object.assign(settings, normalizeIconRenderSettings());
  status.value = '已恢复默认渲染参数';
}

async function exportPng(): Promise<void> {
  if (!controller || !props.document || exporting.value) return;
  exporting.value = true;
  status.value = `正在生成 ${settings.outputSize} × ${settings.outputSize} PNG…`;
  try {
    const base64 = await controller.exportPng();
    const suggested = `${safeStem(props.vehicleName ?? 'vehicle')}-icon-${settings.outputSize}.png`;
    const savedPath = await desktop.saveRenderPng(suggested, base64);
    status.value = savedPath ? `已导出：${savedPath}` : '已取消导出';
  } catch (error) {
    status.value = `PNG 导出失败：${message(error)}`;
  } finally {
    exporting.value = false;
  }
}

function pushDiagnostic(value: string): void {
  if (!diagnostics.value.includes(value)) diagnostics.value = [...diagnostics.value, value].slice(-20);
}

function schedulePersist(): void {
  if (persistTimer !== undefined) window.clearTimeout(persistTimer);
  persistTimer = window.setTimeout(persistPreferences, 180);
}

function persistPreferences(): void {
  saveIconRenderPreferences({ presets: presets.value, activePresetId: selectedPresetId.value, lastSettings: cloneIconRenderSettings(settings) });
}

function safeStem(name: string): string {
  return name.replace(/\.(vehicle|xml)$/i, '').replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').trim() || 'vehicle';
}

function message(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
</script>

<template>
  <section class="icon-render-workspace">
    <aside class="icon-parts-panel">
      <div class="panel-title"><small>RENDER PARTS</small><h2>渲染部件</h2></div>
      <p class="muted">仅装配正常外观与武器；不创建乘员、碰撞框、护盾框或场景网格。</p>
      <div v-if="!document" class="empty-state">先从顶部打开一个 `.vehicle` 文件。</div>
      <div v-else class="icon-part-list">
        <button v-for="part in parts" :key="part.key" class="list-item icon-part-item" :class="{ active: selectedKey === part.key }" @click="selectedKey = part.key">
          <span :class="['icon-part-kind', part.kind]">{{ part.kind === 'weapon' ? 'W' : 'V' }}</span>
          <span class="ellipsis"><b>{{ part.label }}</b><small>{{ part.resourceName }}</small></span>
        </button>
      </div>
      <section v-if="selectedPart" class="icon-offset-editor">
        <header><small>TEMPORARY OFFSET</small><b>{{ selectedPart.label }}</b></header>
        <p>只影响本次渲染会话，不修改或保存到源 `.vehicle/.weapon`。</p>
        <label v-for="(axis, index) in ['X', 'Y', 'Z']" :key="axis" class="icon-offset-row">
          <span>{{ axis }}</span>
          <button class="tiny" @click="nudgeOffset(index, -0.05)">−</button>
          <input type="number" step="0.01" :value="selectedOffset[index]" @input="setOffset(index, $event)" />
          <button class="tiny" @click="nudgeOffset(index, 0.05)">＋</button>
        </label>
        <div class="icon-offset-actions"><button class="small" @click="resetSelectedOffset">本项归零</button><button class="small" @click="resetAllOffsets">全部归零</button></div>
      </section>
    </aside>

    <section class="icon-preview-panel">
      <div ref="host" class="icon-preview-host"></div>
      <div class="icon-preview-badge"><b>实时二值渲染</b><span>#000 / #FFF · 背景 {{ settings.background }}</span></div>
      <div v-if="!document" class="viewport-empty"><b>NO VEHICLE LOADED</b><span>打开载具后自动组合模型与武器。</span></div>
      <div v-if="diagnostics.length" class="icon-diagnostics"><b>资源诊断 {{ diagnostics.length }}</b><span v-for="item in diagnostics.slice(0, 5)" :key="item" class="ellipsis" :title="item">{{ item }}</span></div>
    </section>

    <aside class="icon-settings-panel">
      <div class="panel-title"><small>ICON PIPELINE</small><h2>渲染参数</h2></div>

      <section class="icon-settings-group icon-preset-box">
        <header><b>参数预设</b><button class="tiny" @click="resetSettings">恢复默认</button></header>
        <div class="icon-preset-row"><select v-model="selectedPresetId" @change="presetName = selectedPreset?.name ?? ''"><option value="">选择预设</option><option v-for="preset in presets" :key="preset.id" :value="preset.id">{{ preset.name }}</option></select><button :disabled="!selectedPreset" @click="loadPreset">读取</button><button :disabled="!selectedPreset" @click="removePreset">删除</button></div>
        <div class="icon-preset-row"><input v-model="presetName" placeholder="预设名称；同名覆盖" /><button class="primary" @click="savePreset">保存</button></div>
      </section>

      <section class="icon-settings-group">
        <header><b>相机与姿态</b><small>正常透视 · 自动包围完整炮管</small></header>
        <label class="icon-slider-row"><span>方位角</span><input v-model.number="settings.cameraAzimuth" type="range" min="-180" max="180" step="1" /><input v-model.number="settings.cameraAzimuth" type="number" min="-180" max="180" step="1" /></label>
        <label class="icon-slider-row"><span>俯视角</span><input v-model.number="settings.cameraElevation" type="range" min="5" max="89" step="1" /><input v-model.number="settings.cameraElevation" type="number" min="5" max="89" step="1" /></label>
        <label class="icon-slider-row perspective-strength-row"><span>fov</span><input v-model.number="settings.cameraFov" type="range" min="15" max="150" step="1" list="perspective-fov-marks" /><input v-model.number="settings.cameraFov" type="number" min="15" max="150" step="1" /></label>
        <datalist id="perspective-fov-marks"><option value="15" label="平缓" /><option value="60" /><option value="90" label="广角" /><option value="120" /><option value="150" label="极端" /></datalist>
        <small class="perspective-hint">垂直 FOV：15° 接近平行投影；90°–120° 为夸张广角；150° 为极端近大远小。</small>
        <label class="icon-slider-row"><span>车体偏航</span><input v-model.number="settings.vehicleYaw" type="range" min="-180" max="180" step="1" /><input v-model.number="settings.vehicleYaw" type="number" min="-180" max="180" step="1" /></label>
        <label class="icon-slider-row"><span>主炮塔偏航</span><input v-model.number="settings.turretYaw" type="range" min="-180" max="180" step="1" /><input v-model.number="settings.turretYaw" type="number" min="-180" max="180" step="1" /></label>
        <label class="icon-slider-row"><span>留白</span><input v-model.number="settings.padding" type="range" min="0" max="0.5" step="0.01" /><input v-model.number="settings.padding" type="number" min="0" max="0.5" step="0.01" /></label>
      </section>

      <section class="icon-settings-group">
        <header><b>光照与阈值</b><small>白色漫反射 → 亮度二值化</small></header>
        <label class="icon-slider-row"><span>光源方位</span><input v-model.number="settings.lightAzimuth" type="range" min="-180" max="180" step="1" /><input v-model.number="settings.lightAzimuth" type="number" min="-180" max="180" step="1" /></label>
        <label class="icon-slider-row"><span>光源高度</span><input v-model.number="settings.lightElevation" type="range" min="0" max="90" step="1" /><input v-model.number="settings.lightElevation" type="number" min="0" max="90" step="1" /></label>
        <label class="icon-slider-row"><span>环境光</span><input v-model.number="settings.ambient" type="range" min="0" max="1" step="0.01" /><input v-model.number="settings.ambient" type="number" min="0" max="1" step="0.01" /></label>
        <label class="icon-slider-row"><span>二值阈值</span><input v-model.number="settings.threshold" type="range" min="0" max="1" step="0.01" /><input v-model.number="settings.threshold" type="number" min="0" max="1" step="0.01" /></label>
      </section>

      <section class="icon-settings-group icon-output-group">
        <header><b>输出</b><small>PNG · 超采样抗锯齿</small></header>
        <label><span>尺寸</span><select v-model.number="settings.outputSize"><option v-for="size in [64, 80, 96, 128, 256, 512]" :key="size" :value="size">{{ size }} × {{ size }}</option></select></label>
        <label><span>背景色</span><input v-model="settings.background" type="color" /><input v-model="settings.background" class="color-text" pattern="#[0-9A-Fa-f]{6}" /></label>
        <button class="primary icon-export" :disabled="!document || exporting" @click="exportPng">{{ exporting ? '正在导出…' : '导出 PNG' }}</button>
      </section>
    </aside>
    <footer class="icon-render-status">{{ status }}</footer>
  </section>
</template>
