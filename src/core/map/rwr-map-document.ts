export interface Matrix2D { a: number; b: number; c: number; d: number; e: number; f: number }

export interface MapBaseArea {
  id: string;
  name: string;
  layer: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type MapSpawnReferenceKind = 'key' | 'tag';

export interface MapVehicleSpawn {
  uid: string;
  elementId: string;
  layer: string;
  layerPath: string[];
  isTemplate: boolean;
  x: number;
  y: number;
  angle: number;
  width: number;
  height: number;
  referenceKind: MapSpawnReferenceKind;
  reference: string;
  deleted: boolean;
  added: boolean;
  sourceStart: number;
  sourceEnd: number;
  cloneSourceUid?: string;
  parentMatrix: Matrix2D;
}

export interface ParsedRwrMap {
  source: string;
  width: number;
  height: number;
  spawns: MapVehicleSpawn[];
  bases: MapBaseArea[];
  layerNames: string[];
  diagnostics: string[];
}

interface XmlNode {
  name: string;
  localName: string;
  attrs: Record<string, string>;
  start: number;
  openEnd: number;
  closeStart: number;
  end: number;
  parent?: XmlNode;
  children: XmlNode[];
}

const IDENTITY: Matrix2D = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

function multiply(left: Matrix2D, right: Matrix2D): Matrix2D {
  return {
    a: left.a * right.a + left.c * right.b,
    b: left.b * right.a + left.d * right.b,
    c: left.a * right.c + left.c * right.d,
    d: left.b * right.c + left.d * right.d,
    e: left.a * right.e + left.c * right.f + left.e,
    f: left.b * right.e + left.d * right.f + left.f,
  };
}

function inverse(value: Matrix2D): Matrix2D {
  const determinant = value.a * value.d - value.b * value.c;
  if (Math.abs(determinant) < 1e-10) return IDENTITY;
  return {
    a: value.d / determinant,
    b: -value.b / determinant,
    c: -value.c / determinant,
    d: value.a / determinant,
    e: (value.c * value.f - value.d * value.e) / determinant,
    f: (value.b * value.e - value.a * value.f) / determinant,
  };
}

function point(matrix: Matrix2D, x: number, y: number): { x: number; y: number } {
  return { x: matrix.a * x + matrix.c * y + matrix.e, y: matrix.b * x + matrix.d * y + matrix.f };
}

function numbers(text: string): number[] {
  return text.trim().split(/[\s,]+/).filter(Boolean).map(Number).filter(Number.isFinite);
}

export function parseSvgTransform(text: string | undefined): Matrix2D {
  if (!text) return IDENTITY;
  let result = IDENTITY;
  const expression = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  for (let match = expression.exec(text); match; match = expression.exec(text)) {
    const name = match[1].toLowerCase();
    const value = numbers(match[2]);
    let next = IDENTITY;
    if (name === 'matrix' && value.length >= 6) {
      next = { a: value[0], b: value[1], c: value[2], d: value[3], e: value[4], f: value[5] };
    } else if (name === 'translate' && value.length) {
      next = { ...IDENTITY, e: value[0], f: value[1] ?? 0 };
    } else if (name === 'scale' && value.length) {
      next = { a: value[0], b: 0, c: 0, d: value[1] ?? value[0], e: 0, f: 0 };
    } else if (name === 'rotate' && value.length) {
      const radians = value[0] * Math.PI / 180;
      const rotation = { a: Math.cos(radians), b: Math.sin(radians), c: -Math.sin(radians), d: Math.cos(radians), e: 0, f: 0 };
      if (value.length >= 3) {
        next = multiply(multiply({ ...IDENTITY, e: value[1], f: value[2] }, rotation), { ...IDENTITY, e: -value[1], f: -value[2] });
      } else next = rotation;
    } else if (name === 'skewx' && value.length) {
      next = { ...IDENTITY, c: Math.tan(value[0] * Math.PI / 180) };
    } else if (name === 'skewy' && value.length) {
      next = { ...IDENTITY, b: Math.tan(value[0] * Math.PI / 180) };
    }
    result = multiply(result, next);
  }
  return result;
}

function findTagEnd(source: string, start: number): number {
  let quote = '';
  for (let i = start + 1; i < source.length; i++) {
    const char = source[i];
    if (quote) { if (char === quote) quote = ''; continue; }
    if (char === '"' || char === "'") { quote = char; continue; }
    if (char === '>') return i + 1;
  }
  return source.length;
}

function parseAttributes(openTag: string): Record<string, string> {
  const result: Record<string, string> = {};
  const expression = /([^\s=<>/]+)\s*=\s*(["'])([\s\S]*?)\2/g;
  for (let match = expression.exec(openTag); match; match = expression.exec(openTag)) result[match[1]] = decodeXml(match[3]);
  return result;
}

function parseXml(source: string): XmlNode[] {
  const roots: XmlNode[] = [];
  const stack: XmlNode[] = [];
  let cursor = 0;
  while (cursor < source.length) {
    const start = source.indexOf('<', cursor);
    if (start < 0) break;
    if (source.startsWith('<!--', start)) { const end = source.indexOf('-->', start + 4); cursor = end < 0 ? source.length : end + 3; continue; }
    if (source.startsWith('<![CDATA[', start)) { const end = source.indexOf(']]>', start + 9); cursor = end < 0 ? source.length : end + 3; continue; }
    if (source.startsWith('<?', start)) { const end = source.indexOf('?>', start + 2); cursor = end < 0 ? source.length : end + 2; continue; }
    const openEnd = findTagEnd(source, start);
    const raw = source.slice(start, openEnd);
    if (/^<\s*!/.test(raw)) { cursor = openEnd; continue; }
    const closing = /^<\s*\//.test(raw);
    const nameMatch = raw.match(/^<\s*\/?\s*([^\s/>]+)/);
    if (!nameMatch) { cursor = openEnd; continue; }
    const name = nameMatch[1];
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].name !== name) continue;
        const node = stack[i]; node.closeStart = start; node.end = openEnd; stack.length = i; break;
      }
      cursor = openEnd; continue;
    }
    const parent = stack.at(-1);
    const node: XmlNode = {
      name,
      localName: name.includes(':') ? name.slice(name.lastIndexOf(':') + 1) : name,
      attrs: parseAttributes(raw),
      start,
      openEnd,
      closeStart: openEnd,
      end: openEnd,
      parent,
      children: [],
    };
    if (parent) parent.children.push(node); else roots.push(node);
    const selfClosing = /\/\s*>$/.test(raw);
    if (!selfClosing) stack.push(node);
    cursor = openEnd;
  }
  for (const node of stack) { node.closeStart = source.length; node.end = source.length; }
  return roots;
}

