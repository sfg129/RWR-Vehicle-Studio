<script setup lang="ts">
import { reactive } from 'vue';
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import { desktop } from '../platform/desktop-api';
const props = defineProps<{ catalog: ResourceCatalog }>(); const emit = defineEmits<{ close: []; changed: [] }>();
const overrides = reactive<Record<string, string>>({ ...props.catalog.overrides });
async function add() {
  const path = await desktop.chooseOverrideFile(); if (!path) return;
  props.catalog.override(path);
  overrides[fileName(path).toLowerCase()] = path;
  emit('changed');
}
function remove(name: string) { props.catalog.removeOverride(name); delete overrides[name]; emit('changed'); }
function clearAll() { props.catalog.clearOverrides(); for (const key of Object.keys(overrides)) delete overrides[key]; emit('changed'); }
function fileName(path: string): string { return path.replaceAll('\\', '/').split('/').at(-1) ?? path; }
</script>
<template>
  <div class="modal-backdrop"><section class="dialog override-dialog">
    <header><div><small>EXPLICIT OVERRIDES</small><h2>单文件资源覆盖</h2></div><button class="icon" @click="$emit('close')">×</button></header>
    <p class="muted">同名覆盖优先于文件夹自动索引，适合重名资源或位于目录外的特殊文件。</p>
    <div class="override-list"><div v-if="!Object.keys(overrides).length" class="empty">尚未指定覆盖文件</div><div v-for="(path, name) in overrides" :key="name"><strong>{{ name }}</strong><span class="ellipsis">{{ path }}</span><button class="tiny" @click="remove(name)">移除</button></div></div>
    <footer><button @click="$emit('close')">完成</button><button class="small" :disabled="!Object.keys(overrides).length" @click="clearAll">清空</button><button class="primary" @click="add">添加文件</button></footer>
  </section></div>
</template>
