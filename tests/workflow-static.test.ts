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

  it('先构建全部平台并上传 artifact，最后由单一 job retarget tag 并发布 release', () => {
    const publish = workflow('publish.yml');
    const build = publish.indexOf('build-tauri:');
    const finalize = publish.indexOf('finalize-release:');
    expect(build).toBeGreaterThanOrEqual(0);
    expect(finalize).toBeGreaterThan(build);
    expect(publish).toContain('needs: build-tauri');
    expect(publish).toContain('actions/upload-artifact@v4');
    expect(publish).toContain('actions/download-artifact@v4');
    expect(publish).toContain('gh release upload nightly');
    expect(publish).toContain('--clobber');
    // tag retarget 只能出现在 finalize job 之后
    expect(publish.indexOf('git tag -f nightly "$HEAD_SHA"')).toBeGreaterThan(finalize);
    expect(publish.indexOf('git push -f origin "refs/tags/nightly"')).toBeGreaterThan(finalize);
    expect(publish).not.toContain('tagName: nightly');
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
