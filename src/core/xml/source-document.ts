export interface SourceAttribute {
  name: string;
  value: string;
  quote: '"' | "'";
  start: number;
  end: number;
  valueStart: number;
  valueEnd: number;
}

export interface SourceNode {
  id: number;
  name: string;
  attributes: SourceAttribute[];
  children: SourceNode[];
  parent: SourceNode | null;
  start: number;
  startTagEnd: number;
  endTagStart: number;
  endTagEnd: number;
  selfClosing: boolean;
}

export class SourceDocument {
  readonly roots: SourceNode[] = [];
  readonly nodes: SourceNode[] = [];
  private changes = new Map<string, string>();
  private saved: string;
  private serializedCache: string | undefined;
  constructor(public source: string) { this.saved = source; this.parse(); }

  get root(): SourceNode | undefined { return this.roots[0]; }
  get dirty(): boolean { return this.changes.size > 0; }
  key(node: SourceNode, attr: string): string { return `${node.id}:${attr}`; }
  value(node: SourceNode, attr: string): string | undefined {
    const changed = this.changes.get(this.key(node, attr));
    return changed ?? node.attributes.find((a) => a.name === attr)?.value;
  }
  attrs(node: SourceNode): Record<string, string> {
    return Object.fromEntries(node.attributes.map((a) => [a.name, this.value(node, a.name) ?? '']));
  }
  set(node: SourceNode, attr: string, value: string): void {
    const original = node.attributes.find((a) => a.name === attr)?.value;
    if (original === undefined) throw new Error(`属性 ${attr} 不存在；当前版本只修改已有属性`);
    const key = this.key(node, attr);
    if (value === original) this.changes.delete(key); else this.changes.set(key, value);
    this.serializedCache = undefined;
  }
  reset(node?: SourceNode): void {
    if (!node) this.changes.clear();
    else for (const attr of node.attributes) this.changes.delete(this.key(node, attr.name));
    this.serializedCache = undefined;
  }
  /** Mark the current working text as the saved snapshot (call after a successful save). */
  markSaved(): void { this.saved = this.source; }
  /** Restore this node's subtree to the saved snapshot, preserving pending edits on other nodes. */
  revertNode(node: SourceNode): void {
    const savedDoc = new SourceDocument(this.saved);
    const savedNode = nodeAtPath(savedDoc.root, pathOf(node));
    if (!savedNode) return;
    const savedRaw = savedDoc.raw(savedNode);
    const outside: { path: number[]; attr: string; value: string }[] = [];
    for (const n of this.nodes) {
      if (n.start >= node.start && n.endTagEnd <= node.endTagEnd) continue;
      for (const attr of n.attributes) {
        const changed = this.changes.get(this.key(n, attr.name));
        if (changed !== undefined) outside.push({ path: pathOf(n), attr: attr.name, value: changed });
      }
    }
    this.commit(this.source.slice(0, node.start) + savedRaw + this.source.slice(node.endTagEnd));
    for (const pending of outside) { const target = nodeAtPath(this.root, pending.path); if (target) this.set(target, pending.attr, pending.value); }
  }
  addAttribute(node: SourceNode, name: string, value = '0'): void {
    const id = node.id; this.materialize(); const current = this.nodes[id];
    if (!current) throw new Error('对象已经不存在');
    if (!/^[A-Za-z_:][\w:.-]*$/.test(name)) throw new Error(`无效的属性名称：${name}`);
    if (current.attributes.some((attribute) => attribute.name === name)) throw new Error(`属性 ${name} 已存在`);
    const closeLength = current.selfClosing ? 2 : 1;
    const insertAt = current.startTagEnd - closeLength;
    const text = `${this.source.slice(0, insertAt)} ${name}="${escapeXml(value, '"')}"${this.source.slice(insertAt)}`;
    this.commit(text);
  }
  removeAttribute(node: SourceNode, attribute: SourceAttribute | string): void {
    const id = node.id; const name = typeof attribute === 'string' ? attribute : attribute.name; this.materialize(); const current = this.nodes[id];
    const target = current?.attributes.find((item) => item.name === name); if (!current || !target) return;
    let start = target.start;
    while (start > current.start && /[ \t]/.test(this.source[start - 1])) start--;
    this.commit(this.source.slice(0, start) + this.source.slice(target.end));
  }
  appendChild(parent: SourceNode, name: string, attributes: Record<string, string> = {}): void {
    const id = parent.id; this.materialize(); const current = this.nodes[id];
    if (!current) throw new Error('父对象已经不存在');
    if (!/^[A-Za-z_:][\w:.-]*$/.test(name)) throw new Error(`无效的对象类型：${name}`);
    const attributeText = Object.entries(attributes).map(([attribute, value]) => {
      if (!/^[A-Za-z_:][\w:.-]*$/.test(attribute)) throw new Error(`无效的属性名称：${attribute}`);
      return ` ${attribute}="${escapeXml(value, '"')}"`;
    }).join('');
    const parentIndent = lineIndent(this.source, current.start); const childIndent = `${parentIndent}  `;
    if (current.selfClosing) {
      const insertAt = current.startTagEnd - 2;
      const replacement = `>\n${childIndent}<${name}${attributeText} />\n${parentIndent}</${current.name}>`;
      this.commit(this.source.slice(0, insertAt) + replacement + this.source.slice(current.startTagEnd));
      return;
    }
    const insertAt = current.endTagStart;
    const prefix = insertAt > 0 && this.source[insertAt - 1] === '\n' ? '' : '\n';
    this.commit(this.source.slice(0, insertAt) + `${prefix}${childIndent}<${name}${attributeText} />\n${parentIndent}` + this.source.slice(insertAt));
  }
  removeNode(node: SourceNode): void {
    const id = node.id; this.materialize(); const current = this.nodes[id]; if (!current) return;
    let start = current.start, end = current.endTagEnd;
    const lineStart = this.source.lastIndexOf('\n', start - 1) + 1;
    if (/^[ \t]*$/.test(this.source.slice(lineStart, start))) start = lineStart;
    if (this.source[end] === '\r' && this.source[end + 1] === '\n') end += 2;
    else if (this.source[end] === '\n') end += 1;
    this.commit(this.source.slice(0, start) + this.source.slice(end));
  }
  commit(serialized: string): void { this.source = serialized; this.changes.clear(); this.roots.length = 0; this.nodes.length = 0; this.serializedCache = undefined; this.parse(); }

