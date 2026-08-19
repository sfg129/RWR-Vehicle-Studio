import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SourceDocument } from '../src/core/xml/source-document';
import { composeVehicle, vehicleBaseReference } from '../src/core/vehicle/vehicle-composition';
import { sceneEntries } from '../src/core/vehicle/vehicle-model';
import { parseWeaponDefinition } from '../src/core/resources/resource-catalog';

function fixture(name: string): string {
  return join(process.cwd(), 'tests', 'fixtures', name);
}

describe('合成 RWR 资产 fixture（RV-051）', () => {
  it('CI 必跑：composeVehicle 合成 synthetic base + leaf', () => {
    const base = new SourceDocument(readFileSync(fixture('synthetic_base.vehicle'), 'utf8'));
    const leaf = new SourceDocument(readFileSync(fixture('synthetic_leaf.vehicle'), 'utf8'));
    expect(vehicleBaseReference(leaf)).toBe('synthetic_base.vehicle');
    const composed = composeVehicle(base, leaf);
    const entries = sceneEntries(composed.document);
    expect(entries.filter((entry) => entry.kind === 'turret')).toHaveLength(1);
    expect(entries.filter((entry) => entry.kind === 'visual')).toHaveLength(1);
    const visual = entries.find((entry) => entry.kind === 'visual')!;
    expect(composed.document.value(visual.node, 'mesh_filename')).toBe('synth_chassis_alt.mesh');
  });

  it('CI 必跑：parseWeaponDefinition 解析 synthetic weapon 与 shield', () => {
    const weapon = parseWeaponDefinition(readFileSync(fixture('synthetic_turret.weapon'), 'utf8'), 'synth_turret.weapon');
    expect(weapon.voxelModel).toBe('synth_gun.xml');
    expect(weapon.shields).toEqual([{ offset: [0, 0.5, 0.7], extent: [0.75, 4, 4] }]);
  });
});
