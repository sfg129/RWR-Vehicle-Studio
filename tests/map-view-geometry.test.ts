import { describe, expect, it } from 'vitest';
import { draggedMapAngle, MAP_HEADING_OFFSET, mapMarkerScale, normalizeMapAngle, pointerMapAngle, transformMapPoint } from '../src/core/map/map-view-geometry';

describe('map pointer and marker geometry', () => {
  it('maps a letterboxed, panned SVG through its real screen transform', () => {
    // A 2048-square view at (300, 500), fitted in a 1000x600 panel at (40, 80).
    // The map starts 200 CSS pixels to the right of the panel edge.
    const scale = 600 / 2048;
    const inverse = { a: 1 / scale, b: 0, c: 0, d: 1 / scale, e: 300 - 240 / scale, f: 500 - 80 / scale };
    expect(transformMapPoint(inverse, 540, 380).x).toBeCloseTo(1324);
    expect(transformMapPoint(inverse, 540, 380).y).toBeCloseTo(1524);
    const start = transformMapPoint(inverse, 540, 380), moved = transformMapPoint(inverse, 600, 410);
    expect(moved.x - start.x).toBeCloseTo(204.8);
    expect(moved.y - start.y).toBeCloseTo(102.4);
    expect(mapMarkerScale(2048, 2048, 1000, 600) * scale * 24).toBeCloseTo(24);
    expect(mapMarkerScale(512, 512, 1000, 600) * (600 / 512) * 24).toBeCloseTo(24);
  });

  it('keeps the initial grab offset and rotates smoothly across the angle boundary', () => {
    expect(draggedMapAngle(15, 109, 109)).toBe(15); // Grabbed near the edge of the handle.
    expect(draggedMapAngle(15, 109, 119)).toBe(25);
    expect(draggedMapAngle(85, 179, -179)).toBe(87);
    expect(draggedMapAngle(87, -179, 179)).toBe(85);
    expect(normalizeMapAngle(-90 + MAP_HEADING_OFFSET)).toBe(0); // Former north now points east.
  });

  it('does not flip the heading while the mouse crosses the pivot', () => {
    const angle = pointerMapAngle({ x: 100, y: 200 }, { x: 101, y: 201 }, 2);
    expect(angle).toBeUndefined();
    expect(draggedMapAngle(30, 120, angle)).toBe(30);
    expect(draggedMapAngle(30, angle, -60)).toBe(30);
    expect(draggedMapAngle(30, -60, -50)).toBe(40);
  });
});