function decodeXml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function encodeXmlText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function number(value: string | undefined, fallback = 0): number {
  const parsed = Number.parseFloat(value ?? ''); return Number.isFinite(parsed) ? parsed : fallback;
}

function descendants(nodes: XmlNode[]): XmlNode[] {
  const result: XmlNode[] = [];
  const visit = (node: XmlNode) => { result.push(node); for (const child of node.children) visit(child); };
  for (const node of nodes) visit(node);
  return result;
}

function labels(node: XmlNode): string[] {
  const result: string[] = [];
  for (let current: XmlNode | undefined = node.parent; current; current = current.parent) {
    const label = current.attrs['inkscape:label'] ?? current.attrs.label;
    if (label) result.push(label);
  }
  return result;
}

function nodeMatrix(node: XmlNode, includeSelf = true): Matrix2D {
  const chain: XmlNode[] = [];
  for (let current: XmlNode | undefined = includeSelf ? node : node.parent; current; current = current.parent) chain.push(current);
  let result = IDENTITY;
  for (let i = chain.length - 1; i >= 0; i--) result = multiply(result, parseSvgTransform(chain[i].attrs.transform));
  return result;
}

function description(source: string, node: XmlNode): { text: string; node?: XmlNode } {
  const desc = node.children.find((child) => child.localName === 'desc');
  return desc ? { text: decodeXml(source.slice(desc.openEnd, desc.closeStart)).trim(), node: desc } : { text: '' };
}

function properties(text: string): Record<string, string> {
  const result: Record<string, string> = {};
  for (const segment of text.split(';')) {
    const equals = segment.indexOf('='); if (equals < 0) continue;
    result[segment.slice(0, equals).trim().toLowerCase()] = segment.slice(equals + 1).trim();
  }
  return result;
}

function normalizedAngle(value: number): number {
  let result = value % 360; if (result <= -180) result += 360; if (result > 180) result -= 360; return result;
}