  serialize(): string {
    if (this.serializedCache !== undefined) return this.serializedCache;
    const replacements: { start: number; end: number; value: string }[] = [];
    for (const node of this.nodes) for (const attr of node.attributes) {
      const changed = this.changes.get(this.key(node, attr.name));
      if (changed !== undefined) replacements.push({ start: attr.valueStart, end: attr.valueEnd, value: escapeXml(changed, attr.quote) });
    }
    replacements.sort((a, b) => b.start - a.start);
    let result = this.source;
    for (const r of replacements) result = result.slice(0, r.start) + r.value + result.slice(r.end);
    this.serializedCache = result;
    return result;
  }

  descendants(name: string): SourceNode[] { return this.nodes.filter((n) => n.name === name); }
  raw(node: SourceNode): string { return this.source.slice(node.start, node.endTagEnd); }
  /** Node text including pending attribute changes, without mutating the working document history. */
  currentRaw(node: SourceNode): string {
    const replacements: { start: number; end: number; value: string }[] = [];
    const visit = (n: SourceNode): void => {
      for (const attr of n.attributes) {
        const changed = this.changes.get(this.key(n, attr.name));
        if (changed !== undefined) replacements.push({ start: attr.valueStart, end: attr.valueEnd, value: escapeXml(changed, attr.quote) });
      }
      for (const child of n.children) visit(child);
    };
    visit(node);
    if (replacements.length === 0) return this.raw(node);
    replacements.sort((a, b) => b.start - a.start);
    let result = this.raw(node);
    const offset = node.start;
    for (const r of replacements) result = result.slice(0, r.start - offset) + r.value + result.slice(r.end - offset);
    return result;
  }

