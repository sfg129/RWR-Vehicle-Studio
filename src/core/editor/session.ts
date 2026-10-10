export interface StoredSessionFile { path: string; name: string; text: string; savedText: string; undoStack: string[]; redoStack: string[] }
export interface StoredSessionTab extends StoredSessionFile { id: string; pinned: boolean; preview: boolean }
export interface StudioSession { version: 1; activeId: string; textMode: boolean; tabs: StoredSessionTab[]; weapons: (StoredSessionFile & { key: string })[] }
export const sessionKey = 'rwr-vehicle-studio.session.v1';
export function parseSession(raw: string | null): StudioSession | undefined {
  if (!raw) return;
  const session = JSON.parse(raw) as StudioSession;
  if (!session || session.version !== 1 || typeof session.activeId !== 'string' || typeof session.textMode !== 'boolean' || !Array.isArray(session.tabs) || !Array.isArray(session.weapons)) throw new Error('Invalid session');
  for (const file of [...session.tabs, ...session.weapons]) {
    if (![file.path,file.name,file.text,file.savedText].every(value => typeof value === 'string') || !Array.isArray(file.undoStack) || !Array.isArray(file.redoStack) || ![...file.undoStack,...file.redoStack].every(value => typeof value === 'string')) throw new Error('Invalid session file');
  }
  if (session.tabs.some(tab => typeof tab.id !== 'string' || typeof tab.pinned !== 'boolean' || typeof tab.preview !== 'boolean') || new Set(session.tabs.map(tab => tab.id)).size !== session.tabs.length) throw new Error('Invalid session tabs');
  if (session.weapons.some(file => typeof file.key !== 'string')) throw new Error('Invalid session weapons');
  return session;
}
