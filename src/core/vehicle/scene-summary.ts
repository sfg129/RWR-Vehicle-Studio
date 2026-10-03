import type { ResourceCatalog } from '../resources/resource-catalog';
import type { SourceDocument } from '../xml/source-document';

export interface VehicleSceneSummary { models: number; crew: number }

/** Count model placements, not unique filenames; include mounted weapon models. */
export async function vehicleSceneSummary(doc: SourceDocument, catalog: Pick<ResourceCatalog, 'weapon'>): Promise<VehicleSceneSummary> {
  const children = doc.root?.children ?? [];
  const visuals = children.filter(node => node.name === 'visual' && Boolean(doc.value(node, 'mesh_filename')?.trim()));
  const weapons = await Promise.all(children.filter(node => node.name === 'turret').map(async turret => {
    const weapon = await catalog.weapon(doc.value(turret, 'weapon_key'));
    return weapon.ok ? Number(Boolean(weapon.value.mesh)) + Number(Boolean(weapon.value.voxelModel)) : 0;
  }));
  return {
    models: visuals.length + weapons.reduce((total, count) => total + count, 0),
    crew: children.filter(node => node.name === 'character_slot').length,
  };
}

export function formatVehicleSceneSummary(summary: VehicleSceneSummary): string {
  return `${summary.models} 个模型，${summary.crew} 个乘员`;
}
