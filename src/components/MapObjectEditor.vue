<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { desktop, type MapWorkspaceEntry, type VehicleWorkspaceEntry } from '../platform/desktop-api';
import { cloneMapSpawn, mapSpawnSnapshot, parseRwrMap, serializeRwrMap, type MapVehicleSpawn, type ParsedRwrMap } from '../core/map/rwr-map-document';
import { factionTagCandidates, parseMapFactionDescriptor, parseMapVehicleDefinition, parseResourceVehicleKeys, resolveMapVehicleInheritance, type MapFactionDefinition, type MapVehicleDefinition } from '../core/map/map-resource-catalog';

const emit = defineEmits<{ (event: 'dirty-change', value: boolean): void }>();
const SETTINGS_KEY = 'rwr-vehicle-studio.map-object-settings.v2';
interface MapSettings { sourceMapsFolder: string; outputMapsFolder: string; selectedMap: string; vehicleFolder: string; factionFolder: string }
function defaults(): MapSettings { return {
  sourceMapsFolder: 'D:\\steam\\steamapps\\common\\RunningWithRifles\\media\\packages\\edelweiss\\maps',
  outputMapsFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\packages\\edelweiss\\maps',
  selectedMap: '', vehicleFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\vehicles', factionFolder: 'C:\\Users\\sfg1.DESKTOP-N02A6BA\\Desktop\\mymod\\factions',
}; }
function loadSettings(): MapSettings { try { return { ...defaults(), ...JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? '{}') }; } catch { return defaults(); } }
const settings = reactive(loadSettings());
watch(settings, () => localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)), { deep: true });

const mapEntries = ref<MapWorkspaceEntry[]>([]); const map = ref<ParsedRwrMap>(); const spawns = ref<MapVehicleSpawn[]>([]);
const selectedUid = ref(''); const undoStack = ref<MapVehicleSpawn[][]>([]); const revision = ref(0); const savedRevision = ref(0);
const loadedPath = ref(''); const savedSource = ref(''); const status = ref('选择原版 maps 文件夹后，会自动列出其中的地图。');
const busy = ref(false); const outputAuthorized = ref(false); const imageUrl = ref('');
const vehicles = ref<MapVehicleDefinition[]>([]); const factions = ref<MapFactionDefinition[]>([]); const catalogWarnings = ref<string[]>([]);
const search = ref(''); const showBases = ref(true); const showTemplates = ref(false); const hiddenLayers = reactive(new Set<string>());
const view = reactive({ x: 0, y: 0, width: 2048, height: 2048 }); const svgElement = ref<SVGSVGElement>(); const interactionActive = ref(false);

type PointerAction = { kind: 'pan' | 'move' | 'rotate'; uid?: string; pointerId: number; startClientX: number; startClientY: number; startViewX: number; startViewY: number; startViewWidth: number; startViewHeight: number; objectX: number; objectY: number; changed: boolean; undoRecorded: boolean };
let pointerAction: PointerAction | undefined; let pendingPointer: { x: number; y: number } | undefined; let pointerFrame = 0;
let pendingWheel: { x: number; y: number; delta: number } | undefined; let wheelFrame = 0; let interactionTimer = 0;

