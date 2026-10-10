import { translatedLanguages } from './translations';
import type { AppLanguage } from './languages';

// English replacement template | zh-TW | es | pt | de | fr | ru | ja.
const rows = `
Version $1|版本 $1|Versión $1|Versão $1|Version $1|Version $1|Версия $1|バージョン $1
$1 voxels loaded|已載入 $1 個體素|$1 vóxeles cargados|$1 voxels carregados|$1 Voxel geladen|$1 voxels chargés|Загружено вокселей: $1|$1 個のボクセルを読み込みました
Model loaded: $1|模型已載入：$1|Modelo cargado: $1|Modelo carregado: $1|Modell geladen: $1|Modèle chargé : $1|Модель загружена: $1|モデル読み込み完了：$1
$1 animations loaded|已載入 $1 個動畫|$1 animaciones cargadas|$1 animações carregadas|$1 Animationen geladen|$1 animations chargées|Загружено анимаций: $1|$1 個のアニメーションを読み込みました
$1 · $2 frames|$1 · $2 影格|$1 · $2 fotogramas|$1 · $2 quadros|$1 · $2 Bilder|$1 · $2 images|$1 · $2 кадров|$1 · $2 フレーム
Frame $1 · $2|第 $1 影格 · $2|Fotograma $1 · $2|Quadro $1 · $2|Bild $1 · $2|Image $1 · $2|Кадр $1 · $2|フレーム $1 · $2
$1 frames|$1 影格|$1 fotogramas|$1 quadros|$1 Bilder|$1 images|$1 кадров|$1 フレーム
Bone $1|骨架點 $1|Hueso $1|Osso $1|Knochen $1|Os $1|Кость $1|ボーン $1
$1 voxels selected|已選取 $1 個體素|$1 vóxeles seleccionados|$1 voxels selecionados|$1 Voxel ausgewählt|$1 voxels sélectionnés|Выбрано вокселей: $1|$1 個のボクセルを選択
Bounds $1|範圍 $1|Límites $1|Limites $1|Abmessungen $1|Dimensions $1|Границы $1|範囲 $1
$1 / $2 voxels bound|$1 / $2 個體素已綁定|$1 / $2 vóxeles enlazados|$1 / $2 voxels vinculados|$1 / $2 Voxel gebunden|$1 / $2 voxels liés|Привязано вокселей: $1 / $2|$1 / $2 個をバインド済み
$1 / $2 bound · $3 remain in place|$1 / $2 已綁定 · $3 個保持原位|$1 / $2 enlazados · $3 sin mover|$1 / $2 vinculados · $3 imóveis|$1 / $2 gebunden · $3 unverändert|$1 / $2 liés · $3 immobiles|$1 / $2 привязано · $3 без перемещения|$1 / $2 バインド済み · $3 個は元の位置
Loaded: $1|已載入：$1|Cargado: $1|Carregado: $1|Geladen: $1|Chargé : $1|Загружено: $1|読み込み済み：$1
Saved: $1|已儲存：$1|Guardado: $1|Salvo: $1|Gespeichert: $1|Enregistré : $1|Сохранено: $1|保存済み：$1
Overwritten: $1|已覆寫：$1|Sobrescrito: $1|Sobrescrito: $1|Überschrieben: $1|Écrasé : $1|Перезаписано: $1|上書き済み：$1
Saved as: $1|已另存新檔：$1|Guardado como: $1|Salvo como: $1|Gespeichert unter: $1|Enregistré sous : $1|Сохранено как: $1|名前を付けて保存：$1
Exported: $1|已匯出：$1|Exportado: $1|Exportado: $1|Exportiert: $1|Exporté : $1|Экспортировано: $1|出力済み：$1
Animation exported: $1|動畫已匯出：$1|Animación exportada: $1|Animação exportada: $1|Animation exportiert: $1|Animation exportée : $1|Анимация экспортирована: $1|アニメーション出力済み：$1
Animation saved: $1|動畫已儲存：$1|Animación guardada: $1|Animação salva: $1|Animation gespeichert: $1|Animation enregistrée : $1|Анимация сохранена: $1|アニメーション保存済み：$1
Tool: $1|工具：$1|Herramienta: $1|Ferramenta: $1|Werkzeug: $1|Outil : $1|Инструмент: $1|ツール：$1
Selected $1 voxels|已框選 $1 個體素|Seleccionados $1 vóxeles|Selecionados $1 voxels|$1 Voxel ausgewählt|$1 voxels sélectionnés|Выбрано вокселей: $1|$1 個を矩形選択しました
Painted $1 voxels|已著色 $1 個體素|Pintados $1 vóxeles|Pintados $1 voxels|$1 Voxel bemalt|$1 voxels peints|Окрашено вокселей: $1|$1 個をペイントしました
Moved $1 voxels|已移動 $1 個體素|Movidos $1 vóxeles|Movidos $1 voxels|$1 Voxel verschoben|$1 voxels déplacés|Перемещено вокселей: $1|$1 個を移動しました
Rotated $2 voxels $3° around the $1 axis|已沿 $1 軸旋轉 $2 個體素 $3°|Girados $2 vóxeles $3° en el eje $1|Girados $2 voxels $3° no eixo $1|$2 Voxel um $3° um die $1-Achse gedreht|$2 voxels pivotés de $3° autour de l’axe $1|$2 вокселей повёрнуты на $3° вокруг оси $1|$2 個を $1 軸まわりに $3° 回転しました
ID #$1 · $2 voxels · Source $3|編號 #$1 · $2 個體素 · 來源 $3|ID #$1 · $2 vóxeles · Origen $3|ID #$1 · $2 voxels · Origem $3|ID #$1 · $2 Voxel · Quelle $3|ID #$1 · $2 voxels · Source $3|ID #$1 · $2 вокселей · Источник $3|ID #$1 · $2 個 · 元 $3
Current model saved to the copy library as #$1.|目前模型已儲存至複製庫，編號 #$1。|Modelo guardado en la biblioteca como #$1.|Modelo salvo na biblioteca como #$1.|Modell als #$1 in der Kopierbibliothek gespeichert.|Modèle enregistré dans la bibliothèque sous #$1.|Модель сохранена в библиотеке под #$1.|モデルをライブラリに #$1 として保存しました。
Copied model #$1 · $2 voxels|已複製模型 #$1 · $2 個體素|Modelo #$1 copiado · $2 vóxeles|Modelo #$1 copiado · $2 voxels|Modell #$1 kopiert · $2 Voxel|Modèle #$1 copié · $2 voxels|Модель #$1 скопирована · $2 вокселей|モデル #$1 をコピー · $2 個
Pasted model #$1 · $2 voxels|已貼上模型 #$1 · $2 個體素|Modelo #$1 pegado · $2 vóxeles|Modelo #$1 colado · $2 voxels|Modell #$1 eingefügt · $2 Voxel|Modèle #$1 collé · $2 voxels|Модель #$1 вставлена · $2 вокселей|モデル #$1 を貼り付け · $2 個
Pasted model #$1 and selected the new voxels.|已貼上模型 #$1 並選取新增體素。|Modelo #$1 pegado y nuevos vóxeles seleccionados.|Modelo #$1 colado e novos voxels selecionados.|Modell #$1 eingefügt und neue Voxel ausgewählt.|Modèle #$1 collé et nouveaux voxels sélectionnés.|Модель #$1 вставлена; новые воксели выбраны.|モデル #$1 を貼り付け、新しいボクセルを選択しました。
Deleted $1 voxels|已刪除 $1 個體素|Eliminados $1 vóxeles|Excluídos $1 voxels|$1 Voxel gelöscht|$1 voxels supprimés|Удалено вокселей: $1|$1 個を削除しました
Created a new model with $1 base voxel(s)|已建立含 $1 個基點體素的新模型|Creado un modelo con $1 vóxeles base|Criado modelo com $1 voxels base|Modell mit $1 Basisvoxeln erstellt|Modèle créé avec $1 voxels de base|Создана модель с $1 базовыми вокселями|$1 個の基本ボクセルを持つモデルを作成しました
Will replace: $1|即將取代：$1|Se reemplazará: $1|Será substituído: $1|Wird ersetzt: $1|Sera remplacé : $1|Будет заменён: $1|置換対象：$1
Shortcut $1 is already assigned.|快捷鍵 $1 已被使用。|El atajo $1 ya está asignado.|O atalho $1 já está atribuído.|Tastenkürzel $1 ist bereits vergeben.|Le raccourci $1 est déjà attribué.|Клавиша $1 уже назначена.|ショートカット $1 は既に使用されています。
Undo ($1)|復原 ($1)|Deshacer ($1)|Desfazer ($1)|Rückgängig ($1)|Annuler ($1)|Отменить ($1)|元に戻す ($1)
Redo ($1)|重做 ($1)|Rehacer ($1)|Refazer ($1)|Wiederholen ($1)|Rétablir ($1)|Повторить ($1)|やり直す ($1)
Rebound $1 voxels to the skeleton|已為 $1 個體素重新綁定骨架|Reenlazados $1 vóxeles al esqueleto|Revinculados $1 voxels ao esqueleto|$1 Voxel neu an das Skelett gebunden|$1 voxels reliés au squelette|$1 вокселей привязаны к скелету заново|$1 個をボーンに再バインドしました
Model: $1 bones; $2 preset: $3.|模型有 $1 個骨架點；$2 預設提供 $3 個。|Modelo: $1 huesos; preajuste $2: $3.|Modelo: $1 ossos; predefinição $2: $3.|Modell: $1 Knochen; Vorlage $2: $3.|Modèle : $1 os ; préréglage $2 : $3.|Модель: $1 костей; шаблон $2: $3.|モデル：$1 ボーン、プリセット $2：$3。
Model: $1 bones; $2 animation: $3.|模型有 $1 個骨架點；$2 動畫包含 $3 個。|Modelo: $1 huesos; animación $2: $3.|Modelo: $1 ossos; animação $2: $3.|Modell: $1 Knochen; Animation $2: $3.|Modèle : $1 os ; animation $2 : $3.|Модель: $1 костей; анимация $2: $3.|モデル：$1 ボーン、アニメーション $2：$3。
The built-in $1 animation could not be loaded.|無法載入內建 $1 動畫。|No se pudo cargar la animación integrada $1.|Não foi possível carregar a animação integrada $1.|Integrierte Animation $1 konnte nicht geladen werden.|Impossible de charger l’animation intégrée $1.|Не удалось загрузить встроенную анимацию $1.|内蔵アニメーション $1 を読み込めません。
Character preview element not found: $1|人物預覽介面元素不存在：$1|No se encontró el elemento de vista previa: $1|Elemento de prévia não encontrado: $1|Charaktervorschau-Element fehlt: $1|Élément d’aperçu introuvable : $1|Элемент просмотра персонажа не найден: $1|人物プレビュー要素がありません：$1
$1 animations|$1 個動畫|$1 animaciones|$1 animações|$1 Animationen|$1 animations|$1 анимаций|$1 個のアニメーション
$1 animations · Not exported|$1 個動畫 · 未匯出|$1 animaciones · Sin exportar|$1 animações · Não exportadas|$1 Animationen · Nicht exportiert|$1 animations · Non exportées|$1 анимаций · Не экспортировано|$1 個のアニメーション · 未出力
#$1 · $2 · $3 voxels|#$1 · $2 · $3 個體素|#$1 · $2 · $3 vóxeles|#$1 · $2 · $3 voxels|#$1 · $2 · $3 Voxel|#$1 · $2 · $3 voxels|#$1 · $2 · $3 вокселей|#$1 · $2 · $3 個
Edited bone $1|已編輯骨架點 $1|Hueso $1 editado|Osso $1 editado|Knochen $1 bearbeitet|Os $1 modifié|Кость $1 изменена|ボーン $1 を編集しました
Painted $1 voxels in a stroke|已連續著色 $1 個體素|Pintados $1 vóxeles de un trazo|Pintados $1 voxels em um traço|$1 Voxel in einem Zug bemalt|$1 voxels peints en un trait|Окрашено за проход: $1 вокселей|$1 個を連続ペイントしました
Added $1 voxels in a stroke|已連續新增 $1 個體素|Añadidos $1 vóxeles de un trazo|Adicionados $1 voxels em um traço|$1 Voxel in einem Zug hinzugefügt|$1 voxels ajoutés en un trait|Добавлено за проход: $1 вокселей|$1 個を連続追加しました
Deleted voxel ($1)|已刪除體素 ($1)|Vóxel eliminado ($1)|Voxel excluído ($1)|Voxel gelöscht ($1)|Voxel supprimé ($1)|Воксель удалён ($1)|ボクセルを削除 ($1)
Delete animation “$1”?|確定刪除動畫「$1」嗎？|¿Eliminar la animación «$1»?|Excluir a animação “$1”?|Animation „$1“ löschen?|Supprimer l’animation « $1 » ?|Удалить анимацию «$1»?|アニメーション「$1」を削除しますか？
XML parsing failed: $1|XML解析失敗：$1|Error al analizar XML: $1|Falha ao analisar XML: $1|XML-Analyse fehlgeschlagen: $1|Échec de l’analyse XML : $1|Ошибка разбора XML: $1|XML解析に失敗：$1
Could not verify file path: $1|無法確認檔案路徑：$1|No se pudo verificar la ruta: $1|Não foi possível verificar o caminho: $1|Dateipfad konnte nicht geprüft werden: $1|Impossible de vérifier le chemin : $1|Не удалось проверить путь: $1|ファイルパスを確認できません：$1
Failed to read file: $1|讀取檔案失敗：$1|Error al leer el archivo: $1|Falha ao ler arquivo: $1|Datei konnte nicht gelesen werden: $1|Échec de lecture du fichier : $1|Ошибка чтения файла: $1|ファイル読み込みに失敗：$1
Failed to save file: $1|儲存檔案失敗：$1|Error al guardar el archivo: $1|Falha ao salvar arquivo: $1|Datei konnte nicht gespeichert werden: $1|Échec d’enregistrement du fichier : $1|Ошибка сохранения файла: $1|ファイル保存に失敗：$1
Could not find file to overwrite: $1|找不到要覆寫的檔案：$1|No se encontró el archivo para sobrescribir: $1|Arquivo para sobrescrever não encontrado: $1|Zu überschreibende Datei nicht gefunden: $1|Fichier à écraser introuvable : $1|Файл для перезаписи не найден: $1|上書きするファイルがありません：$1
Overwrite failed: $1|覆寫儲存失敗：$1|Error al sobrescribir: $1|Falha ao sobrescrever: $1|Überschreiben fehlgeschlagen: $1|Échec de l’écrasement : $1|Ошибка перезаписи: $1|上書き保存に失敗：$1
Interface element not found: $1|介面元素不存在：$1|Elemento de interfaz no encontrado: $1|Elemento de interface não encontrado: $1|Oberflächenelement nicht gefunden: $1|Élément d’interface introuvable : $1|Элемент интерфейса не найден: $1|UI要素がありません：$1
`;

export const dynamicTranslations = new Map<string, Partial<Record<AppLanguage, string>>>(
  rows
    .trim()
    .split('\n')
    .map((row) => {
      const [source, ...values] = row.split('|');
      if (values.length !== translatedLanguages.length)
        throw new Error('Invalid dynamic translation: ' + source);
      return [source!, Object.fromEntries(translatedLanguages.map((code, index) => [code, values[index]!]))];
    }),
);
