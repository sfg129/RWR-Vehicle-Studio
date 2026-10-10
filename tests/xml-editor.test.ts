import { describe, expect, it } from 'vitest';
import { changedLines, renderableVehicle } from '../src/core/editor/xml-editor';
import { SourceDocument } from '../src/core/xml/source-document';
import { initialLanguage, languages } from '../src/i18n/languages';
import { translate } from '../src/i18n/runtime';

describe('XML text editor', () => {
  it('renders vehicles with or without an XML declaration', () => {
    expect(renderableVehicle(new SourceDocument('<vehicle/>'))).toBe(true);
    expect(renderableVehicle(new SourceDocument('<?xml version="1.0" encoding="utf-8"?>\n<vehicle/>'))).toBe(true);
  });
  it('keeps non-vehicle and incomplete source editable without rendering it', () => {
    for (const source of ['hello', '<weapon/>', '<vehicle><visual></vehicle>', '<vehicle/><vehicle/>', '<', '<vehicle name="', '<vehicle><visual']) {
      const doc = new SourceDocument(source);
      expect(doc.serialize()).toBe(source);
      expect(renderableVehicle(doc)).toBe(false);
    }
  });
  it('marks insertion, deletion and modified lines against the saved baseline', () => {
    expect(changedLines('a\nb', 'a\nx\nb').get(2)).toBe('added');
    expect(changedLines('a\nx\nb', 'a\nb').get(2)).toBe('deleted');
    expect(changedLines('a\nb', 'a\nc').get(2)).toBe('modified');
    expect(changedLines('', '')).toEqual(new Map());
    expect(changedLines('a\nb', 'a\nb').size).toBe(0);
  });
});
describe('Studio languages', () => {
  it('has the same fixed nine-language list as Editor', () => {
    expect(languages.map(item => item.code)).toEqual(['de','en','es','fr','ja','pt','ru','zh-CN','zh-TW']);
    expect(initialLanguage('zh-Hant-HK')).toBe('zh-TW');
    expect(initialLanguage('zh_CN')).toBe('zh-CN');
    expect(initialLanguage('de-DE')).toBe('de');
    expect(initialLanguage('pt-BR')).toBe('pt');
    expect(initialLanguage('it-IT')).toBe('zh-CN');
  });
  it('uses noun translations for Backups and preserves technical file contents', () => {
    expect(translate('备份', 'en')).toBe('Backups');
    expect(translate('备份', 'de')).toBe('Sicherungen');
    expect(translate('<vehicle name="保存"/>', 'en')).toBe('<vehicle name="保存"/>');
    expect(translate('已打开 新文件.weapon', 'en')).toBe('Opened 新文件.weapon');
    expect(translate('炮塔 1 · example.weapon', 'en')).toBe('Turret 1 · example.weapon');
    expect(translate('5 个模型，2 个乘员', 'en')).toBe('5 models, 2 crew');
    expect(translate('vehicle · 基础只读', 'en')).toBe('vehicle · Inherited, read-only');
    for (const language of languages.filter(item => item.code !== 'zh-CN')) {
      expect(translate('返回预览', language.code)).not.toBe('返回预览');
      expect(translate('资源文件夹', language.code)).not.toBe('资源文件夹');
    }
  });
});
