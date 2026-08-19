import { describe, expect, it } from 'vitest';
import { SourceDocument } from '../src/core/xml/source-document';
import { composeVehicle } from '../src/core/vehicle/vehicle-composition';
import { sceneEntries } from '../src/core/vehicle/vehicle-model';
import { parseWeaponDefinition } from '../src/core/resources/resource-catalog';

/** 中位耗时（先预热，取多次运行的中位数，降低 CI 机器抖动）。 */
function medianTime(fn: () => unknown, iterations: number): number {
  for (let i = 0; i < Math.min(iterations, 20); i++) fn();
  const samples: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    samples.push(performance.now() - start);
  }
  samples.sort((a, b) => a - b);
  return samples[Math.floor(samples.length / 2)];
}

function buildVehicle(visualCount: number): string {
  let xml = '<vehicle>';
  for (let i = 0; i < visualCount; i++) xml += `<visual class="part" mesh_filename="m${i}.mesh" offset="${i} 0 0"/>`;
  return xml + '</vehicle>';
}

describe('性能基准（质量门控）', () => {
  it('serialize 500 节点载具（含 pending 修改）中位耗时 < 50ms', () => {
    const document = new SourceDocument(buildVehicle(500));
    const visuals = document.descendants('visual');
    for (let i = 0; i < 20; i++) document.set(visuals[i], 'offset', '1 2 3');
    let toggle = false;
    expect(medianTime(() => {
      toggle = !toggle;
      document.set(visuals[0], 'offset', toggle ? '1 2 3' : '4 5 6');
      return document.serialize();
    }, 200)).toBeLessThan(50);
  });

  it('serialize 缓存命中（无变更重复序列化）中位耗时 < 5ms', () => {
    const document = new SourceDocument(buildVehicle(500));
    document.serialize();
    expect(medianTime(() => document.serialize(), 500)).toBeLessThan(5);
  });

  it('composeVehicle 合成 300 节点 base 中位耗时 < 100ms', () => {
    const base = new SourceDocument(buildVehicle(300));
    const leaf = new SourceDocument('<vehicle><visual class="chassis" mesh_filename="c.mesh"/></vehicle>');
    expect(medianTime(() => composeVehicle(base, leaf), 50)).toBeLessThan(100);
  });

  it('sceneEntries 解析 500 节点中位耗时 < 20ms', () => {
    const document = new SourceDocument(buildVehicle(500));
    expect(medianTime(() => sceneEntries(document), 200)).toBeLessThan(20);
  });

  it('parseWeaponDefinition 中位耗时 < 20ms', () => {
    expect(medianTime(() => parseWeaponDefinition('<weapon><model filename="w.xml"/><shield offset="0 0 0" extent="1 1 1"/></weapon>', 'w.weapon'), 500)).toBeLessThan(20);
  });
});

describe('serialize 缓存正确性（质量门控）', () => {
  it('set 修改属性后 serialize 反映最新值', () => {
    const document = new SourceDocument('<vehicle><visual offset="1 0 0"/></vehicle>');
    expect(document.serialize()).toBe('<vehicle><visual offset="1 0 0"/></vehicle>');
    document.set(document.descendants('visual')[0], 'offset', '2 0 0');
    expect(document.serialize()).toBe('<vehicle><visual offset="2 0 0"/></vehicle>');
  });

  it('commit 结构操作后 serialize 反映已提交文本', () => {
    const document = new SourceDocument('<vehicle><visual offset="1 0 0"/></vehicle>');
    document.set(document.descendants('visual')[0], 'offset', '9 9 9');
    document.appendChild(document.root!, 'turret');
    expect(document.serialize()).toContain('offset="9 9 9"');
    expect(document.serialize()).toContain('<turret />');
  });
});