const dirty = computed(() => revision.value !== savedRevision.value);
watch(dirty, (value) => emit('dirty-change', value), { immediate: true });
const outputMapFolder = computed(() => settings.selectedMap ? join(settings.outputMapsFolder, settings.selectedMap) : '');
const outputPath = computed(() => outputMapFolder.value ? join(outputMapFolder.value, 'objects.svg') : '请先选择地图');
const selected = computed(() => spawns.value.find((spawn) => spawn.uid === selectedUid.value && !spawn.deleted));
const physicalSpawns = computed(() => spawns.value.filter((spawn) => !spawn.deleted && (showTemplates.value || !spawn.isTemplate)));
const visibleSpawns = computed(() => { const query = search.value.trim().toLocaleLowerCase(); return physicalSpawns.value.filter((spawn) => !hiddenLayers.has(spawn.layer) && (!query || `${spawn.reference} ${spawn.referenceKind} ${spawn.layer} ${spawn.elementId}`.toLocaleLowerCase().includes(query))); });
const mapLayers = computed(() => map.value?.layerNames ?? []);
const layerCounts = computed(() => { const counts = new Map<string, number>(); for (const spawn of spawns.value) if (!spawn.deleted && !spawn.isTemplate) counts.set(spawn.layer, (counts.get(spawn.layer) ?? 0) + 1); return counts; });
const vehicleByKey = computed(() => new Map(vehicles.value.map((vehicle) => [vehicle.key, vehicle])));
const tagOptions = computed(() => [...new Set(vehicles.value.flatMap((vehicle) => vehicle.tags))].sort((a, b) => a.localeCompare(b)));
const candidateRows = computed(() => { const spawn = selected.value; if (!spawn) return []; if (spawn.referenceKind === 'key') { const vehicle = vehicleByKey.value.get(spawn.reference); return [{ faction: '固定载具', candidates: vehicle ? [vehicle] : [] }]; } return factions.value.map((faction) => ({ faction: faction.name, candidates: factionTagCandidates(faction, vehicles.value, spawn.reference) })); });
const selectionWarnings = computed(() => { const spawn = selected.value; if (!spawn) return []; const result: string[] = []; if (!spawn.reference.trim()) result.push('该刷新点没有填写 key/tag。'); for (const row of candidateRows.value) { if (!row.candidates.length) result.push(`${row.faction} 找不到匹配载具。`); if (row.candidates.length > 1) result.push(`${row.faction} 有 ${row.candidates.length} 个候选；结果可能不唯一。`); } return result; });

function join(folder: string, name: string): string { return `${folder.replace(/[\\/]+$/, '')}\\${name}`; }
function ext(path: string): string { return path.split('.').at(-1)?.toLocaleLowerCase() ?? ''; }
function errorMessage(error: unknown): string { return error instanceof Error ? error.message : String(error); }

