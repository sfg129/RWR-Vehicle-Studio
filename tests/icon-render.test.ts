import { describe, expect, it } from 'vitest';
import { SourceDocument } from '../src/core/xml/source-document';
import { anchoredIconOutputRect, containVisibleIconRect, denseForegroundPixelBounds, fittedIconOutputRect, foregroundPixelBounds, iconRenderParts } from '../src/editor/icon-render-controller';
import { DEFAULT_ICON_RENDER_SETTINGS, normalizeIconRenderSettings } from '../src/core/icon-render/icon-render-presets';
import { DEFAULT_RESOURCE_SELECTION, DEFAULT_WW2_BASE_MODEL_FOLDER, setWw2BaseModelFallback } from '../src/core/resources/resource-presets';

describe('独立图标渲染工作流', () => {
  it('只把正常 visual 与 turret weapon 暴露为可临时调整部件', () => {
    const document = new SourceDocument(`<vehicle>
      <visual class="chassis" mesh_filename="body.mesh" offset="0 0 0" />
      <visual class="turret" mesh_filename="turret.mesh" turret_index="0" offset="0 0 0" />
      <visual key="broken" class="chassis" mesh_filename="broken.mesh" />
      <turret weapon_key="cannon.weapon" weapon_offset="0 0 1" />
      <character_slot seat_position="0 1 0" />
    </vehicle>`);
    const parts = iconRenderParts(document);
    expect(parts.map((part) => part.kind)).toEqual(['visual', 'visual', 'weapon']);
    expect(parts.map((part) => part.resourceName)).toEqual(['body.mesh', 'turret.mesh', 'cannon.weapon']);
    expect(parts.every((part) => !part.resourceName.includes('broken'))).toBe(true);
  });

  it('对读取到的预设做边界归一化，避免无效参数破坏相机或导出', () => {
    expect(DEFAULT_ICON_RENDER_SETTINGS.cameraFov).toBe(90);
    expect(DEFAULT_ICON_RENDER_SETTINGS.framingMode).toBe('body');
    expect(DEFAULT_ICON_RENDER_SETTINGS.outputSize).toBe(512);
    const settings = normalizeIconRenderSettings({
      cameraElevation: 200,
      cameraFov: 2,
      threshold: -2,
      ambient: Number.NaN,
      outputSize: 95,
      background: 'black',
    });
    expect(settings.cameraElevation).toBe(89);
    expect(settings.cameraFov).toBe(15);
    expect(settings.threshold).toBe(0);
    expect(settings.ambient).toBe(DEFAULT_ICON_RENDER_SETTINGS.ambient);
    expect(settings.outputSize).toBe(512);
    expect(settings.background).toBe('#181818');
  });

  it('主体定标忽略稀疏长炮管，并用主体中心放置完整画面', () => {
    const width = 12, height = 10;
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let index = 0; index < pixels.length; index += 4) { pixels[index] = 255; pixels[index + 2] = 255; pixels[index + 3] = 255; }
    // 6x5 body plus a one-pixel antenna and a one-pixel barrel.
    for (let y = 4; y <= 8; y++) for (let x = 3; x <= 8; x++) {
      const offset = (y * width + x) * 4; pixels[offset] = 255; pixels[offset + 1] = 255; pixels[offset + 2] = 255;
    }
    for (const [x, y] of [[5, 0], [5, 1], [5, 2], [5, 3], [9, 4], [10, 4], [11, 4]]) {
      const offset = (y * width + x) * 4; pixels[offset] = 255; pixels[offset + 1] = 255; pixels[offset + 2] = 255;
    }
    expect(denseForegroundPixelBounds(pixels, width, height, [255, 0, 255], 0.25)).toEqual({ x: 3, y: 4, width: 6, height: 5 });
    const destinationAnchor = fittedIconOutputRect({ x: 3, y: 4, width: 6, height: 5 }, 120, 0);
    const destination = anchoredIconOutputRect({ x: 3, y: 4, width: 6, height: 5 }, destinationAnchor, width, height);
    expect(destination.width).toBeCloseTo(240);
    expect(destination.height).toBeCloseTo(200);
    expect(destinationAnchor.x + destinationAnchor.width / 2).toBeCloseTo(60);
    expect(destination.x + (3 + 3) * 20).toBeCloseTo(60);
    const contained = containVisibleIconRect({ x: 30, y: 0, width: 120, height: 100 }, { x: 0, y: 0, width: 10, height: 9 }, width, height, 120, 1);
    // The full silhouette fits horizontally after a minimal left shift, so the
    // body is not scaled down merely to accommodate its right-side barrel.
    expect(contained.x).toBeCloseTo(19);
    expect(contained.width).toBeCloseTo(120);
  });

  it('默认把实际 ww2_base 模型目录置于模组主模型目录之后', () => {
    expect(DEFAULT_WW2_BASE_MODEL_FOLDER).toBe('D:\\steam\\steamapps\\common\\RunningWithRifles\\media\\packages\\ww2_base\\models');
    expect(DEFAULT_RESOURCE_SELECTION.secondaryFolders.model).toEqual([DEFAULT_WW2_BASE_MODEL_FOLDER]);
    expect(setWw2BaseModelFallback(DEFAULT_RESOURCE_SELECTION, false).secondaryFolders.model).toEqual([]);
  });

  it('按实际绘制像素取得边界，并按留白等比填满方形输出', () => {
    const pixels = new Uint8ClampedArray(6 * 5 * 4);
    for (let index = 0; index < pixels.length; index += 4) { pixels[index] = 255; pixels[index + 2] = 255; pixels[index + 3] = 255; }
    for (const [x, y] of [[2, 1], [3, 1], [2, 2], [3, 2], [2, 3], [3, 3]]) {
      const offset = (y * 6 + x) * 4; pixels[offset] = 255; pixels[offset + 1] = 255; pixels[offset + 2] = 255;
    }
    expect(foregroundPixelBounds(pixels, 6, 5, [255, 0, 255])).toEqual({ x: 2, y: 1, width: 2, height: 3 });
    // Source x/y intentionally simulate a vehicle rendered far away from the
    // source canvas center. Placement depends only on its visible bounds size,
    // so the cropped icon is re-centered in the exported square.
    const output = fittedIconOutputRect({ x: 173, y: 311, width: 200, height: 100 }, 512, 0.1);
    expect(output.width).toBeCloseTo(426.667, 2);
    expect(output.height).toBeCloseTo(213.333, 2);
    expect(output.x).toBeCloseTo(42.667, 2);
    expect(output.y).toBeCloseTo(149.333, 2);
    expect(output.x + output.width / 2).toBeCloseTo(256, 5);
    expect(output.y + output.height / 2).toBeCloseTo(256, 5);
  });
});
