import { describe, expect, it, vi } from 'vitest';
import { FileDialogGate } from '../src/core/editor/file-dialog-gate';
import { fileDialogOpen } from '../src/platform/file-dialog';
import { desktop } from '../src/platform/desktop-api';
import { invoke } from '@tauri-apps/api/core';
vi.mock('@tauri-apps/api/core', () => ({ invoke: vi.fn() }));

describe('shared exclusive file dialog mechanism', () => {
  it('releases after cancellation, failure and successful selection', async () => {
    const states: boolean[] = []; const gate = new FileDialogGate(open => states.push(open));
    expect(await gate.run(async () => null)).toBe(null);
    await expect(gate.run(async () => { throw new Error('failed'); })).rejects.toThrow('failed');
    expect(gate.isOpen()).toBe(false); expect(await gate.run(async () => 'selected')).toBe('selected');
    expect(states).toEqual([true, false, true, false, true, false]);
  });
  it('allows only one of all file/folder/save chooser types at a time', async () => {
    let finish!: (value: null) => void;
    vi.mocked(invoke).mockClear().mockImplementationOnce(() => new Promise(resolve => { finish = resolve; }));
    const first = desktop.openVehicle(); expect(fileDialogOpen.value).toBe(true);
    expect(await desktop.chooseVehicleBase()).toBe(null);
    expect(await desktop.chooseVehicleWorkspace()).toBe(null);
    expect(await desktop.chooseFolder()).toBe(null);
    expect(await desktop.chooseMapOutputFolder()).toBe(null);
    expect(await desktop.chooseOverrideFile()).toBe(null);
    expect(await desktop.chooseSupportFile('animation')).toBe(null);
    expect(await desktop.saveRenderPng('icon.png', '')).toBe(null);
    expect(await desktop.saveVehicle('test.vehicle', '<vehicle/>', true)).toBe(null);
    expect(invoke).toHaveBeenCalledTimes(1);
    finish(null); expect(await first).toBe(null); expect(fileDialogOpen.value).toBe(false);
    vi.mocked(invoke).mockRejectedValueOnce(new Error('cancelled by OS'));
    await expect(desktop.chooseFolder()).rejects.toThrow('cancelled by OS'); expect(fileDialogOpen.value).toBe(false);
    vi.mocked(invoke).mockResolvedValueOnce('C:/models'); expect(await desktop.chooseFolder()).toBe('C:/models');
  });
});
