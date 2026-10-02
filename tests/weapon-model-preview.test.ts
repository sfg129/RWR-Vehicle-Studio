import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { offsetWeaponModelPreview, WEAPON_MODEL_PREVIEW_Y_OFFSET } from '../src/editor/weapon-model-preview';

describe('weapon model preview placement', () => {
  it('lowers only the rendered model, preserving the turret attachment and shield', () => {
    const turretAttachment = new THREE.Group();
    turretAttachment.position.set(1, 2, 3);
    const model = new THREE.Group();
    model.position.set(0, 0.25, 0);
    const shield = new THREE.Group();
    turretAttachment.add(offsetWeaponModelPreview(model), shield);

    expect(WEAPON_MODEL_PREVIEW_Y_OFFSET).toBe(-0.08);
    expect(model.position.y).toBeCloseTo(0.17);
    expect(turretAttachment.position.toArray()).toEqual([1, 2, 3]);
    expect(shield.position.y).toBe(0);
  });
});
