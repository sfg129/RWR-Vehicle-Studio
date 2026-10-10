export const languages = [
  { code: 'de', name: 'Deutsch' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
] as const;

export type AppLanguage = (typeof languages)[number]['code'];
export const languageChoiceKey = 'rwr-vehicle-studio-language-choice-v2';
export const languageChangeEvent = 'rwr-vehicle-studio-language-change';

export function isAppLanguage(value: unknown): value is AppLanguage {
  return languages.some((language) => language.code === value);
}

export function matchLanguage(locale: string): AppLanguage | undefined {
  const parts = locale.replaceAll('_', '-').toLowerCase().split('-');
  if (parts[0] === 'zh') {
    return parts.some((part) => ['hant', 'tw', 'hk', 'mo'].includes(part)) ? 'zh-TW' : 'zh-CN';
  }
  return languages.find((language) => language.code === parts[0])?.code;
}

export function initialLanguage(locale: string): AppLanguage {
  return matchLanguage(locale) ?? 'zh-CN';
}

export function needsLanguageChoice(): boolean {
  try {
    return localStorage.getItem(languageChoiceKey) !== 'done';
  } catch {
    return true;
  }
}

export function completeLanguageChoice(): void {
  try {
    localStorage.setItem(languageChoiceKey, 'done');
  } catch {
    /* Storage can be unavailable in a restricted browser. */
  }
}
