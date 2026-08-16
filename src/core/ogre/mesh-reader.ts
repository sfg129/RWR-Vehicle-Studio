export interface OgreGeometry {
  vertexCount: number;
  positions: number[];
  normals: number[];
  uvs: number[];
}
export interface OgreSubmesh {
  name: string;
  materialName: string;
  useSharedVertices: boolean;
  operationType: number;
  indices: number[];
  geometry: OgreGeometry | null;
}
export interface OgreMesh {
  version: string;
  sharedGeometry: OgreGeometry | null;
  submeshes: OgreSubmesh[];
  bounds?: { min: number[]; max: number[]; radius: number };
}

interface Chunk { id: number; length: number; payload: number; end: number }
interface Element { source: number; type: number; semantic: number; offset: number; index: number }
interface BufferDef { stride: number; rawStart: number; rawEnd: number }

export function parseOgreMesh(buffer: ArrayBuffer): OgreMesh {
  const v = new DataView(buffer); const size = v.byteLength;
  if (size < 8 || v.getUint16(0, true) !== 0x1000) throw new Error('不是受支持的 OGRE .mesh 文件');
  const [version, afterVersion] = readLine(v, 2, size);
  const meshChunk = chunk(v, afterVersion, size);
  if (!meshChunk || meshChunk.id !== 0x3000) throw new Error('OGRE mesh 缺少 M_MESH 块');
  let pos = meshChunk.payload + 1;
  const submeshes: OgreSubmesh[] = []; let sharedGeometry: OgreGeometry | null = null;
  let bounds: OgreMesh['bounds']; const names = new Map<number, string>();
  while (pos + 6 <= size) {
    const c = chunk(v, pos, size); if (!c) break;
    if (c.id === 0x4000) { const parsed = parseSubmesh(v, c.payload, size); submeshes.push(parsed.value); pos = parsed.pos; }
    else if (c.id === 0x5000) { const parsed = parseGeometry(v, c.payload, size); sharedGeometry = parsed.value; pos = parsed.pos; }
    else if (c.id === 0x9000 && c.payload + 28 <= c.end) {
      bounds = { min: floats(v, c.payload, 3), max: floats(v, c.payload + 12, 3), radius: v.getFloat32(c.payload + 24, true) }; pos += c.length;
    } else if (c.id === 0xa000) { const parsed = parseNameTable(v, c.payload, size); parsed.names.forEach((name, id) => names.set(id, name)); pos = parsed.pos; }
    else if ([0xb000, 0xc000, 0xd000, 0xe000].includes(c.id)) break;
    else pos += c.length;
  }
  submeshes.forEach((s, i) => { s.name = names.get(i) ?? s.materialName ?? `submesh-${i}`; });
  return { version, sharedGeometry, submeshes, bounds };
}

function parseSubmesh(v: DataView, payload: number, limit: number): { value: OgreSubmesh; pos: number } {
  const [materialName, afterName] = readLine(v, payload, limit); let pos = afterName;
  if (pos + 6 > limit) throw new Error('OGRE submesh 头部不完整');
  const useSharedVertices = v.getUint8(pos) !== 0; const count = v.getUint32(pos + 1, true); const longIndex = v.getUint8(pos + 5) !== 0; pos += 6;
  const indices: number[] = []; const indexSize = longIndex ? 4 : 2;
  for (let i = 0; i < count && pos + indexSize <= limit; i++, pos += indexSize)
    indices.push(longIndex ? v.getUint32(pos, true) : v.getUint16(pos, true));
  let geometry: OgreGeometry | null = null; let operationType = 4;
  while (pos + 6 <= limit) {
    const c = chunk(v, pos, limit); if (!c) break;
    if (c.id === 0x5000) { const parsed = parseGeometry(v, c.payload, limit); geometry = parsed.value; pos = parsed.pos; }
    else if (c.id === 0x4010 && c.payload + 2 <= c.end) { operationType = v.getUint16(c.payload, true); pos += c.length; }
    else if (c.id === 0x4100 || c.id === 0x4200) pos += c.length;
    else break;
  }
  return { value: { name: materialName, materialName, useSharedVertices, operationType, indices, geometry }, pos };
}

