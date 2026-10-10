<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LanguageSelect from './LanguageSelect.vue';
import { initialLanguage, needsLanguageChoice, completeLanguageChoice, type AppLanguage } from '../i18n/languages';
import { studioSettings, applySettings } from '../core/editor/studio-settings';
import { desktop } from '../platform/desktop-api';
const visible = ref(needsLanguageChoice());
const manuallySelected = ref(false);
function choose(language: AppLanguage) { manuallySelected.value = true; studioSettings.language = language; applySettings(); }
function close() { visible.value = false; completeLanguageChoice(); }
onMounted(async () => {
  if (!visible.value) return;
  studioSettings.language = initialLanguage(navigator.language); applySettings();
  try { const locale = await desktop.systemLocale(); if (visible.value && !manuallySelected.value) { studioSettings.language = initialLanguage(locale || navigator.language); applySettings(); } } catch { /* browser fallback */ }
});
</script>
<template>
  <div v-if="visible" class="modal-backdrop language-first-run" @click.self="close" @keydown.esc="close" @keydown.stop>
    <section class="dialog language-choice" role="dialog" aria-modal="true" aria-labelledby="first-language-title">
      <header><h2 id="first-language-title">界面语言</h2></header>
      <div class="settings-content"><LanguageSelect id="first-language" :model-value="studioSettings.language" @update:model-value="choose" /></div>
      <footer><button class="primary" autofocus @click="close">确定</button></footer>
    </section>
  </div>
</template>
