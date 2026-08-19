import { desktop } from '../../platform/desktop-api';
import { BUILTIN_SUPPORT_ANIMATIONS, BUILTIN_SUPPORT_MODEL } from '../resources/resource-presets';
import { SoldierAssets } from './soldier-assets';

// RV-015: cache parsed SoldierAssets by (supportModel, supportAnimations) identity so a vehicle switch
// does not re-read and re-parse the ~5 MB animation XML. Failures are evicted so a transient read error
// can be retried on the next vehicle load.
const cache = new Map<string, Promise<SoldierAssets>>();

function readSupport(kind: 'model' | 'animation', path: string): Promise<string> {
  const builtin = kind === 'model' ? BUILTIN_SUPPORT_MODEL : BUILTIN_SUPPORT_ANIMATIONS;
  return path === builtin ? desktop.readBuiltinSupport(kind) : desktop.readText(path);
}

export function invalidateSoldierAssets(modelPath?: string, animationPath?: string): void {
  if (modelPath && animationPath) { cache.delete(`${modelPath}\u0000${animationPath}`); return; }
  cache.clear();
}

export function loadSoldierAssets(modelPath: string, animationPath: string, force = false): Promise<SoldierAssets> {
  const key = `${modelPath}\u0000${animationPath}`;
  if (force) cache.delete(key);
  const cached = cache.get(key);
  if (cached) return cached;
  const pending = (async () => {
    const [model, animations] = await Promise.all([readSupport('model', modelPath), readSupport('animation', animationPath)]);
    return SoldierAssets.parse(model, animations);
  })();
  cache.set(key, pending);
  pending.catch(() => cache.delete(key));
  return pending;
}
