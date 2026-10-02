import { describe, expect, it } from 'vitest';
import { revealWorkspacePath, flattenWorkspace } from '../src/core/workspace/vehicle-workspace';
import type { VehicleWorkspaceEntry } from '../src/platform/desktop-api';

function dir(path: string): VehicleWorkspaceEntry { return { path, name: path, isDirectory: true, isVehicle: false, children: [] }; }
function vehicle(path: string): VehicleWorkspaceEntry { return { path, name: path, isDirectory: false, isVehicle: true, children: [] }; }
describe('active vehicle workspace reveal', () => {
  it('loads and expands only ancestors, matching Windows canonical paths', async () => {
    const root = dir('C:/vehicles/folder'); const other = dir('C:/vehicles/other'); const expanded = new Set<string>(); const calls: string[] = [];
    const found = await revealWorkspacePath([root, other], '\\\\?\\C:\\vehicles\\folder\\deep\\tank.vehicle', expanded, async entry => {
      calls.push(entry.path);
      entry.children = entry === root ? [dir('C:/vehicles/folder/deep')] : [vehicle('C:/vehicles/folder/deep/tank.vehicle')];
    });
    expect(found).toBe(true); expect(calls).toEqual(['C:/vehicles/folder', 'C:/vehicles/folder/deep']);
    expect(flattenWorkspace([root, other], expanded).map(row => row.entry.path)).toContain('C:/vehicles/folder/deep/tank.vehicle');
  });
  it('does not expand unrelated similarly prefixed folders', async () => {
    const expanded = new Set<string>(); let loaded = false;
    expect(await revealWorkspacePath([dir('C:/vehicles/a')], 'C:/vehicles/abc/tank.vehicle', expanded, async () => { loaded = true; })).toBe(false);
    expect(loaded).toBe(false); expect(expanded.size).toBe(0);
  });
  it('ignores a reveal superseded during loading', async () => {
    let current = true; const expanded = new Set<string>();
    expect(await revealWorkspacePath([dir('/vehicles/a')], '/vehicles/a/tank.vehicle', expanded, async entry => {
      entry.children = [vehicle('/vehicles/a/tank.vehicle')]; current = false;
    }, () => current)).toBe(false);
    expect(expanded.size).toBe(0);
  });
});
