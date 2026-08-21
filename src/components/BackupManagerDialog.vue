<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { desktop, type BackupEntry, type BackupRestoreResult } from '../platform/desktop-api';

const props = defineProps<{ roots: string[] }>();
const emit = defineEmits<{ close: []; restored: [BackupRestoreResult] }>();
const entries = ref<BackupEntry[]>([]); const checked = ref<string[]>([]); const activePath = ref(''); const preview = ref(''); const loading = ref(false); const error = ref('');
const active = computed(() => entries.value.find((entry) => entry.backupPath === activePath.value));
const allChecked = computed(() => entries.value.length > 0 && checked.value.length === entries.value.length);

onMounted(refresh);
async function refresh() {
  loading.value = true; error.value = '';
  try { entries.value = await desktop.listBackups(props.roots); checked.value = checked.value.filter((path) => entries.value.some((entry) => entry.backupPath === path)); }
  catch (value) { error.value = message(value); }
  finally { loading.value = false; }
}
async function openPreview(entry: BackupEntry) {
  activePath.value = entry.backupPath; preview.value = '正在读取…'; error.value = '';
  try { preview.value = await desktop.readBackup(entry.backupPath); }
  catch (value) { preview.value = ''; error.value = message(value); }
}
function toggle(path: string, enabled: boolean) { checked.value = enabled ? [...checked.value, path] : checked.value.filter((value) => value !== path); }
function toggleAll(enabled: boolean) { checked.value = enabled ? entries.value.map((entry) => entry.backupPath) : []; }
async function restore(entry: BackupEntry) {
  if (!confirm(`将用 ${entry.backupName} 覆盖：\n${entry.sourcePath}\n\n源文件当前内容仍会进入两代轮换备份。若该文件正在编辑，未保存修改会被重新载入覆盖。是否继续？`)) return;
  loading.value = true; error.value = '';
  try { const result = await desktop.restoreBackup(entry.backupPath); emit('restored', result); await refresh(); }
  catch (value) { error.value = message(value); }
  finally { loading.value = false; }
}
async function remove(paths: string[]) {
  if (!paths.length || !confirm(`确定永久删除选中的 ${paths.length} 个备份吗？此操作不能撤销。`)) return;
  loading.value = true; error.value = '';
  try { await desktop.deleteBackups(paths); if (paths.includes(activePath.value)) { activePath.value = ''; preview.value = ''; } checked.value = []; await refresh(); }
  catch (value) { error.value = message(value); }
  finally { loading.value = false; }
}
function formatTime(value: number) { return value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '时间未知'; }
function formatSize(value: number) { return value < 1024 ? `${value} B` : `${(value / 1024).toFixed(value < 10240 ? 1 : 0)} KiB`; }
function message(value: unknown) { return value instanceof Error ? value.message : String(value); }
</script>

<template>
  <div class="modal-backdrop"><section class="dialog backup-dialog">
    <header><div><small>BACKUP MANAGER</small><h2>管理备份</h2></div><button class="icon" @click="$emit('close')">×</button></header>
    <p class="muted">每个载具或武器只轮换保留 <b>.bak</b> 与 <b>.bak1</b>。列表也会显示旧版本曾创建的更多代备份，便于统一清理。</p>
    <p v-if="error" class="backup-error">{{ error }}</p>
    <div class="backup-layout">
      <section class="backup-list">
        <div class="backup-toolbar"><label><input type="checkbox" :checked="allChecked" @change="toggleAll(($event.target as HTMLInputElement).checked)" /> 全选</label><span>{{ loading ? '扫描中…' : `${entries.length} 个备份` }}</span><button class="tiny" :disabled="loading" @click="refresh">刷新</button></div>
        <div v-if="!loading && !entries.length" class="backup-empty">当前工作区与已打开文件附近没有备份。</div>
        <article v-for="entry in entries" :key="entry.backupPath" :class="{ active: activePath === entry.backupPath }" @click="openPreview(entry)">
          <input type="checkbox" :checked="checked.includes(entry.backupPath)" @click.stop @change="toggle(entry.backupPath, ($event.target as HTMLInputElement).checked)" />
          <div><b>{{ entry.sourceName }}</b><span>{{ entry.backupName.endsWith('.bak1') ? '较早一代 · .bak1' : entry.backupName.endsWith('.bak') ? '最近一代 · .bak' : '旧版多代备份' }}</span><small :title="entry.backupPath">{{ formatTime(entry.modifiedMs) }} · {{ formatSize(entry.size) }}</small></div>
          <em v-if="!entry.sourceExists">源文件缺失</em>
          <div class="backup-row-actions"><button class="tiny" @click.stop="openPreview(entry)">预览</button><button class="tiny primary" @click.stop="restore(entry)">恢复</button><button class="tiny danger" @click.stop="remove([entry.backupPath])">删除</button></div>
        </article>
      </section>
      <section class="backup-preview"><header><b>{{ active?.backupName ?? '文本预览' }}</b><span class="ellipsis" :title="active?.sourcePath">{{ active?.sourcePath ?? '点击左侧备份查看内容' }}</span></header><pre>{{ preview }}</pre></section>
    </div>
    <footer><span class="muted">选中 {{ checked.length }} 项</span><button class="danger" :disabled="!checked.length || loading" @click="remove(checked)">批量删除</button><button @click="$emit('close')">完成</button></footer>
  </section></div>
</template>
