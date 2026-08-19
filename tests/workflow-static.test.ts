import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function workflow(name: string): string {
  return readFileSync(join(process.cwd(), '.github', 'workflows', name), 'utf8');
}

describe('nightly publish workflow（R3-019/020/021/022/023 / R4-007）', () => {
  it('publish 仅在 CI 成功后触发，且有 nightly concurrency', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('workflow_run:');
    expect(publish).toContain('workflows: ["CI"]');
    expect(publish).toContain('github.event.workflow_run.conclusion == \'success\'');
    expect(publish).toContain('group: nightly-publish');
    expect(publish).toContain('cancel-in-progress: true');
  });

  it('使用 tauri-action 发布/覆盖 rolling nightly release', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('tauri-apps/tauri-action@v1');
    expect(publish).toContain('tagName: nightly');
    expect(publish).toContain("releaseName: 'RWR Vehicle Studio (nightly)'");
    expect(publish).toContain('releaseDraft: false');
    expect(publish).toContain('prerelease: true');
    expect(publish).not.toContain('gh release upload nightly');
    expect(publish).not.toContain('actions/upload-artifact@v4');
    expect(publish).not.toContain('actions/download-artifact@v4');
  });

  it('Linux AppImage 依赖与 Bun 版本固定（R3-022/023）', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('patchelf');
    expect(publish).toContain('libfuse2');
    expect(publish).toContain('file');
    expect(publish).toContain('bun-version: 1.3.14');
    expect(workflow('ci.yml')).toContain('bun-version: 1.3.14');
  });
});