async function scanSourceMaps(quiet = false): Promise<void> {
  if (!settings.sourceMapsFolder.trim()) { mapEntries.value = []; return; }
  try { const workspace = await desktop.scanMapWorkspace(settings.sourceMapsFolder); settings.sourceMapsFolder = workspace.root; mapEntries.value = workspace.entries; if (!workspace.entries.some((entry) => entry.name === settings.selectedMap)) settings.selectedMap = ''; if (!quiet) status.value = `已发现 ${workspace.entries.length} 个包含 SVG 的地图目录。`; }
  catch (error) { mapEntries.value = []; if (!quiet) status.value = `扫描地图目录失败：${errorMessage(error)}`; }
}
async function choosePath(kind: 'source' | 'output' | 'vehicles' | 'factions'): Promise<void> {
  try { const current = kind === 'source' ? settings.sourceMapsFolder : kind === 'output' ? settings.outputMapsFolder : kind === 'vehicles' ? settings.vehicleFolder : settings.factionFolder; const value = kind === 'output' ? await desktop.chooseMapOutputFolder(current) : await desktop.chooseFolder(current); if (!value) return;
    if (kind === 'source') { settings.sourceMapsFolder = value; await scanSourceMaps(); } else if (kind === 'output') { settings.outputMapsFolder = value; outputAuthorized.value = true; } else if (kind === 'vehicles') settings.vehicleFolder = value; else settings.factionFolder = value;
  } catch (error) { status.value = `选择路径失败：${errorMessage(error)}`; }
}
async function listFiles(root: string, extension: string, limit = 5000): Promise<string[]> {
  const result: string[] = []; const queue = [root]; while (queue.length) { const folder = queue.shift()!; const entries = await desktop.listWorkspaceDir(folder); for (const entry of entries) { if (entry.isDirectory) queue.push(entry.path); else if (ext(entry.path) === extension) result.push(entry.path); if (result.length > limit) throw new Error(`${extension} 文件超过 ${limit} 个，请选择更具体的目录`); } } return result;
}
async function loadVehicleCatalog(): Promise<void> {
  const paths = await listFiles(settings.vehicleFolder, 'vehicle', 10_000); const parsed: MapVehicleDefinition[] = [];
  for (let index = 0; index < paths.length; index += 24) { const texts = await Promise.all(paths.slice(index, index + 24).map(async (path) => ({ path, text: await desktop.readText(path) }))); for (const item of texts) { const definition = parseMapVehicleDefinition(item.text, item.path); if (definition) parsed.push(definition); } }
  vehicles.value = resolveMapVehicleInheritance(parsed).sort((a, b) => a.key.localeCompare(b.key));
}
async function loadFactionCatalog(mapFolder: string): Promise<void> {
  const warnings: string[] = []; const result: MapFactionDefinition[] = []; let entries: VehicleWorkspaceEntry[] = [];
  try { entries = await desktop.listWorkspaceDir(mapFolder); } catch { warnings.push('模组对应地图目录尚不存在或没有阵营文件；保存时会自动创建目录。'); }
  const paths = entries.filter((entry) => !entry.isDirectory && ext(entry.path) === 'xml' && entry.name.toLocaleLowerCase() !== 'objects.svg').map((entry) => entry.path);
  for (const path of paths) { const text = await desktop.readText(path); if (!/<faction\b/i.test(text)) continue; const descriptor = parseMapFactionDescriptor(text, path); const keys = new Set<string>(); const missingResources: string[] = [];
    for (const name of descriptor.resourceFiles) { try { for (const key of parseResourceVehicleKeys(await desktop.readText(join(settings.factionFolder, name)))) keys.add(key); } catch { missingResources.push(name); } }
    if (missingResources.length) warnings.push(`${descriptor.name}：缺少 ${missingResources.join('、')}`); result.push({ ...descriptor, vehicleKeys: [...keys], missingResources }); }
  factions.value = result; catalogWarnings.value.push(...warnings);
}
async function loadBackground(folder: string): Promise<void> {
  if (imageUrl.value) URL.revokeObjectURL(imageUrl.value); imageUrl.value = '';
  try { const bytes = await desktop.readBinary(join(folder, 'map.png')); imageUrl.value = URL.createObjectURL(new Blob([bytes], { type: 'image/png' })); } catch { catalogWarnings.value.push('未找到 map.png；仍可编辑，但缺少地图背景。'); }
}
async function loadProject(mapName = settings.selectedMap): Promise<void> {
  if (!mapName) { status.value = '请先从地图工作区选择一张地图。'; return; } if (dirty.value && !confirm('当前地图有未保存修改，仍要切换地图吗？')) return;
  const entry = mapEntries.value.find((item) => item.name === mapName); if (!entry) { status.value = `地图 ${mapName} 已不在原版 maps 工作区中，请刷新列表。`; return; }
  settings.selectedMap = mapName; busy.value = true; status.value = `正在载入 ${mapName}…`;
  try { const targetFolder = join(settings.outputMapsFolder, mapName); let path = join(targetFolder, 'objects.svg'); let source: string; try { source = await desktop.readText(path); } catch { path = join(entry.path, 'objects.svg'); source = await desktop.readText(path); }
    const parsed = parseRwrMap(source); map.value = parsed; spawns.value = mapSpawnSnapshot(parsed.spawns); loadedPath.value = path; savedSource.value = source; selectedUid.value = spawns.value.find((spawn) => !spawn.isTemplate)?.uid ?? ''; undoStack.value = []; revision.value = 0; savedRevision.value = 0; hiddenLayers.clear(); resetView(); catalogWarnings.value = [...parsed.diagnostics];
    await Promise.all([loadBackground(entry.path), loadVehicleCatalog(), loadFactionCatalog(targetFolder)]); const physical = parsed.spawns.filter((spawn) => !spawn.isTemplate).length; status.value = `已载入 ${mapName}：${physical} 个刷新点、${parsed.spawns.length - physical} 个模板、${vehicles.value.length} 个载具。`;
  } catch (error) { status.value = `载入 ${mapName} 失败：${errorMessage(error)}`; } finally { busy.value = false; }
}

