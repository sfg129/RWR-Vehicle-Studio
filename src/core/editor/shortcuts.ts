import { loadBindings, matchBindings } from './shortcut-bindings';
export const shortcutDefaults = {
  save: 'Ctrl+S', open: 'Ctrl+O', newFile: 'Ctrl+N', reload: 'Ctrl+R', close: 'Ctrl+F4', saveAs: 'Ctrl+Shift+S',
  closeSaved: 'Ctrl+K U', closeAll: 'Ctrl+K W', undo: 'Ctrl+Z', redo: 'Ctrl+Y', copy: 'Ctrl+C', cut: 'Ctrl+X', paste: 'Ctrl+V', selectAll: 'Ctrl+A', find: 'Ctrl+F',
  nextTab: 'Ctrl+Tab', previousTab: 'Ctrl+Shift+Tab', copyPath: 'Shift+Alt+C', reveal: 'Shift+Alt+R', keepOpen: 'Ctrl+K Enter', pin: 'Ctrl+K Shift+Enter', copyRelativePath: 'Ctrl+K Ctrl+Shift+C',
} as const;
export type StudioShortcutAction = keyof typeof shortcutDefaults;
export type StudioShortcuts = Record<StudioShortcutAction, string>;
export const secondaryShortcutDefaults: StudioShortcuts = { ...Object.fromEntries(Object.keys(shortcutDefaults).map(key => [key, ''])) as StudioShortcuts, close: 'Ctrl+W', redo: 'Ctrl+Shift+Z' };
export const studioShortcutGroups: readonly { title: string; rows: readonly (readonly [StudioShortcutAction, string])[] }[] = [
  { title: '文件', rows: [['save','保存'], ['open','打开'], ['newFile','新建'], ['reload','重新载入'], ['close','关闭'], ['saveAs','另存为'], ['closeSaved','关闭已保存'], ['closeAll','全部关闭']] },
  { title: '编辑', rows: [['undo','撤销'], ['redo','重做'], ['copy','复制'], ['cut','剪切'], ['paste','粘贴'], ['selectAll','全选'], ['find','查找'], ['nextTab','下一个标签页'], ['previousTab','上一个标签页'], ['copyPath','复制路径'], ['reveal','在文件资源管理器中显示'], ['keepOpen','保持打开'], ['pin','固定'], ['copyRelativePath','复制相对路径']] },
];
export function shortcutFromEvent(event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'shiftKey' | 'altKey'>): string | undefined {
  if (['Control','Alt','Shift','Meta'].includes(event.key)) return;
  const key = ({ ' ': 'Space', Escape: 'Esc' } as Record<string,string>)[event.key] ?? (event.key.length === 1 ? event.key.toUpperCase() : event.key);
  return [event.ctrlKey || event.metaKey ? 'Ctrl' : '', event.altKey ? 'Alt' : '', event.shiftKey ? 'Shift' : '', key].filter(Boolean).join('+');
}
export function matchShortcut(bindings: StudioShortcuts, stroke: string, prefix = '', secondary = loadSecondaryShortcuts(undefined, bindings)): { action?: StudioShortcutAction; prefix?: string } {
  return matchBindings(bindings, secondary, stroke, prefix);
}
export function loadShortcuts(value: unknown): StudioShortcuts {
  return loadBindings(value, shortcutDefaults);
}
export function loadSecondaryShortcuts(value: unknown, primary: StudioShortcuts): StudioShortcuts {
  const defaults = { ...secondaryShortcutDefaults };
  for (const action of Object.keys(defaults) as StudioShortcutAction[]) if (primary[action] !== shortcutDefaults[action]) defaults[action] = '';
  return loadBindings(value, defaults);
}
