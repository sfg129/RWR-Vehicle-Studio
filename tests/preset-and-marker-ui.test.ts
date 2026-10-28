import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const component = readFileSync(new URL('../src/components/IconRenderer.vue', import.meta.url), 'utf8');
const picker = readFileSync(new URL('../src/components/PresetSelect.vue', import.meta.url), 'utf8');
const styles = readFileSync(new URL('../src/styles/index.css', import.meta.url), 'utf8');

describe('preset loading and fixed spawn-marker colors', () => {
  it('keeps explicit loading and repeat selection on the same load path', () => {
    expect(component).toContain('@click="loadPreset">读取</button>');
    expect(component).toContain('@select="selectPreset"');
    expect(component).toMatch(/function selectPreset\(id: string\): void\s*\{\s*selectedPresetId.value = id;\s*loadPreset\(\);/);
    expect(picker).toContain("emit('select', option.value)");
    expect(picker).not.toContain('if (option.value === props.modelValue)');
    expect(picker).toContain('role="combobox"');
    expect(picker).toContain('role="listbox"');
    expect(picker).toContain('role="option"');
  });

  it('does not use theme colors for either marker type or its selected/rotation states', () => {
    const rules = [...styles.matchAll(/\.map-spawn-markers[^{}]*\{([^}]+)\}/g)].map(match => match[1]).join('\n');
    expect(rules).toContain('--map-marker-color: #f0b84b');
    expect(rules).toContain('--map-marker-color: #55ddd4');
    expect(rules).toContain('stroke: var(--map-marker-color)');
    expect(rules).not.toContain('var(--accent)');
    expect(rules).not.toContain('var(--surface-');
    expect(rules).not.toContain('var(--text)');
  });
});
