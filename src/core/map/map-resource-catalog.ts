export interface MapVehicleDefinition {
  key: string;
  name: string;
  filename: string;
  path: string;
  tags: string[];
  respawnTime?: number;
  baseFile?: string;
}

export interface MapFactionDefinition {
  name: string;
  filename: string;
  path: string;
  resourceFiles: string[];
  vehicleKeys: string[];
  missingResources: string[];
}

function decode(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function withoutComments(text: string): string { return text.replace(/<!--[\s\S]*?-->/g, ''); }

function attr(text: string, name: string): string | undefined {
  const expression = new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, 'i');
  const match = text.match(expression); return match ? decode(match[2]) : undefined;
}

export function parseMapVehicleDefinition(text: string, path: string): MapVehicleDefinition | undefined {
  const activeText = withoutComments(text);
  const root = activeText.match(/<vehicle\b[\s\S]*?>/i)?.[0]; if (!root) return undefined;
  const key = attr(root, 'key'); if (!key) return undefined;
  const filename = path.replaceAll('\\', '/').split('/').at(-1) ?? key;
  const tags = [...activeText.matchAll(/<tag\b[^>]*\bname\s*=\s*(["'])(.*?)\1[^>]*\/?\s*>/gi)].map((match) => decode(match[2])).filter(Boolean);
  const respawn = attr(root, 'respawn_time'); const parsedRespawn = respawn === undefined ? undefined : Number(respawn);
  return {
    key,
    name: attr(root, 'name') ?? key,
    filename,
    path,
    tags: [...new Set(tags)],
    respawnTime: parsedRespawn !== undefined && Number.isFinite(parsedRespawn) ? parsedRespawn : undefined,
    baseFile: attr(root, 'file'),
  };
}

export function resolveMapVehicleInheritance(definitions: readonly MapVehicleDefinition[]): MapVehicleDefinition[] {
  const byFilename = new Map(definitions.map((definition) => [definition.filename.toLocaleLowerCase(), definition]));
  const resolving = new Set<string>();
  const resolved = new Map<string, MapVehicleDefinition>();
  const visit = (definition: MapVehicleDefinition): MapVehicleDefinition => {
    const cache = resolved.get(definition.key); if (cache) return cache;
    if (resolving.has(definition.key)) return definition;
    resolving.add(definition.key);
    const baseName = definition.baseFile?.replaceAll('\\', '/').split('/').at(-1)?.toLocaleLowerCase();
    const base = baseName && baseName !== 'vehicle_base.vehicle' ? byFilename.get(baseName) : undefined;
    const inherited = base ? visit(base) : undefined;
    const result = {
      ...definition,
      name: definition.name || inherited?.name || definition.key,
      tags: [...new Set([...(inherited?.tags ?? []), ...definition.tags])],
      respawnTime: definition.respawnTime ?? inherited?.respawnTime,
    };
    resolving.delete(definition.key); resolved.set(definition.key, result); return result;
  };
  return definitions.map(visit);
}

export function parseMapFactionDescriptor(text: string, path: string): Omit<MapFactionDefinition, 'vehicleKeys' | 'missingResources'> {
  const activeText = withoutComments(text);
  const root = activeText.match(/<faction\b[\s\S]*?>/i)?.[0] ?? '';
  const filename = path.replaceAll('\\', '/').split('/').at(-1) ?? 'faction.xml';
  const resources = [...activeText.matchAll(/<resources\b[^>]*\bfile\s*=\s*(["'])(.*?)\1[^>]*\/?\s*>/gi)].map((match) => decode(match[2])).filter(Boolean);
  return { name: attr(root, 'name') ?? filename, filename, path, resourceFiles: [...new Set(resources)] };
}

export function parseResourceVehicleKeys(text: string): string[] {
  return [...new Set([...withoutComments(text).matchAll(/<vehicle\b[^>]*\bkey\s*=\s*(["'])(.*?)\1[^>]*\/?\s*>/gi)].map((match) => decode(match[2])).filter(Boolean))];
}

export function factionTagCandidates(faction: MapFactionDefinition, vehicles: readonly MapVehicleDefinition[], tag: string): MapVehicleDefinition[] {
  const allowed = new Set(faction.vehicleKeys);
  return vehicles.filter((vehicle) => allowed.has(vehicle.key) && vehicle.tags.includes(tag));
}
