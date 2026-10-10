<script setup lang="ts">
import { isAppLanguage, languages, type AppLanguage } from '../i18n/languages';

defineProps<{ id: string; modelValue?: AppLanguage }>();
const emit = defineEmits<{ 'update:modelValue': [language: AppLanguage] }>();

function changeLanguage(event: Event): void {
  const language = (event.target as HTMLSelectElement).value;
  if (isAppLanguage(language)) emit('update:modelValue', language);
}
</script>

<template>
  <select :id="id" :value="modelValue" aria-label="界面语言" @change="changeLanguage">
    <option
      v-for="language in languages"
      :key="language.code"
      :value="language.code"
      :lang="language.code"
      data-no-localize
    >
      {{ language.name }}
    </option>
  </select>
</template>
