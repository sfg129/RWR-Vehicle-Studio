import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function workflow(name: string): string {
  return readFileSync(join(process.cwd(), '.github', 'workflows', name), 'utf8');
}

describe('formal release workflow', () => {
  it('仅由维护者手动指定已有版本 tag，不监听 main 或 CI', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('workflow_dispatch:');
    expect(publish).toContain('tag:');
    expect(publish).toContain('ref: refs/tags/${{ inputs.tag }}');
    expect(publish).toContain('group: release-${{ inputs.tag }}');
    expect(publish).not.toContain('workflow_run:');
    expect(publish).not.toContain('nightly');
  });

  it('使用三平台 build matrix，并在全部成功后统一上传正式 Release', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('macos-latest');
    expect(publish).toContain('ubuntu-22.04');
    expect(publish).toContain('windows-latest');
    expect(publish).toContain('finalize-release:');
    expect(publish).toContain('needs: build-tauri');
    expect(publish).toContain('actions/upload-artifact@v4');
    expect(publish).toContain('actions/download-artifact@v4');
    expect(publish).toContain('gh release upload "$RELEASE_TAG"');
    expect(publish).toContain('--clobber');
  });

  it('Windows 同时打包 NSIS 与 portable EXE', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('bundle/nsis/*.exe');
    expect(publish).toContain('rwr-vehicle-studio.exe');
    expect(publish).toContain('RWR-Vehicle-Studio-$version-x64-setup.exe');
    expect(publish).toContain('RWR-Vehicle-Studio-$version-portable.exe');
  });

  it('Linux 依赖与 Bun 版本正确', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('libwebkit2gtk-4.1-dev');
    expect(publish).toContain('libxdo-dev');
    expect(publish).toContain('libssl-dev');
    expect(publish).toContain('libayatana-appindicator3-dev');
    expect(publish).toContain('librsvg2-dev');
    expect(publish).toContain('patchelf');
    expect(publish).toContain('libfuse2');
    expect(publish).toContain('file');
    expect(publish).toContain('bun-version: 1.3.14');
  });

  it('使用稳定 tauri-action 并为 macOS/Linux 生成规定资产', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('tauri-apps/tauri-action@v1.0.0');
    expect(publish).not.toContain('tauri-apps/tauri-action@dev');
    expect(publish).toContain('--target universal-apple-darwin --bundles app');
    expect(publish).toContain('ditto -c -k');
    expect(publish).toContain('bun tauri bundle --target universal-apple-darwin --bundles dmg');
    expect(publish).toContain('macos-universal.app.zip');
    expect(publish).toContain('macos-universal.dmg');
    expect(publish).toContain('linux-x64.AppImage');
    expect(publish).toContain('linux-x64.deb');
  });
});
