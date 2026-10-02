import { describe, expect, it } from 'vitest';
import { SourceDocument } from '../src/core/xml/source-document';
import { insertVehicleTab, vehiclePathKey, vehicleTabDirty, type VehicleTab, type VehicleTabDocument } from '../src/core/editor/vehicle-tabs';

function state(name: string): VehicleTabDocument {
  const text = `<vehicle name="${name}"/>`;
  return { opened: { name: `${name}.vehicle`, path: `C:/vehicles/${name}.vehicle`, text }, document: new SourceDocument(text), savedText: text };
}
describe('vehicle preview tabs', () => {
  it('replaces only the clean preview and preserves fixed tab order', () => {
    const a = insertVehicleTab([], state('a'));
    a.tabs[0].preview = false;
    const b = insertVehicleTab(a.tabs, state('b'));
    const c = insertVehicleTab(b.tabs, state('c'));
    expect(c.tabs.map((t) => t.state.opened.name)).toEqual(['a.vehicle', 'c.vehicle']);
    expect(c.tabs[0]).toBe(a.tabs[0]);
    expect(c.tabs[1].preview).toBe(true);
  });
  it('never replaces an edited preview even before the UI pins it', () => {
    const a = insertVehicleTab([], state('a'));
    a.tabs[0].state.document.set(a.tabs[0].state.document.root!, 'name', 'edited');
    const b = insertVehicleTab(a.tabs, state('b'));
    expect(b.tabs).toHaveLength(2);
    expect(b.tabs[0].preview).toBe(false);
    expect(vehicleTabDirty(b.tabs[0])).toBe(true);
    expect(vehicleTabDirty(b.tabs[1])).toBe(false);
    expect(b.tabs[1].state.document.value(b.tabs[1].state.document.root!, 'name')).toBe('b');
  });
  it('reopens the existing session without replacing its edits or creating a duplicate', () => {
    const a = insertVehicleTab([], state('a'));
    a.tabs[0].state.document.set(a.tabs[0].state.document.root!, 'name', 'edited');
    const other = state('a'); other.opened.path = '\\\\?\\C:\\VEHICLES\\A.VEHICLE';
    const result = insertVehicleTab(a.tabs, other);
    expect(result.tabs).toBe(a.tabs);
    expect(result.id).toBe(a.id);
    expect(result.tabs[0].state.document.serialize()).toContain('edited');
  });
  it('a saved, unchanged tab stays permanent when another vehicle opens', () => {
    const fixed: VehicleTab = { id: 'saved', preview: false, state: state('saved') };
    expect(vehicleTabDirty(fixed)).toBe(false);
    expect(insertVehicleTab([fixed], state('next')).tabs).toHaveLength(2);
  });
  it('normalizes Windows local and UNC display paths', () => {
    expect(vehiclePathKey('C:\\Mod\\A.vehicle')).toBe('c:/mod/a.vehicle');
    expect(vehiclePathKey('\\\\?\\UNC\\server\\share\\A.vehicle')).toBe('//server/share/a.vehicle');
  });
});
