<script setup lang="ts">
import type { ResourceCatalog } from '../core/resources/resource-catalog';
import { desktop } from '../platform/desktop-api';
const props = defineProps<{ catalog: ResourceCatalog }>(); const emit = defineEmits<{ close: []; changed: [] }>();
async function add() { const path = await desktop.chooseOverrideFile(); if (path) { props.catalog.override(path); emit('changed'); } }
</script>
<template>
  <div class="modal-backdrop"><section class="dialog override-dialog">
    <header><div><small>EXPLICIT OVERRIDES</small><h2>单文件资源覆盖</h2></div><button class="icon" @click="$emit('close')">×</button></header>
    <p class="muted">同名覆盖优先于文件夹自动索引，适合重名资源或位于目录外的特殊文件。</p>
    <div class="override-list"><div v-if="!Object.keys(catalog.overrides).length" class="empty">尚未指定覆盖文件</div><div v-for="(path, name) in catalog.overrides" :key="name"><strong>{{ name }}</strong><span>{{ path }}</span></div></div>
    <footer><button @click="$emit('close')">完成</button><button class="primary" @click="add">添加文件</button></footer>
  </section></div>
</template>
