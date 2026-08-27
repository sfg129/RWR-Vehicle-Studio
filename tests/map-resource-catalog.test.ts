import { describe, expect, it } from 'vitest';
import { factionTagCandidates, parseMapFactionDescriptor, parseMapVehicleDefinition, parseResourceVehicleKeys, resolveMapVehicleInheritance } from '../src/core/map/map-resource-catalog';

describe('map resource catalog', () => {
  it('reads vehicle tags, respawn time and inherited tags', () => {
    const base = parseMapVehicleDefinition('<vehicle name="Base" key="base.vehicle" respawn_time="90"><tag name="at_gun"/></vehicle>', 'C:\\vehicles\\base.vehicle')!;
    const leaf = parseMapVehicleDefinition('<vehicle name="QF 6" key="qf6.vehicle" file="base.vehicle"></vehicle>', 'C:\\vehicles\\qf6.vehicle')!;
    const resolved = resolveMapVehicleInheritance([base, leaf]);
    expect(resolved[1].tags).toEqual(['at_gun']);
    expect(resolved[1].respawnTime).toBe(90);
  });

  it('resolves tag candidates through faction resource files', () => {
    const descriptor = parseMapFactionDescriptor('<faction name="UKF"><soldier><resources file="ukf_default.resources"/></soldier></faction>', 'allies.xml');
    const keys = parseResourceVehicleKeys('<resources><vehicle key="qf6.vehicle"/><vehicle key="jeep.vehicle"/></resources>');
    const qf = parseMapVehicleDefinition('<vehicle name="QF 6" key="qf6.vehicle"><tag name="at_gun"/></vehicle>', 'qf6.vehicle')!;
    const jeep = parseMapVehicleDefinition('<vehicle name="Jeep" key="jeep.vehicle"><tag name="vehicle"/></vehicle>', 'jeep.vehicle')!;
    const faction = { ...descriptor, vehicleKeys: keys, missingResources: [] };
    expect(factionTagCandidates(faction, [qf, jeep], 'at_gun').map((value) => value.key)).toEqual(['qf6.vehicle']);
  });

  it('does not treat commented tags or resource entries as active', () => {
    const vehicle = parseMapVehicleDefinition('<vehicle key="gun.vehicle"><!-- <tag name="hmg"/> --><tag name="at_gun"/></vehicle>', 'gun.vehicle')!;
    expect(vehicle.tags).toEqual(['at_gun']);
    expect(parseResourceVehicleKeys('<resources><!-- <vehicle key="old.vehicle"/> --><vehicle key="new.vehicle"/></resources>')).toEqual(['new.vehicle']);
  });
});
