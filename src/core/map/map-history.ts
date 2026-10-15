import { mapSpawnSnapshot, serializeRwrMap, type MapVehicleSpawn, type ParsedRwrMap } from './rwr-map-document';

export interface MapEditState { map: ParsedRwrMap; spawns: MapVehicleSpawn[]; selectedUid: string }
interface Snapshot extends MapEditState { text: string }

/** Snapshots retain the source SVG against which their element offsets were parsed. */
export class MapHistory {
  private past: Snapshot[] = [];
  private future: Snapshot[] = [];
  private pending?: Snapshot;
  private savedText = '';
  get canUndo(): boolean { return this.past.length > 0; }
  get canRedo(): boolean { return this.future.length > 0; }
  hasPendingChange(state: MapEditState): boolean { return !!this.pending && serializeRwrMap(state.map, state.spawns) !== this.pending.text; }
  reset(text: string): void { this.past = []; this.future = []; this.pending = undefined; this.savedText = text; }
  saved(text: string): void { this.savedText = text; }
  dirty(state: MapEditState): boolean { return serializeRwrMap(state.map, state.spawns) !== this.savedText; }
  begin(state: MapEditState): void { this.commit(state); this.pending = this.capture(state); }
  commit(state: MapEditState): void {
    if (!this.pending) return;
    if (serializeRwrMap(state.map, state.spawns) !== this.pending.text) {
      this.past = [...this.past.slice(-79), this.pending]; this.future = [];
    }
    this.pending = undefined;
  }
  undo(state: MapEditState): MapEditState | undefined {
    this.commit(state); const previous = this.past.pop();
    if (previous) this.future.push(this.capture(state));
    return previous && this.restore(previous);
  }
  redo(state: MapEditState): MapEditState | undefined {
    this.commit(state); const next = this.future.pop();
    if (next) this.past.push(this.capture(state));
    return next && this.restore(next);
  }
  private capture(state: MapEditState): Snapshot {
    return { map: state.map, spawns: mapSpawnSnapshot(state.spawns), selectedUid: state.selectedUid, text: serializeRwrMap(state.map, state.spawns) };
  }
  private restore(state: Snapshot): MapEditState { return { ...state, spawns: mapSpawnSnapshot(state.spawns) }; }
}
