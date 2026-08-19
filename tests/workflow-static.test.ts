import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function workflow(name: string): string {
  return readFileSync(join(process.cwd(), '.github', 'workflows', name), 'utf8');
}

describe('nightly publish workflow（WebGAL 模板适配）', () => {
  it('publish 支持手动触发和 push 触发，并覆盖三平台矩阵', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('workflow_dispatch:');
    expect(publish).toContain('push:');
    expect(publish).toContain('macos-latest');
    expect(publish).toContain('ubuntu-24.04');
    expect(publish).toContain('windows-latest');
    expect(publish).not.toContain('hexzPassword');
  });

  it('使用 tauri-action 发布/覆盖 rolling nightly release', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('tauri-apps/tauri-action@dev');
    expect(publish).toContain('tagName: nightly');
    expect(publish).toContain('releaseName: "RWR Vehicle Studio (nightly)"');
    expect(publish).toContain('releaseDraft: false');
    expect(publish).toContain('prerelease: true');
    expect(publish).not.toContain('gh release upload nightly');
    expect(publish).not.toContain('actions/upload-artifact@v4');
    expect(publish).not.toContain('actions/download-artifact@v4');
  });

  it('保留 Linux 构建依赖，CI 仍固定 Bun 版本', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('patchelf');
    expect(publish).toContain('libwebkit2gtk-4.1-dev');
    expect(workflow('ci.yml')).toContain('bun-version: 1.3.14');
  });
});
