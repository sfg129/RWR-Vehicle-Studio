import { describe, expect, it } from 'vitest';
import { parseSession, type StudioSession } from '../src/core/editor/session';

const session: StudioSession = {
  version: 1, activeId: 'selected', textMode: true,
  tabs: [{ id: 'selected', pinned: true, preview: false, path: 'untitled://one', name: 'Untitled-1.vehicle', text: '<vehicle name="edited"/>', savedText: '', undoStack: ['<vehicle/>'], redoStack: [] }],
  weapons: [{ key: 'gun.weapon', path: 'C:/gun.weapon', name: 'gun.weapon', text: '<weapon/>', savedText: '<weapon name="old"/>', undoStack: [], redoStack: ['<weapon name="redo"/>'] }],
};

describe('tab session recovery', () => {
  it('retains the active tab, pin, unsaved content and both document histories', () => {
    expect(parseSession(JSON.stringify(session))).toEqual(session);
  });
  it('allows empty sessions and empty unsaved files', () => {
    expect(parseSession(null)).toBeUndefined();
    expect(parseSession(JSON.stringify({ ...session, tabs: [], weapons: [], activeId: '' }))?.tabs).toEqual([]);
    expect(parseSession(JSON.stringify({ ...session, tabs: [{ ...session.tabs[0], text: '' }] }))?.tabs[0]?.text).toBe('');
  });
  it('rejects corrupt session metadata, duplicate tab identities and corrupt history', () => {
    for (const value of [null, {}, { ...session, activeId: 2 }, { ...session, tabs: [session.tabs[0], session.tabs[0]] }, { ...session, tabs: [{ ...session.tabs[0], undoStack: [2] }] }, { ...session, tabs: [{ ...session.tabs[0], pinned: 'true' }] }]) {
      expect(() => parseSession(JSON.stringify(value))).toThrow();
    }
  });
});
