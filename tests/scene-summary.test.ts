import { describe, expect, it } from 'vitest';
import { SourceDocument } from '../src/core/xml/source-document';
import { formatVehicleSceneSummary, vehicleSceneSummary } from '../src/core/vehicle/scene-summary';
import type { ResourceResult, WeaponModel } from '../src/core/resources/resource-catalog';
import { suppressBrowserContextMenu } from '../src/core/editor/browser-context-menu';
import { readFileSync } from 'node:fs';

describe('vehicle UI summary and context menu', () => {
  it('includes vehicle and mounted weapon model placements, not just visuals', async () => {
    const doc = new SourceDocument('<vehicle><visual mesh_filename="chassis.mesh"/><visual mesh_filename="damage.mesh" key="broken"/><visual/><turret weapon_key="cannon"/><turret weapon_key="mg"/><turret weapon_key="mg"/><turret weapon_key="no-model"/><turret weapon_key="missing"/><character_slot type="driver"/><character_slot type="gunner" hiding="1"/></vehicle>');
    const catalog = { async weapon(key: string | undefined): Promise<ResourceResult<WeaponModel>> {
      if (key === 'missing') return { ok: false, kind: 'missing', message: 'missing' };
      return { ok: true, value: { sourcePath: key ?? '', shields: [], mesh: key === 'cannon' ? 'gun.mesh' : undefined, voxelModel: key === 'mg' ? 'mg.xml' : undefined } };
    } };
    const summary = await vehicleSceneSummary(doc, catalog);
    expect(summary).toEqual({ models: 5, crew: 2 });
    expect(formatVehicleSceneSummary(summary)).toBe('5 个模型，2 个乘员');
  });
  it('supports empty vehicles and missing weapon definitions', async () => {
    const summary = await vehicleSceneSummary(new SourceDocument('<vehicle/>'), {
      async weapon() { return { ok: false, kind: 'missing', message: 'missing' }; },
    });
    expect(summary).toEqual({ models: 0, crew: 0 });
  });
  it('prevents only the browser context-menu event', () => {
    const event = new Event('contextmenu', { cancelable: true });
    suppressBrowserContextMenu(event);
    expect(event.defaultPrevented).toBe(true);
    const main = readFileSync('src/main.ts', 'utf8');
    expect(main).toContain("document.addEventListener('contextmenu', suppressBrowserContextMenu)");
    expect(main).not.toContain("document.addEventListener('pointerdown'");
    expect(readFileSync('src/components/EditorViewport.vue', 'utf8')).not.toContain('viewport-help');
  });
});