  private materialize(): void { if (this.dirty) this.commit(this.serialize()); }

  private parse(): void {
    const stack: SourceNode[] = [];
    let i = 0;
    while (i < this.source.length) {
      const start = this.source.indexOf('<', i);
      if (start < 0) break;
      if (this.source.startsWith('<!--', start)) { const end = this.source.indexOf('-->', start + 4); i = end < 0 ? this.source.length : end + 3; continue; }
      if (this.source.startsWith('<![CDATA[', start)) { const end = this.source.indexOf(']]>', start + 9); i = end < 0 ? this.source.length : end + 3; continue; }
      if (this.source[start + 1] === '?' || this.source[start + 1] === '!') { i = scanTagEnd(this.source, start) + 1; continue; }
      const end = scanTagEnd(this.source, start);
      if (end < start) throw new Error('XML 起始标签未闭合');
      const inner = this.source.slice(start + 1, end);
      if (inner.startsWith('/')) { const closed = stack.pop(); if (closed) { closed.endTagStart = start; closed.endTagEnd = end + 1; } i = end + 1; continue; }
      const nameMatch = inner.match(/^\s*([\w:.-]+)/);
      if (!nameMatch) { i = end + 1; continue; }
      const name = nameMatch[1];
      const node: SourceNode = { id: this.nodes.length, name, attributes: [], children: [], parent: stack.at(-1) ?? null,
        start, startTagEnd: end + 1, endTagStart: end + 1, endTagEnd: end + 1, selfClosing: /\/\s*$/.test(inner) };
      const attrOffset = start + 1;
      const attrPattern = /([A-Za-z_:][\w:.-]*)\s*=\s*(["'])(.*?)\2/gs;
      let match: RegExpExecArray | null;
      while ((match = attrPattern.exec(inner))) {
        if (match.index < (nameMatch.index ?? 0) + nameMatch[0].length) continue;
        const full = match[0]; const quote = match[2] as '"' | "'";
        const quoteAt = full.indexOf(quote);
        const valueStart = attrOffset + match.index + quoteAt + 1;
        node.attributes.push({ name: match[1], value: unescapeXml(match[3]), quote,
          start: attrOffset + match.index, end: attrOffset + match.index + full.length,
          valueStart, valueEnd: valueStart + match[3].length });
      }
      this.nodes.push(node);
      if (node.parent) node.parent.children.push(node); else this.roots.push(node);
      if (!node.selfClosing) stack.push(node);
      i = end + 1;
    }
    for (const unclosed of stack) unclosed.endTagEnd = this.source.length;
  }
}

function scanTagEnd(text: string, start: number): number {
  let quote = '';
  for (let i = start + 1; i < text.length; i++) {
    const c = text[i];
    if (quote) { if (c === quote) quote = ''; }
    else if (c === '"' || c === "'") quote = c;
    else if (c === '>') return i;
  }
  return -1;
}
function escapeXml(value: string, quote: string): string {
  let out = value.replaceAll('&', '&amp;').replaceAll('<', '&lt;');
  out = quote === '"' ? out.replaceAll('"', '&quot;') : out.replaceAll("'", '&apos;');
  return out;
}
function unescapeXml(value: string): string {
  return value.replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
}
function lineIndent(text: string, at: number): string {
  const start = text.lastIndexOf('\n', at - 1) + 1;
  return text.slice(start, at).match(/^[ \t]*/)?.[0] ?? '';
}
function pathOf(node: SourceNode): number[] {
  const path: number[] = [];
  let current: SourceNode | null = node;
  while (current?.parent) { path.unshift(current.parent.children.indexOf(current)); current = current.parent; }
  return path;
}
function nodeAtPath(root: SourceNode | undefined, path: number[]): SourceNode | undefined {
  let current = root;
  for (const index of path) { current = current?.children[index]; if (!current) return undefined; }
  return current;
}