function parseGeometry(v: DataView, payload: number, limit: number): { value: OgreGeometry; pos: number } {
  if (payload + 4 > limit) throw new Error('OGRE geometry 不完整');
  const vertexCount = v.getUint32(payload, true); let pos = payload + 4; const elements: Element[] = []; const buffers = new Map<number, BufferDef>();
  while (pos + 6 <= limit) {
    const c = chunk(v, pos, limit); if (!c) break;
    if (c.id === 0x5100) {
      let ep = c.payload;
      while (ep + 6 <= limit) {
        const e = chunk(v, ep, limit); if (!e || e.id !== 0x5110 || e.payload + 10 > e.end) break;
        elements.push({ source: v.getUint16(e.payload, true), type: v.getUint16(e.payload + 2, true), semantic: v.getUint16(e.payload + 4, true), offset: v.getUint16(e.payload + 6, true), index: v.getUint16(e.payload + 8, true) });
        ep += e.length;
      }
      pos = ep;
    } else if (c.id === 0x5200 && c.payload + 4 <= c.end) {
      const binding = v.getUint16(c.payload, true), stride = v.getUint16(c.payload + 2, true); const dataChunk = chunk(v, c.payload + 4, limit);
      if (dataChunk?.id === 0x5210) { buffers.set(binding, { stride, rawStart: dataChunk.payload, rawEnd: dataChunk.end }); pos = c.payload + 4 + dataChunk.length; }
      else pos += c.length;
    } else break;
  }
  const positions: number[] = [], normals: number[] = [], uvs: number[] = [];
  for (const e of elements) {
    const b = buffers.get(e.source); if (!b) continue;
    const componentCount = e.type === 0 ? 1 : e.type === 1 ? 2 : e.type === 2 ? 3 : e.type === 3 ? 4 : 0;
    if (!componentCount) continue;
    const out = e.semantic === 1 ? positions : e.semantic === 4 ? normals : e.semantic === 7 && e.index === 0 ? uvs : null;
    if (!out) continue;
    for (let i = 0; i < vertexCount; i++) {
      const at = b.rawStart + i * b.stride + e.offset; if (at + componentCount * 4 > b.rawEnd) break;
      for (let k = 0; k < componentCount; k++) out.push(v.getFloat32(at + k * 4, true));
    }
  }
  return { value: { vertexCount, positions, normals, uvs }, pos };
}

function parseNameTable(v: DataView, payload: number, limit: number): { names: Map<number, string>; pos: number } {
  const names = new Map<number, string>(); let pos = payload;
  while (pos + 6 <= limit) {
    const c = chunk(v, pos, limit); if (!c || c.id !== 0xa100 || c.payload + 2 > c.end) break;
    const id = v.getUint16(c.payload, true); const [name] = readLine(v, c.payload + 2, c.end); names.set(id, name); pos += c.length;
  }
  return { names, pos };
}
function chunk(v: DataView, pos: number, limit: number): Chunk | null {
  if (pos + 6 > Math.min(limit, v.byteLength)) return null;
  const id = v.getUint16(pos, true), length = v.getUint32(pos + 2, true); if (length < 6) return null;
  return { id, length, payload: pos + 6, end: Math.min(pos + length, limit, v.byteLength) };
}
function readLine(v: DataView, pos: number, limit: number): [string, number] {
  const bytes: number[] = [];
  while (pos < limit && pos < v.byteLength && v.getUint8(pos) !== 10) bytes.push(v.getUint8(pos++));
  if (pos >= limit || pos >= v.byteLength) throw new Error('OGRE 字符串未终止');
  return [new TextDecoder().decode(new Uint8Array(bytes)), pos + 1];
}
function floats(v: DataView, pos: number, count: number): number[] { return Array.from({ length: count }, (_, i) => v.getFloat32(pos + i * 4, true)); }
