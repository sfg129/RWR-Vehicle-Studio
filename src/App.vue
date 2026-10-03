<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import EditorViewport from './components/EditorViewport.vue';
import IconRenderer from './components/IconRenderer.vue';
import ResourceDialog from './components/ResourceDialog.vue';
import OverrideDialog from './components/OverrideDialog.vue';
import BackupManagerDialog from './components/BackupManagerDialog.vue';
import WorkspaceSidebar from './components/WorkspaceSidebar.vue';
import MapObjectEditor from './components/MapObjectEditor.vue';
import { desktop, type BackupSettings, type BackupRestoreResult, type OpenedFile, type VehicleSchema, type VehicleWorkspace, type VehicleWorkspaceEntry } from './platform/desktop-api';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { confirm as tauriConfirm } from '@tauri-apps/plugin-dialog';
import { exit } from '@tauri-apps/plugin-process';
import type { UnlistenFn } from '@tauri-apps/api/event';
import { SourceDocument, type SourceNode } from './core/xml/source-document';
import { ResourceCatalog, StaleResourceApplyError } from './core/resources/resource-catalog';
import { characterSlotPositionItems, sceneEntries, turretPivotUpdates, type CharacterSlotPositionItem, type SceneEntry } from './core/vehicle/vehicle-model';
import { composeVehicle, vehicleBaseReference, type VehicleComposition } from './core/vehicle/vehicle-composition';
import { SoldierAssets } from './core/soldier/soldier-assets';
import { invalidateSoldierAssets, loadSoldierAssets } from './core/soldier/soldier-loader';
import { isValidNonNegativeInteger, isValidNumber, isValidVec3, vec3Text } from './core/math';
import {
  BUILTIN_SUPPORT_ANIMATIONS,
  BUILTIN_SUPPORT_MODEL,
  DEFAULT_RESOURCE_SELECTION,
  cloneResourceSelection,
  loadResourcePreferences,
  DEFAULT_WW2_BASE_MODEL_FOLDER,
  setWw2BaseModelFallback,
  type ResourceSelection,
} from './core/resources/resource-presets';
import { flattenWorkspace, loadWorkspacePreferences, saveWorkspacePreferences, revealWorkspacePath } from './core/workspace/vehicle-workspace';
import { createDirtyComputed, createEditorRevisions } from './core/editor/revision-state';
import { insertVehicleTab, vehiclePathKey, vehicleTabDirty, type VehicleTab } from './core/editor/vehicle-tabs';
import type { CrewGuideKind } from './editor/scene-controller';
import { formatVehicleSceneSummary, vehicleSceneSummary } from './core/vehicle/scene-summary';

