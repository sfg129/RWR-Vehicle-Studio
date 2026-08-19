import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

function workflow(name: string): string {
  return readFileSync(join(process.cwd(), '.github', 'workflows', name), 'utf8');
}

describe('nightly publish workflow（R3-019/020/021/022/023）', () => {
  it('publish 仅在 CI 成功后触发，且有 nightly concurrency 与 tag retarget', () => {
    const publish = workflow('publish.yml');
    expect(publish).toContain('workflow_run:');
    expect(publish).toContain('workflows: ["CI"]');
    expect(publish).toContain('github.event.workflow_run.conclusion == \'success\'');
    expect(publish).toContain('group: nightly-publish');
    expect(publish).toContain('cancel-in-progress: true');
    expect(publish).toContain('git tag -f nightly "$HEAD_SHA"');
    expect(publish).toContain('git push -f origin "refs/tags/nightly"');
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