function resetView(): void { const width = map.value?.width ?? 2048; const height = map.value?.height ?? 2048; view.x = 0; view.y = 0; view.width = width; view.height = height; }
function recordUndo(): void { undoStack.value = [...undoStack.value.slice(-79), mapSpawnSnapshot(spawns.value)]; }
function markChanged(): void { revision.value++; }
function undo(): void { const previous = undoStack.value.at(-1); if (!previous) return; spawns.value = previous; undoStack.value = undoStack.value.slice(0, -1); revision.value++; if (!selected.value) selectedUid.value = spawns.value.find((spawn) => !spawn.deleted && !spawn.isTemplate)?.uid ?? ''; status.value = '已撤销地图对象修改'; }
function duplicateSelected(): void { const spawn = selected.value; if (!spawn) return; recordUndo(); const cloned = cloneMapSpawn(spawn, spawns.value); spawns.value = [...spawns.value, cloned]; selectedUid.value = cloned.uid; markChanged(); status.value = '已复制刷新点；新对象略向右下偏移'; }
function deleteSelected(): void { const spawn = selected.value; if (!spawn || !confirm(`删除刷新点 ${spawn.reference || spawn.elementId}？`)) return; recordUndo(); spawn.deleted = true; markChanged(); selectedUid.value = spawns.value.find((item) => !item.deleted && !item.isTemplate)?.uid ?? ''; status.value = '已标记删除；保存后写入 objects.svg'; }
function beginFieldEdit(): void { recordUndo(); } function fieldChanged(): void { markChanged(); }

async function authorizeAndSave(): Promise<void> {
  if (!map.value || !settings.selectedMap || busy.value) return;
  if (!outputAuthorized.value) { try { settings.outputMapsFolder = await desktop.authorizeMapOutputRoot(settings.outputMapsFolder); outputAuthorized.value = true; } catch { const chosen = await desktop.chooseMapOutputFolder(settings.outputMapsFolder); if (!chosen) { status.value = '已取消保存：未选择模组 maps 根目录'; return; } settings.outputMapsFolder = chosen; outputAuthorized.value = true; } }
  busy.value = true;
  try { if (loadedPath.value.toLocaleLowerCase() === outputPath.value.toLocaleLowerCase()) { try { const disk = await desktop.readText(outputPath.value); if (disk !== savedSource.value && !confirm('模组 objects.svg 已被其它程序修改，仍要覆盖吗？')) return; } catch { /* removed: save as new */ } }
    const text = serializeRwrMap(map.value, spawns.value); const result = await desktop.saveMapOverride(settings.outputMapsFolder, settings.selectedMap, text); const parsed = parseRwrMap(text); map.value = parsed; spawns.value = mapSpawnSnapshot(parsed.spawns); savedSource.value = text; loadedPath.value = result.path; undoStack.value = []; revision.value++; savedRevision.value = revision.value; status.value = `已保存 ${result.path}（${(result.size / 1024 / 1024).toFixed(2)} MiB）；未创建 .bak。`;
  } catch (error) { status.value = `保存失败：${errorMessage(error)}`; } finally { busy.value = false; }
}