const preferences = loadResourcePreferences();
const hasRememberedResources = ref(preferences.lastSelection !== undefined);
let rememberedSelection = cloneResourceSelection(preferences.lastSelection ?? DEFAULT_RESOURCE_SELECTION);
const opened = ref<OpenedFile>(); const document = shallowRef<SourceDocument>(); const previewDocument = shallowRef<SourceDocument>(); const catalog = new ResourceCatalog();
let composition: VehicleComposition | undefined;
const baseReference = ref(''); const baseOpened = ref<OpenedFile>(); const baseDocument = ref<SourceDocument>(); const baseAutomatic = ref(false); const baseError = ref('');
const savedText = ref(''); const undoStack = ref<string[]>([]);
catalog.folders = { ...rememberedSelection.folders };
catalog.secondaryFolders = {
  model: [...rememberedSelection.secondaryFolders.model],
  texture: [...rememberedSelection.secondaryFolders.texture],
  weapon: [...rememberedSelection.secondaryFolders.weapon],
};
const entries = ref<SceneEntry[]>([]); const selectedId = ref<number>(); const selectedEntrance = ref<CrewGuideKind>(); const selectedTurretPivot = ref(false); const turretPreviewDegrees = ref(0); const { documentRevision, sceneRevision, markDocumentChanged, markSceneChanged } = createEditorRevisions(); const resourceGeneration = ref(0); const status = ref('请选择 .vehicle 文件');
const missing = ref<string[]>([]); const sceneDiagnostics = ref<string[]>([]); const resourceDialog = ref(false); const overrideDialog = ref(false); const backupDialog = ref(false); const soldier = ref<SoldierAssets>();
const supportModel = ref(rememberedSelection.supportModel || BUILTIN_SUPPORT_MODEL);
const supportAnimations = ref(rememberedSelection.supportAnimations || BUILTIN_SUPPORT_ANIMATIONS);
const options = reactive({ showBroken: false, showOccupants: true, showOccupantPositions: false, showVisualBounds: true, showBounds: true, showShields: false, showEntrances: false, animate: true });
const savedWorkspace = loadWorkspacePreferences();
const vehicleWorkspace = ref<VehicleWorkspace>(); const workspaceError = ref(''); const schemaError = ref(''); const workspacePanelOpen = ref(savedWorkspace.panelOpen);
const expandedWorkspacePaths = reactive(new Set<string>(savedWorkspace.expanded));
const loadedWorkspaceDirs = new Set<string>();
const loadingWorkspaceDirs = new WeakMap<VehicleWorkspaceEntry, Promise<void>>();
const vehicleSchema = ref<VehicleSchema>({ objectTypes: [], attributes: {}, skipped: [] }); const newObjectType = ref(''); const newAttribute = ref(''); const newRootAttribute = ref(''); let schemaGeneration = 0;
interface WeaponSession { key: string; path: string; name: string; document: SourceDocument; savedText: string; undoStack: string[] }
const weaponSessions = new Map<string, WeaponSession>(); const weaponSession = ref<WeaponSession>(); const weaponLoadError = ref(''); const weaponRevision = ref(0); const weaponDirtyCount = ref(0);
const lastEditedDoc = ref<'vehicle' | string>('vehicle');
const saving = ref(false);
const activeMode = ref<'editor' | 'render' | 'map'>('editor');
const mapDirty = ref(false);
interface VehicleTabState {
  opened: OpenedFile; document: SourceDocument; savedText: string; undoStack: string[];
  baseReference: string; baseOpened?: OpenedFile; baseDocument?: SourceDocument; baseAutomatic: boolean; baseError: string;
  selectedId?: number; selectedEntrance?: CrewGuideKind; selectedTurretPivot: boolean; turretPreviewDegrees: number;
  collapsedGroups: string[]; expandedCrewSlots: number[]; expandedTurrets: number[]; lastEditedDoc: string;
  status: string; missing: string[]; diagnostics: string[];
}
const vehicleTabs = shallowRef<VehicleTab<VehicleTabState>[]>([]);
const activeVehicleTabId = ref('');
const closingVehicleTabId = ref('');
const closingVehicleTab = computed(() => vehicleTabs.value.find((tab) => tab.id === closingVehicleTabId.value));
const vehicleTabsBar = ref<HTMLElement>();
const workspaceTree = ref<HTMLElement>();
const backupEnabled = ref(false);
function backupSettingsChanged(settings: BackupSettings) {
  backupEnabled.value = settings.enabled;
  if (!settings.enabled) localStorage.removeItem(RECOVERY_KEY);
}
let workspaceRevealToken = 0;
async function revealActiveVehicle() {
  const token = ++workspaceRevealToken; const path = opened.value?.path; const workspace = vehicleWorkspace.value;
  if (!path || !workspace) return;
  const current = () => token === workspaceRevealToken && workspace === vehicleWorkspace.value && opened.value?.path === path;
  const found = await revealWorkspacePath(workspace.entries, path, expandedWorkspacePaths, loadWorkspaceChildren, current);
  if (!found || !current()) return;
  workspacePanelOpen.value = true; persistVehicleWorkspace();
  await nextTick();
  if (current()) workspaceTree.value?.querySelector('.workspace-entry.active')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
let restoringVehicleTab = false;

// 灾难关闭快速备份：脏状态确认退出时写入 localStorage，下次启动提示恢复。
const RECOVERY_KEY = 'rwr-vehicle-studio.recovery.v1';
interface RecoverySnapshot {
  timestamp: number;
  vehicle?: { name: string; path: string; workingText: string; savedText: string };
  vehicles?: { name: string; path: string; workingText: string; savedText: string }[];
  weapons: { key: string; path: string; name: string; workingText: string; savedText: string }[];
}
function captureRecoverySnapshot(): void {
  if (!backupEnabled.value) { localStorage.removeItem(RECOVERY_KEY); return; }
  rememberActiveVehicleTab();
  const vehicles = vehicleTabs.value.filter(vehicleTabDirty).map(({ state }) => ({ name: state.opened.name, path: state.opened.path, workingText: state.document.serialize(), savedText: state.savedText }));
  const weapons = [...weaponSessions.values()]
    .filter((session) => session.document.serialize() !== session.savedText)
    .map((session) => ({ key: session.key, path: session.path, name: session.name, workingText: session.document.serialize(), savedText: session.savedText }));
  if (!vehicles.length && !weapons.length) { localStorage.removeItem(RECOVERY_KEY); return; }
  const recovery: RecoverySnapshot = { timestamp: Date.now(), vehicles, weapons };
  try { localStorage.setItem(RECOVERY_KEY, JSON.stringify(recovery)); }
  catch { /* localStorage 容量不足时放弃快速备份，不阻断退出 */ }
}
function readRecoverySnapshot(): RecoverySnapshot | null {
  try {
    const raw = localStorage.getItem(RECOVERY_KEY); if (!raw) return null;
    const parsed = JSON.parse(raw) as RecoverySnapshot;
    if (!parsed.vehicle && !parsed.vehicles?.length && !parsed.weapons?.length) return null;
    return parsed;
  } catch { localStorage.removeItem(RECOVERY_KEY); return null; }
}
async function applyRecoverySnapshot(recovery: RecoverySnapshot): Promise<void> {
  const registrationFailures: string[] = [];
  const recoveredTabs: VehicleTab<VehicleTabState>[] = [];
  for (const item of recovery.vehicles ?? (recovery.vehicle ? [recovery.vehicle] : [])) {
    const state = newVehicleTabState({ name: item.name, path: item.path, text: item.workingText });
    state.savedText = item.savedText; state.document.restoreSaved(item.savedText);
    recoveredTabs.push({ id: crypto.randomUUID(), preview: false, state });
    try { await desktop.registerVehicleSession(item.path); } catch (error) { registrationFailures.push(`载具：${item.path}（${message(error)}）`); }
  }
  vehicleTabs.value = [...vehicleTabs.value, ...recoveredTabs];
  for (const item of recovery.weapons ?? []) {
    if (weaponSessions.has(item.path)) continue;
    const session: WeaponSession = { key: item.key, path: item.path, name: item.name, document: new SourceDocument(item.workingText), savedText: item.savedText, undoStack: [] };
    weaponSessions.set(item.path, session);
    try { await desktop.registerWeaponSession(item.path); } catch (error) { registrationFailures.push(`武器：${item.path}（${message(error)}）`); }
  }
  updateWeaponDirtyCount();
  if (recoveredTabs.length) await activateVehicleTab(recoveredTabs.at(-1)!.id);
  markDocumentChanged();
  if (registrationFailures.length) {
    status.value = `已恢复未保存内容，但以下原文件已不存在或不可访问：\n${registrationFailures.join('\n')}`;
  } else {
    localStorage.removeItem(RECOVERY_KEY);
  }
}
async function maybeOfferRecovery(): Promise<void> {
  if (!backupEnabled.value) return;
  const recovery = readRecoverySnapshot(); if (!recovery) return;
  let confirmed = false;
  try {
    confirmed = await tauriConfirm('检测到上次未保存修改的快速备份，是否恢复？', {
      title: 'RWR Vehicle Studio',
      kind: 'warning',
      okLabel: '恢复',
      cancelLabel: '丢弃备份',
    });
  } catch { confirmed = window.confirm('检测到上次未保存修改的快速备份，是否恢复？'); }
  if (!confirmed) { localStorage.removeItem(RECOVERY_KEY); return; }
  await applyRecoverySnapshot(recovery);
}

const groups = computed(() => {
  const labels: Record<string, string> = { physics: '基础 / 碰撞', control: '操控', tire: '轮组', turret: '炮塔与武器', visual: '外观模型', slot: '乘员位置', other: '其它对象' };
  return Object.entries(labels).map(([kind, label]) => ({ kind, label, items: entries.value.filter((e) => e.kind === kind) })).filter((g) => g.items.length);
});
function crewTreeItems(entry: SceneEntry): CharacterSlotPositionItem[] {
  const doc = previewDocument.value; if (entry.kind !== 'slot' || !doc) return [];
  return characterSlotPositionItems(doc, entry.node);
}
const selected = computed(() => entries.value.find((e) => e.node.id === selectedId.value));
const selectedWeaponKey = computed(() => selected.value?.kind === 'turret' && previewDocument.value ? previewDocument.value.value(selected.value.node, 'weapon_key') ?? '' : '');
const fields = computed(() => {
  const node = selected.value?.node; if (!node || !previewDocument.value) return [];
  const nodes = [node, ...node.children.filter((n) => ['state', 'turret', 'part'].includes(n.name))];
  return nodes.flatMap((n) => n.attributes.map((a) => ({ node: n, sourceNode: composition?.editableNode(n), attr: a.name, value: previewDocument.value!.value(n, a.name) ?? '', inherited: composition?.inherited(n) ?? false, section: n === node ? node.name : `${n.name}${previewDocument.value!.value(n, 'class') ? `:${previewDocument.value!.value(n, 'class')}` : ''}` })));
});
const rootFields = computed(() => {
  void documentRevision.value;
  const root = previewDocument.value?.root; if (!root) return [];
  return root.attributes.map((a) => ({ node: root, sourceNode: composition?.rootSource && !composition.rootInheritedAttrs.has(a.name) ? composition.rootSource : undefined, attr: a.name, value: previewDocument.value!.value(root, a.name) ?? '', inherited: composition ? composition.rootInheritedAttrs.has(a.name) : false, section: 'vehicle' }));
});
const dirty = createDirtyComputed(documentRevision, document, savedText);
const weaponDirty = computed(() => { void weaponRevision.value; return !!weaponSession.value && weaponSession.value.document.serialize() !== weaponSession.value.savedText; });
const dirtyVehicleTabs = computed(() => { void documentRevision.value; return vehicleTabs.value.filter((tab) => tab.id === activeVehicleTabId.value ? dirty.value : vehicleTabDirty(tab)); });
const anyDirty = computed(() => dirtyVehicleTabs.value.length > 0 || weaponDirtyCount.value > 0 || mapDirty.value);
const dirtyWeaponSessions = computed(() => { void weaponRevision.value; return [...weaponSessions.values()].filter((session) => session.document.serialize() !== session.savedText); });
const weaponShields = computed(() => { void weaponRevision.value; const session = weaponSession.value; if (!session) return []; return session.document.descendants('shield').map((node, index) => ({ node, index, offset: session.document.value(node, 'offset') ?? '', extent: session.document.value(node, 'extent') ?? '' })); });
const canUndo = computed(() => {
  void weaponRevision.value;
  if (lastEditedDoc.value !== 'vehicle') {
    const session = weaponSessions.get(lastEditedDoc.value);
    if (session && session.undoStack.length) return true;
  }
  return undoStack.value.length > 0;
});
const selectedEditable = computed(() => !!selected.value && !!composition?.editableNode(selected.value.node));
const workspaceRows = computed(() => flattenWorkspace(vehicleWorkspace.value?.entries ?? [], expandedWorkspacePaths));
const backupRoots = computed(() => [...new Set([
  vehicleWorkspace.value?.root,
  catalog.folders.weapon,
  ...catalog.secondaryFolders.weapon,
].filter((value): value is string => !!value))]);
const availableAttributes = computed(() => {
  const node = selected.value?.node; if (!node) return [];
  const existing = new Set(node.attributes.map((attribute) => attribute.name));
  return (vehicleSchema.value.attributes[node.name] ?? []).filter((name) => !existing.has(name));
});
const rootAvailableAttributes = computed(() => {
  void documentRevision.value;
  const root = document.value?.root; if (!root) return [];
  const existing = new Set(root.attributes.map((attribute) => attribute.name));
  const candidates = new Set(['file', ...(vehicleSchema.value.attributes.vehicle ?? [])]);
  return [...candidates].filter((name) => !existing.has(name));
});

async function openVehicle() {
  if (!allowVehicleSwitch()) return;
  const request = ++openRequestToken;
  try {
    const file = await desktop.openVehicle(); if (!file || request !== openRequestToken) return;
    await loadOpenedVehicle(file);
  }
  catch (e) { fail(e); }
}
let vehicleLoadToken = 0;
let openRequestToken = 0;
function captureVehicleTabState(): VehicleTabState | undefined {
  if (!opened.value || !document.value) return;
  return {
    opened: { ...opened.value }, document: document.value, savedText: savedText.value, undoStack: [...undoStack.value],
    baseReference: baseReference.value, baseOpened: baseOpened.value, baseDocument: baseDocument.value, baseAutomatic: baseAutomatic.value, baseError: baseError.value,
    selectedId: selectedId.value, selectedEntrance: selectedEntrance.value, selectedTurretPivot: selectedTurretPivot.value, turretPreviewDegrees: turretPreviewDegrees.value,
    collapsedGroups: [...collapsedGroups], expandedCrewSlots: [...expandedCrewSlots], expandedTurrets: [...expandedTurrets], lastEditedDoc: lastEditedDoc.value,
    status: status.value, missing: [...missing.value], diagnostics: [...sceneDiagnostics.value],
  };
}
function rememberActiveVehicleTab(): void {
  const state = captureVehicleTabState(); if (!state) return;
  vehicleTabs.value = vehicleTabs.value.map((tab) => tab.id === activeVehicleTabId.value ? { ...tab, state, preview: tab.preview && state.document.serialize() === state.savedText } : tab);
}
function retainVehicleTab(id = activeVehicleTabId.value): void {
  vehicleTabs.value = vehicleTabs.value.map((tab) => tab.id === id && tab.preview ? { ...tab, preview: false } : tab);
}
function isVehicleTabDirty(tab: VehicleTab<VehicleTabState>): boolean { return tab.id === activeVehicleTabId.value ? dirty.value : vehicleTabDirty(tab); }
function newVehicleTabState(file: OpenedFile): VehicleTabState {
  const parsed = new SourceDocument(file.text);
  if (parsed.root?.name !== 'vehicle') throw new Error(`所选文件 ${file.name} 的根元素不是 <vehicle>`);
  return {
    opened: file, document: parsed, savedText: file.text, undoStack: [], baseReference: '', baseAutomatic: false, baseError: '',
    selectedTurretPivot: false, turretPreviewDegrees: 0, collapsedGroups: [], expandedCrewSlots: [], expandedTurrets: [], lastEditedDoc: 'vehicle',
    status: `已打开 ${file.name}`, missing: [], diagnostics: [],
  };
}
async function loadOpenedVehicle(file: OpenedFile, replace = false) {
  if (saving.value) return;
  rememberActiveVehicleTab();
  const existing = vehicleTabs.value.find((tab) => vehiclePathKey(tab.state.opened.path) === vehiclePathKey(file.path));
  if (existing && !replace) { await activateVehicleTab(existing.id); return; }
  const state = newVehicleTabState(file);
  if (existing) {
    vehicleTabs.value = vehicleTabs.value.map((tab) => tab.id === existing.id ? { ...tab, state } : tab);
    if (activeVehicleTabId.value === existing.id) activeVehicleTabId.value = '';
    await activateVehicleTab(existing.id);
  } else {
    const result = insertVehicleTab(vehicleTabs.value, state); vehicleTabs.value = result.tabs;
    await activateVehicleTab(result.id);
  }
}
async function activateVehicleTab(id: string): Promise<void> {
  if (saving.value) return;
  ++openRequestToken;
  if (id === activeVehicleTabId.value) { void revealActiveVehicle(); return; }
  rememberActiveVehicleTab();
  const tab = vehicleTabs.value.find((item) => item.id === id); if (!tab) return;
  const token = ++vehicleLoadToken; ++weaponLoadToken;
  if (validateTimer !== undefined) window.clearTimeout(validateTimer);
  const state = tab.state; restoringVehicleTab = true;
  activeVehicleTabId.value = id;
  opened.value = { ...state.opened }; document.value = state.document; savedText.value = state.savedText; undoStack.value = [...state.undoStack];
  baseReference.value = state.baseReference; baseOpened.value = state.baseOpened; baseDocument.value = state.baseDocument; baseAutomatic.value = state.baseAutomatic; baseError.value = state.baseError;
  for (const [set, items] of [[collapsedGroups, state.collapsedGroups], [expandedCrewSlots, state.expandedCrewSlots], [expandedTurrets, state.expandedTurrets]] as const) { set.clear(); for (const item of items) (set as Set<string | number>).add(item); }
  lastEditedDoc.value = state.lastEditedDoc; missing.value = [...state.missing]; sceneDiagnostics.value = [...state.diagnostics]; status.value = state.status;
  weaponSession.value = undefined; weaponLoadError.value = '';
  rebuildPreview(false); if (entries.value.some((entry) => entry.node.id === state.selectedId)) selectedId.value = state.selectedId;
  selectedEntrance.value = state.selectedEntrance; selectedTurretPivot.value = state.selectedTurretPivot; turretPreviewDegrees.value = state.turretPreviewDegrees;
  markDocumentChanged(); restoringVehicleTab = false;
  void revealActiveVehicle();
  void nextTick(() => vehicleTabsBar.value?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' }));
  if (!baseOpened.value) { await resolveAutomaticBase(token); if (token === vehicleLoadToken) rebuildPreview(); }
  if (token !== vehicleLoadToken) return;
  if (hasRememberedResources.value) {
    await indexRememberedResources(rememberedSelection, token);
  } else {
    await loadSoldier(token);
    if (token !== vehicleLoadToken) return;
    resourceDialog.value = true;
  }
  if (token === vehicleLoadToken) { await loadSelectedWeaponEditor(); if (token === vehicleLoadToken) rememberActiveVehicleTab(); }
}
async function openVehiclePath(path: string): Promise<void> {
  if (!allowVehicleSwitch()) return;
  const existing = vehicleTabs.value.find((tab) => vehiclePathKey(tab.state.opened.path) === vehiclePathKey(path));
  if (existing) { await activateVehicleTab(existing.id); return; }
  const request = ++openRequestToken;
  try { const file = await desktop.openVehiclePath(path); if (request === openRequestToken) await loadOpenedVehicle(file); }
  catch (error) { if (request === openRequestToken) fail(error); }
}
async function requestCloseVehicleTab(id: string): Promise<void> {
  if (saving.value) return;
  ++openRequestToken;
  const tab = vehicleTabs.value.find((item) => item.id === id); if (!tab) return;
  if (isVehicleTabDirty(tab)) { closingVehicleTabId.value = id; return; }
  await removeVehicleTab(id);
}
async function removeVehicleTab(id: string): Promise<void> {
  const index = vehicleTabs.value.findIndex((tab) => tab.id === id); if (index < 0) return;
  const active = id === activeVehicleTabId.value;
  vehicleTabs.value = vehicleTabs.value.filter((tab) => tab.id !== id); closingVehicleTabId.value = '';
  if (!active) return;
  const next = vehicleTabs.value[Math.min(index, vehicleTabs.value.length - 1)];
  if (next) { await activateVehicleTab(next.id); return; }
  ++vehicleLoadToken; ++weaponLoadToken; ++openRequestToken;
  activeVehicleTabId.value = ''; opened.value = undefined; document.value = undefined; savedText.value = ''; undoStack.value = [];
  baseOpened.value = undefined; baseDocument.value = undefined; baseReference.value = ''; baseError.value = ''; baseAutomatic.value = false;
  weaponSession.value = undefined; selectedEntrance.value = undefined; missing.value = []; sceneDiagnostics.value = [];
  rebuildPreview(false); markDocumentChanged(); status.value = '请选择 .vehicle 文件';
}
async function saveAndCloseVehicleTab(): Promise<void> {
  const id = closingVehicleTabId.value; if (!id || saving.value) return;
  await activateVehicleTab(id);
  if (closingVehicleTabId.value !== id || activeVehicleTabId.value !== id) return;
  if (await save()) await removeVehicleTab(id);
}
async function resolveAutomaticBase(token = ++vehicleLoadToken) {
  baseOpened.value = undefined; baseDocument.value = undefined; baseAutomatic.value = false; baseError.value = '';
  baseReference.value = document.value ? vehicleBaseReference(document.value) ?? '' : '';
  if (!baseReference.value || !opened.value) return;
  try {
    const resolved = await desktop.resolveVehicleBase(opened.value.path, baseReference.value);
    if (token !== vehicleLoadToken) return;
    if (!resolved) { baseError.value = `同目录下未找到 ${baseReference.value}`; return; }
    if (resolved.path === opened.value.path) { baseError.value = '基础文件不能指向当前载具自身'; return; }
    baseOpened.value = resolved; baseDocument.value = new SourceDocument(resolved.text); baseAutomatic.value = true;
  } catch (error) { if (token === vehicleLoadToken) baseError.value = message(error); }
}
async function chooseBaseVehicle() {
  if (saving.value) return;
  const token = vehicleLoadToken;
  try {
    const chosen = await desktop.chooseVehicleBase(); if (!chosen || token !== vehicleLoadToken || saving.value) return;
    if (chosen.path === opened.value?.path) { baseError.value = '基础文件不能选择当前载具自身'; return; }
    baseOpened.value = chosen; baseDocument.value = new SourceDocument(chosen.text); baseAutomatic.value = false; baseError.value = '';
    rebuildPreview(); await validate(); if (token === vehicleLoadToken) status.value = `已手动指定基础载具：${chosen.name}`;
  } catch (error) { fail(error); }
}
async function retryAutomaticBase() {
  if (saving.value) return;
  const token = ++vehicleLoadToken;
  await resolveAutomaticBase(token); if (token !== vehicleLoadToken) return; rebuildPreview(); await validate(); if (token !== vehicleLoadToken) return;
  status.value = baseOpened.value ? `已自动匹配基础载具：${baseOpened.value.name}` : baseError.value;
}
async function openBaseVehicle() {
  if (!baseOpened.value || !allowVehicleSwitch()) return;
  await openVehiclePath(baseOpened.value.path);
}
function recomputePreview(preserveSelection = true) {
  if (!document.value) { previewDocument.value = undefined; composition = undefined; entries.value = []; selectedId.value = undefined; selectedTurretPivot.value = false; turretPreviewDegrees.value = 0; return; }
  const previous = preserveSelection ? selected.value : undefined;
  const identity = previous ? { kind: previous.kind, index: previous.index } : undefined;
  composition = composeVehicle(baseDocument.value, document.value); previewDocument.value = composition.document; entries.value = sceneEntries(composition.document);
  selectedId.value = (identity ? entries.value.find((entry) => entry.kind === identity.kind && entry.index === identity.index) : entries.value[0])?.node.id;
}
function rebuildPreview(preserveSelection = true) { recomputePreview(preserveSelection); markSceneChanged(); }
function allowVehicleSwitch(): boolean {
  if (saving.value) { status.value = '保存中，请稍后再切换载具'; return false; }
  return !closingVehicleTabId.value;
}
async function loadWorkspaceChildren(entry: VehicleWorkspaceEntry): Promise<void> {
  const pending = loadingWorkspaceDirs.get(entry); if (pending) return pending;
  if (!entry.isDirectory || loadedWorkspaceDirs.has(entry.path)) return;
  const workspace = vehicleWorkspace.value;
  const request = (async () => {
    try {
      entry.children = await desktop.listWorkspaceDir(entry.path);
      if (vehicleWorkspace.value === workspace) loadedWorkspaceDirs.add(entry.path);
    } catch (error) { status.value = `目录读取失败：${entry.path}（${message(error)}）`; }
    finally { loadingWorkspaceDirs.delete(entry); }
  })();
  loadingWorkspaceDirs.set(entry, request);
  return request;
}
async function loadExpandedWorkspaceChildren(entries: VehicleWorkspaceEntry[]): Promise<void> {
  for (const entry of entries) {
    if (entry.isDirectory && expandedWorkspacePaths.has(entry.path)) {
      await loadWorkspaceChildren(entry);
      await loadExpandedWorkspaceChildren(entry.children);
    }
  }
}
async function chooseVehicleWorkspace() {
  try {
    const chosen = await desktop.chooseVehicleWorkspace(); if (!chosen) return;
    vehicleWorkspace.value = chosen; workspaceError.value = ''; schemaError.value = ''; expandedWorkspacePaths.clear(); loadedWorkspaceDirs.clear(); workspacePanelOpen.value = true; persistVehicleWorkspace();
    status.value = `载具工作区：${chosen.root}`;
    void revealActiveVehicle();
    await refreshVehicleSchema(chosen.root);
  } catch (error) { workspaceError.value = message(error); fail(error); }
}
async function restoreVehicleWorkspace() {
  if (!savedWorkspace.root) return;
  try {
    vehicleWorkspace.value = await desktop.scanVehicleWorkspace(savedWorkspace.root); workspaceError.value = ''; schemaError.value = '';
    loadedWorkspaceDirs.clear(); await loadExpandedWorkspaceChildren(vehicleWorkspace.value.entries);
  }
  catch (error) { workspaceError.value = message(error); status.value = `载具工作区不可用：${workspaceError.value}`; return; }
  await refreshVehicleSchema(savedWorkspace.root);
}
async function refreshVehicleSchema(root: string) {
  const generation = ++schemaGeneration;
  try {
    const schema = await desktop.scanVehicleSchema(root);
    if (generation !== schemaGeneration) return;
    vehicleSchema.value = schema; schemaError.value = ''; newObjectType.value = schema.objectTypes[0] ?? ''; newAttribute.value = '';
    if (schema.skipped.length) status.value = `载具结构扫描跳过 ${schema.skipped.length} 个无法解析的文件`;
  } catch (error) {
    if (generation !== schemaGeneration) return;
    vehicleSchema.value = { objectTypes: [], attributes: {}, skipped: [] };
    schemaError.value = `载具结构扫描失败：${message(error)}`;
    status.value = schemaError.value;
  }
}
const collapsedGroups = reactive(new Set<string>());
const expandedCrewSlots = reactive(new Set<number>());
const expandedTurrets = reactive(new Set<number>());
function toggleWorkspacePanel() { workspacePanelOpen.value = !workspacePanelOpen.value; persistVehicleWorkspace(); }
function toggleGroup(kind: string) { if (collapsedGroups.has(kind)) collapsedGroups.delete(kind); else collapsedGroups.add(kind); }
function toggleCrewSlot(id: number) { if (expandedCrewSlots.has(id)) expandedCrewSlots.delete(id); else expandedCrewSlots.add(id); }
function toggleTurret(id: number) { if (expandedTurrets.has(id)) expandedTurrets.delete(id); else expandedTurrets.add(id); }
function collapseAnim(node: HTMLElement, from: string, to: string, done: () => void) {
  let finished = false;
  const finish = () => { if (finished) return; finished = true; node.style.height = ''; done(); };
  const anim = node.animate([{ height: from }, { height: to }], { duration: 250, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' });
  anim.onfinish = finish; anim.oncancel = finish;
}
function onCollapseEnter(el: Element, done: () => void) {
  const node = el as HTMLElement;
  node.style.height = '0px';
  collapseAnim(node, '0px', `${node.scrollHeight}px`, done);
}
function onCollapseLeave(el: Element, done: () => void) {
  const node = el as HTMLElement;
  collapseAnim(node, `${node.scrollHeight}px`, '0px', done);
}
function persistVehicleWorkspace() { saveWorkspacePreferences({ root: vehicleWorkspace.value?.root ?? savedWorkspace.root, expanded: [...expandedWorkspacePaths], panelOpen: workspacePanelOpen.value }); }
async function activateWorkspaceEntry(entry: VehicleWorkspaceEntry) {
  if (entry.isDirectory) {
    const expanding = !expandedWorkspacePaths.has(entry.path);
    if (expanding) expandedWorkspacePaths.add(entry.path); else expandedWorkspacePaths.delete(entry.path);
    if (expanding) await loadWorkspaceChildren(entry);
    persistVehicleWorkspace(); return;
  }
  if (!entry.isVehicle) { const warning = `“${entry.name}”不是 .vehicle 载具文件`; status.value = warning; alert(warning); return; }
  if (!allowVehicleSwitch()) return;
  try { await openVehiclePath(entry.path); }
  catch (error) { fail(error); }
}
async function indexRememberedResources(selection: ResourceSelection, token: number) {
  try {
    const fallbackAvailable = await desktop.directoryExists(DEFAULT_WW2_BASE_MODEL_FOLDER); if (token !== vehicleLoadToken) return;
    const resolvedSelection = setWw2BaseModelFallback(selection, fallbackAvailable);
    const applied = await catalog.applyFolders({ ...resolvedSelection.folders }, false, resolvedSelection.secondaryFolders); if (token !== vehicleLoadToken) return;
    await resourcesApplied(resolvedSelection, token, applied.changed);
  } catch (error) {
    if (token !== vehicleLoadToken || error instanceof StaleResourceApplyError) return;
    status.value = `上次使用的资源路径不可用：${message(error)}`; resourceDialog.value = true;
  }
}
async function resourcesApplied(selection: ResourceSelection, token = ++vehicleLoadToken, resourceChanged = true) {
  hasRememberedResources.value = true;
  rememberedSelection = cloneResourceSelection(selection); supportModel.value = selection.supportModel; supportAnimations.value = selection.supportAnimations;
  resourceDialog.value = false; if (resourceChanged) invalidateSoldierAssets(); const soldierLoaded = await loadSoldier(token); if (token !== vehicleLoadToken) return; if (!soldierLoaded) { resourceDialog.value = true; return; } await validate(); if (token !== vehicleLoadToken) return; if (resourceChanged) resourceGeneration.value++; markSceneChanged(); for (const session of weaponSessions.values()) { try { await desktop.registerWeaponSession(session.path); } catch { /* 文件可能已在会话期间被移动或删除 */ } } await loadSelectedWeaponEditor();
  if (token !== vehicleLoadToken) return;
  const diagnostics = catalog.scanDiagnostics; const total = diagnostics.duplicates.length + diagnostics.warnings.length;
  status.value = total ? `资源扫描发现 ${total} 个问题` : '';
}
async function loadSoldier(token = ++vehicleLoadToken): Promise<boolean> {
  if (!supportModel.value || !supportAnimations.value) {
    soldier.value = undefined;
    return true;
  }
  try {
    const assets = await loadSoldierAssets(supportModel.value, supportAnimations.value);
    if (token !== vehicleLoadToken) return false;
    soldier.value = assets;
    return true;
  } catch (error) {
    if (token === vehicleLoadToken) {
      soldier.value = undefined;
      status.value = `人物预览未载入：${message(error)}。请确认文件仍然存在且可读取。`;
      resourceDialog.value = true;
    }
    return false;
  }
}
let weaponLoadToken = 0;
async function loadSelectedWeaponEditor() {
  const token = ++weaponLoadToken; const key = selectedWeaponKey.value; weaponLoadError.value = '';
  if (!key) { weaponSession.value = undefined; return; }
  weaponSession.value = undefined;
  try {
    const weaponResult = await catalog.weapon(key); if (token !== weaponLoadToken) return;
    if (!weaponResult.ok) { weaponSession.value = undefined; weaponLoadError.value = weaponResult.message; return; }
    const weapon = weaponResult.value;
    const sessionKey = weapon.sourcePath; let session = weaponSessions.get(sessionKey);
    if (!session) {
      const text = await desktop.readText(weapon.sourcePath); if (token !== weaponLoadToken) return;
      session = { key, path: weapon.sourcePath, name: weapon.sourcePath.replaceAll('\\', '/').split('/').at(-1) ?? key, document: new SourceDocument(text), savedText: text, undoStack: [] };
      weaponSessions.set(sessionKey, session);
      try { await desktop.registerWeaponSession(session.path); } catch (error) { if (token === weaponLoadToken) status.value = `武器注册失败：${message(error)}`; }
    } else { session.key = key; catalog.setWeaponPreview(key, session.path, session.document.serialize()); }
    if (token !== weaponLoadToken) return;
    weaponSession.value = session; weaponRevision.value++;
  } catch (error) { if (token === weaponLoadToken) { weaponSession.value = undefined; weaponLoadError.value = message(error); } }
}
function updateWeaponDirtyCount() { weaponDirtyCount.value = [...weaponSessions.values()].filter((session) => session.document.serialize() !== session.savedText).length; }
function refreshWeaponPreview() {
  const session = weaponSession.value; if (!session) return;
  catalog.setWeaponPreview(session.key, session.path, session.document.serialize()); weaponRevision.value++; updateWeaponDirtyCount(); markSceneChanged();
}
function editShield(node: SourceNode, attr: 'offset' | 'extent', event: Event) {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  const session = weaponSession.value; if (!session) return; const value = (event.target as HTMLInputElement).value;
  if (session.document.value(node, attr) === value) return;
  if (!isValidVec3(value)) { status.value = `shield ${attr} 需要 3 个数字（x y z），已忽略本次输入`; return; }
  recordWeaponUndo(session); session.document.set(node, attr, value); refreshWeaponPreview();
}
function addShield() {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  const session = weaponSession.value; if (!session?.document.root) return;
  recordWeaponUndo(session); session.document.appendChild(session.document.root, 'shield', { offset: '0 0 0', extent: '1 1 1' }); refreshWeaponPreview(); status.value = `已向 ${session.name} 增加 shield（尚未保存）`;
}
function deleteShield(node: SourceNode) {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  const session = weaponSession.value; if (!session) return;
  recordWeaponUndo(session); session.document.removeNode(node); refreshWeaponPreview(); status.value = `已从 ${session.name} 删除 shield（尚未保存）`;
}
async function saveWeaponShields() { if (!weaponSession.value || saving.value) return; saving.value = true; try { await saveWeaponSession(weaponSession.value); } finally { saving.value = false; } }
async function saveOneWeapon(session: WeaponSession) { if (saving.value) return; saving.value = true; try { await saveWeaponSession(session); } finally { saving.value = false; } }
async function saveWeaponSession(session: WeaponSession) {
  try {
    const disk = await desktop.readText(session.path);
    if (disk !== session.savedText && !confirm('该武器文件已被其它程序修改，仍要用当前内容覆盖吗？')) return;
  } catch (error) {
    if (!confirm(`无法确认磁盘上的武器文件是否被修改：${message(error)}\n仍要强制覆盖吗？`)) return;
  }
  try {
    const text = session.document.serialize(); const saved = await desktop.saveWeapon(session.path, text); session.savedText = text;
    if (session.document.serialize() === text) { session.document.commit(text); }
    else { session.document.restoreSaved(text); }
    catalog.setWeaponPreview(session.key, session.path, text); weaponRevision.value++; updateWeaponDirtyCount(); markSceneChanged();
    status.value = saved.backupPath ? `已保存武器：${saved.path}；备份：${saved.backupPath}` : `已保存武器：${saved.path}`;
  } catch (error) { fail(error); }
}
function discardWeaponSession(session: WeaponSession) {
  if (saving.value) { status.value = '保存中，请稍后再放弃武器修改'; return; }
  session.document = new SourceDocument(session.savedText); session.undoStack = [];
  catalog.setWeaponPreview(session.key, session.path, session.document.serialize()); weaponRevision.value++; updateWeaponDirtyCount(); markSceneChanged();
  status.value = `已放弃 ${session.name} 的未保存修改`;
}
async function saveAllWeapons() {
  if (saving.value) return;
  saving.value = true;
  try {
    for (const session of [...weaponSessions.values()]) if (session.document.serialize() !== session.savedText) await saveWeaponSession(session);
  } finally { saving.value = false; }
}
function discardAllWeapons() { for (const session of [...weaponSessions.values()]) discardWeaponSession(session); }
async function reloadWeaponShields() {
  const session = weaponSession.value; if (!session || saving.value) { if (saving.value) status.value = '保存中，请稍后再重新载入武器'; return; }
  if (weaponDirty.value && !confirm('未保存的护盾修改将丢失，仍要从磁盘重新载入武器吗？')) return;
  try {
    const text = await desktop.readText(session.path); session.document = new SourceDocument(text); session.savedText = text; session.undoStack = [];
    catalog.setWeaponPreview(session.key, session.path, text); weaponRevision.value++; updateWeaponDirtyCount(); markSceneChanged(); status.value = `已重新载入武器：${session.name}`;
  } catch (error) { fail(error); }
}
async function validate() {
  if (!previewDocument.value) return;
  const token = vehicleLoadToken; const target = previewDocument.value;
  const diagnostics = catalog.scanDiagnostics;
  const unresolved = await catalog.missing(target);
  if (token !== vehicleLoadToken || target !== previewDocument.value) return;
  missing.value = [
    ...unresolved,
    ...diagnostics.duplicates.map((item) => `重复资源：${item}`),
    ...diagnostics.warnings.map((item) => `扫描警告：${item}`),
  ];
}
const RESOURCE_ATTRS = new Set(['mesh_filename', 'texture_filename', 'weapon_key']);
const VEC3_ATTRS = new Set(['offset', 'position', 'extent', 'visual_offset', 'collision_model_pos', 'collision_model_extent', 'seat_position', 'enter_position', 'weapon_offset']);
const NUMBER_ATTRS = new Set(['rotation', 'mass', 'speed', 'radius', 'turn_speed']);
const INTEGER_ATTRS = new Set(['turret_index', 'parent_turret_index', 'attached_on_turret', 'animation_id']);
const ATTR_DEFAULTS: Record<string, string> = {
  file: '', offset: '0 0 0', position: '0 0 0', extent: '1 1 1', visual_offset: '0 0 0',
  collision_model_pos: '0 0 0', collision_model_extent: '1 1 1', seat_position: '0 0 0', enter_position: '0 0 0', weapon_offset: '0 0 0',
  rotation: '0', mass: '0', speed: '0', radius: '0', turn_speed: '0', turret_index: '0', parent_turret_index: '0', attached_on_turret: '0', animation_id: '0',
};
let validateTimer: number | undefined;
function scheduleValidate() {
  if (validateTimer !== undefined) window.clearTimeout(validateTimer);
  validateTimer = window.setTimeout(() => { void validate(); }, 300);
}
function select(id: number, guide?: CrewGuideKind) { selectedId.value = id; selectedEntrance.value = guide; selectedTurretPivot.value = false; turretPreviewDegrees.value = 0; }
function selectTurretPivot(entry: SceneEntry) { selectedId.value = entry.node.id; selectedEntrance.value = undefined; selectedTurretPivot.value = true; turretPreviewDegrees.value = 0; }
function selectCrewTreeItem(entry: SceneEntry, item: CharacterSlotPositionItem) {
  if (item.guide) options.showEntrances = true;
  select(entry.node.id, item.guide);
}
function pushSceneDiagnostic(message: string) { sceneDiagnostics.value = [...sceneDiagnostics.value.slice(-19), message]; }
function clearSceneDiagnostics() { sceneDiagnostics.value = []; }
function recordUndo() { lastEditedDoc.value = 'vehicle'; if (!document.value) return; const snapshot = document.value.serialize(); if (undoStack.value.at(-1) !== snapshot) undoStack.value = [...undoStack.value.slice(-99), snapshot]; }
function recordWeaponUndo(session: WeaponSession) {
  retainVehicleTab();
  lastEditedDoc.value = session.path; const snapshot = session.document.serialize();
  if (session.undoStack.at(-1) !== snapshot) session.undoStack = [...session.undoStack.slice(-99), snapshot];
}
function undoWeapon(session: WeaponSession) {
  if (saving.value) { status.value = '保存中，请稍后再撤销'; return; }
  const previous = session.undoStack.at(-1); if (!previous) return;
  session.undoStack = session.undoStack.slice(0, -1); session.document = new SourceDocument(previous); session.document.restoreSaved(session.savedText);
  catalog.setWeaponPreview(session.key, session.path, session.document.serialize()); weaponRevision.value++; updateWeaponDirtyCount(); markSceneChanged(); status.value = `已撤销武器修改：${session.name}`;
}
async function edit(field: { sourceNode?: SourceNode; attr: string; node?: SourceNode }, event: Event) {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value || !field.sourceNode) { status.value = '该属性继承自基础载具；请打开基础文件后编辑'; return; }
  const value = (event.target as HTMLInputElement).value; if (document.value.value(field.sourceNode, field.attr) === value) return;
  if (VEC3_ATTRS.has(field.attr) && !isValidVec3(value)) { status.value = `${field.attr} 需要 3 个数字（x y z），已忽略本次输入`; return; }
  if ((NUMBER_ATTRS.has(field.attr) || (field.node?.name === 'modifier' && field.attr === 'value')) && !isValidNumber(value)) { status.value = `${field.attr} 需要数字，已忽略本次输入`; return; }
  if (INTEGER_ATTRS.has(field.attr) && !isValidNonNegativeInteger(value)) { status.value = `${field.attr} 需要非负整数，已忽略本次输入`; return; }
  recordUndo(); document.value.set(field.sourceNode, field.attr, value); markDocumentChanged();
  if (field.attr === 'file' && field.node === previewDocument.value?.root) {
    const token = ++vehicleLoadToken; await resolveAutomaticBase(token); if (token !== vehicleLoadToken) return; rebuildPreview(false); scheduleValidate();
    status.value = baseError.value ? `基础载具解析失败：${baseError.value}` : `已更新基础载具引用：${value || '（无）'}`;
    return;
  }
  rebuildPreview(); if (RESOURCE_ATTRS.has(field.attr)) scheduleValidate();
}
function move(node: SourceNode, attr: string, value: [number, number, number], needsRebuild: boolean) {
  if (saving.value) { status.value = '保存中，已忽略本次拖拽'; return; }
  if (!document.value) return; const sourceNode = composition?.editableNode(node);
  if (!sourceNode) { status.value = '该位置继承自基础载具；请打开基础文件后编辑'; rebuildPreview(); return; }
  const text = vec3Text(value); if (document.value.value(sourceNode, attr) === text) return;
  recordUndo(); document.value.set(sourceNode, attr, text); markDocumentChanged();
  if (needsRebuild) rebuildPreview(); else recomputePreview();
  status.value = `${attr} = ${text}`;
}
function sourceNodePath(node: SourceNode): number[] {
  const path: number[] = []; let current: SourceNode | null = node;
  while (current?.parent) { path.unshift(current.parent.children.indexOf(current)); current = current.parent; }
  return path;
}
function sourceNodeAtPath(path: number[]): SourceNode | undefined {
  let current = document.value?.root;
  for (const index of path) current = current?.children[index];
  return current;
}
function moveTurretPivot(node: SourceNode, value: [number, number, number]) {
  if (saving.value) { status.value = '保存中，已忽略本次拖拽'; return; }
  if (!document.value || !previewDocument.value) return;
  const updates = turretPivotUpdates(previewDocument.value, node, value);
  const editable = updates.map((update) => {
    const source = composition?.editableNode(update.node); return source ? { ...update, path: sourceNodePath(source) } : undefined;
  });
  if (!updates.length || editable.some((update) => !update)) {
    status.value = '该旋转中点或其关联位置继承自基础载具，无法在覆盖文件中整体修改'; rebuildPreview(); return;
  }
  const changed = editable.some((update) => update && document.value!.value(sourceNodeAtPath(update.path)!, update.attr) !== vec3Text(update.value));
  if (!changed) return;
  recordUndo();
  for (const update of editable) {
    if (!update) continue;
    const source = sourceNodeAtPath(update.path); if (!source) continue;
    const text = vec3Text(update.value);
    if (document.value.value(source, update.attr) === undefined) document.value.addAttribute(source, update.attr, text);
    else document.value.set(source, update.attr, text);
  }
  markDocumentChanged(); rebuildPreview();
  status.value = `旋转中点 = ${vec3Text(value)}；已补偿炮塔外观、武器及直接附属对象`;
}
function rotateEntrance(node: SourceNode, attr: 'rotation' | 'exit_rotation', value: number) {
  if (saving.value) { status.value = '保存中，已忽略本次拖拽'; return; }
  if (!document.value) return; const sourceNode = composition?.editableNode(node);
  if (!sourceNode) { status.value = '该乘员方向继承自基础载具；请打开基础文件后编辑'; rebuildPreview(); return; }
  const text = Number(value.toFixed(5)).toString(); if (document.value.value(sourceNode, attr) === text) return;
  recordUndo(); document.value.set(sourceNode, attr, text); markDocumentChanged(); rebuildPreview();
  status.value = `${attr} = ${text}`;
}
function revert() {
  if (saving.value) { status.value = '保存中，已忽略本次恢复'; return; }
  if (!document.value || !selected.value) return; const sourceNode = composition?.editableNode(selected.value.node);
  if (!sourceNode) { status.value = '继承项不能在覆盖文件中恢复；请打开基础文件'; return; }
  recordUndo(); document.value.revertNode(sourceNode); markDocumentChanged(); rebuildPreview(); scheduleValidate();
}
function addEmptyObject() {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value?.root || !newObjectType.value) return;
  recordUndo(); document.value.appendChild(document.value.root, newObjectType.value); markDocumentChanged(); rebuildPreview(false); scheduleValidate();
  const added = [...entries.value].reverse().find((entry) => entry.node.name === newObjectType.value && !composition?.inherited(entry.node));
  selectedId.value = added?.node.id; status.value = `已增加空对象 <${newObjectType.value} />`;
}
function deleteSelectedObject() {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value || !selected.value) return; const sourceNode = composition?.editableNode(selected.value.node);
  if (!sourceNode) { status.value = '继承自基础载具的对象不能在覆盖文件中删除'; return; }
  recordUndo(); const name = sourceNode.name; document.value.removeNode(sourceNode); markDocumentChanged(); rebuildPreview(false); status.value = `已删除对象 <${name}>；可用 Ctrl+Z 恢复`; scheduleValidate();
}
function addSelectedAttribute() {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value || !selected.value || !newAttribute.value) return; const sourceNode = composition?.editableNode(selected.value.node);
  if (!sourceNode) { status.value = '继承自基础载具的对象不能在覆盖文件中增加属性'; return; }
  recordUndo(); const name = newAttribute.value; document.value.addAttribute(sourceNode, name, ATTR_DEFAULTS[name] ?? '0'); markDocumentChanged(); rebuildPreview(); newAttribute.value = ''; status.value = `已加入属性 ${name}`; if (RESOURCE_ATTRS.has(name)) scheduleValidate();
}
async function addRootAttribute() {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value?.root || !newRootAttribute.value) return;
  const name = newRootAttribute.value;
  recordUndo();
  document.value.addAttribute(document.value.root, name, name === 'file' ? '' : ATTR_DEFAULTS[name] ?? '0'); markDocumentChanged(); newRootAttribute.value = '';
  if (name === 'file') {
    const token = ++vehicleLoadToken; await resolveAutomaticBase(token); if (token !== vehicleLoadToken) return; rebuildPreview(false); scheduleValidate();
    status.value = baseError.value ? `基础载具解析失败：${baseError.value}` : '已加入基础载具引用（file 为空，请填写文件名）';
    return;
  }
  rebuildPreview(); status.value = `已加入根属性 ${name}`;
}
async function deleteAttribute(field: { sourceNode?: SourceNode; attr: string; node?: SourceNode }) {
  if (saving.value) { status.value = '保存中，已忽略本次编辑'; return; }
  if (!document.value || !field.sourceNode) { status.value = '继承属性不能在覆盖文件中删除'; return; }
  recordUndo(); const name = field.attr; document.value.removeAttribute(field.sourceNode, name); markDocumentChanged();
  if (name === 'file' && field.node === previewDocument.value?.root) {
    const token = ++vehicleLoadToken; await resolveAutomaticBase(token); if (token !== vehicleLoadToken) return; rebuildPreview(false); scheduleValidate();
    status.value = baseError.value ? `基础载具解析失败：${baseError.value}` : '已删除基础载具引用';
    return;
  }
  rebuildPreview(); status.value = `已删除属性 ${name}；可用 Ctrl+Z 恢复`; if (RESOURCE_ATTRS.has(name)) scheduleValidate();
}
async function undo() {
  if (saving.value) { status.value = '保存中，请稍后再撤销'; return; }
  if (lastEditedDoc.value !== 'vehicle') {
    const session = weaponSessions.get(lastEditedDoc.value);
    if (session && session.undoStack.length) { undoWeapon(session); return; }
  }
  const previous = undoStack.value.at(-1); if (!previous) return;
  const previousBaseReference = document.value ? vehicleBaseReference(document.value) ?? '' : '';
  undoStack.value = undoStack.value.slice(0, -1); document.value = new SourceDocument(previous); document.value.restoreSaved(savedText.value); markDocumentChanged();
  const nextBaseReference = vehicleBaseReference(document.value) ?? '';
  if (previousBaseReference !== nextBaseReference) {
    const token = ++vehicleLoadToken; await resolveAutomaticBase(token); if (token !== vehicleLoadToken) return;
  }
  rebuildPreview(); scheduleValidate(); status.value = '已撤销上一次修改';
}
async function save(saveAs = false): Promise<boolean> {
  if (!document.value || !opened.value || saving.value) return false;
  const structuralErrors = document.value.structuralErrors;
  if (structuralErrors.length) {
    const detail = structuralErrors.slice(0, 5).join('\n');
    if (!confirm(`该载具 XML 存在结构问题，保存后可能无法在游戏中加载：\n${detail}\n\n仍要保存吗？`)) { status.value = `已取消保存：存在 ${structuralErrors.length} 处 XML 结构问题`; return false; }
  }
  saving.value = true;
  try {
    if (!saveAs) {
      try {
        const disk = await desktop.readText(opened.value.path);
        if (disk !== savedText.value && !confirm('该文件已被其它程序修改，仍要用当前内容覆盖吗？')) return false;
      } catch (error) {
        if (!confirm(`无法确认磁盘上的文件是否被修改：${message(error)}\n仍要强制覆盖吗？`)) return false;
      }
    }
    const protectedPaths = vehicleTabs.value.filter((tab) => tab.id !== activeVehicleTabId.value).map((tab) => tab.state.opened.path);
    const text = document.value.serialize(); const wasAutomaticBase = baseAutomatic.value; const saved = await desktop.saveVehicle(opened.value.path, text, saveAs, protectedPaths); if (!saved) return false; opened.value = { name: saved.name, path: saved.path, text }; savedText.value = text;
    if (document.value.serialize() === text) { document.value.commit(text); document.value.markSaved(); }
    else { document.value.restoreSaved(text); }
    markDocumentChanged(); if (saveAs && wasAutomaticBase) await resolveAutomaticBase(); rebuildPreview(); status.value = saved.backupPath ? `已保存；备份：${saved.backupPath}` : `已保存：${saved.path}`;
    retainVehicleTab(); rememberActiveVehicleTab(); return true;
  }
  catch (e) { fail(e); return false; }
  finally { saving.value = false; }
}
async function reload() { if (!opened.value || saving.value) { if (saving.value) status.value = '保存中，请稍后再重新载入'; return; }
  if (dirty.value && !confirm('此载具的未保存修改将丢失，仍要重新载入吗？')) return;
  const token = vehicleLoadToken; const file = opened.value;
  try { const text = await desktop.readText(file.path); if (token !== vehicleLoadToken || saving.value) return; await loadOpenedVehicle({ ...file, text }, true); } catch (e) { if (token === vehicleLoadToken) fail(e); } }
