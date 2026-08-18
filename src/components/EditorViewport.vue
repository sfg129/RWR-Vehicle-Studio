<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { SceneController, type ViewOptions } from '../editor/scene-controller';
import type { SourceDocument, SourceNode } from '../core/xml/source-document';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import type { SoldierAssets } from '../core/soldier/soldier-assets';

const props = defineProps<{ document?: SourceDocument; catalog: ResourceCatalog; soldier?: SoldierAssets; options: ViewOptions; selectedId?: number; revision: number; vehicleKey?: string }>();
const emit = defineEmits<{ select: [number]; move: [SourceNode, string, [number, number, number]] }>();
const host = ref<HTMLElement>(); const fps = ref(0); const dynamicOccupants = ref(0); const fading = ref(false);
let controller: SceneController | undefined; let lastVehicleKey: string | undefined;
onMounted(() => { controller = new SceneController(host.value!, (id) => emit('select', id), (node, attr, value) => emit('move', node, attr, value),
  (value, dynamic) => { fps.value = value; dynamicOccupants.value = dynamic; }); refresh(); });
onBeforeUnmount(() => { /* window lifetime owns renderer */ });
async function refresh() {
  if (!controller || !props.document) return;
  const switched = props.vehicleKey !== lastVehicleKey; lastVehicleKey = props.vehicleKey;
  if (switched) { fading.value = true; await nextTick(); }
  await controller.setDocument(props.document, props.catalog, props.soldier, props.options);
  if (switched) fading.value = false;
  select();
}
function select() { controller?.select(props.selectedId === undefined ? undefined : props.document?.nodes[props.selectedId]); }
let refreshPending = false;
function scheduleRefresh() {
  if (refreshPending) return;
  refreshPending = true;
  requestAnimationFrame(() => { refreshPending = false; void refresh(); });
}
watch(() => [props.document, props.revision, props.soldier, props.options.showBroken, props.options.showOccupants, props.options.showBounds, props.options.showShields], scheduleRefresh);
watch(() => props.selectedId, select);
defineExpose({ reset: () => controller?.resetCamera(), top: () => controller?.topView(), side: () => controller?.sideView() });
</script>
<template>
  <div ref="host" class="viewport-host" :class="{ 'is-fading': fading }">
    <div class="viewport-help"><span>拖动箭头修改位置</span><span>单击模型选择</span><span>左键旋转</span><span>右键平移</span><span>滚轮缩放</span></div>
    <div class="fps-badge" :class="{ slow: fps > 0 && fps < 25 }">{{ fps || '—' }} FPS · {{ dynamicOccupants }} 动态乘员</div>
    <div class="view-buttons"><button class="small" @click="controller?.resetCamera()">透视</button><button class="small" @click="controller?.topView()">顶视</button><button class="small" @click="controller?.sideView()">侧视</button></div>
  </div>
</template>