export function parseRwrMap(source: string): ParsedRwrMap {
  const roots = parseXml(source);
  const all = descendants(roots);
  const svg = all.find((node) => node.localName === 'svg');
  const width = number(svg?.attrs.width, 2048);
  const height = number(svg?.attrs.height, 2048);
  const diagnostics: string[] = [];
  const spawns: MapVehicleSpawn[] = [];
  const bases: MapBaseArea[] = [];
  const layerNames = new Set<string>();

  for (const node of all) {
    if (node.localName !== 'rect') continue;
    const desc = description(source, node);
    if (!desc.text) continue;
    const props = properties(desc.text);
    const layerPath = labels(node);
    const layer = layerPath.find((value) => /^layer(?:[._]|\d|$)/i.test(value)) ?? layerPath.find((value) => value !== 'vehicles' && value !== 'materials') ?? '未命名图层';
    const localX = number(node.attrs.x); const localY = number(node.attrs.y); const rectWidth = number(node.attrs.width, 6); const rectHeight = number(node.attrs.height, 7);
    const matrix = nodeMatrix(node); const center = point(matrix, localX + rectWidth / 2, localY + rectHeight / 2);
    const parentMatrix = nodeMatrix(node, false);
    if ((props.type ?? '').toLowerCase() === 'vehicle') {
      const referenceKind: MapSpawnReferenceKind = props.tag ? 'tag' : 'key';
      const reference = props[referenceKind] ?? '';
      if (!reference) diagnostics.push(`${node.attrs.id ?? `@${node.start}`}：vehicle 对象缺少 key/tag`);
      const isTemplate = layerPath.includes('materials');
      if (!isTemplate) layerNames.add(layer);
      spawns.push({
        uid: `${node.attrs.id ?? 'vehicle'}@${node.start}`,
        elementId: node.attrs.id ?? `rwr_vehicle_${node.start}`,
        layer,
        layerPath,
        isTemplate,
        x: center.x,
        y: center.y,
        angle: normalizedAngle(Math.atan2(matrix.b, matrix.a) * 180 / Math.PI),
        width: rectWidth,
        height: rectHeight,
        referenceKind,
        reference,
        deleted: false,
        added: false,
        sourceStart: node.start,
        sourceEnd: node.end,
        parentMatrix,
      });
      continue;
    }
    if (layerPath.some((value) => value.toLowerCase().startsWith('bases'))) {
      const name = props.name; if (!name) continue;
      bases.push({ id: node.attrs.id ?? `base_${node.start}`, name, layer, x: center.x - rectWidth / 2, y: center.y - rectHeight / 2, width: rectWidth, height: rectHeight });
    }
  }
  return { source, width, height, spawns, bases, layerNames: [...layerNames].sort((a, b) => a.localeCompare(b)), diagnostics };
}

