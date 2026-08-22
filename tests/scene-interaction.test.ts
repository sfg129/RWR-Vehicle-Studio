import { describe, expect, it } from 'vitest';
import { SourceDocument } from '../src/core/xml/source-document';
import { comparePickRank, synchronizeOffsetBindings, updateOffsetBindings } from '../src/editor/scene-interaction';

describe('scene interaction state', () => {
  it('updates the matching cached offset immediately after a drag', () => {
    const bindings = [
      { nodeId: 1, attr: 'weapon_offset', localOffset: [0, 0, 0] as [number, number, number] },
      { nodeId: 2, attr: 'offset', localOffset: [4, 5, 6] as [number, number, number] },
    ];
    updateOffsetBindings(bindings, 1, 'weapon_offset', [1, 2, 3]);
    expect(bindings[0].localOffset).toEqual([1, 2, 3]);
    expect(bindings[1].localOffset).toEqual([4, 5, 6]);
  });

  it('refreshes cached offsets from a recomposed document', () => {
    const doc = new SourceDocument('<vehicle><turret weapon_offset="2 3 4" /></vehicle>');
    const binding = { nodeId: 1, attr: 'weapon_offset', localOffset: [0, 0, 0] as [number, number, number] };
    synchronizeOffsetBindings(doc, [binding]);
    expect(binding.localOffset).toEqual([2, 3, 4]);
  });

  it('prefers editable weapons, then smaller overlapping targets', () => {
    const chassis = { priority: 100, volume: 40, distance: 4 };
    const largeWeapon = { priority: 300, volume: 8, distance: 4.2 };
    const machineGun = { priority: 300, volume: 1, distance: 4.3 };
    expect([chassis, largeWeapon, machineGun].sort(comparePickRank)[0]).toBe(machineGun);
  });
});