function pointFromClient(clientX: number, clientY: number): { x: number; y: number } { const rect = svgElement.value?.getBoundingClientRect(); if (!rect) return { x: 0, y: 0 }; return { x: view.x + (clientX - rect.left) / rect.width * view.width, y: view.y + (clientY - rect.top) / rect.height * view.height }; }
function spawnPointerDown(event: PointerEvent, spawn: MapVehicleSpawn, kind: 'move' | 'rotate'): void { event.preventDefault(); event.stopPropagation(); selectedUid.value = spawn.uid; pointerAction = { kind, uid: spawn.uid, pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, startViewX: view.x, startViewY: view.y, startViewWidth: view.width, startViewHeight: view.height, objectX: spawn.x, objectY: spawn.y, changed: false, undoRecorded: false }; interactionActive.value = true; svgElement.value?.setPointerCapture(event.pointerId); }
function backgroundPointerDown(event: PointerEvent): void { if (event.button !== 0 && event.button !== 1) return; pointerAction = { kind: 'pan', pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, startViewX: view.x, startViewY: view.y, startViewWidth: view.width, startViewHeight: view.height, objectX: 0, objectY: 0, changed: false, undoRecorded: false }; interactionActive.value = true; svgElement.value?.setPointerCapture(event.pointerId); }
function applyPointer(clientX: number, clientY: number): void { const action = pointerAction; const rect = svgElement.value?.getBoundingClientRect(); if (!action || !rect) return; if (action.kind === 'pan') { view.x = action.startViewX - (clientX - action.startClientX) / rect.width * action.startViewWidth; view.y = action.startViewY - (clientY - action.startClientY) / rect.height * action.startViewHeight; return; } const spawn = spawns.value.find((item) => item.uid === action.uid); if (!spawn) return; if (!action.undoRecorded) { recordUndo(); action.undoRecorded = true; } if (action.kind === 'move') { spawn.x = action.objectX + (clientX - action.startClientX) / rect.width * action.startViewWidth; spawn.y = action.objectY + (clientY - action.startClientY) / rect.height * action.startViewHeight; } else { const point = pointFromClient(clientX, clientY); spawn.angle = Math.atan2(point.y - spawn.y, point.x - spawn.x) * 180 / Math.PI; } action.changed = true; }
function pointerMove(event: PointerEvent): void { if (!pointerAction || pointerAction.pointerId !== event.pointerId) return; pendingPointer = { x: event.clientX, y: event.clientY }; if (!pointerFrame) pointerFrame = requestAnimationFrame(() => { pointerFrame = 0; const point = pendingPointer; pendingPointer = undefined; if (point) applyPointer(point.x, point.y); }); }
function pointerUp(event: PointerEvent): void { if (!pointerAction || pointerAction.pointerId !== event.pointerId) return; if (pointerFrame) { cancelAnimationFrame(pointerFrame); pointerFrame = 0; } if (pendingPointer) { applyPointer(pendingPointer.x, pendingPointer.y); pendingPointer = undefined; } const changed = pointerAction.changed; pointerAction = undefined; interactionActive.value = false; if (changed) markChanged(); try { svgElement.value?.releasePointerCapture(event.pointerId); } catch { /* already released */ } }
function applyWheel(): void { wheelFrame = 0; const pending = pendingWheel; pendingWheel = undefined; if (!pending) return; const anchor = pointFromClient(pending.x, pending.y); const factor = Math.exp(pending.delta * 0.0012); const nextWidth = Math.min((map.value?.width ?? 2048) * 8, Math.max(80, view.width * factor)); const ratio = nextWidth / view.width; view.x = anchor.x - (anchor.x - view.x) * ratio; view.y = anchor.y - (anchor.y - view.y) * ratio; view.width = nextWidth; view.height *= ratio; }
function wheel(event: WheelEvent): void { event.preventDefault(); interactionActive.value = true; pendingWheel = { x: event.clientX, y: event.clientY, delta: (pendingWheel?.delta ?? 0) + event.deltaY }; if (!wheelFrame) wheelFrame = requestAnimationFrame(applyWheel); window.clearTimeout(interactionTimer); interactionTimer = window.setTimeout(() => { interactionActive.value = !!pointerAction; }, 120); }
function markerTransform(spawn: MapVehicleSpawn): string { return `translate(${spawn.x} ${spawn.y}) rotate(${spawn.angle})`; }
function keydown(event: KeyboardEvent): void { const mod = event.ctrlKey || event.metaKey; if (!mod) return; if (event.key.toLocaleLowerCase() === 'z' && !event.shiftKey) { event.preventDefault(); undo(); } else if (event.key.toLocaleLowerCase() === 's') { event.preventDefault(); void authorizeAndSave(); } }
async function restoreWorkspace(): Promise<void> { await scanSourceMaps(true); if (settings.outputMapsFolder) { try { settings.outputMapsFolder = await desktop.authorizeMapOutputRoot(settings.outputMapsFolder); outputAuthorized.value = true; } catch { outputAuthorized.value = false; } } if (mapEntries.value.length) status.value = `已恢复地图工作区，共 ${mapEntries.value.length} 张地图。`; }
onMounted(() => { window.addEventListener('keydown', keydown); void restoreWorkspace(); });
onBeforeUnmount(() => { window.removeEventListener('keydown', keydown); if (imageUrl.value) URL.revokeObjectURL(imageUrl.value); if (pointerFrame) cancelAnimationFrame(pointerFrame); if (wheelFrame) cancelAnimationFrame(wheelFrame); window.clearTimeout(interactionTimer); });
</script>

