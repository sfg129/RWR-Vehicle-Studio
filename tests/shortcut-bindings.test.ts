import { describe, it, expect } from 'vitest';
import { bindingEntries, conflictingBindings, loadBindings, matchBindings, ShortcutCapture } from '../src/core/editor/shortcut-bindings';
import { loadShortcuts, loadSecondaryShortcuts, matchShortcut } from '../src/core/editor/shortcuts';
describe('independent shortcut slots', () => {
  const primary = { open: 'Ctrl+O', save: 'Ctrl+S', close: '' }, secondary = { open: 'Alt+O', save: 'Ctrl+K S', close: '' };
  it('matches either slot, including sequences, and ignores empty settings', () => {
    expect(matchBindings(primary, secondary, 'Ctrl+O').action).toBe('open');
    expect(matchBindings(primary, secondary, 'Alt+O').action).toBe('open');
    expect(matchBindings(primary, secondary, 'Ctrl+K').prefix).toBe('Ctrl+K');
    expect(matchBindings(primary, secondary, 'S', 'Ctrl+K').action).toBe('save');
    expect(matchBindings(primary, secondary, '').action).toBeUndefined();
    expect(bindingEntries(primary, secondary)).toHaveLength(4);
  });
  it('allows duplicates but identifies all colliding slots', () => {
    const duplicate = { ...secondary, open: 'Ctrl+S', close: 'Ctrl+S' };
    expect(conflictingBindings(primary, duplicate)).toEqual(new Set(['Ctrl+S']));
    expect(matchBindings(primary, duplicate, 'Ctrl+S').action).toBe('open');
    expect(conflictingBindings(primary, secondary).size).toBe(0);
  });
  it('loads explicit empty fields and falls back only for missing or invalid fields', () => {
    expect(loadBindings({ open: '',save:null }, primary)).toEqual({open:'',save:'Ctrl+S',close:''});
  });
  it('captures consecutive strokes without joining separate focused edits', () => {
    const capture = new ShortcutCapture();
    expect(capture.stroke('Ctrl+K',100)).toBe('Ctrl+K');
    expect(capture.stroke('W',200)).toBe('Ctrl+K W');
    capture.reset(); expect(capture.stroke('Alt+S',250)).toBe('Alt+S');
    expect(capture.stroke('Ctrl+S',2000)).toBe('Ctrl+S');
  });
  it('exposes former aliases as clearable secondary slots without hidden fallbacks', () => {
    const bindings=loadShortcuts({close:''}), slots=loadSecondaryShortcuts({close:'',redo:''},bindings);
    expect(matchShortcut(bindings,'Ctrl+W','',slots).action).toBeUndefined();
    expect(matchShortcut(bindings,'Ctrl+Shift+Z','',slots).action).toBeUndefined();
    const original=loadShortcuts({}); const secondary=loadSecondaryShortcuts(undefined,original);
    expect(secondary.close).toBe('Ctrl+W'); expect(secondary.redo).toBe('Ctrl+Shift+Z');
    secondary.save='Alt+S'; expect(matchShortcut(original,'Alt+S','',secondary).action).toBe('save');
  });
});
