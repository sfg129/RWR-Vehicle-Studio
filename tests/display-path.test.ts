import { describe, expect, it } from 'vitest';
import { displayPath } from '../src/core/editor/display-path';

describe('display paths', () => {
  it('hides drive prefixes without changing the source string', () => {
    const path = String.raw`\\?\C:\mods\tank.vehicle`;
    expect(displayPath(path)).toBe(String.raw`C:\mods\tank.vehicle`);
    expect(path.startsWith('\\\\?\\')).toBe(true);
    expect(displayPath(`已保存：${path}`)).toBe(String.raw`已保存：C:\mods\tank.vehicle`);
  });
  it('retains network share notation', () => {
    expect(displayPath(String.raw`\\?\UNC\server\share\tank.vehicle`)).toBe(String.raw`\\server\share\tank.vehicle`);
    expect(displayPath(String.raw`\\server\share`)).toBe(String.raw`\\server\share`);
    expect(displayPath('/tmp/model.xml')).toBe('/tmp/model.xml');
    expect(displayPath(undefined)).toBe('');
  });
});
