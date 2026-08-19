import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('macOS-safe desktop transport', () => {
  it('binary 永远使用 Rust Base64 string IPC', () => {
    const api = readFileSync(
      join(process.cwd(), 'src/platform/desktop-api.ts'),
      'utf8',
    );
    const rust = readFileSync(
      join(process.cwd(), 'src-tauri/src/lib.rs'),
      'utf8',
    );
    const capabilities = readFileSync(
      join(process.cwd(), 'src-tauri/capabilities/default.json'),
      'utf8',
    );

    expect(api).toContain('read_binary_base64');
    expect(api).not.toContain('@tauri-apps/plugin-fs');
    expect(api).not.toContain('readFile(');

    expect(rust).toContain('fn read_binary_base64');
    expect(rust).toContain('require_read_scope');
    expect(rust).toContain('STANDARD.encode');

    expect(capabilities).not.toContain('fs:allow-read-file');
  });
});