async function overrideChanged() { await validate(); resourceGeneration.value++; markSceneChanged(); await loadSelectedWeaponEditor(); }
function fail(e: unknown) { status.value = `错误：${message(e)}`; }
function message(e: unknown) { return e instanceof Error ? e.message : String(e); }
function keydown(event: KeyboardEvent) {
  if (closingVehicleTabId.value) { if (event.key === 'Escape' && !saving.value) closingVehicleTabId.value = ''; if (event.ctrlKey || event.metaKey) event.preventDefault(); return; }
  const mod = event.ctrlKey || event.metaKey;
  if (!mod) return;
  const key = event.key.toLowerCase();
  if (activeMode.value === 'map') return;
  if (activeMode.value === 'render') {
    if (key === 'o' && !event.shiftKey) { event.preventDefault(); void openVehicle(); }
    return;
  }
  if (key === 'w') { event.preventDefault(); void requestCloseVehicleTab(activeVehicleTabId.value); return; }
  if (key === 'tab') {
    event.preventDefault(); const tabs = vehicleTabs.value; const index = tabs.findIndex((tab) => tab.id === activeVehicleTabId.value);
    if (tabs.length) void activateVehicleTab(tabs[(index + (event.shiftKey ? -1 : 1) + tabs.length) % tabs.length].id);
    return;
  }
  if (event.shiftKey && key === 's') { event.preventDefault(); void save(true); return; }
  if (event.shiftKey) return;
  if (key === 'z') { event.preventDefault(); void undo(); return; }
  if (key === 's') { event.preventDefault(); void save(false); return; }
  if (key === 'o') { event.preventDefault(); void openVehicle(); return; }
  if (key === 'r') { event.preventDefault(); void reload(); return; }
}
async function backupRestored(result: BackupRestoreResult) {
  const key = (path: string) => path.replaceAll('\\', '/').toLocaleLowerCase();
  try {
    if (vehicleTabs.value.some((tab) => key(tab.state.opened.path) === key(result.sourcePath))) {
      await loadOpenedVehicle(await desktop.openVehiclePath(result.sourcePath), true);
      status.value = `已从备份恢复并重新载入：${opened.value?.name ?? result.sourcePath}`;
      return;
    }
    const session = [...weaponSessions.values()].find((value) => key(value.path) === key(result.sourcePath));
    if (session) {
      const text = await desktop.readText(session.path); session.document = new SourceDocument(text); session.savedText = text; session.undoStack = [];
      updateWeaponDirtyCount(); weaponRevision.value++; if (weaponSession.value?.path === session.path) weaponSession.value = session; markSceneChanged();
      status.value = `已从备份恢复并重新载入武器：${session.name}`;
      return;
    }
    status.value = `已从备份恢复：${result.sourcePath}`;
  } catch (error) { fail(error); }
}
watch(selectedWeaponKey, () => { void loadSelectedWeaponEditor(); });
watch(documentRevision, () => { if (!restoringVehicleTab && dirty.value) retainVehicleTab(); }, { flush: 'sync' });
const sceneSummary = ref('');
let sceneSummaryToken = 0;
watch([previewDocument, sceneRevision, resourceGeneration], async () => {
  const token = ++sceneSummaryToken;
  const doc = previewDocument.value;
  if (!doc) { sceneSummary.value = ''; return; }
  try {
    const summary = await vehicleSceneSummary(doc, catalog);
    if (token === sceneSummaryToken) sceneSummary.value = formatVehicleSceneSummary(summary);
  } catch { if (token === sceneSummaryToken) sceneSummary.value = ''; }
}, { immediate: true });
let unlistenClose: UnlistenFn | undefined;
let exiting = false;
let closeRequestPending = false;
onMounted(async () => {
  window.addEventListener('keydown', keydown);
  // RV-043 / R4-016: Tauri native close-request is the only desktop close guard.
  try {
    const appWindow = getCurrentWindow();
    unlistenClose = await appWindow.onCloseRequested(async (event) => {
      event.preventDefault();

      if (exiting || closeRequestPending) return;

      if (saving.value) {
        status.value = '保存正在进行，请稍后再退出';
        return;
      }

      closeRequestPending = true;

      try {
        if (anyDirty.value) {
          let confirmed = false;

          try {
            confirmed = await tauriConfirm('有未保存修改，仍要退出吗？', {
              title: 'RWR Vehicle Studio',
              kind: 'warning',
              okLabel: '退出',
              cancelLabel: '取消',
            });
          } catch {
            confirmed = window.confirm('有未保存修改，仍要退出吗？');
          }

          if (!confirmed) return;

          captureRecoverySnapshot();
        }

        exiting = true;
        await exit(0);
      } catch (error) {
        exiting = false;
        status.value = `退出应用失败：${message(error)}`;
      } finally {
        if (!exiting) closeRequestPending = false;
      }
    });
  } catch { /* 纯浏览器 / 非 Tauri runtime 时没有原生 close guard */ }
  try { backupSettingsChanged(await desktop.getBackupSettings()); } catch (error) { fail(error); }
  await restoreVehicleWorkspace(); nextTick();
  await maybeOfferRecovery();
});
onBeforeUnmount(() => {
  unlistenClose?.();
  unlistenClose = undefined;
  window.removeEventListener('keydown', keydown);
});
</script>