<template>
  <section class="map-editor-workspace">
    <aside class="map-left-panel">
      <div class="panel-title"><small>MAP OBJECT STUDIO</small><h2>载具刷新点</h2></div>
      <div class="map-project-paths">
        <label><span>原版 maps 文件夹</span><div><input v-model="settings.sourceMapsFolder" @change="scanSourceMaps()"><button class="tiny" @click="choosePath('source')">选择</button></div></label>
        <label><span>模组 maps 文件夹</span><div><input v-model="settings.outputMapsFolder" @input="outputAuthorized = false"><button class="tiny" @click="choosePath('output')">选择</button></div></label>
        <label><span>Vehicle 文件夹</span><div><input v-model="settings.vehicleFolder"><button class="tiny" @click="choosePath('vehicles')">选择</button></div></label>
        <label><span>Faction 资源文件夹</span><div><input v-model="settings.factionFolder"><button class="tiny" @click="choosePath('factions')">选择</button></div></label>
      </div>
      <div class="map-workspace-list">
        <header><b>地图工作区</b><span>{{ mapEntries.length }}</span><button class="tiny" :disabled="busy" @click="scanSourceMaps()">刷新</button></header>
        <button v-for="entry in mapEntries" :key="entry.path" class="list-item" :class="{ active: settings.selectedMap === entry.name }" :disabled="busy || !entry.hasObjects" @click="loadProject(entry.name)"><span class="map-folder-icon">MAP</span><span><b>{{ entry.name }}</b><small>{{ entry.hasObjects ? `${entry.svgFiles.length} 个 SVG` : '缺少 objects.svg' }}</small></span></button>
        <div v-if="!mapEntries.length" class="empty-state">选择包含各地图子目录的 maps 文件夹。</div>
      </div>
      <template v-if="map">
        <div class="map-filter-box"><input v-model="search" placeholder="搜索 key、tag、图层…"><label><input v-model="showBases" type="checkbox">基地范围</label><label><input v-model="showTemplates" type="checkbox">materials 模板</label></div>
        <div class="map-layer-list"><header><b>地图图层</b><span>{{ mapLayers.length }}</span></header><label v-for="layer in mapLayers" :key="layer"><input type="checkbox" :checked="!hiddenLayers.has(layer)" @change="hiddenLayers.has(layer) ? hiddenLayers.delete(layer) : hiddenLayers.add(layer)"><span>{{ layer }}</span><em>{{ layerCounts.get(layer) ?? 0 }}</em></label></div>
        <div class="map-spawn-list"><button v-for="spawn in visibleSpawns" :key="spawn.uid" class="list-item" :class="{ active: selectedUid === spawn.uid, template: spawn.isTemplate }" @click="selectedUid = spawn.uid"><span :class="['map-ref-kind', spawn.referenceKind]">{{ spawn.referenceKind }}</span><span><b>{{ spawn.reference || '未定义' }}</b><small>{{ spawn.layer }} · {{ spawn.elementId }}</small></span></button></div>
      </template>
    </aside>

    <main class="map-canvas-panel">
      <div v-if="!map" class="viewport-empty"><b>RWR MAP OBJECT STUDIO</b><span>从左侧地图工作区点击一张地图即可载入。</span></div>
      <svg v-else ref="svgElement" class="map-canvas" :class="{ interacting: interactionActive }" :viewBox="`${view.x} ${view.y} ${view.width} ${view.height}`" @pointerdown="backgroundPointerDown" @pointermove="pointerMove" @pointerup="pointerUp" @pointercancel="pointerUp" @wheel="wheel">
        <rect x="0" y="0" :width="map.width" :height="map.height" fill="#14181b"/><image v-if="imageUrl" :href="imageUrl" x="0" y="0" :width="map.width" :height="map.height" preserveAspectRatio="none" opacity=".82"/>
        <g v-if="showBases" class="map-base-layer"><g v-for="base in map.bases" :key="base.id"><rect :x="base.x" :y="base.y" :width="base.width" :height="base.height"/><text :x="base.x + 4" :y="base.y + 14">{{ base.name }}</text></g></g>
        <g class="map-spawn-markers"><g v-for="spawn in visibleSpawns" :key="spawn.uid" v-memo="[spawn.x, spawn.y, spawn.angle, spawn.reference, spawn.referenceKind, spawn.isTemplate, spawn.uid === selectedUid]" :transform="markerTransform(spawn)" :class="{ selected: spawn.uid === selectedUid, tag: spawn.referenceKind === 'tag', template: spawn.isTemplate }" @pointerdown="spawnPointerDown($event, spawn, 'move')"><circle r="12"/><path d="M -6,-7 L 10,0 L -6,7 Z"/><circle v-if="spawn.uid === selectedUid" class="rotate-orbit" r="25"/><circle v-if="spawn.uid === selectedUid" class="rotate-handle" cx="25" cy="0" r="5" @pointerdown="spawnPointerDown($event, spawn, 'rotate')"/><text x="16" y="-14">{{ spawn.reference }}</text></g></g>
      </svg>
      <div v-if="map" class="map-canvas-help">拖动图标移动 · 拖动外圈圆点旋转 · 空白处拖动平移 · 滚轮缩放</div><div v-if="map" class="map-view-actions"><button class="tiny" @click="resetView">显示全图</button><span>{{ visibleSpawns.length }} / {{ physicalSpawns.length }} 个刷新点</span></div>
    </main>

    <aside class="map-inspector">
      <div class="panel-title"><small>INSPECTOR</small><h2>{{ selected?.reference || '未选中刷新点' }}</h2></div>
      <template v-if="selected">
        <div class="map-selection-summary"><span>{{ selected.layer }}</span><small>{{ selected.elementId }}{{ selected.isTemplate ? ' · MATERIALS 模板' : '' }}</small></div>
        <fieldset :disabled="selected.isTemplate" class="map-fields"><label><span>引用方式</span><select v-model="selected.referenceKind" @focus="beginFieldEdit" @change="fieldChanged"><option value="key">固定 key</option><option value="tag">阵营 tag</option></select></label><label><span>{{ selected.referenceKind }}</span><input v-if="selected.referenceKind === 'key'" v-model="selected.reference" list="map-vehicle-keys" @focus="beginFieldEdit" @input="fieldChanged"><input v-else v-model="selected.reference" list="map-vehicle-tags" @focus="beginFieldEdit" @input="fieldChanged"></label><label><span>X</span><input v-model.number="selected.x" type="number" step="0.1" @focus="beginFieldEdit" @input="fieldChanged"></label><label><span>Y</span><input v-model.number="selected.y" type="number" step="0.1" @focus="beginFieldEdit" @input="fieldChanged"></label><label><span>方向</span><input v-model.number="selected.angle" type="number" step="1" @focus="beginFieldEdit" @input="fieldChanged"></label></fieldset>
        <datalist id="map-vehicle-keys"><option v-for="vehicle in vehicles" :key="vehicle.key" :value="vehicle.key">{{ vehicle.name }}</option></datalist><datalist id="map-vehicle-tags"><option v-for="tag in tagOptions" :key="tag" :value="tag"/></datalist>
        <div class="map-candidates"><header><b>阵营解析结果</b><span>{{ factions.length }} 个阵营</span></header><article v-for="row in candidateRows" :key="row.faction"><strong>{{ row.faction }}</strong><div v-if="row.candidates.length"><span v-for="vehicle in row.candidates" :key="vehicle.key">{{ vehicle.name }}<small>{{ vehicle.key }} · respawn {{ vehicle.respawnTime ?? '继承/未设' }}s</small></span></div><em v-else>没有候选载具</em></article></div>
        <div v-if="selectionWarnings.length" class="map-warnings"><b>需要处理</b><span v-for="warning in selectionWarnings" :key="warning">{{ warning }}</span></div><div class="map-object-actions"><button :disabled="selected.isTemplate" @click="duplicateSelected">复制刷新点</button><button class="danger" :disabled="selected.isTemplate" @click="deleteSelected">删除</button><button :disabled="!undoStack.length" @click="undo">撤销</button></div>
      </template>
      <div v-else class="empty-state">在地图或左侧列表中选择刷新点。</div><div v-if="catalogWarnings.length" class="map-catalog-warnings"><b>载入诊断</b><span v-for="warning in catalogWarnings.slice(0, 12)" :key="warning">{{ warning }}</span></div>
      <div class="map-output-card"><b>最小模组输出</b><span>保存时自动创建对应地图目录，只写入：</span><code>{{ outputPath }}</code><small>不复制原版地图资源，也不会创建 .bak。</small><button class="primary" :disabled="!map || !dirty || busy" @click="authorizeAndSave">保存模组覆盖</button></div>
    </aside>
    <footer class="map-editor-status"><span>{{ status }}</span><span>{{ dirty ? 'objects.svg 有未保存修改' : '磁盘同步' }}</span></footer>
  </section>
</template>
