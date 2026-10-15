import { describe, expect, it } from 'vitest';
import { MapHistory, type MapEditState } from '../src/core/map/map-history';
import { cloneMapSpawn, mapSpawnSnapshot, parseRwrMap, serializeRwrMap } from '../src/core/map/rwr-map-document';

const source = '<svg width="200" height="200"><g><rect id="spawn1" x="10" y="20" width="6" height="8"><desc>type = vehicle; key = tank.vehicle;</desc></rect></g></svg>';
function setup() {
  const map = parseRwrMap(source);
  let state: MapEditState = { map, spawns: mapSpawnSnapshot(map.spawns), selectedUid: map.spawns[0].uid };
  const history = new MapHistory(); history.reset(serializeRwrMap(map, state.spawns));
  return { history, state };
}
describe('independent map history', () => {
  it('groups continuous input, ignores untouched focus, and restores the clean state', () => {
    let { history, state } = setup(); history.begin(state); history.commit(state);
    expect(history.canUndo).toBe(false);
    history.begin(state); state.spawns[0].x = 40; state.spawns[0].x = 50;
    expect(history.hasPendingChange(state)).toBe(true); history.commit(state);
    expect(history.dirty(state)).toBe(true);
    state = history.undo(state)!; expect(state.spawns[0].x).toBe(13); expect(history.dirty(state)).toBe(false);
    state = history.redo(state)!; expect(state.spawns[0].x).toBe(50); expect(history.canRedo).toBe(false);
  });
  it('supports duplicate/delete and a new branch invalidates redo', () => {
    let { history, state } = setup(); history.begin(state);
    state.spawns.push(cloneMapSpawn(state.spawns[0], state.spawns)); history.commit(state);
    history.begin(state); state.spawns[0].deleted = true; history.commit(state);
    state = history.undo(state)!; expect(state.spawns[0].deleted).toBe(false);
    state = history.undo(state)!; expect(state.spawns.length).toBe(1);
    history.begin(state); state.spawns[0].angle = 45; history.commit(state);
    expect(history.canRedo).toBe(false);
  });
  it('keeps matching SVG source offsets across saves and undo/redo', () => {
    let { history, state } = setup(); history.begin(state);
    state.spawns.push(cloneMapSpawn(state.spawns[0], state.spawns)); history.commit(state);
    const saved = serializeRwrMap(state.map, state.spawns);
    history.saved(saved); const parsed = parseRwrMap(saved);
    state = { map: parsed, spawns: mapSpawnSnapshot(parsed.spawns), selectedUid: parsed.spawns[1].uid };
    expect(history.dirty(state)).toBe(false);
    state = history.undo(state)!; expect(parseRwrMap(serializeRwrMap(state.map, state.spawns)).spawns.length).toBe(1);
    expect(history.dirty(state)).toBe(true);
    state = history.redo(state)!; expect(serializeRwrMap(state.map, state.spawns)).toBe(saved);
    expect(history.dirty(state)).toBe(false);
    history.begin(state); state.spawns[1].reference = 'other.vehicle'; history.commit(state);
    expect(serializeRwrMap(state.map, state.spawns)).toContain('other.vehicle');
    state = history.undo(state)!; expect(history.dirty(state)).toBe(false);
  });
  it('does not share history between workspaces', () => {
    const a = setup(), b = setup(); a.history.begin(a.state); a.state.spawns[0].y = 70; a.history.commit(a.state);
    expect(a.history.canUndo).toBe(true); expect(b.history.canUndo).toBe(false);
  });
});
