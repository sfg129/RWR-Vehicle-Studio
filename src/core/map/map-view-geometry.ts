export interface MapPoint { x: number; y: number }
export interface ScreenToMapMatrix { a: number; b: number; c: number; d: number; e: number; f: number }

// RWR headings are clockwise 90 degrees from the SVG rectangle's local X axis.
export const MAP_HEADING_OFFSET = 90;

export function transformMapPoint(matrix: ScreenToMapMatrix, x: number, y: number): MapPoint {
  return { x: matrix.a * x + matrix.c * y + matrix.e, y: matrix.b * x + matrix.d * y + matrix.f };
}

export function normalizeMapAngle(angle: number): number {
  return ((angle + 180) % 360 + 360) % 360 - 180;
}

export function mapMarkerScale(viewWidth: number, viewHeight: number, screenWidth: number, screenHeight: number): number {
  return Math.max(viewWidth / Math.max(1, screenWidth), viewHeight / Math.max(1, screenHeight));
}

export function pointerMapAngle(center: MapPoint, pointer: MapPoint, unitsPerPixel: number): number | undefined {
  const dx = pointer.x - center.x, dy = pointer.y - center.y;
  // An angle is unstable at the pivot; resume with a new baseline after crossing it.
  if (Math.hypot(dx, dy) < unitsPerPixel * 6) return undefined;
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

export function draggedMapAngle(angle: number, previousPointerAngle: number | undefined, pointerAngle: number | undefined): number {
  if (previousPointerAngle === undefined || pointerAngle === undefined) return angle;
  return normalizeMapAngle(angle + normalizeMapAngle(pointerAngle - previousPointerAngle));
}