<template>
  <main class="app-shell">
    <header class="topbar">
      <div class="brand"><strong>RWR VEHICLE STUDIO</strong><small>0.91</small></div>
      <nav>
        <span class="mode-tabs"><button :class="{ active: activeMode === 'editor' }" @click="activeMode = 'editor'">VEHICLE 编辑器</button><button :class="{ active: activeMode === 'render' }" @click="activeMode = 'render'">ICON 渲染</button><button :class="{ active: activeMode === 'map' }" @click="activeMode = 'map'">MAP 对象</button></span><span class="divider"></span>
        <template v-if="activeMode !== 'map'"><button @click="openVehicle">打开载具</button><button @click="resourceDialog = true">资源文件夹</button><button @click="overrideDialog = true">文件覆盖</button><button @click="backupDialog = true">管理备份</button></template>
        <template v-if="activeMode === 'editor'"><span class="divider"></span><button :disabled="!canUndo" title="Ctrl+Z" @click="undo">撤销</button><button :disabled="!document || saving" class="primary" @click="save(false)">保存</button><button :disabled="!document || saving" @click="save(true)">另存为</button><button :disabled="!document" @click="reload">重新载入</button></template>
      </nav>
      <div v-if="activeMode !== 'map'" class="file-badge" :class="{ active: opened, dirty: dirtyVehicleTabs.length || weaponDirtyCount }"><b class="ellipsis">{{ opened?.name ?? '未打开文件' }}</b><span>{{ dirtyVehicleTabs.length || weaponDirtyCount ? `未保存：${[dirtyVehicleTabs.length ? `${dirtyVehicleTabs.length} 个载具` : '', weaponDirtyCount ? `${weaponDirtyCount} 个武器` : ''].filter(Boolean).join('、')}` : '磁盘同步' }}</span></div>
      <div v-else class="file-badge active" :class="{ dirty: mapDirty }"><b>MAP OBJECT STUDIO</b><span>{{ mapDirty ? 'objects.svg 未保存' : '地图对象模式' }}</span></div>
      <details v-if="activeMode !== 'map' && dirtyWeaponSessions.length" class="unsaved-weapons">
        <summary>未保存武器 {{ dirtyWeaponSessions.length }}</summary>
        <div class="unsaved-weapons-list">
          <div class="unsaved-weapons-toolbar"><button class="small primary" :disabled="saving" @click="saveAllWeapons">全部保存</button><button class="small" @click="discardAllWeapons">全部放弃</button></div>
          <article v-for="session in dirtyWeaponSessions" :key="session.path">
            <b class="ellipsis">{{ session.name }}</b><span class="ellipsis" :title="session.path">{{ session.path }}</span>
            <div><button class="small" :disabled="saving" @click="saveOneWeapon(session)">保存</button><button class="small" @click="discardWeaponSession(session)">放弃</button></div>
          </article>
        </div>
      </details>
    </header>

    <section v-show="activeMode === 'editor'" class="workspace" :class="{ 'has-vehicle-tabs': vehicleTabs.length }">
      <div v-if="vehicleTabs.length" ref="vehicleTabsBar" class="vehicle-tabs" role="tablist" aria-label="载具标签页">
        <div v-for="tab in vehicleTabs" :key="tab.id" class="vehicle-tab" :class="{ active: tab.id === activeVehicleTabId, preview: tab.preview, dirty: isVehicleTabDirty(tab) }" @auxclick.middle.prevent="requestCloseVehicleTab(tab.id)">
          <button class="vehicle-tab-select" role="tab" :aria-selected="tab.id === activeVehicleTabId" :title="tab.state.opened.path" :disabled="saving" @click="activateVehicleTab(tab.id)" @dblclick="retainVehicleTab(tab.id)"><span class="ellipsis">{{ tab.state.opened.name }}</span></button>
          <button class="vehicle-tab-close" :disabled="saving" :aria-label="`关闭 ${tab.state.opened.name}`" :title="isVehicleTabDirty(tab) ? '未保存 · 关闭' : '关闭'" @click="requestCloseVehicleTab(tab.id)"><span class="tab-close-cross">×</span><span v-if="isVehicleTabDirty(tab)" class="tab-dirty-dot">●</span></button>
        </div>
      </div>
      <WorkspaceSidebar :collapsed="!workspacePanelOpen">
        <template #workspace>
        <section class="vehicle-workspace collapse-group">
          <button type="button" class="collapse-summary" @click="toggleWorkspacePanel">
            <span class="collapse-caret">{{ workspacePanelOpen ? '▾' : '▸' }}</span><span>载具工作区</span><b>{{ vehicleWorkspace ? workspaceRows.length : 0 }}</b>
          </button>
            <div v-show="workspacePanelOpen" class="workspace-body">
              <div class="workspace-toolbar"><span class="ellipsis" :title="vehicleWorkspace?.root">{{ vehicleWorkspace?.root ?? '尚未选择工作区' }}</span><button class="small" @click="chooseVehicleWorkspace">打开文件夹</button></div>
              <div v-if="workspaceError" class="workspace-error">{{ workspaceError }}</div>
              <div v-else-if="vehicleWorkspace && !workspaceRows.length" class="workspace-empty">此文件夹为空</div>
              <div v-else ref="workspaceTree" class="workspace-tree">
                <TransitionGroup name="tree" tag="div">
                  <button v-for="row in workspaceRows" :key="row.entry.path" class="list-item workspace-entry" :class="{ directory: row.entry.isDirectory, vehicle: row.entry.isVehicle, other: !row.entry.isDirectory && !row.entry.isVehicle, active: opened && vehiclePathKey(opened.path) === vehiclePathKey(row.entry.path) }" :style="{ paddingLeft: `${9 + row.depth * 14}px` }" :title="row.entry.path" @click="activateWorkspaceEntry(row.entry)">
                    <span class="workspace-kind">{{ row.entry.isDirectory ? (expandedWorkspacePaths.has(row.entry.path) ? '▾' : '▸') : row.entry.isVehicle ? 'V' : '·' }}</span><span class="ellipsis">{{ row.entry.name }}</span>
                  </button>
                </TransitionGroup>
              </div>
            </div>
        </section>
        </template>
        <section v-if="baseReference" class="base-vehicle-box" :class="{ missing: !baseOpened }">
          <div><small>BASE VEHICLE</small><b class="ellipsis">{{ baseOpened?.name ?? baseReference }}</b><span class="ellipsis">{{ baseOpened ? (baseAutomatic ? '同目录自动匹配' : '手动指定') : baseError }}</span></div>
          <div class="base-actions"><button v-if="baseOpened" class="tiny" @click="openBaseVehicle">打开基础</button><button class="tiny" @click="chooseBaseVehicle">手动选择</button><button v-if="!baseAutomatic" class="tiny" @click="retryAutomaticBase">自动匹配</button></div>
        </section>
        <div class="panel-title"><small>SCENE GRAPH</small><h2>场景对象</h2></div>
        <div v-if="document" class="object-add-row">
          <select v-model="newObjectType" :disabled="!vehicleSchema.objectTypes.length" title="候选来自当前工作区的 .vehicle 文件"><option disabled value="">选择对象类型</option><option v-for="name in vehicleSchema.objectTypes" :key="name" :value="name">{{ name }}</option></select>
          <button class="small" :disabled="!newObjectType" @click="addEmptyObject">增加空对象</button>
        </div>
        <small v-if="document && !vehicleSchema.objectTypes.length" class="schema-hint">请先打开载具工作区。</small>
        <small v-if="schemaError" class="schema-hint" style="color:#ffc0c0">{{ schemaError }}</small>
        <div v-if="!document" class="empty-state">未打开载具</div>
        <div v-for="group in groups" :key="group.kind" class="collapse-group">
          <button type="button" class="collapse-summary" @click="toggleGroup(group.kind)">
            <span class="collapse-caret">{{ collapsedGroups.has(group.kind) ? '▸' : '▾' }}</span><span>{{ group.label }}</span><b>{{ group.items.length }}</b>
          </button>
          <Transition @enter="onCollapseEnter" @leave="onCollapseLeave">
            <div v-show="!collapsedGroups.has(group.kind)" class="collapse-body">
              <template v-for="item in group.items" :key="item.node.id">
                <div v-if="item.kind === 'turret'" class="crew-tree-item turret-tree-item">
                  <div class="crew-scene-row">
                    <button type="button" class="crew-caret" :title="expandedTurrets.has(item.node.id) ? '折叠炮塔选项' : '展开炮塔选项'" @click="toggleTurret(item.node.id)">{{ expandedTurrets.has(item.node.id) ? '▾' : '▸' }}</button>
                    <button class="list-item scene-item" :class="{ active: selectedId === item.node.id && !selectedTurretPivot, inherited: composition?.inherited(item.node) }" :title="composition?.inherited(item.node) ? '继承自基础载具（只读）' : '来自当前载具文件'" @click="select(item.node.id)">
                      <span class="kind-mark">{{ item.index }}</span><span>{{ item.label }}</span><small v-if="item.meta" class="scene-meta">{{ item.meta }}</small><em v-if="composition?.inherited(item.node)">基础</em>
                    </button>
                  </div>
                  <Transition @enter="onCollapseEnter" @leave="onCollapseLeave">
                    <div v-show="expandedTurrets.has(item.node.id)" class="crew-subitems">
                      <button class="list-item crew-subitem turret-pivot-subitem" :class="{ active: selectedId === item.node.id && selectedTurretPivot }" @click="selectTurretPivot(item)">
                        <span class="turret-pivot-submark"></span><span>旋转中点</span>
                      </button>
                    </div>
                  </Transition>
                </div>
                <div v-else-if="item.kind === 'slot' && crewTreeItems(item).length" class="crew-tree-item">
                  <div class="crew-scene-row">
                    <button type="button" class="crew-caret" :title="expandedCrewSlots.has(item.node.id) ? '折叠乘员位置' : '展开乘员位置'" @click="toggleCrewSlot(item.node.id)">{{ expandedCrewSlots.has(item.node.id) ? '▾' : '▸' }}</button>
                    <button class="list-item scene-item" :class="{ active: selectedId === item.node.id && !selectedEntrance, inherited: composition?.inherited(item.node) }" :title="composition?.inherited(item.node) ? '继承自基础载具（只读）' : '来自当前载具文件'" @click="select(item.node.id)">
                      <span class="kind-mark">{{ item.index }}</span><span>{{ item.label }}</span><small v-if="item.meta" class="scene-meta">{{ item.meta }}</small><em v-if="composition?.inherited(item.node)">基础</em>
                    </button>
                  </div>
                  <Transition @enter="onCollapseEnter" @leave="onCollapseLeave">
                    <div v-show="expandedCrewSlots.has(item.node.id)" class="crew-subitems">
                      <button v-for="child in crewTreeItems(item)" :key="child.key" class="list-item crew-subitem" :class="{ active: selectedId === item.node.id && (child.guide ? selectedEntrance === child.guide : !selectedEntrance) }" @click="selectCrewTreeItem(item, child)">
                        <span class="crew-submark" :class="child.key"></span><span>{{ child.label }}</span>
                      </button>
                    </div>
                  </Transition>
                </div>
                <button v-else class="list-item scene-item" :class="{ active: selectedId === item.node.id, inherited: composition?.inherited(item.node) }" :title="composition?.inherited(item.node) ? '继承自基础载具（只读）' : '来自当前载具文件'" @click="select(item.node.id)">
                  <span class="kind-mark">{{ item.index }}</span><span>{{ item.label }}</span><small v-if="item.meta" class="scene-meta">{{ item.meta }}</small><em v-if="composition?.inherited(item.node)">基础</em>
                </button>
              </template>
            </div>
          </Transition>
        </div>
        <div v-if="missing.length" class="missing-box"><strong>未解析资源 {{ missing.length }}</strong><span class="ellipsis" v-for="item in missing.slice(0, 12)" :key="item">{{ item }}</span><button @click="overrideDialog = true">指定单文件覆盖</button></div>
        <div v-if="sceneDiagnostics.length" class="missing-box"><strong>场景诊断 {{ sceneDiagnostics.length }}</strong><span class="ellipsis" v-for="item in sceneDiagnostics" :key="item">{{ item }}</span><button @click="clearSceneDiagnostics">清空</button></div>
      </WorkspaceSidebar>

      <section class="viewport-panel">
        <EditorViewport v-if="document" :document="previewDocument" :catalog="catalog" :soldier="soldier" :options="options" :selected-id="selectedId" :selected-entrance="selectedEntrance" :selected-turret-pivot="selectedTurretPivot" :turret-preview-degrees="turretPreviewDegrees" :revision="sceneRevision" :vehicle-key="opened?.path" :resource-generation="resourceGeneration" :editing-enabled="!saving" @select="select" @move="move" @pivot-move="moveTurretPivot" @rotate="rotateEntrance" @diagnostic="pushSceneDiagnostic" />
        <div v-if="!document" class="viewport-empty"><b>NO VEHICLE LOADED</b><button class="primary" @click="openVehicle">选择载具文件</button></div>
        <div v-if="selectedTurretPivot" class="turret-pivot-editor">
          <b>炮塔旋转预览</b>
          <input v-model.number="turretPreviewDegrees" type="range" min="-180" max="180" step="1" />
          <label><input v-model.number="turretPreviewDegrees" type="number" min="-180" max="180" step="1" />°</label>
          <button type="button" class="tiny" @click="turretPreviewDegrees = 0">归零</button>
        </div>
        <div class="quick-options">
          <label><input v-model="options.showVisualBounds" type="checkbox" /> 外观框</label><label><input v-model="options.showBounds" type="checkbox" /> 碰撞框</label><label><input v-model="options.showShields" type="checkbox" /> 显示护盾范围</label><label><input v-model="options.showOccupants" type="checkbox" /> 乘员</label><label><input v-model="options.showOccupantPositions" type="checkbox" /> 显示乘员位置</label><label><input v-model="options.showEntrances" type="checkbox" /> 显示乘员进出范围</label><label><input v-model="options.animate" type="checkbox" /> 动画</label><label><input v-model="options.showBroken" type="checkbox" /> 损毁外观</label>
        </div>
      </section>

      <aside class="inspector">
        <div class="panel-title"><small>INSPECTOR</small><h2>{{ selected?.label ?? '属性编辑' }}</h2></div>
        <div v-if="rootFields.length" class="field-list root-fields">
          <small class="root-heading">载具根元素</small>
          <label v-for="field in rootFields" class="field-row" :key="`root:${field.attr}`">
            <span class="ellipsis"><small>vehicle{{ field.inherited ? ' · 基础只读' : '' }}</small>{{ field.attr }}</span>
            <input :value="field.value" :disabled="!field.sourceNode" @change="edit(field, $event)" />
            <button class="field-delete" :disabled="!field.sourceNode" :title="`删除 ${field.attr}`" @click="deleteAttribute(field)">×</button>
          </label>
        </div>
        <div v-if="document" class="object-add-row root-add-row">
          <input v-model="newRootAttribute" placeholder="根属性名，如 file" list="root-attr-hints" />
          <datalist id="root-attr-hints"><option v-for="name in rootAvailableAttributes" :key="name" :value="name" /></datalist>
          <button class="small" :disabled="!newRootAttribute" @click="addRootAttribute">加入根属性</button>
        </div>
        <div v-if="!selected" class="empty-state">从场景对象中选择一项。</div>
        <div v-else class="field-list">
          <label v-for="field in fields" class="field-row" :key="`${field.node.id}:${field.attr}`">
            <span class="ellipsis"><small>{{ field.section }}{{ field.inherited ? ' · 基础只读' : '' }}</small>{{ field.attr }}</span>
            <input :value="field.value" :disabled="!field.sourceNode" @change="edit(field, $event)" />
            <button class="field-delete" :disabled="!field.sourceNode" :title="`删除 ${field.attr}`" @click="deleteAttribute(field)">×</button>
          </label>
        </div>
        <section v-if="selected?.kind === 'turret'" class="weapon-shield-editor">
          <header><div><small>WEAPON SHIELDS</small><b class="ellipsis">{{ weaponSession?.name || selectedWeaponKey || '未引用武器' }}</b></div><em v-if="weaponDirty">未保存</em></header>
          <p v-if="weaponLoadError" class="weapon-error">{{ weaponLoadError }}</p>
          <template v-else-if="weaponSession">
            <p class="weapon-path ellipsis" :title="weaponSession.path">{{ weaponSession.path }}</p>
            <div v-if="!weaponShields.length" class="weapon-empty">此武器没有 shield，可在下方增加。</div>
            <article v-for="shield in weaponShields" :key="shield.node.id" class="shield-card">
              <div><b>shield {{ shield.index }}</b><button class="field-delete" title="删除此 shield" @click="deleteShield(shield.node)">×</button></div>
              <label class="field-row"><span>offset</span><input :value="shield.offset" @change="editShield(shield.node, 'offset', $event)" /></label>
              <label class="field-row"><span>extent</span><input :value="shield.extent" @change="editShield(shield.node, 'extent', $event)" /></label>
            </article>
            <div class="weapon-actions"><button class="small" @click="addShield">增加 shield</button><button class="small" @click="reloadWeaponShields">重新载入</button><button class="small primary" :disabled="!weaponDirty || saving" @click="saveWeaponShields">保存武器护盾</button></div>
          </template>
        </section>
        <div v-if="selected" class="attribute-add-row"><select v-model="newAttribute" :disabled="!selectedEditable || !availableAttributes.length"><option disabled value="">选择可加入的数值类</option><option v-for="name in availableAttributes" :key="name" :value="name">{{ name }}</option></select><button class="small" :disabled="!newAttribute || !selectedEditable" @click="addSelectedAttribute">加入新数值类</button></div>
        <div class="inspector-actions"><button class="small danger" :disabled="!selectedEditable" @click="deleteSelectedObject">删除对象</button><button class="small" :disabled="!selectedEditable" @click="revert">恢复本项</button><button class="small primary" :disabled="!document || saving" @click="save(false)">保存载具</button></div>
      </aside>
    </section>

    <IconRenderer v-if="activeMode === 'render'" :document="previewDocument" :catalog="catalog" :revision="sceneRevision" :resource-generation="resourceGeneration" :vehicle-key="opened?.path" :vehicle-name="opened?.name" />
    <MapObjectEditor v-if="activeMode === 'map'" @dirty-change="mapDirty = $event" />

    <footer v-if="activeMode !== 'map'" class="statusbar"><span><template v-if="sceneSummary">{{ sceneSummary }}<template v-if="status"> · </template></template>{{ status }}</span><span class="ellipsis">{{ opened?.path ?? '' }}</span></footer>
    <Transition name="modal" appear><ResourceDialog v-if="resourceDialog" :catalog="catalog" :support-model="supportModel" :support-animations="supportAnimations" @close="resourceDialog = false" @apply="resourcesApplied" /></Transition>
    <Transition name="modal" appear><OverrideDialog v-if="overrideDialog" :catalog="catalog" @close="overrideDialog = false" @changed="overrideChanged" /></Transition>
    <Transition name="modal" appear><BackupManagerDialog v-if="backupDialog" :roots="backupRoots" @close="backupDialog = false" @restored="backupRestored" @settings-changed="backupSettingsChanged" /></Transition>
    <div v-if="closingVehicleTab" class="modal-backdrop vehicle-tab-confirm" role="dialog" aria-modal="true" aria-labelledby="close-vehicle-title">
      <section class="dialog">
        <header><h2 id="close-vehicle-title">保存更改？</h2></header>
        <p>{{ closingVehicleTab.state.opened.name }} 有未保存的修改。</p>
        <footer><button :disabled="saving" @click="closingVehicleTabId = ''">取消</button><button :disabled="saving" @click="removeVehicleTab(closingVehicleTabId)">不保存</button><button class="primary" :disabled="saving" @click="saveAndCloseVehicleTab">保存</button></footer>
      </section>
    </div>
  </main>
</template>
