import type * as THREE from 'three';

// Studio-only correction for mounted weapon models. Keep the turret attachment
// and shield coordinates unchanged so editing still writes the original XML.
export const WEAPON_MODEL_PREVIEW_Y_OFFSET = -0.08;

export function offsetWeaponModelPreview<T extends THREE.Object3D>(model: T): T {
  model.position.y += WEAPON_MODEL_PREVIEW_Y_OFFSET;
  return model;
}
