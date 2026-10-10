import { describe, expect, it } from 'vitest';
import { loadShortcuts, matchShortcut, shortcutDefaults, studioShortcutGroups } from '../src/core/editor/shortcuts';

describe('shortcut presentation', () => {
  it('puts basic single keys first, familiar categories next and key sequences last', () => {
    expect(studioShortcutGroups.map(group => group.title)).toEqual(['文件','编辑']);
    expect(studioShortcutGroups[0].rows[0]).toEqual(['save','保存']);
    expect(studioShortcutGroups.flatMap(group => group.rows.map(row => row[1]))).not.toContain('换行');
  });
  it('includes the actual text-editor editing commands', () => {
    const bindings = Object.values(shortcutDefaults);
    for (const shortcut of ['Ctrl+Z', 'Ctrl+Y', 'Ctrl+C', 'Ctrl+X', 'Ctrl+V', 'Ctrl+A', 'Ctrl+F']) expect(bindings).toContain(shortcut);
  });
  it('resolves remapped keys and multi-step defaults, without preserving obsolete bindings', () => {
    const bindings = loadShortcuts({ save:'Alt+S' });
    expect(matchShortcut(bindings,'Alt+S').action).toBe('save');
    expect(matchShortcut(bindings,'Ctrl+S').action).toBeUndefined();
    expect(matchShortcut(bindings,'Ctrl+K').prefix).toBe('Ctrl+K');
    expect(matchShortcut(bindings,'W','Ctrl+K').action).toBe('closeAll');
    expect(matchShortcut(bindings,'Ctrl+Shift+C','Ctrl+K').action).toBe('copyRelativePath');
  });
});