function escapeRegExp(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function replaceAttribute(openTag: string, name: string, value: string): string {
  const expression = new RegExp(`(\\s${escapeRegExp(name)}\\s*=\\s*)(["'])([\\s\\S]*?)\\2`, 'i');
  if (expression.test(openTag)) return openTag.replace(expression, `$1"${value}"`);
  const close = openTag.lastIndexOf('>');
  const insertion = /\/\s*>$/.test(openTag) ? openTag.lastIndexOf('/') : close;
  return `${openTag.slice(0, insertion)} ${name}="${value}"${openTag.slice(insertion)}`;
}

function formatNumber(value: number): string {
  if (Math.abs(value) < 1e-9) return '0';
  return Number(value.toFixed(8)).toString();
}

function rwrCompatibleElementId(elementId: string): string {
  return /^rwrmap_\d+$/.test(elementId) ? `spawn_${elementId}` : elementId;
}

function hasThreeArgumentRotate(fragment: string): boolean {
  const tagEnd = findTagEnd(fragment, 0);
  const transform = parseAttributes(fragment.slice(0, tagEnd)).transform ?? '';
  return /rotate\s*\(\s*[-+\d.eE]+[\s,]+[-+\d.eE]+[\s,]+[-+\d.eE]+\s*\)/i.test(transform);
}

function rewriteElementId(fragment: string, elementId: string): string {
  const tagEnd = findTagEnd(fragment, 0);
  const open = replaceAttribute(fragment.slice(0, tagEnd), 'id', elementId);
  return open + fragment.slice(tagEnd);
}

function rewriteDescription(fragment: string, spawn: MapVehicleSpawn, descId?: string): string {
  const descText = encodeXmlText(`type = vehicle;\n${spawn.referenceKind} = ${spawn.reference};`);
  const descExpression = /(<(?:[\w.-]+:)?desc\b[^>]*>)[\s\S]*?(<\/(?:[\w.-]+:)?desc\s*>)/i;
  if (descExpression.test(fragment)) {
    return fragment.replace(descExpression, (match, opening: string, closing: string) => {
      const rewrittenOpening = descId ? replaceAttribute(opening, 'id', descId) : opening;
      return `${rewrittenOpening}${descText}${closing}`;
    });
  }
  const id = descId ? ` id="${descId}"` : '';
  return fragment.replace(/<\/rect\s*>/i, `<desc${id}>${descText}</desc></rect>`);
}

function rewriteFragment(fragment: string, spawn: MapVehicleSpawn, elementId = spawn.elementId, descId?: string): string {
  const tagEnd = findTagEnd(fragment, 0);
  let open = fragment.slice(0, tagEnd);
  const parentInverse = inverse(spawn.parentMatrix);
  const localCenter = point(parentInverse, spawn.x, spawn.y);
  const parentAngle = Math.atan2(spawn.parentMatrix.b, spawn.parentMatrix.a) * 180 / Math.PI;
  const localAngle = normalizedAngle(spawn.angle - parentAngle);
  const radians = localAngle * Math.PI / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const sourceCenter = {
    x: cosine * localCenter.x + sine * localCenter.y,
    y: -sine * localCenter.x + cosine * localCenter.y,
  };
  open = replaceAttribute(open, 'id', elementId);
  open = replaceAttribute(open, 'x', formatNumber(sourceCenter.x - spawn.width / 2));
  open = replaceAttribute(open, 'y', formatNumber(sourceCenter.y - spawn.height / 2));
  open = replaceAttribute(open, 'width', formatNumber(spawn.width));
  open = replaceAttribute(open, 'height', formatNumber(spawn.height));
  open = replaceAttribute(open, 'transform', `matrix(${formatNumber(cosine)},${formatNumber(sine)},${formatNumber(-sine)},${formatNumber(cosine)},0,0)`);
  return rewriteDescription(open + fragment.slice(tagEnd), spawn, descId);
}

export function cloneMapSpawn(source: MapVehicleSpawn, existing: readonly MapVehicleSpawn[]): MapVehicleSpawn {
  const suffix = Math.max(0, ...existing.map((item) => Number(item.elementId.match(/rwrmap_(\d+)$/)?.[1] ?? 0))) + 1;
  const elementId = `spawn_rwrmap_${suffix}`;
  return {
    ...source,
    uid: `${elementId}@new`,
    elementId,
    x: source.x + 12,
    y: source.y + 12,
    deleted: false,
    added: true,
    sourceStart: -1,
    sourceEnd: -1,
    cloneSourceUid: source.added ? source.cloneSourceUid : source.uid,
  };
}

export function serializeRwrMap(map: ParsedRwrMap, spawns: readonly MapVehicleSpawn[]): string {
  const originals = map.spawns.filter((spawn) => !spawn.added).sort((a, b) => a.sourceStart - b.sourceStart);
  const current = new Map(spawns.filter((spawn) => !spawn.added).map((spawn) => [spawn.uid, spawn]));
  const additions = new Map<string, MapVehicleSpawn[]>();
  for (const spawn of spawns.filter((item) => item.added && !item.deleted)) {
    const sourceUid = spawn.cloneSourceUid; if (!sourceUid) continue;
    const list = additions.get(sourceUid) ?? []; list.push(spawn); additions.set(sourceUid, list);
  }
  let cursor = 0; let output = '';
  for (const original of originals) {
    output += map.source.slice(cursor, original.sourceStart);
    const edited = current.get(original.uid);
    const originalFragment = map.source.slice(original.sourceStart, original.sourceEnd);
    if (edited && !edited.deleted) {
      const compatibleElementId = rwrCompatibleElementId(edited.elementId);
      const geometryUnchanged = Math.abs(edited.x - original.x) < 1e-9
        && Math.abs(edited.y - original.y) < 1e-9
        && Math.abs(edited.angle - original.angle) < 1e-9
        && Math.abs(edited.width - original.width) < 1e-9
        && Math.abs(edited.height - original.height) < 1e-9;
      const referenceUnchanged = edited.referenceKind === original.referenceKind && edited.reference === original.reference;
      const idUnchanged = compatibleElementId === original.elementId;
      if (geometryUnchanged && !hasThreeArgumentRotate(originalFragment)) {
        let fragment = idUnchanged ? originalFragment : rewriteElementId(originalFragment, compatibleElementId);
        if (!referenceUnchanged || !idUnchanged) {
          fragment = rewriteDescription(fragment, edited, idUnchanged ? undefined : `desc_${compatibleElementId}`);
        }
        output += fragment;
      } else {
        output += rewriteFragment(originalFragment, edited, compatibleElementId, idUnchanged ? undefined : `desc_${compatibleElementId}`);
      }
    }
    for (const added of additions.get(original.uid) ?? []) {
      const compatibleElementId = rwrCompatibleElementId(added.elementId);
      output += `\n${rewriteFragment(originalFragment, added, compatibleElementId, `desc_${compatibleElementId}`)}`;
    }
    cursor = original.sourceEnd;
  }
  output += map.source.slice(cursor);
  return output;
}

export function mapSpawnSnapshot(spawns: readonly MapVehicleSpawn[]): MapVehicleSpawn[] {
  return spawns.map((spawn) => ({ ...spawn, layerPath: [...spawn.layerPath], parentMatrix: { ...spawn.parentMatrix } }));
}
