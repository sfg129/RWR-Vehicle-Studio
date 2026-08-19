import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function workflow(name: string): string {
  return readFileSync(join(process.cwd(), '.github', 'workflows', name), 'utf8');
}

describe('nightly publish workflow', () => {
  it('只在 CI 成功且 main 分支时触发，并有 nightly concurrency', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('workflow_run:');
    expect(publish).toContain('workflows: ["CI"]');
    expect(publish).toContain("github.event.workflow_run.conclusion == 'success'");
    expect(publish).toContain("github.event.workflow_run.head_branch == 'main'");
    expect(publish).toContain("github.event_name == 'workflow_dispatch' && github.ref == 'refs/heads/main'");
    expect(publish).toContain('group: nightly-publish');
    expect(publish).toContain('cancel-in-progress: true');
  });

  it('使用 build matrix -> artifacts -> finalize-release', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('build-tauri:');
    expect(publish).toContain('finalize-release:');
    expect(publish).toContain('needs: build-tauri');
    expect(publish).toContain('actions/upload-artifact@v4');
    expect(publish).toContain('actions/download-artifact@v4');
    expect(publish).toContain('if-no-files-found: error');
  });

  it('finalize 负责 retarget nightly 并用 gh clobber 上传', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('git tag -f nightly "$HEAD_SHA"');
    expect(publish).toContain('git push -f origin refs/tags/nightly');
    expect(publish).toContain('gh release upload nightly');
    expect(publish).toContain('--clobber');
  });

  it('Linux 依赖与 Bun 版本正确', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('ubuntu-22.04');
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

  it('release 不直接使用 tauri-action tagName，也不使用 dev 版本', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('tauri-apps/tauri-action@v1.0.0');
    expect(publish).not.toContain('tauri-apps/tauri-action@dev');
    expect(publish).not.toContain('tagName: nightly');
  });
});
