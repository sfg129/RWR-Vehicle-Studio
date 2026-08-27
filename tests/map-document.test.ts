import { describe, expect, it } from 'vitest';
import { cloneMapSpawn, parseRwrMap, serializeRwrMap } from '../src/core/map/rwr-map-document';

const SVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" width="2048" height="2048">
  <g inkscape:label="materials"><rect id="template" x="2400" y="800" width="6" height="8"><desc>type = vehicle; key = template.vehicle;</desc></rect></g>
  <g inkscape:label="layer.axis"><g inkscape:label="vehicles">
    <rect id="spawn1" x="100" y="200" width="6" height="8" transform="rotate(90 103 204)"><desc>type = vehicle;
tag = hmg;</desc></rect>
  </g></g>
  <g inkscape:label="bases.quickmatch"><rect id="base1" x="50" y="70" width="100" height="80"><desc>name = Depot;</desc></rect></g>
</svg>`;

describe('RWR map document', () => {
  it('separates material templates and physical vehicle spawns', () => {
    const map = parseRwrMap(SVG);
    expect(map.width).toBe(2048);
    expect(map.spawns).toHaveLength(2);
    const physical = map.spawns.find((spawn) => !spawn.isTemplate)!;
    expect(physical.layer).toBe('layer.axis');
    expect(physical.referenceKind).toBe('tag');
    expect(physical.reference).toBe('hmg');
    expect(physical.x).toBeCloseTo(103);
    expect(physical.y).toBeCloseTo(204);
    expect(physical.angle).toBeCloseTo(90);
    expect(map.bases[0].name).toBe('Depot');
  });

  it('rewrites only the edited element and preserves unrelated source text', () => {
    const map = parseRwrMap(SVG);
    const spawns = map.spawns.map((spawn) => ({ ...spawn }));
    const physical = spawns.find((spawn) => !spawn.isTemplate)!;
    physical.x = 300; physical.y = 400; physical.angle = -45; physical.referenceKind = 'key'; physical.reference = 'pak40.vehicle';
    const output = serializeRwrMap(map, spawns);
    expect(output).toContain('<g inkscape:label="materials"><rect id="template" x="2400" y="800" width="6" height="8"><desc>type = vehicle; key = template.vehicle;</desc></rect></g>');
    expect(output).toContain('transform="matrix(');
    expect(output).not.toContain('rotate(-45 300 400)');
    expect(output).toContain('key = pak40.vehicle;');
    const reparsed = parseRwrMap(output).spawns.find((spawn) => spawn.elementId === 'spawn1')!;
    expect(reparsed.x).toBeCloseTo(300, 5);
    expect(reparsed.y).toBeCloseTo(400, 5);
    expect(reparsed.angle).toBeCloseTo(-45, 5);
  });

  it('changes only the description when the geometry is already RWR compatible', () => {
    const source = SVG.replace(
      'x="100" y="200" width="6" height="8" transform="rotate(90 103 204)"',
      'x="201" y="-107" width="6" height="8" transform="matrix(0,1,-1,0,0,0)"',
    );
    const map = parseRwrMap(source);
    const current = map.spawns.map((spawn) => ({ ...spawn }));
    const physical = current.find((spawn) => !spawn.isTemplate)!;
    physical.referenceKind = 'key'; physical.reference = 'm1917_hmg.vehicle';
    const output = serializeRwrMap(map, current);
    expect(output).toContain('x="201" y="-107" width="6" height="8" transform="matrix(0,1,-1,0,0,0)"');
    expect(output).toContain('key = m1917_hmg.vehicle;');
  });

  it('duplicates and deletes a spawn without serializing the full XML tree', () => {
    const map = parseRwrMap(SVG);
    const physical = map.spawns.find((spawn) => !spawn.isTemplate)!;
    const cloned = cloneMapSpawn(physical, map.spawns);
    const current = map.spawns.map((spawn) => ({ ...spawn, deleted: spawn.uid === physical.uid }));
    current.push(cloned);
    const output = serializeRwrMap(map, current);
    expect(output).not.toContain('id="spawn1"');
    expect(output).toContain('id="spawn_rwrmap_1"');
    expect(output).toContain('id="desc_spawn_rwrmap_1"');
    expect(output).toContain('transform="matrix(');
    const reparsed = parseRwrMap(output).spawns.find((spawn) => spawn.elementId === 'spawn_rwrmap_1')!;
    expect(reparsed.x).toBeCloseTo(115, 5);
    expect(reparsed.y).toBeCloseTo(216, 5);
  });

  it('repairs legacy Studio node ids and transforms on save', () => {
    const source = SVG.replace('id="spawn1"', 'id="rwrmap_7"');
    const map = parseRwrMap(source);
    const output = serializeRwrMap(map, map.spawns);
    expect(output).not.toContain('id="rwrmap_7"');
    expect(output).toContain('id="spawn_rwrmap_7"');
    expect(output).toContain('id="desc_spawn_rwrmap_7"');
    expect(output).toContain('transform="matrix(');
    expect(output).not.toContain('transform="rotate(90 103 204)"');
  });
});
