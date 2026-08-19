import { SourceDocument, type SourceNode } from '../xml/source-document';

export interface VehicleComposition {
  document: SourceDocument;
  editableNode(previewNode: SourceNode): SourceNode | undefined;
  inherited(previewNode: SourceNode): boolean;
  rootSource?: SourceNode;
  rootInheritedAttrs: Set<string>;
}

export function vehicleBaseReference(document: SourceDocument): string | undefined {
  if (!document.root) return undefined;
  const reference = document.value(document.root, 'file')?.trim();
  if (!reference) return undefined;
  const fileName = reference.split(/[\\/]/).at(-1)?.toLowerCase();
  return fileName === 'vehicle_base.vehicle' ? undefined : reference;
}

const POSITIONAL_OVERRIDE_TAGS = new Set(['physics', 'control', 'tire_set', 'turret', 'visual', 'character_slot']);
const ORIGIN_ATTRIBUTE = '__rwr_vehicle_origin';

/** Compose a read-only preview while retaining exact links to editable leaf nodes. */
export function composeVehicle(base: SourceDocument | undefined, leaf: SourceDocument): VehicleComposition {
  if (!base?.root || !leaf.root) return directComposition(leaf);

  const leafByTag = new Map<string, SourceNode[]>();
  for (const child of leaf.root.children) {
    const values = leafByTag.get(child.name) ?? [];
    values.push(child); leafByTag.set(child.name, values);
  }
  const usedLeaf = new Set<number>();
  const seenBaseTags = new Map<string, number>();
  const parts: string[] = [];
  for (const child of base.root.children) {
    const ordinal = seenBaseTags.get(child.name) ?? 0; seenBaseTags.set(child.name, ordinal + 1);
    const override = POSITIONAL_OVERRIDE_TAGS.has(child.name) ? leafByTag.get(child.name)?.[ordinal] : undefined;
    if (override) { usedLeaf.add(override.id); parts.push(markedRaw(leaf, override, `leaf:${override.id}`)); }
    else parts.push(markedRaw(base, child, `base:${child.id}`));
  }
  for (const child of leaf.root.children) if (!usedLeaf.has(child.id)) parts.push(markedRaw(leaf, child, `leaf:${child.id}`));

  // Root attribute composition: leaf overrides base; base-only attributes remain inherited (RV-034).
  const rootAttrs = new Map<string, { value: string; inherited: boolean }>();
  for (const attr of base.root.attributes) rootAttrs.set(attr.name, { value: base.value(base.root, attr.name) ?? attr.value, inherited: true });
  for (const attr of leaf.root.attributes) rootAttrs.set(attr.name, { value: leaf.value(leaf.root, attr.name) ?? attr.value, inherited: false });
  const rootAttrText = [...rootAttrs.entries()].map(([name, info]) => ` ${name}="${escapeAttr(info.value)}"`).join('');
  const preview = new SourceDocument(`<vehicle${rootAttrText}>${parts.join('')}</vehicle>`);
  const editableByPreviewId = new Map<number, SourceNode>();
  const inheritedIds = new Set<number>();
  const baseNodes = new Map(base.nodes.map((node) => [node.id, node]));
  const leafNodes = new Map(leaf.nodes.map((node) => [node.id, node]));
  for (const child of preview.root?.children ?? []) {
    const marker = child.attributes.find((attr) => attr.name === ORIGIN_ATTRIBUTE)?.value;
    if (!marker) continue;
    child.attributes = child.attributes.filter((attr) => attr.name !== ORIGIN_ATTRIBUTE);
    const [kind, idText] = marker.split(':');
    const source = kind === 'leaf' ? leafNodes.get(Number(idText)) : baseNodes.get(Number(idText));
    if (!source) continue;
    mapSubtree(child, source, kind === 'leaf' ? editableByPreviewId : undefined, inheritedIds, kind === 'base');
  }
  const rootInheritedAttrs = new Set<string>();
  for (const [name, info] of rootAttrs) if (info.inherited) rootInheritedAttrs.add(name);
  return {
    document: preview,
    editableNode: (node) => editableByPreviewId.get(node.id),
    inherited: (node) => inheritedIds.has(node.id),
    rootSource: leaf.root,
    rootInheritedAttrs,
  };
}

function directComposition(document: SourceDocument): VehicleComposition {
  return { document, editableNode: (node) => node, inherited: () => false, rootSource: document.root, rootInheritedAttrs: new Set() };
}

function markedRaw(document: SourceDocument, node: SourceNode, marker: string): string {
  const raw = document.currentRaw(node);
  const nameEnd = raw.search(/[\s/>]/);
  if (nameEnd < 0) return raw;
  return `${raw.slice(0, nameEnd)} ${ORIGIN_ATTRIBUTE}="${marker}"${raw.slice(nameEnd)}`;
}

function escapeAttr(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

function mapSubtree(preview: SourceNode, source: SourceNode, editable: Map<number, SourceNode> | undefined, inherited: Set<number>, isInherited: boolean): void {
  if (editable) editable.set(preview.id, source);
  if (isInherited) inherited.add(preview.id);
  const count = Math.min(preview.children.length, source.children.length);
  for (let index = 0; index < count; index++) mapSubtree(preview.children[index], source.children[index], editable, inherited, isInherited);
}
