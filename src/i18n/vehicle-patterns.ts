import type { AppLanguage } from './languages';
const rows: [string, Partial<Record<AppLanguage, string>>][] = [
  [
    "已打开 {1}",
    {
      "en": "Opened {1}",
      "zh-TW": "已開啟 {1}",
      "es": "Abierto {1}",
      "pt": "Aberto {1}",
      "de": "{1} geöffnet",
      "fr": "{1} ouvert",
      "ru": "Открыт {1}",
      "ja": "{1} を開きました"
    }
  ],
  [
    "已保存：{1}",
    {
      "en": "Saved: {1}",
      "zh-TW": "已儲存：{1}",
      "es": "Guardado: {1}",
      "pt": "Salvo: {1}",
      "de": "Gespeichert: {1}",
      "fr": "Enregistré : {1}",
      "ru": "Сохранено: {1}",
      "ja": "保存済み：{1}"
    }
  ],
  [
    "已保存；备份：{1}",
    {
      "en": "Saved; backup: {1}",
      "zh-TW": "已儲存；備份：{1}",
      "es": "Guardado; copia: {1}",
      "pt": "Salvo; backup: {1}",
      "de": "Gespeichert; Sicherung: {1}",
      "fr": "Enregistré ; sauvegarde : {1}",
      "ru": "Сохранено; копия: {1}",
      "ja": "保存済み；バックアップ：{1}"
    }
  ],
  [
    "错误：{1}",
    {
      "en": "Error: {1}",
      "zh-TW": "錯誤：{1}",
      "es": "Error: {1}",
      "pt": "Erro: {1}",
      "de": "Fehler: {1}",
      "fr": "Erreur : {1}",
      "ru": "Ошибка: {1}",
      "ja": "エラー：{1}"
    }
  ],
  [
    "{1} 个模型，{2} 个乘员",
    {
      "en": "{1} models, {2} crew",
      "zh-TW": "{1} 個模型，{2} 個乘員",
      "es": "{1} modelos, {2} tripulantes",
      "pt": "{1} modelos, {2} tripulantes",
      "de": "{1} Modelle, {2} Besatzung",
      "fr": "{1} modèles, {2} équipiers",
      "ru": "{1} моделей, {2} членов экипажа",
      "ja": "モデル {1} 個、乗員 {2} 人"
    }
  ],
  [
    "未保存：{1} 个载具",
    {
      "en": "Unsaved: {1} vehicles",
      "zh-TW": "未儲存：{1} 個載具",
      "es": "Sin guardar: {1} vehículos",
      "pt": "Não salvo: {1} veículos",
      "de": "Ungespeichert: {1} Fahrzeuge",
      "fr": "Non enregistrés : {1} véhicules",
      "ru": "Не сохранено: {1} единиц техники",
      "ja": "未保存：車両 {1} 件"
    }
  ],
  [
    "未保存：{1} 个武器",
    {
      "en": "Unsaved: {1} weapons",
      "zh-TW": "未儲存：{1} 個武器",
      "es": "Sin guardar: {1} armas",
      "pt": "Não salvo: {1} armas",
      "de": "Ungespeichert: {1} Waffen",
      "fr": "Non enregistrées : {1} armes",
      "ru": "Не сохранено: {1} единиц оружия",
      "ja": "未保存：武器 {1} 件"
    }
  ],
  [
    "未保存：{1} 个载具、{2} 个武器",
    {
      "en": "Unsaved: {1} vehicles, {2} weapons",
      "zh-TW": "未儲存：{1} 個載具、{2} 個武器",
      "es": "Sin guardar: {1} vehículos, {2} armas",
      "pt": "Não salvo: {1} veículos, {2} armas",
      "de": "Ungespeichert: {1} Fahrzeuge, {2} Waffen",
      "fr": "Non enregistrés : {1} véhicules, {2} armes",
      "ru": "Не сохранено: {1} техники, {2} оружия",
      "ja": "未保存：車両 {1} 件、武器 {2} 件"
    }
  ],
  [
    "未保存武器 {1}",
    {
      "en": "Unsaved weapons {1}",
      "zh-TW": "未儲存武器 {1}",
      "es": "Armas sin guardar {1}",
      "pt": "Armas não salvas {1}",
      "de": "Ungespeicherte Waffen {1}",
      "fr": "Armes non enregistrées {1}",
      "ru": "Несохранённое оружие {1}",
      "ja": "未保存の武器 {1}"
    }
  ],
  [
    "未解析资源 {1}",
    {
      "en": "Unresolved resources {1}",
      "zh-TW": "未解析資源 {1}",
      "es": "Recursos sin resolver {1}",
      "pt": "Recursos não resolvidos {1}",
      "de": "Nicht gefundene Ressourcen {1}",
      "fr": "Ressources non résolues {1}",
      "ru": "Ненайденные ресурсы {1}",
      "ja": "未解決のリソース {1}"
    }
  ],
  [
    "场景诊断 {1}",
    {
      "en": "Scene diagnostics {1}",
      "zh-TW": "場景診斷 {1}",
      "es": "Diagnóstico de escena {1}",
      "pt": "Diagnóstico da cena {1}",
      "de": "Szenendiagnose {1}",
      "fr": "Diagnostic de scène {1}",
      "ru": "Диагностика сцены {1}",
      "ja": "シーン診断 {1}"
    }
  ],
  [
    "资源诊断 {1}",
    {
      "en": "Resource diagnostics {1}",
      "zh-TW": "資源診斷 {1}",
      "es": "Diagnóstico de recursos {1}",
      "pt": "Diagnóstico de recursos {1}",
      "de": "Ressourcendiagnose {1}",
      "fr": "Diagnostic des ressources {1}",
      "ru": "Диагностика ресурсов {1}",
      "ja": "リソース診断 {1}"
    }
  ],
  [
    "{1} 有未保存的修改。",
    {
      "en": "{1} has unsaved changes.",
      "zh-TW": "{1} 有未儲存的修改。",
      "es": "{1} tiene cambios sin guardar.",
      "pt": "{1} tem alterações não salvas.",
      "de": "{1} hat ungespeicherte Änderungen.",
      "fr": "{1} contient des modifications non enregistrées.",
      "ru": "{1} содержит несохранённые изменения.",
      "ja": "{1} に未保存の変更があります。"
    }
  ],
  [
    "关闭 {1}",
    {
      "en": "Close {1}",
      "zh-TW": "關閉 {1}",
      "es": "Cerrar {1}",
      "pt": "Fechar {1}",
      "de": "{1} schließen",
      "fr": "Fermer {1}",
      "ru": "Закрыть {1}",
      "ja": "{1} を閉じる"
    }
  ],
  [
    "删除 {1}",
    {
      "en": "Delete {1}",
      "zh-TW": "刪除 {1}",
      "es": "Eliminar {1}",
      "pt": "Excluir {1}",
      "de": "{1} löschen",
      "fr": "Supprimer {1}",
      "ru": "Удалить {1}",
      "ja": "{1} を削除"
    }
  ],
  [
    "{1} 个备份",
    {
      "en": "{1} backups",
      "zh-TW": "{1} 個備份",
      "es": "{1} copias de seguridad",
      "pt": "{1} backups",
      "de": "{1} Sicherungen",
      "fr": "{1} sauvegardes",
      "ru": "{1} резервных копий",
      "ja": "バックアップ {1} 件"
    }
  ],
  [
    "选中 {1} 项",
    {
      "en": "{1} selected",
      "zh-TW": "選取 {1} 項",
      "es": "{1} seleccionados",
      "pt": "{1} selecionados",
      "de": "{1} ausgewählt",
      "fr": "{1} sélectionnés",
      "ru": "Выбрано {1}",
      "ja": "{1} 件選択"
    }
  ],
  [
    "次要来源 {1}",
    {
      "en": "Fallback source {1}",
      "zh-TW": "次要來源 {1}",
      "es": "Fuente alternativa {1}",
      "pt": "Fonte alternativa {1}",
      "de": "Zusätzliche Quelle {1}",
      "fr": "Source de secours {1}",
      "ru": "Запасной источник {1}",
      "ja": "補助参照元 {1}"
    }
  ],
  [
    "已保存预设“{1}”",
    {
      "en": "Preset saved: {1}",
      "zh-TW": "已儲存預設「{1}」",
      "es": "Preajuste guardado: {1}",
      "pt": "Predefinição salva: {1}",
      "de": "Vorgabe gespeichert: {1}",
      "fr": "Préréglage enregistré : {1}",
      "ru": "Набор сохранён: {1}",
      "ja": "プリセット保存：{1}"
    }
  ],
  [
    "已保存渲染预设“{1}”",
    {
      "en": "Render preset saved: {1}",
      "zh-TW": "已儲存算繪預設「{1}」",
      "es": "Preajuste guardado: {1}",
      "pt": "Predefinição salva: {1}",
      "de": "Rendervorgabe gespeichert: {1}",
      "fr": "Préréglage enregistré : {1}",
      "ru": "Набор рендера сохранён: {1}",
      "ja": "描画プリセット保存：{1}"
    }
  ],
  [
    "已载入渲染预设“{1}”",
    {
      "en": "Render preset loaded: {1}",
      "zh-TW": "已載入算繪預設「{1}」",
      "es": "Preajuste cargado: {1}",
      "pt": "Predefinição carregada: {1}",
      "de": "Rendervorgabe geladen: {1}",
      "fr": "Préréglage chargé : {1}",
      "ru": "Набор рендера загружен: {1}",
      "ja": "描画プリセット読み込み：{1}"
    }
  ],
  [
    "{1} 个阵营",
    {
      "en": "{1} factions",
      "zh-TW": "{1} 個陣營",
      "es": "{1} facciones",
      "pt": "{1} facções",
      "de": "{1} Fraktionen",
      "fr": "{1} factions",
      "ru": "{1} фракций",
      "ja": "陣営 {1}"
    }
  ],
  [
    "{1} / {2} 个刷新点",
    {
      "en": "{1} / {2} spawns",
      "zh-TW": "{1} / {2} 個重生點",
      "es": "{1} / {2} puntos",
      "pt": "{1} / {2} pontos",
      "de": "{1} / {2} Spawnpunkte",
      "fr": "{1} / {2} points",
      "ru": "{1} / {2} точек",
      "ja": "出現地点 {1} / {2}"
    }
  ],
  [
    "实时预览已更新 · {1} 个可调部件",
    {
      "en": "Preview updated · {1} parts",
      "zh-TW": "即時預覽已更新 · {1} 個可調部件",
      "es": "Vista actualizada · {1} piezas",
      "pt": "Prévia atualizada · {1} peças",
      "de": "Vorschau aktualisiert · {1} Teile",
      "fr": "Aperçu actualisé · {1} pièces",
      "ru": "Просмотр обновлён · {1} деталей",
      "ja": "プレビュー更新 · {1} パーツ"
    }
  ],
  [
    "预览已更新；{1} 项资源诊断",
    {
      "en": "Preview updated; {1} diagnostics",
      "zh-TW": "預覽已更新；{1} 項資源診斷",
      "es": "Vista actualizada; {1} diagnósticos",
      "pt": "Prévia atualizada; {1} diagnósticos",
      "de": "Vorschau aktualisiert; {1} Diagnosen",
      "fr": "Aperçu actualisé ; {1} diagnostics",
      "ru": "Просмотр обновлён; {1} замечаний",
      "ja": "プレビュー更新；診断 {1} 件"
    }
  ],
  [
    "删除预设“{1}”？",
    {
      "en": "Delete preset {1}?",
      "zh-TW": "刪除預設「{1}」？",
      "es": "¿Eliminar el preajuste {1}?",
      "pt": "Excluir a predefinição {1}?",
      "de": "Vorgabe {1} löschen?",
      "fr": "Supprimer le préréglage {1} ?",
      "ru": "Удалить набор {1}?",
      "ja": "プリセット {1} を削除しますか？"
    }
  ],
  [
    "删除资源预设“{1}”？",
    {
      "en": "Delete resource preset {1}?",
      "zh-TW": "刪除資源預設「{1}」？",
      "es": "¿Eliminar el preajuste {1}?",
      "pt": "Excluir a predefinição {1}?",
      "de": "Ressourcenvorgabe {1} löschen?",
      "fr": "Supprimer le préréglage {1} ?",
      "ru": "Удалить набор ресурсов {1}?",
      "ja": "リソースプリセット {1} を削除しますか？"
    }
  ],
  [
    "删除渲染预设“{1}”？",
    {
      "en": "Delete render preset {1}?",
      "zh-TW": "刪除算繪預設「{1}」？",
      "es": "¿Eliminar el preajuste {1}?",
      "pt": "Excluir a predefinição {1}?",
      "de": "Rendervorgabe {1} löschen?",
      "fr": "Supprimer le préréglage {1} ?",
      "ru": "Удалить набор рендера {1}?",
      "ja": "描画プリセット {1} を削除しますか？"
    }
  ]
];
export const vehiclePatterns = rows.map(([source, templates]) => ({
  pattern: new RegExp('^' + source.split(/(\{\d+\})/).map(part => /^\{\d+\}$/.test(part) ? '(.*?)' : part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('') + '$'),
  templates,
}));
