import type { AppLanguage } from './languages';

export const vehicleMessages = new Map<string, Partial<Record<AppLanguage, string>>>([
["快捷键已被占用",{"en":"Shortcut already in use","zh-TW":"快捷鍵已被使用","es":"El atajo ya está en uso","pt":"Atalho já em uso","de":"Tastenkombination bereits belegt","fr":"Raccourci déjà utilisé","ru":"Сочетание клавиш уже используется","ja":"ショートカットは使用中です"}],
["基础操作",{"en":"Basic operations","zh-TW":"基本操作","es":"Operaciones básicas","pt":"Operações básicas","de":"Grundbedienung","fr":"Opérations de base","ru":"Основные действия","ja":"基本操作"}],
["换行",{"en":"New line","zh-TW":"換行","es":"Nueva línea","pt":"Nova linha","de":"Neue Zeile","fr":"Nouvelle ligne","ru":"Новая строка","ja":"改行"}],
["缩进",{"en":"Indent","zh-TW":"縮排","es":"Sangría","pt":"Recuar","de":"Einrücken","fr":"Indenter","ru":"Увеличить отступ","ja":"インデント"}],
["减少缩进",{"en":"Outdent","zh-TW":"減少縮排","es":"Reducir sangría","pt":"Diminuir recuo","de":"Ausrücken","fr":"Désindenter","ru":"Уменьшить отступ","ja":"インデント解除"}],
["剪切",{"en":"Cut","zh-TW":"剪下","es":"Cortar","pt":"Recortar","de":"Ausschneiden","fr":"Couper","ru":"Вырезать","ja":"切り取り"}],
["粘贴",{"en":"Paste","zh-TW":"貼上","es":"Pegar","pt":"Colar","de":"Einfügen","fr":"Coller","ru":"Вставить","ja":"貼り付け"}],
["查找",{"en":"Find","zh-TW":"尋找","es":"Buscar","pt":"Localizar","de":"Suchen","fr":"Rechercher","ru":"Найти","ja":"検索"}],
["标签页",{"en":"Tabs","zh-TW":"分頁","es":"Pestañas","pt":"Abas","de":"Tabs","fr":"Onglets","ru":"Вкладки","ja":"タブ"}],
["下一个标签页",{"en":"Next tab","zh-TW":"下一個分頁","es":"Pestaña siguiente","pt":"Próxima aba","de":"Nächster Tab","fr":"Onglet suivant","ru":"Следующая вкладка","ja":"次のタブ"}],
["上一个标签页",{"en":"Previous tab","zh-TW":"上一個分頁","es":"Pestaña anterior","pt":"Aba anterior","de":"Vorheriger Tab","fr":"Onglet précédent","ru":"Предыдущая вкладка","ja":"前のタブ"}],
["组合快捷键",{"en":"Combined shortcuts","zh-TW":"組合快捷鍵","es":"Atajos combinados","pt":"Atalhos combinados","de":"Tastenkombinationen","fr":"Raccourcis combinés","ru":"Сочетания клавиш","ja":"組み合わせショートカット"}],
["连续快捷键",{"en":"Key sequences","zh-TW":"連續快捷鍵","es":"Secuencias de teclas","pt":"Sequências de teclas","de":"Tastenfolgen","fr":"Séquences de touches","ru":"Последовательности клавиш","ja":"連続ショートカット"}],
["在资源管理器中打开",{"en":"Open in file manager","zh-TW":"在檔案總管中開啟","es":"Abrir en el explorador","pt":"Abrir no explorador","de":"Im Dateimanager öffnen","fr":"Ouvrir dans l’explorateur","ru":"Открыть в проводнике","ja":"ファイルマネージャーで開く"}],
["访问 GitHub 仓库",{"en":"Visit GitHub repository","zh-TW":"開啟 GitHub 儲存庫","es":"Visitar el repositorio de GitHub","pt":"Visitar repositório GitHub","de":"GitHub-Repository öffnen","fr":"Ouvrir le dépôt GitHub","ru":"Открыть репозиторий GitHub","ja":"GitHub リポジトリを開く"}],
  ["objects.svg 未保存",{"en":"objects.svg unsaved","zh-TW":"objects.svg 未儲存","es":"objects.svg sin guardar","pt":"objects.svg não salvo","de":"objects.svg ungespeichert","fr":"objects.svg non enregistré","ru":"objects.svg не сохранён","ja":"objects.svg 未保存"}],
  ["未保存武器",{"en":"Unsaved weapons","zh-TW":"未儲存武器","es":"Armas sin guardar","pt":"Armas não salvas","de":"Ungespeicherte Waffen","fr":"Armes non enregistrées","ru":"Несохранённое оружие","ja":"未保存の武器"}],
  ["载具标签页",{"en":"Vehicle tabs","zh-TW":"載具分頁","es":"Pestañas de vehículos","pt":"Abas de veículos","de":"Fahrzeug-Tabs","fr":"Onglets des véhicules","ru":"Вкладки техники","ja":"車両タブ"}],
  ["候选来自当前工作区的 .vehicle 文件",{"en":"From workspace .vehicle files","zh-TW":"來自工作區 .vehicle 檔案","es":"De archivos .vehicle del espacio","pt":"De arquivos .vehicle do espaço","de":"Aus .vehicle-Dateien des Arbeitsbereichs","fr":"Des fichiers .vehicle de l’espace","ru":"Из файлов .vehicle рабочей области","ja":"ワークスペースの .vehicle ファイルから"}],
  ["折叠炮塔选项",{"en":"Collapse turret","zh-TW":"摺疊砲塔選項","es":"Contraer torreta","pt":"Recolher torre","de":"Turm einklappen","fr":"Replier la tourelle","ru":"Свернуть башню","ja":"砲塔を折りたたむ"}],
  ["展开炮塔选项",{"en":"Expand turret","zh-TW":"展開砲塔選項","es":"Expandir torreta","pt":"Expandir torre","de":"Turm ausklappen","fr":"Déplier la tourelle","ru":"Развернуть башню","ja":"砲塔を展開"}],
  ["继承自基础载具（只读）",{"en":"Inherited from base (read-only)","zh-TW":"繼承自基礎載具（唯讀）","es":"Heredado de la base (solo lectura)","pt":"Herdado da base (somente leitura)","de":"Von Basis geerbt (schreibgeschützt)","fr":"Hérité de la base (lecture seule)","ru":"Унаследовано от основы (только чтение)","ja":"基本ファイルから継承（読み取り専用）"}],
  ["来自当前载具文件",{"en":"From current vehicle file","zh-TW":"來自目前載具檔案","es":"Del archivo actual","pt":"Do arquivo atual","de":"Aus aktueller Fahrzeugdatei","fr":"Du fichier de véhicule actuel","ru":"Из текущего файла техники","ja":"現在の車両ファイルから"}],
  ["折叠乘员位置",{"en":"Collapse crew positions","zh-TW":"摺疊乘員位置","es":"Contraer posiciones de tripulación","pt":"Recolher posições da tripulação","de":"Besatzungspositionen einklappen","fr":"Replier les positions d’équipage","ru":"Свернуть позиции экипажа","ja":"乗員位置を折りたたむ"}],
  ["展开乘员位置",{"en":"Expand crew positions","zh-TW":"展開乘員位置","es":"Expandir posiciones de tripulación","pt":"Expandir posições da tripulação","de":"Besatzungspositionen ausklappen","fr":"Déplier les positions d’équipage","ru":"Развернуть позиции экипажа","ja":"乗員位置を展開"}],
  ["未解析资源",{"en":"Unresolved resources","zh-TW":"未解析資源","es":"Recursos sin resolver","pt":"Recursos não resolvidos","de":"Nicht gefundene Ressourcen","fr":"Ressources non résolues","ru":"Ненайденные ресурсы","ja":"未解決のリソース"}],
  ["场景诊断",{"en":"Scene diagnostics","zh-TW":"場景診斷","es":"Diagnóstico de escena","pt":"Diagnóstico da cena","de":"Szenendiagnose","fr":"Diagnostic de scène","ru":"Диагностика сцены","ja":"シーン診断"}],
  ["· 基础只读",{"en":"· Inherited, read-only","zh-TW":"· 基礎唯讀","es":"· Heredado, solo lectura","pt":"· Herdado, somente leitura","de":"· Geerbt, schreibgeschützt","fr":"· Hérité, lecture seule","ru":"· Унаследовано, только чтение","ja":"· 継承、読み取り専用"}],
  ["未保存",{"en":"Unsaved","zh-TW":"未儲存","es":"Sin guardar","pt":"Não salvo","de":"Ungespeichert","fr":"Non enregistré","ru":"Не сохранено","ja":"未保存"}],
  ["扫描中…",{"en":"Scanning…","zh-TW":"掃描中…","es":"Escaneando…","pt":"Verificando…","de":"Scannen…","fr":"Analyse…","ru":"Сканирование…","ja":"スキャン中…"}],
  ["较早一代 · .bak1",{"en":"Previous · .bak1","zh-TW":"較早一代 · .bak1","es":"Anterior · .bak1","pt":"Anterior · .bak1","de":"Vorherige · .bak1","fr":"Précédente · .bak1","ru":"Предыдущая · .bak1","ja":"前回 · .bak1"}],
  ["最近一代 · .bak",{"en":"Latest · .bak","zh-TW":"最近一代 · .bak","es":"Última · .bak","pt":"Mais recente · .bak","de":"Neueste · .bak","fr":"Dernière · .bak","ru":"Последняя · .bak","ja":"最新 · .bak"}],
  ["旧版多代备份",{"en":"Legacy backups","zh-TW":"舊版多代備份","es":"Copias antiguas","pt":"Backups antigos","de":"Alte Sicherungen","fr":"Anciennes sauvegardes","ru":"Старые резервные копии","ja":"旧バージョンのバックアップ"}],
  ["恢复",{"en":"Restore","zh-TW":"還原","es":"Restaurar","pt":"Restaurar","de":"Wiederherstellen","fr":"Restaurer","ru":"Восстановить","ja":"復元"}],
  ["点击左侧备份查看内容",{"en":"Select a backup to preview","zh-TW":"選擇備份以預覽","es":"Selecciona una copia para verla","pt":"Selecione um backup para visualizar","de":"Sicherung zur Vorschau wählen","fr":"Sélectionnez une sauvegarde","ru":"Выберите копию для просмотра","ja":"バックアップを選択してプレビュー"}],
  ["选中",{"en":"Selected","zh-TW":"選取","es":"Seleccionados","pt":"Selecionados","de":"Ausgewählt","fr":"Sélectionnés","ru":"Выбрано","ja":"選択"}],
  ["项",{"en":"items","zh-TW":"項","es":"elementos","pt":"itens","de":"Elemente","fr":"éléments","ru":"элементов","ja":"件"}],
  ["动态乘员",{"en":"Animated crew","zh-TW":"動態乘員","es":"Tripulación animada","pt":"Tripulação animada","de":"Animierte Besatzung","fr":"Équipage animé","ru":"Анимированный экипаж","ja":"アニメーション乗員"}],
  ["#000 / #FFF · 背景",{"en":"#000 / #FFF · Background","zh-TW":"#000 / #FFF · 背景","es":"#000 / #FFF · Fondo","pt":"#000 / #FFF · Fundo","de":"#000 / #FFF · Hintergrund","fr":"#000 / #FFF · Fond","ru":"#000 / #FFF · Фон","ja":"#000 / #FFF · 背景"}],
  ["资源诊断",{"en":"Resource diagnostics","zh-TW":"資源診斷","es":"Diagnóstico de recursos","pt":"Diagnóstico de recursos","de":"Ressourcendiagnose","fr":"Diagnostic des ressources","ru":"Диагностика ресурсов","ja":"リソース診断"}],
  ["尺寸",{"en":"Size","zh-TW":"尺寸","es":"Tamaño","pt":"Tamanho","de":"Größe","fr":"Taille","ru":"Размер","ja":"サイズ"}],
  ["正在导出…",{"en":"Exporting…","zh-TW":"正在匯出…","es":"Exportando…","pt":"Exportando…","de":"Exportieren…","fr":"Exportation…","ru":"Экспорт…","ja":"書き出し中…"}],
  ["缺少 objects.svg",{"en":"Missing objects.svg","zh-TW":"缺少 objects.svg","es":"Falta objects.svg","pt":"Falta objects.svg","de":"objects.svg fehlt","fr":"objects.svg absent","ru":"Нет objects.svg","ja":"objects.svg なし"}],
  ["拖动图标移动 · 拖动外圈圆点旋转 · 空白处拖动平移 · 滚轮缩放",{"en":"Drag icon to move · Drag outer handle to rotate · Drag background to pan · Wheel to zoom","zh-TW":"拖曳圖示移動 · 拖曳外圈圓點旋轉 · 拖曳空白處平移 · 滾輪縮放","es":"Arrastrar icono: mover · Asa exterior: girar · Fondo: desplazar · Rueda: zoom","pt":"Arraste ícone: mover · Alça externa: girar · Fundo: deslocar · Roda: zoom","de":"Symbol ziehen: bewegen · Außenpunkt: drehen · Hintergrund: schieben · Rad: zoomen","fr":"Icône : déplacer · Poignée : tourner · Fond : déplacer la vue · Molette : zoom","ru":"Значок: перемещение · Внешняя точка: поворот · Фон: сдвиг · Колесо: масштаб","ja":"アイコンをドラッグ：移動 · 外周の点：回転 · 空白部分：パン · ホイール：ズーム"}],
  ["个刷新点",{"en":"spawns","zh-TW":"個重生點","es":"puntos","pt":"pontos","de":"Spawnpunkte","fr":"points","ru":"точек","ja":"出現地点"}],
  ["· MATERIALS 模板",{"en":"· MATERIALS template","zh-TW":"· MATERIALS 範本","es":"· Plantilla MATERIALS","pt":"· Modelo MATERIALS","de":"· MATERIALS-Vorlage","fr":"· Modèle MATERIALS","ru":"· Шаблон MATERIALS","ja":"· MATERIALS テンプレート"}],
  ["个阵营",{"en":"factions","zh-TW":"個陣營","es":"facciones","pt":"facções","de":"Fraktionen","fr":"factions","ru":"фракций","ja":"陣営"}],
  ["继承/未设",{"en":"Inherited/unset","zh-TW":"繼承/未設定","es":"Heredado/sin definir","pt":"Herdado/não definido","de":"Geerbt/nicht gesetzt","fr":"Hérité/non défini","ru":"Унаследовано/не задано","ja":"継承/未設定"}],
  ["objects.svg 有未保存修改",{"en":"objects.svg has unsaved changes","zh-TW":"objects.svg 有未儲存變更","es":"objects.svg tiene cambios sin guardar","pt":"objects.svg tem alterações não salvas","de":"objects.svg hat ungespeicherte Änderungen","fr":"objects.svg contient des modifications non enregistrées","ru":"objects.svg содержит несохранённые изменения","ja":"objects.svg に未保存の変更あり"}],
  ["单文件资源覆盖",{"en":"Resource file overrides","zh-TW":"單檔資源覆蓋","es":"Sustituciones de recursos","pt":"Substituições de recursos","de":"Ressourcendatei-Ersetzungen","fr":"Remplacements de ressources","ru":"Замены файлов ресурсов","ja":"リソースファイルの差し替え"}],
  ["尚未指定覆盖文件",{"en":"No overrides","zh-TW":"尚未指定覆蓋檔案","es":"Sin sustituciones","pt":"Sem substituições","de":"Keine Ersetzungen","fr":"Aucun remplacement","ru":"Нет замен","ja":"差し替えなし"}],
  ["移除",{"en":"Remove","zh-TW":"移除","es":"Quitar","pt":"Remover","de":"Entfernen","fr":"Retirer","ru":"Убрать","ja":"削除"}],
  ["添加文件",{"en":"Add file","zh-TW":"新增檔案","es":"Añadir archivo","pt":"Adicionar arquivo","de":"Datei hinzufügen","fr":"Ajouter un fichier","ru":"Добавить файл","ja":"ファイルを追加"}],
  ["次要来源",{"en":"Fallback source","zh-TW":"次要來源","es":"Fuente alternativa","pt":"Fonte alternativa","de":"Zusätzliche Quelle","fr":"Source de secours","ru":"Запасной источник","ja":"補助参照元"}],
  ["增加",{"en":"Add","zh-TW":"新增","es":"Añadir","pt":"Adicionar","de":"Hinzufügen","fr":"Ajouter","ru":"Добавить","ja":"追加"}],
  ["文件夹",{"en":"folder","zh-TW":"資料夾","es":"carpeta","pt":"pasta","de":"Ordner","fr":"dossier","ru":"папка","ja":"フォルダー"}],
  ["调整载具工作区与场景对象比例",{"en":"Resize workspace and scene objects","zh-TW":"調整載具工作區與場景物件比例","es":"Ajustar espacio y objetos de escena","pt":"Ajustar espaço e objetos da cena","de":"Arbeitsbereich und Szenenobjekte skalieren","fr":"Redimensionner l’espace et les objets","ru":"Изменить размеры рабочей области и объектов","ja":"ワークスペースとシーンの比率を調整"}],
  ["深色模式", { en: "Dark mode", "zh-TW": "深色模式", es: "Modo oscuro", pt: "Modo escuro", de: "Dunkler Modus", fr: "Mode sombre", ru: "Тёмный режим", ja: "ダークモード" }],
  ["浅色模式", { en: "Light mode", "zh-TW": "淺色模式", es: "Modo claro", pt: "Modo claro", de: "Heller Modus", fr: "Mode clair", ru: "Светлый режим", ja: "ライトモード" }],
  [
    "资源",
    {
      "en": "Resources",
      "zh-TW": "資源",
      "es": "Recursos",
      "pt": "Recursos",
      "de": "Ressourcen",
      "fr": "Ressources",
      "ru": "Ресурсы",
      "ja": "リソース"
    }
  ],
  [
    "资源文件夹",
    {
      "en": "Resource folders",
      "zh-TW": "資源資料夾",
      "es": "Carpetas de recursos",
      "pt": "Pastas de recursos",
      "de": "Ressourcenordner",
      "fr": "Dossiers de ressources",
      "ru": "Папки ресурсов",
      "ja": "リソースフォルダー"
    }
  ],
  [
    "备份",
    {
      "en": "Backups",
      "zh-TW": "備份",
      "es": "Copias de seguridad",
      "pt": "Backups",
      "de": "Sicherungen",
      "fr": "Sauvegardes",
      "ru": "Резервные копии",
      "ja": "バックアップ"
    }
  ],
  [
    "启用备份",
    {
      "en": "Enable backups",
      "zh-TW": "啟用備份",
      "es": "Activar copias de seguridad",
      "pt": "Ativar backups",
      "de": "Sicherungen aktivieren",
      "fr": "Activer les sauvegardes",
      "ru": "Включить резервные копии",
      "ja": "バックアップを有効化"
    }
  ],
  [
    "备份位置",
    {
      "en": "Backup location",
      "zh-TW": "備份位置",
      "es": "Ubicación de copias",
      "pt": "Local dos backups",
      "de": "Sicherungsordner",
      "fr": "Emplacement des sauvegardes",
      "ru": "Папка резервных копий",
      "ja": "バックアップ先"
    }
  ],
  [
    "选择目录",
    {
      "en": "Choose folder",
      "zh-TW": "選擇目錄",
      "es": "Elegir carpeta",
      "pt": "Escolher pasta",
      "de": "Ordner wählen",
      "fr": "Choisir un dossier",
      "ru": "Выбрать папку",
      "ja": "フォルダーを選択"
    }
  ],
  [
    "默认目录",
    {
      "en": "Default folder",
      "zh-TW": "預設目錄",
      "es": "Carpeta predeterminada",
      "pt": "Pasta padrão",
      "de": "Standardordner",
      "fr": "Dossier par défaut",
      "ru": "Папка по умолчанию",
      "ja": "既定のフォルダー"
    }
  ],
  [
    "打开",
    {
      "en": "Open",
      "zh-TW": "開啟",
      "es": "Abrir",
      "pt": "Abrir",
      "de": "Öffnen",
      "fr": "Ouvrir",
      "ru": "Открыть",
      "ja": "開く"
    }
  ],
  [
    "新建",
    {
      "en": "New",
      "zh-TW": "新增",
      "es": "Nuevo",
      "pt": "Novo",
      "de": "Neu",
      "fr": "Nouveau",
      "ru": "Создать",
      "ja": "新規作成"
    }
  ],
  [
    "重新载入",
    {
      "en": "Reload",
      "zh-TW": "重新載入",
      "es": "Recargar",
      "pt": "Recarregar",
      "de": "Neu laden",
      "fr": "Recharger",
      "ru": "Перезагрузить",
      "ja": "再読み込み"
    }
  ],
  [
    "关闭其它",
    {
      "en": "Close others",
      "zh-TW": "關閉其他",
      "es": "Cerrar las demás",
      "pt": "Fechar outras",
      "de": "Andere schließen",
      "fr": "Fermer les autres",
      "ru": "Закрыть остальные",
      "ja": "他を閉じる"
    }
  ],
  [
    "关闭右侧标签页",
    {
      "en": "Close tabs to the right",
      "zh-TW": "關閉右側分頁",
      "es": "Cerrar pestañas a la derecha",
      "pt": "Fechar abas à direita",
      "de": "Rechte Tabs schließen",
      "fr": "Fermer les onglets à droite",
      "ru": "Закрыть вкладки справа",
      "ja": "右側のタブを閉じる"
    }
  ],
  [
    "关闭已保存",
    {
      "en": "Close saved",
      "zh-TW": "關閉已儲存",
      "es": "Cerrar las guardadas",
      "pt": "Fechar salvas",
      "de": "Gespeicherte schließen",
      "fr": "Fermer les enregistrés",
      "ru": "Закрыть сохранённые",
      "ja": "保存済みを閉じる"
    }
  ],
  [
    "全部关闭",
    {
      "en": "Close all",
      "zh-TW": "全部關閉",
      "es": "Cerrar todas",
      "pt": "Fechar todas",
      "de": "Alle schließen",
      "fr": "Tout fermer",
      "ru": "Закрыть все",
      "ja": "すべて閉じる"
    }
  ],
  [
    "复制路径",
    {
      "en": "Copy path",
      "zh-TW": "複製路徑",
      "es": "Copiar ruta",
      "pt": "Copiar caminho",
      "de": "Pfad kopieren",
      "fr": "Copier le chemin",
      "ru": "Копировать путь",
      "ja": "パスをコピー"
    }
  ],
  [
    "复制相对路径",
    {
      "en": "Copy relative path",
      "zh-TW": "複製相對路徑",
      "es": "Copiar ruta relativa",
      "pt": "Copiar caminho relativo",
      "de": "Relativen Pfad kopieren",
      "fr": "Copier le chemin relatif",
      "ru": "Копировать относительный путь",
      "ja": "相対パスをコピー"
    }
  ],
  [
    "在文件资源管理器中显示",
    {
      "en": "Reveal in file explorer",
      "zh-TW": "在檔案總管中顯示",
      "es": "Mostrar en el explorador",
      "pt": "Mostrar no explorador",
      "de": "Im Dateimanager anzeigen",
      "fr": "Afficher dans l’explorateur",
      "ru": "Показать в проводнике",
      "ja": "エクスプローラーで表示"
    }
  ],
  [
    "在工作区中显示",
    {
      "en": "Reveal in workspace",
      "zh-TW": "在工作區中顯示",
      "es": "Mostrar en el espacio de trabajo",
      "pt": "Mostrar no espaço de trabalho",
      "de": "Im Arbeitsbereich anzeigen",
      "fr": "Afficher dans l’espace de travail",
      "ru": "Показать в рабочей области",
      "ja": "ワークスペースで表示"
    }
  ],
  [
    "保持打开",
    {
      "en": "Keep open",
      "zh-TW": "保持開啟",
      "es": "Mantener abierta",
      "pt": "Manter aberta",
      "de": "Offen halten",
      "fr": "Garder ouvert",
      "ru": "Оставить открытой",
      "ja": "開いたままにする"
    }
  ],
  [
    "固定",
    {
      "en": "Pin",
      "zh-TW": "釘選",
      "es": "Fijar",
      "pt": "Fixar",
      "de": "Anheften",
      "fr": "Épingler",
      "ru": "Закрепить",
      "ja": "ピン留め"
    }
  ],
  [
    "取消固定",
    {
      "en": "Unpin",
      "zh-TW": "取消釘選",
      "es": "Desfijar",
      "pt": "Desafixar",
      "de": "Lösen",
      "fr": "Désépingler",
      "ru": "Открепить",
      "ja": "ピン留めを解除"
    }
  ],
  [
    "编辑 XML",
    {
      "en": "Edit XML",
      "zh-TW": "編輯 XML",
      "es": "Editar XML",
      "pt": "Editar XML",
      "de": "XML bearbeiten",
      "fr": "Modifier le XML",
      "ru": "Редактировать XML",
      "ja": "XML を編集"
    }
  ],
  [
    "返回预览",
    {
      "en": "Back to preview",
      "zh-TW": "返回預覽",
      "es": "Volver a la vista previa",
      "pt": "Voltar à prévia",
      "de": "Zur Vorschau",
      "fr": "Retour à l’aperçu",
      "ru": "Вернуться к просмотру",
      "ja": "プレビューに戻る"
    }
  ],
  [
    "保存更改？",
    {
      "en": "Save changes?",
      "zh-TW": "儲存變更？",
      "es": "¿Guardar cambios?",
      "pt": "Salvar alterações?",
      "de": "Änderungen speichern?",
      "fr": "Enregistrer les modifications ?",
      "ru": "Сохранить изменения?",
      "ja": "変更を保存しますか？"
    }
  ],
  [
    "不保存",
    {
      "en": "Don't save",
      "zh-TW": "不儲存",
      "es": "No guardar",
      "pt": "Não salvar",
      "de": "Nicht speichern",
      "fr": "Ne pas enregistrer",
      "ru": "Не сохранять",
      "ja": "保存しない"
    }
  ],
  [
    "未打开文件",
    {
      "en": "No file open",
      "zh-TW": "未開啟檔案",
      "es": "Ningún archivo abierto",
      "pt": "Nenhum arquivo aberto",
      "de": "Keine Datei geöffnet",
      "fr": "Aucun fichier ouvert",
      "ru": "Нет открытого файла",
      "ja": "ファイル未選択"
    }
  ],
  [
    "磁盘同步",
    {
      "en": "Saved",
      "zh-TW": "已儲存",
      "es": "Guardado",
      "pt": "Salvo",
      "de": "Gespeichert",
      "fr": "Enregistré",
      "ru": "Сохранено",
      "ja": "保存済み"
    }
  ],
  [
    "载具工作区",
    {
      "en": "Vehicle workspace",
      "zh-TW": "載具工作區",
      "es": "Espacio de vehículos",
      "pt": "Espaço de veículos",
      "de": "Fahrzeug-Arbeitsbereich",
      "fr": "Espace des véhicules",
      "ru": "Рабочая область техники",
      "ja": "車両ワークスペース"
    }
  ],
  [
    "打开文件夹",
    {
      "en": "Open folder",
      "zh-TW": "開啟資料夾",
      "es": "Abrir carpeta",
      "pt": "Abrir pasta",
      "de": "Ordner öffnen",
      "fr": "Ouvrir un dossier",
      "ru": "Открыть папку",
      "ja": "フォルダーを開く"
    }
  ],
  [
    "尚未选择工作区",
    {
      "en": "No workspace selected",
      "zh-TW": "尚未選擇工作區",
      "es": "Sin espacio de trabajo",
      "pt": "Nenhum espaço selecionado",
      "de": "Kein Arbeitsbereich gewählt",
      "fr": "Aucun espace sélectionné",
      "ru": "Рабочая область не выбрана",
      "ja": "ワークスペース未選択"
    }
  ],
  [
    "场景对象",
    {
      "en": "Scene objects",
      "zh-TW": "場景物件",
      "es": "Objetos de escena",
      "pt": "Objetos da cena",
      "de": "Szenenobjekte",
      "fr": "Objets de scène",
      "ru": "Объекты сцены",
      "ja": "シーンオブジェクト"
    }
  ],
  [
    "属性编辑",
    {
      "en": "Properties",
      "zh-TW": "屬性編輯",
      "es": "Propiedades",
      "pt": "Propriedades",
      "de": "Eigenschaften",
      "fr": "Propriétés",
      "ru": "Свойства",
      "ja": "プロパティ"
    }
  ],
  [
    "基础 / 碰撞",
    {
      "en": "Base / collision",
      "zh-TW": "基礎 / 碰撞",
      "es": "Base / colisión",
      "pt": "Base / colisão",
      "de": "Basis / Kollision",
      "fr": "Base / collision",
      "ru": "Основа / столкновения",
      "ja": "基本 / 衝突"
    }
  ],
  [
    "物理 / 碰撞",
    {
      "en": "Physics / collision",
      "zh-TW": "物理 / 碰撞",
      "es": "Física / colisión",
      "pt": "Física / colisão",
      "de": "Physik / Kollision",
      "fr": "Physique / collision",
      "ru": "Физика / столкновения",
      "ja": "物理 / 衝突"
    }
  ],
  [
    "物理修正",
    {
      "en": "Physics modifier",
      "zh-TW": "物理修正",
      "es": "Modificador físico",
      "pt": "Modificador físico",
      "de": "Physikmodifikator",
      "fr": "Modificateur physique",
      "ru": "Модификатор физики",
      "ja": "物理補正"
    }
  ],
  [
    "操控",
    {
      "en": "Controls",
      "zh-TW": "操控",
      "es": "Controles",
      "pt": "Controles",
      "de": "Steuerung",
      "fr": "Contrôles",
      "ru": "Управление",
      "ja": "操作"
    }
  ],
  [
    "轮组",
    {
      "en": "Wheels",
      "zh-TW": "輪組",
      "es": "Ruedas",
      "pt": "Rodas",
      "de": "Räder",
      "fr": "Roues",
      "ru": "Колёса",
      "ja": "車輪"
    }
  ],
  [
    "炮塔与武器",
    {
      "en": "Turrets and weapons",
      "zh-TW": "砲塔與武器",
      "es": "Torretas y armas",
      "pt": "Torres e armas",
      "de": "Türme und Waffen",
      "fr": "Tourelles et armes",
      "ru": "Башни и оружие",
      "ja": "砲塔と武器"
    }
  ],
  [
    "外观模型",
    {
      "en": "Visual models",
      "zh-TW": "外觀模型",
      "es": "Modelos visuales",
      "pt": "Modelos visuais",
      "de": "Sichtbare Modelle",
      "fr": "Modèles visuels",
      "ru": "Визуальные модели",
      "ja": "外観モデル"
    }
  ],
  [
    "乘员位置",
    {
      "en": "Crew positions",
      "zh-TW": "乘員位置",
      "es": "Posiciones de tripulación",
      "pt": "Posições da tripulação",
      "de": "Besatzungspositionen",
      "fr": "Positions de l’équipage",
      "ru": "Позиции экипажа",
      "ja": "乗員位置"
    }
  ],
  [
    "其它对象",
    {
      "en": "Other objects",
      "zh-TW": "其他物件",
      "es": "Otros objetos",
      "pt": "Outros objetos",
      "de": "Weitere Objekte",
      "fr": "Autres objets",
      "ru": "Прочие объекты",
      "ja": "その他のオブジェクト"
    }
  ],
  [
    "炮塔",
    {
      "en": "Turret",
      "zh-TW": "砲塔",
      "es": "Torreta",
      "pt": "Torre",
      "de": "Turm",
      "fr": "Tourelle",
      "ru": "Башня",
      "ja": "砲塔"
    }
  ],
  [
    "外观",
    {
      "en": "Visual",
      "zh-TW": "外觀",
      "es": "Aspecto",
      "pt": "Aparência",
      "de": "Darstellung",
      "fr": "Apparence",
      "ru": "Внешний вид",
      "ja": "外観"
    }
  ],
  [
    "乘员",
    {
      "en": "Crew",
      "zh-TW": "乘員",
      "es": "Tripulación",
      "pt": "Tripulação",
      "de": "Besatzung",
      "fr": "Équipage",
      "ru": "Экипаж",
      "ja": "乗員"
    }
  ],
  [
    "基础",
    {
      "en": "Base",
      "zh-TW": "基礎",
      "es": "Base",
      "pt": "Base",
      "de": "Basis",
      "fr": "Base",
      "ru": "Основа",
      "ja": "基本"
    }
  ],
  [
    "无模型",
    {
      "en": "No model",
      "zh-TW": "無模型",
      "es": "Sin modelo",
      "pt": "Sem modelo",
      "de": "Kein Modell",
      "fr": "Aucun modèle",
      "ru": "Нет модели",
      "ja": "モデルなし"
    }
  ],
  [
    "无武器",
    {
      "en": "No weapon",
      "zh-TW": "無武器",
      "es": "Sin arma",
      "pt": "Sem arma",
      "de": "Keine Waffe",
      "fr": "Aucune arme",
      "ru": "Нет оружия",
      "ja": "武器なし"
    }
  ],
  [
    "外观框",
    {
      "en": "Visual bounds",
      "zh-TW": "外觀框",
      "es": "Límites visuales",
      "pt": "Limites visuais",
      "de": "Modellgrenzen",
      "fr": "Limites visuelles",
      "ru": "Границы модели",
      "ja": "外観範囲"
    }
  ],
  [
    "碰撞框",
    {
      "en": "Collision bounds",
      "zh-TW": "碰撞框",
      "es": "Límites de colisión",
      "pt": "Limites de colisão",
      "de": "Kollisionsgrenzen",
      "fr": "Limites de collision",
      "ru": "Границы столкновений",
      "ja": "衝突範囲"
    }
  ],
  [
    "显示护盾范围",
    {
      "en": "Shield bounds",
      "zh-TW": "顯示護盾範圍",
      "es": "Límites de escudos",
      "pt": "Limites dos escudos",
      "de": "Schildgrenzen",
      "fr": "Limites des boucliers",
      "ru": "Границы щитов",
      "ja": "シールド範囲"
    }
  ],
  [
    "显示乘员位置",
    {
      "en": "Crew positions",
      "zh-TW": "顯示乘員位置",
      "es": "Posiciones de tripulación",
      "pt": "Posições da tripulação",
      "de": "Besatzungspositionen",
      "fr": "Positions de l’équipage",
      "ru": "Позиции экипажа",
      "ja": "乗員位置"
    }
  ],
  [
    "显示乘员进出范围",
    {
      "en": "Crew entrances",
      "zh-TW": "顯示乘員進出範圍",
      "es": "Entradas de tripulación",
      "pt": "Entradas da tripulação",
      "de": "Besatzungseinstiege",
      "fr": "Entrées de l’équipage",
      "ru": "Входы экипажа",
      "ja": "乗員の出入口"
    }
  ],
  [
    "损毁外观",
    {
      "en": "Damaged appearance",
      "zh-TW": "損毀外觀",
      "es": "Aspecto dañado",
      "pt": "Aparência danificada",
      "de": "Beschädigte Darstellung",
      "fr": "Aspect endommagé",
      "ru": "Повреждённый вид",
      "ja": "損傷時の外観"
    }
  ],
  [
    "炮塔旋转预览",
    {
      "en": "Turret rotation preview",
      "zh-TW": "砲塔旋轉預覽",
      "es": "Vista de rotación de torreta",
      "pt": "Prévia de rotação da torre",
      "de": "Turmdrehungsvorschau",
      "fr": "Aperçu de rotation de tourelle",
      "ru": "Просмотр вращения башни",
      "ja": "砲塔回転プレビュー"
    }
  ],
  [
    "归零",
    {
      "en": "Reset to zero",
      "zh-TW": "歸零",
      "es": "Poner a cero",
      "pt": "Zerar",
      "de": "Nullsetzen",
      "fr": "Remettre à zéro",
      "ru": "Обнулить",
      "ja": "ゼロに戻す"
    }
  ],
  [
    "透视",
    {
      "en": "Perspective",
      "zh-TW": "透視",
      "es": "Perspectiva",
      "pt": "Perspectiva",
      "de": "Perspektive",
      "fr": "Perspective",
      "ru": "Перспектива",
      "ja": "透視投影"
    }
  ],
  [
    "顶视",
    {
      "en": "Top view",
      "zh-TW": "頂視",
      "es": "Vista superior",
      "pt": "Vista superior",
      "de": "Draufsicht",
      "fr": "Vue de dessus",
      "ru": "Вид сверху",
      "ja": "上面"
    }
  ],
  [
    "侧视",
    {
      "en": "Side view",
      "zh-TW": "側視",
      "es": "Vista lateral",
      "pt": "Vista lateral",
      "de": "Seitenansicht",
      "fr": "Vue de côté",
      "ru": "Вид сбоку",
      "ja": "側面"
    }
  ],
  [
    "载具根元素",
    {
      "en": "Vehicle root",
      "zh-TW": "載具根元素",
      "es": "Raíz del vehículo",
      "pt": "Raiz do veículo",
      "de": "Fahrzeug-Wurzelelement",
      "fr": "Racine du véhicule",
      "ru": "Корень техники",
      "ja": "車両ルート要素"
    }
  ],
  [
    "加入根属性",
    {
      "en": "Add root attribute",
      "zh-TW": "加入根屬性",
      "es": "Añadir atributo raíz",
      "pt": "Adicionar atributo raiz",
      "de": "Wurzelattribut hinzufügen",
      "fr": "Ajouter un attribut racine",
      "ru": "Добавить корневой атрибут",
      "ja": "ルート属性を追加"
    }
  ],
  [
    "从场景对象中选择一项。",
    {
      "en": "Select a scene object.",
      "zh-TW": "從場景物件中選擇一項。",
      "es": "Selecciona un objeto de escena.",
      "pt": "Selecione um objeto da cena.",
      "de": "Ein Szenenobjekt wählen.",
      "fr": "Sélectionnez un objet de scène.",
      "ru": "Выберите объект сцены.",
      "ja": "シーンのオブジェクトを選択。"
    }
  ],
  [
    "加入新数值类",
    {
      "en": "Add attribute",
      "zh-TW": "加入新數值類",
      "es": "Añadir atributo",
      "pt": "Adicionar atributo",
      "de": "Attribut hinzufügen",
      "fr": "Ajouter un attribut",
      "ru": "Добавить атрибут",
      "ja": "属性を追加"
    }
  ],
  [
    "选择可加入的数值类",
    {
      "en": "Choose attribute",
      "zh-TW": "選擇可加入的數值類",
      "es": "Elegir atributo",
      "pt": "Escolher atributo",
      "de": "Attribut wählen",
      "fr": "Choisir un attribut",
      "ru": "Выбрать атрибут",
      "ja": "属性を選択"
    }
  ],
  [
    "删除对象",
    {
      "en": "Delete object",
      "zh-TW": "刪除物件",
      "es": "Eliminar objeto",
      "pt": "Excluir objeto",
      "de": "Objekt löschen",
      "fr": "Supprimer l’objet",
      "ru": "Удалить объект",
      "ja": "オブジェクトを削除"
    }
  ],
  [
    "恢复本项",
    {
      "en": "Revert item",
      "zh-TW": "還原本項",
      "es": "Restaurar elemento",
      "pt": "Reverter item",
      "de": "Element zurücksetzen",
      "fr": "Rétablir l’élément",
      "ru": "Восстановить элемент",
      "ja": "この項目を元に戻す"
    }
  ],
  [
    "保存载具",
    {
      "en": "Save vehicle",
      "zh-TW": "儲存載具",
      "es": "Guardar vehículo",
      "pt": "Salvar veículo",
      "de": "Fahrzeug speichern",
      "fr": "Enregistrer le véhicule",
      "ru": "Сохранить технику",
      "ja": "車両を保存"
    }
  ],
  [
    "选择载具文件",
    {
      "en": "Choose vehicle file",
      "zh-TW": "選擇載具檔案",
      "es": "Elegir archivo de vehículo",
      "pt": "Escolher arquivo de veículo",
      "de": "Fahrzeugdatei wählen",
      "fr": "Choisir un fichier de véhicule",
      "ru": "Выбрать файл техники",
      "ja": "車両ファイルを選択"
    }
  ],
  [
    "模型文件夹",
    {
      "en": "Model folder",
      "zh-TW": "模型資料夾",
      "es": "Carpeta de modelos",
      "pt": "Pasta de modelos",
      "de": "Modellordner",
      "fr": "Dossier des modèles",
      "ru": "Папка моделей",
      "ja": "モデルフォルダー"
    }
  ],
  [
    "纹理文件夹",
    {
      "en": "Texture folder",
      "zh-TW": "紋理資料夾",
      "es": "Carpeta de texturas",
      "pt": "Pasta de texturas",
      "de": "Texturordner",
      "fr": "Dossier des textures",
      "ru": "Папка текстур",
      "ja": "テクスチャフォルダー"
    }
  ],
  [
    "武器文件夹",
    {
      "en": "Weapon folder",
      "zh-TW": "武器資料夾",
      "es": "Carpeta de armas",
      "pt": "Pasta de armas",
      "de": "Waffenordner",
      "fr": "Dossier des armes",
      "ru": "Папка оружия",
      "ja": "武器フォルダー"
    }
  ],
  [
    "资源路径预设",
    {
      "en": "Resource presets",
      "zh-TW": "資源路徑預設",
      "es": "Preajustes de recursos",
      "pt": "Predefinições de recursos",
      "de": "Ressourcenvorgaben",
      "fr": "Préréglages des ressources",
      "ru": "Наборы путей ресурсов",
      "ja": "リソースのプリセット"
    }
  ],
  [
    "选择已保存预设",
    {
      "en": "Choose saved preset",
      "zh-TW": "選擇已儲存預設",
      "es": "Elegir preajuste guardado",
      "pt": "Escolher predefinição salva",
      "de": "Gespeicherte Vorgabe wählen",
      "fr": "Choisir un préréglage enregistré",
      "ru": "Выбрать сохранённый набор",
      "ja": "保存済みプリセットを選択"
    }
  ],
  [
    "载入预设",
    {
      "en": "Load preset",
      "zh-TW": "載入預設",
      "es": "Cargar preajuste",
      "pt": "Carregar predefinição",
      "de": "Vorgabe laden",
      "fr": "Charger un préréglage",
      "ru": "Загрузить набор",
      "ja": "プリセットを読み込む"
    }
  ],
  [
    "保存当前路径",
    {
      "en": "Save current paths",
      "zh-TW": "儲存目前路徑",
      "es": "Guardar rutas actuales",
      "pt": "Salvar caminhos atuais",
      "de": "Aktuelle Pfade speichern",
      "fr": "Enregistrer les chemins actuels",
      "ru": "Сохранить текущие пути",
      "ja": "現在のパスを保存"
    }
  ],
  [
    "浏览",
    {
      "en": "Browse",
      "zh-TW": "瀏覽",
      "es": "Examinar",
      "pt": "Procurar",
      "de": "Durchsuchen",
      "fr": "Parcourir",
      "ru": "Обзор",
      "ja": "参照"
    }
  ],
  [
    "更改",
    {
      "en": "Change",
      "zh-TW": "變更",
      "es": "Cambiar",
      "pt": "Alterar",
      "de": "Ändern",
      "fr": "Modifier",
      "ru": "Изменить",
      "ja": "変更"
    }
  ],
  [
    "乘员模型",
    {
      "en": "Crew model",
      "zh-TW": "乘員模型",
      "es": "Modelo de tripulación",
      "pt": "Modelo da tripulação",
      "de": "Besatzungsmodell",
      "fr": "Modèle de l’équipage",
      "ru": "Модель экипажа",
      "ja": "乗員モデル"
    }
  ],
  [
    "动画文件",
    {
      "en": "Animation file",
      "zh-TW": "動畫檔案",
      "es": "Archivo de animación",
      "pt": "Arquivo de animação",
      "de": "Animationsdatei",
      "fr": "Fichier d’animation",
      "ru": "Файл анимации",
      "ja": "アニメーションファイル"
    }
  ],
  [
    "建立索引并载入",
    {
      "en": "Index and load",
      "zh-TW": "建立索引並載入",
      "es": "Indexar y cargar",
      "pt": "Indexar e carregar",
      "de": "Indizieren und laden",
      "fr": "Indexer et charger",
      "ru": "Индексировать и загрузить",
      "ja": "インデックスを作成して読み込む"
    }
  ],
  [
    "没有备份",
    {
      "en": "No backups",
      "zh-TW": "沒有備份",
      "es": "Sin copias de seguridad",
      "pt": "Sem backups",
      "de": "Keine Sicherungen",
      "fr": "Aucune sauvegarde",
      "ru": "Нет резервных копий",
      "ja": "バックアップなし"
    }
  ],
  [
    "文本预览",
    {
      "en": "Text preview",
      "zh-TW": "文字預覽",
      "es": "Vista de texto",
      "pt": "Prévia de texto",
      "de": "Textvorschau",
      "fr": "Aperçu du texte",
      "ru": "Просмотр текста",
      "ja": "テキストプレビュー"
    }
  ],
  [
    "批量删除",
    {
      "en": "Delete selected",
      "zh-TW": "批次刪除",
      "es": "Eliminar seleccionadas",
      "pt": "Excluir selecionadas",
      "de": "Auswahl löschen",
      "fr": "Supprimer la sélection",
      "ru": "Удалить выбранные",
      "ja": "選択項目を削除"
    }
  ],
  [
    "刷新",
    {
      "en": "Refresh",
      "zh-TW": "重新整理",
      "es": "Actualizar",
      "pt": "Atualizar",
      "de": "Aktualisieren",
      "fr": "Actualiser",
      "ru": "Обновить",
      "ja": "更新"
    }
  ],
  [
    "全选",
    {
      "en": "Select all",
      "zh-TW": "全選",
      "es": "Seleccionar todo",
      "pt": "Selecionar tudo",
      "de": "Alle auswählen",
      "fr": "Tout sélectionner",
      "ru": "Выбрать всё",
      "ja": "すべて選択"
    }
  ],
  [
    "源文件缺失",
    {
      "en": "Source file missing",
      "zh-TW": "來源檔案缺失",
      "es": "Falta el archivo de origen",
      "pt": "Arquivo de origem ausente",
      "de": "Quelldatei fehlt",
      "fr": "Fichier source manquant",
      "ru": "Исходный файл отсутствует",
      "ja": "元ファイルなし"
    }
  ],
  [
    "完成",
    {
      "en": "Done",
      "zh-TW": "完成",
      "es": "Listo",
      "pt": "Concluído",
      "de": "Fertig",
      "fr": "Terminé",
      "ru": "Готово",
      "ja": "完了"
    }
  ],
  [
    "全部保存",
    {
      "en": "Save all",
      "zh-TW": "全部儲存",
      "es": "Guardar todo",
      "pt": "Salvar tudo",
      "de": "Alle speichern",
      "fr": "Tout enregistrer",
      "ru": "Сохранить всё",
      "ja": "すべて保存"
    }
  ],
  [
    "全部放弃",
    {
      "en": "Discard all",
      "zh-TW": "全部放棄",
      "es": "Descartar todo",
      "pt": "Descartar tudo",
      "de": "Alle verwerfen",
      "fr": "Tout abandonner",
      "ru": "Отменить всё",
      "ja": "すべて破棄"
    }
  ],
  [
    "放弃",
    {
      "en": "Discard",
      "zh-TW": "放棄",
      "es": "Descartar",
      "pt": "Descartar",
      "de": "Verwerfen",
      "fr": "Abandonner",
      "ru": "Отменить",
      "ja": "破棄"
    }
  ],
  [
    "渲染部件",
    {
      "en": "Render parts",
      "zh-TW": "算繪部件",
      "es": "Piezas de renderizado",
      "pt": "Peças de renderização",
      "de": "Renderteile",
      "fr": "Pièces du rendu",
      "ru": "Детали рендера",
      "ja": "描画パーツ"
    }
  ],
  [
    "临时偏移",
    {
      "en": "Temporary offset",
      "zh-TW": "暫時偏移",
      "es": "Desplazamiento temporal",
      "pt": "Deslocamento temporário",
      "de": "Temporärer Versatz",
      "fr": "Décalage temporaire",
      "ru": "Временное смещение",
      "ja": "一時オフセット"
    }
  ],
  [
    "本项归零",
    {
      "en": "Reset this item",
      "zh-TW": "本項歸零",
      "es": "Restablecer este elemento",
      "pt": "Zerar este item",
      "de": "Dieses Element zurücksetzen",
      "fr": "Réinitialiser cet élément",
      "ru": "Сбросить этот элемент",
      "ja": "この項目をリセット"
    }
  ],
  [
    "全部归零",
    {
      "en": "Reset all",
      "zh-TW": "全部歸零",
      "es": "Restablecer todo",
      "pt": "Zerar tudo",
      "de": "Alles zurücksetzen",
      "fr": "Tout réinitialiser",
      "ru": "Сбросить всё",
      "ja": "すべてリセット"
    }
  ],
  [
    "实时二值渲染",
    {
      "en": "Live binary rendering",
      "zh-TW": "即時二值算繪",
      "es": "Renderizado binario en vivo",
      "pt": "Renderização binária ao vivo",
      "de": "Binäre Live-Vorschau",
      "fr": "Rendu binaire en direct",
      "ru": "Двоичный рендер в реальном времени",
      "ja": "二値レンダリング"
    }
  ],
  [
    "渲染参数",
    {
      "en": "Render settings",
      "zh-TW": "算繪參數",
      "es": "Ajustes de renderizado",
      "pt": "Ajustes de renderização",
      "de": "Rendereinstellungen",
      "fr": "Paramètres du rendu",
      "ru": "Параметры рендера",
      "ja": "レンダリング設定"
    }
  ],
  [
    "参数预设",
    {
      "en": "Settings presets",
      "zh-TW": "參數預設",
      "es": "Preajustes",
      "pt": "Predefinições",
      "de": "Einstellungsvorgaben",
      "fr": "Préréglages",
      "ru": "Наборы параметров",
      "ja": "設定プリセット"
    }
  ],
  [
    "选择预设",
    {
      "en": "Choose preset",
      "zh-TW": "選擇預設",
      "es": "Elegir preajuste",
      "pt": "Escolher predefinição",
      "de": "Vorgabe wählen",
      "fr": "Choisir un préréglage",
      "ru": "Выбрать набор",
      "ja": "プリセットを選択"
    }
  ],
  [
    "读取",
    {
      "en": "Load",
      "zh-TW": "讀取",
      "es": "Cargar",
      "pt": "Carregar",
      "de": "Laden",
      "fr": "Charger",
      "ru": "Загрузить",
      "ja": "読み込む"
    }
  ],
  [
    "相机与姿态",
    {
      "en": "Camera and pose",
      "zh-TW": "相機與姿態",
      "es": "Cámara y postura",
      "pt": "Câmera e pose",
      "de": "Kamera und Haltung",
      "fr": "Caméra et pose",
      "ru": "Камера и поза",
      "ja": "カメラと姿勢"
    }
  ],
  [
    "构图基准",
    {
      "en": "Framing basis",
      "zh-TW": "構圖基準",
      "es": "Base de encuadre",
      "pt": "Base do enquadramento",
      "de": "Bildrahmen",
      "fr": "Base du cadrage",
      "ru": "Основа кадрирования",
      "ja": "構図の基準"
    }
  ],
  [
    "主体（忽略炮管/天线定标）",
    {
      "en": "Body only",
      "zh-TW": "主體（忽略砲管/天線定標）",
      "es": "Solo cuerpo",
      "pt": "Somente corpo",
      "de": "Nur Rumpf",
      "fr": "Corps seul",
      "ru": "Только корпус",
      "ja": "車体のみ"
    }
  ],
  [
    "主体＋炮管（忽略天线）",
    {
      "en": "Body + barrel",
      "zh-TW": "主體＋砲管（忽略天線）",
      "es": "Cuerpo + cañón",
      "pt": "Corpo + cano",
      "de": "Rumpf + Rohr",
      "fr": "Corps + canon",
      "ru": "Корпус + ствол",
      "ja": "車体＋砲身"
    }
  ],
  [
    "完整轮廓",
    {
      "en": "Full silhouette",
      "zh-TW": "完整輪廓",
      "es": "Silueta completa",
      "pt": "Silhueta completa",
      "de": "Vollständige Silhouette",
      "fr": "Silhouette complète",
      "ru": "Полный силуэт",
      "ja": "全体の輪郭"
    }
  ],
  [
    "方位角",
    {
      "en": "Azimuth",
      "zh-TW": "方位角",
      "es": "Acimut",
      "pt": "Azimute",
      "de": "Azimut",
      "fr": "Azimut",
      "ru": "Азимут",
      "ja": "方位角"
    }
  ],
  [
    "俯视角",
    {
      "en": "Elevation",
      "zh-TW": "俯視角",
      "es": "Elevación",
      "pt": "Elevação",
      "de": "Höhenwinkel",
      "fr": "Élévation",
      "ru": "Угол возвышения",
      "ja": "俯角"
    }
  ],
  [
    "透视强度",
    {
      "en": "Perspective strength",
      "zh-TW": "透視強度",
      "es": "Intensidad de perspectiva",
      "pt": "Intensidade da perspectiva",
      "de": "Perspektivstärke",
      "fr": "Intensité de perspective",
      "ru": "Сила перспективы",
      "ja": "透視の強さ"
    }
  ],
  [
    "车体偏航",
    {
      "en": "Body yaw",
      "zh-TW": "車體偏航",
      "es": "Giro del cuerpo",
      "pt": "Rotação do corpo",
      "de": "Rumpfdrehung",
      "fr": "Rotation du corps",
      "ru": "Поворот корпуса",
      "ja": "車体の回転"
    }
  ],
  [
    "主炮塔偏航",
    {
      "en": "Main turret yaw",
      "zh-TW": "主砲塔偏航",
      "es": "Giro de torreta principal",
      "pt": "Rotação da torre principal",
      "de": "Hauptturmdrehung",
      "fr": "Rotation de la tourelle principale",
      "ru": "Поворот основной башни",
      "ja": "主砲塔の回転"
    }
  ],
  [
    "留白",
    {
      "en": "Padding",
      "zh-TW": "留白",
      "es": "Margen",
      "pt": "Margem",
      "de": "Randabstand",
      "fr": "Marge",
      "ru": "Отступ",
      "ja": "余白"
    }
  ],
  [
    "光照与阈值",
    {
      "en": "Lighting and threshold",
      "zh-TW": "光照與閾值",
      "es": "Iluminación y umbral",
      "pt": "Iluminação e limiar",
      "de": "Licht und Schwellenwert",
      "fr": "Éclairage et seuil",
      "ru": "Свет и порог",
      "ja": "照明としきい値"
    }
  ],
  [
    "光源方位",
    {
      "en": "Light azimuth",
      "zh-TW": "光源方位",
      "es": "Acimut de luz",
      "pt": "Azimute da luz",
      "de": "Lichtazimut",
      "fr": "Azimut de la lumière",
      "ru": "Азимут света",
      "ja": "光源の方位"
    }
  ],
  [
    "光源高度",
    {
      "en": "Light elevation",
      "zh-TW": "光源高度",
      "es": "Elevación de luz",
      "pt": "Elevação da luz",
      "de": "Lichthöhe",
      "fr": "Élévation de la lumière",
      "ru": "Высота света",
      "ja": "光源の高さ"
    }
  ],
  [
    "环境光",
    {
      "en": "Ambient light",
      "zh-TW": "環境光",
      "es": "Luz ambiental",
      "pt": "Luz ambiente",
      "de": "Umgebungslicht",
      "fr": "Lumière ambiante",
      "ru": "Фоновое освещение",
      "ja": "環境光"
    }
  ],
  [
    "二值阈值",
    {
      "en": "Binary threshold",
      "zh-TW": "二值閾值",
      "es": "Umbral binario",
      "pt": "Limiar binário",
      "de": "Binärer Schwellenwert",
      "fr": "Seuil binaire",
      "ru": "Двоичный порог",
      "ja": "二値化しきい値"
    }
  ],
  [
    "输出",
    {
      "en": "Output",
      "zh-TW": "輸出",
      "es": "Salida",
      "pt": "Saída",
      "de": "Ausgabe",
      "fr": "Sortie",
      "ru": "Вывод",
      "ja": "出力"
    }
  ],
  [
    "背景色",
    {
      "en": "Background color",
      "zh-TW": "背景色",
      "es": "Color de fondo",
      "pt": "Cor de fundo",
      "de": "Hintergrundfarbe",
      "fr": "Couleur de fond",
      "ru": "Цвет фона",
      "ja": "背景色"
    }
  ],
  [
    "导出 PNG",
    {
      "en": "Export PNG",
      "zh-TW": "匯出 PNG",
      "es": "Exportar PNG",
      "pt": "Exportar PNG",
      "de": "PNG exportieren",
      "fr": "Exporter le PNG",
      "ru": "Экспортировать PNG",
      "ja": "PNG を書き出す"
    }
  ],
  [
    "载具刷新点",
    {
      "en": "Vehicle spawn points",
      "zh-TW": "載具重生點",
      "es": "Puntos de aparición de vehículos",
      "pt": "Pontos de geração de veículos",
      "de": "Fahrzeug-Spawnpunkte",
      "fr": "Points d’apparition des véhicules",
      "ru": "Точки появления техники",
      "ja": "車両の出現地点"
    }
  ],
  [
    "文件夹预设",
    {
      "en": "Folder presets",
      "zh-TW": "資料夾預設",
      "es": "Preajustes de carpetas",
      "pt": "Predefinições de pastas",
      "de": "Ordnervorgaben",
      "fr": "Préréglages des dossiers",
      "ru": "Наборы папок",
      "ja": "フォルダープリセット"
    }
  ],
  [
    "预设名称",
    {
      "en": "Preset name",
      "zh-TW": "預設名稱",
      "es": "Nombre del preajuste",
      "pt": "Nome da predefinição",
      "de": "Vorgabenname",
      "fr": "Nom du préréglage",
      "ru": "Имя набора",
      "ja": "プリセット名"
    }
  ],
  [
    "保存为新预设",
    {
      "en": "Save as new preset",
      "zh-TW": "儲存為新預設",
      "es": "Guardar como nuevo preajuste",
      "pt": "Salvar como nova predefinição",
      "de": "Als neue Vorgabe speichern",
      "fr": "Enregistrer un nouveau préréglage",
      "ru": "Сохранить новый набор",
      "ja": "新しいプリセットとして保存"
    }
  ],
  [
    "更新预设",
    {
      "en": "Update preset",
      "zh-TW": "更新預設",
      "es": "Actualizar preajuste",
      "pt": "Atualizar predefinição",
      "de": "Vorgabe aktualisieren",
      "fr": "Actualiser le préréglage",
      "ru": "Обновить набор",
      "ja": "プリセットを更新"
    }
  ],
  [
    "原版 maps 文件夹",
    {
      "en": "Original maps folder",
      "zh-TW": "原版 maps 資料夾",
      "es": "Carpeta maps original",
      "pt": "Pasta maps original",
      "de": "Originaler maps-Ordner",
      "fr": "Dossier maps d’origine",
      "ru": "Папка исходных maps",
      "ja": "元の maps フォルダー"
    }
  ],
  [
    "模组 maps 文件夹",
    {
      "en": "Mod maps folder",
      "zh-TW": "模組 maps 資料夾",
      "es": "Carpeta maps del mod",
      "pt": "Pasta maps do mod",
      "de": "Mod-maps-Ordner",
      "fr": "Dossier maps du mod",
      "ru": "Папка maps мода",
      "ja": "MOD の maps フォルダー"
    }
  ],
  [
    "Vehicle 文件夹",
    {
      "en": "Vehicle folder",
      "zh-TW": "Vehicle 資料夾",
      "es": "Carpeta Vehicle",
      "pt": "Pasta Vehicle",
      "de": "Vehicle-Ordner",
      "fr": "Dossier Vehicle",
      "ru": "Папка Vehicle",
      "ja": "Vehicle フォルダー"
    }
  ],
  [
    "Faction 资源文件夹",
    {
      "en": "Faction resource folder",
      "zh-TW": "Faction 資源資料夾",
      "es": "Carpeta de recursos Faction",
      "pt": "Pasta de recursos Faction",
      "de": "Faction-Ressourcenordner",
      "fr": "Dossier des ressources Faction",
      "ru": "Папка ресурсов Faction",
      "ja": "Faction リソースフォルダー"
    }
  ],
  [
    "地图工作区",
    {
      "en": "Map workspace",
      "zh-TW": "地圖工作區",
      "es": "Espacio de mapas",
      "pt": "Espaço de mapas",
      "de": "Karten-Arbeitsbereich",
      "fr": "Espace des cartes",
      "ru": "Рабочая область карт",
      "ja": "マップワークスペース"
    }
  ],
  [
    "基地范围",
    {
      "en": "Base bounds",
      "zh-TW": "基地範圍",
      "es": "Límites de bases",
      "pt": "Limites das bases",
      "de": "Basisgrenzen",
      "fr": "Limites des bases",
      "ru": "Границы баз",
      "ja": "基地の範囲"
    }
  ],
  [
    "materials 模板",
    {
      "en": "materials templates",
      "zh-TW": "materials 範本",
      "es": "Plantillas materials",
      "pt": "Modelos materials",
      "de": "materials-Vorlagen",
      "fr": "Modèles materials",
      "ru": "Шаблоны materials",
      "ja": "materials テンプレート"
    }
  ],
  [
    "地图图层",
    {
      "en": "Map layers",
      "zh-TW": "地圖圖層",
      "es": "Capas del mapa",
      "pt": "Camadas do mapa",
      "de": "Kartenebenen",
      "fr": "Calques de la carte",
      "ru": "Слои карты",
      "ja": "マップレイヤー"
    }
  ],
  [
    "未定义",
    {
      "en": "Undefined",
      "zh-TW": "未定義",
      "es": "Sin definir",
      "pt": "Indefinido",
      "de": "Nicht definiert",
      "fr": "Non défini",
      "ru": "Не задано",
      "ja": "未定義"
    }
  ],
  [
    "显示全图",
    {
      "en": "Show whole map",
      "zh-TW": "顯示全圖",
      "es": "Mostrar todo el mapa",
      "pt": "Mostrar mapa inteiro",
      "de": "Gesamte Karte anzeigen",
      "fr": "Afficher toute la carte",
      "ru": "Показать всю карту",
      "ja": "マップ全体を表示"
    }
  ],
  [
    "未选中刷新点",
    {
      "en": "No spawn selected",
      "zh-TW": "未選擇重生點",
      "es": "Ningún punto seleccionado",
      "pt": "Nenhum ponto selecionado",
      "de": "Kein Spawnpunkt gewählt",
      "fr": "Aucun point sélectionné",
      "ru": "Точка не выбрана",
      "ja": "出現地点未選択"
    }
  ],
  [
    "引用方式",
    {
      "en": "Reference type",
      "zh-TW": "引用方式",
      "es": "Tipo de referencia",
      "pt": "Tipo de referência",
      "de": "Referenztyp",
      "fr": "Type de référence",
      "ru": "Тип ссылки",
      "ja": "参照方式"
    }
  ],
  [
    "固定 key",
    {
      "en": "Fixed key",
      "zh-TW": "固定 key",
      "es": "Key fija",
      "pt": "Key fixa",
      "de": "Fester key",
      "fr": "Key fixe",
      "ru": "Фиксированный key",
      "ja": "固定 key"
    }
  ],
  [
    "阵营 tag",
    {
      "en": "Faction tag",
      "zh-TW": "陣營 tag",
      "es": "Tag de facción",
      "pt": "Tag da facção",
      "de": "Fraktions-tag",
      "fr": "Tag de faction",
      "ru": "Tag фракции",
      "ja": "陣営 tag"
    }
  ],
  [
    "方向",
    {
      "en": "Direction",
      "zh-TW": "方向",
      "es": "Dirección",
      "pt": "Direção",
      "de": "Richtung",
      "fr": "Direction",
      "ru": "Направление",
      "ja": "方向"
    }
  ],
  [
    "阵营解析结果",
    {
      "en": "Faction matches",
      "zh-TW": "陣營解析結果",
      "es": "Coincidencias de facción",
      "pt": "Correspondências de facção",
      "de": "Fraktionszuordnungen",
      "fr": "Correspondances des factions",
      "ru": "Соответствия фракций",
      "ja": "陣営の解析結果"
    }
  ],
  [
    "没有候选载具",
    {
      "en": "No matching vehicles",
      "zh-TW": "沒有候選載具",
      "es": "Sin vehículos coincidentes",
      "pt": "Sem veículos correspondentes",
      "de": "Keine passenden Fahrzeuge",
      "fr": "Aucun véhicule correspondant",
      "ru": "Нет подходящей техники",
      "ja": "該当する車両なし"
    }
  ],
  [
    "需要处理",
    {
      "en": "Needs attention",
      "zh-TW": "需要處理",
      "es": "Requiere atención",
      "pt": "Requer atenção",
      "de": "Zu bearbeiten",
      "fr": "À traiter",
      "ru": "Требует внимания",
      "ja": "要確認"
    }
  ],
  [
    "复制刷新点",
    {
      "en": "Duplicate spawn",
      "zh-TW": "複製重生點",
      "es": "Duplicar punto",
      "pt": "Duplicar ponto",
      "de": "Spawnpunkt duplizieren",
      "fr": "Dupliquer le point",
      "ru": "Дублировать точку",
      "ja": "出現地点を複製"
    }
  ],
  [
    "载入诊断",
    {
      "en": "Load diagnostics",
      "zh-TW": "載入診斷",
      "es": "Diagnóstico de carga",
      "pt": "Diagnóstico de carregamento",
      "de": "Ladediagnose",
      "fr": "Diagnostic du chargement",
      "ru": "Диагностика загрузки",
      "ja": "読み込み診断"
    }
  ],
  [
    "保存时写入",
    {
      "en": "Save to",
      "zh-TW": "儲存時寫入",
      "es": "Guardar en",
      "pt": "Salvar em",
      "de": "Speichern unter",
      "fr": "Enregistrer dans",
      "ru": "Сохранить в",
      "ja": "保存先"
    }
  ],
  [
    "地图对象模式",
    {
      "en": "Map object mode",
      "zh-TW": "地圖物件模式",
      "es": "Modo de objetos de mapa",
      "pt": "Modo de objetos do mapa",
      "de": "Kartenobjektmodus",
      "fr": "Mode des objets de carte",
      "ru": "Режим объектов карты",
      "ja": "マップオブジェクトモード"
    }
  ],
  [
    "基础只读",
    {
      "en": "Inherited, read-only",
      "zh-TW": "基礎唯讀",
      "es": "Heredado, solo lectura",
      "pt": "Herdado, somente leitura",
      "de": "Geerbt, schreibgeschützt",
      "fr": "Hérité, lecture seule",
      "ru": "Унаследовано, только чтение",
      "ja": "継承、読み取り専用"
    }
  ],
  [
    "根属性名，如 file",
    {
      "en": "Root attribute, e.g. file",
      "zh-TW": "根屬性名稱，如 file",
      "es": "Atributo raíz, p. ej. file",
      "pt": "Atributo raiz, ex. file",
      "de": "Wurzelattribut, z. B. file",
      "fr": "Attribut racine, ex. file",
      "ru": "Корневой атрибут, например file",
      "ja": "ルート属性、例：file"
    }
  ],
  [
    "清空",
    {
      "en": "Clear",
      "zh-TW": "清空",
      "es": "Vaciar",
      "pt": "Limpar",
      "de": "Leeren",
      "fr": "Vider",
      "ru": "Очистить",
      "ja": "クリア"
    }
  ],
  [
    "此文件夹为空",
    {
      "en": "This folder is empty",
      "zh-TW": "此資料夾為空",
      "es": "La carpeta está vacía",
      "pt": "A pasta está vazia",
      "de": "Dieser Ordner ist leer",
      "fr": "Ce dossier est vide",
      "ru": "Папка пуста",
      "ja": "このフォルダーは空です"
    }
  ],
  [
    "未打开载具",
    {
      "en": "No vehicle open",
      "zh-TW": "未開啟載具",
      "es": "Ningún vehículo abierto",
      "pt": "Nenhum veículo aberto",
      "de": "Kein Fahrzeug geöffnet",
      "fr": "Aucun véhicule ouvert",
      "ru": "Техника не открыта",
      "ja": "車両未選択"
    }
  ],
  [
    "同目录自动匹配",
    {
      "en": "Matched in same folder",
      "zh-TW": "同目錄自動匹配",
      "es": "Coincidencia en la misma carpeta",
      "pt": "Encontrado na mesma pasta",
      "de": "Im selben Ordner gefunden",
      "fr": "Trouvé dans le même dossier",
      "ru": "Найдено в той же папке",
      "ja": "同じフォルダーで自動検出"
    }
  ],
  [
    "手动指定",
    {
      "en": "Manually selected",
      "zh-TW": "手動指定",
      "es": "Seleccionado manualmente",
      "pt": "Selecionado manualmente",
      "de": "Manuell gewählt",
      "fr": "Sélectionné manuellement",
      "ru": "Выбрано вручную",
      "ja": "手動指定"
    }
  ],
  [
    "打开基础",
    {
      "en": "Open base",
      "zh-TW": "開啟基礎",
      "es": "Abrir base",
      "pt": "Abrir base",
      "de": "Basis öffnen",
      "fr": "Ouvrir la base",
      "ru": "Открыть основу",
      "ja": "基本ファイルを開く"
    }
  ],
  [
    "手动选择",
    {
      "en": "Select manually",
      "zh-TW": "手動選擇",
      "es": "Seleccionar manualmente",
      "pt": "Selecionar manualmente",
      "de": "Manuell wählen",
      "fr": "Sélectionner manuellement",
      "ru": "Выбрать вручную",
      "ja": "手動で選択"
    }
  ],
  [
    "自动匹配",
    {
      "en": "Auto-match",
      "zh-TW": "自動匹配",
      "es": "Detectar automáticamente",
      "pt": "Detectar automaticamente",
      "de": "Automatisch zuordnen",
      "fr": "Détection automatique",
      "ru": "Автоматический поиск",
      "ja": "自動検出"
    }
  ],
  [
    "选择对象类型",
    {
      "en": "Choose object type",
      "zh-TW": "選擇物件類型",
      "es": "Elegir tipo de objeto",
      "pt": "Escolher tipo de objeto",
      "de": "Objekttyp wählen",
      "fr": "Choisir le type d’objet",
      "ru": "Выбрать тип объекта",
      "ja": "オブジェクトの種類を選択"
    }
  ],
  [
    "增加空对象",
    {
      "en": "Add empty object",
      "zh-TW": "新增空物件",
      "es": "Añadir objeto vacío",
      "pt": "Adicionar objeto vazio",
      "de": "Leeres Objekt hinzufügen",
      "fr": "Ajouter un objet vide",
      "ru": "Добавить пустой объект",
      "ja": "空のオブジェクトを追加"
    }
  ],
  [
    "请先打开载具工作区。",
    {
      "en": "Open a vehicle workspace first.",
      "zh-TW": "請先開啟載具工作區。",
      "es": "Abre primero un espacio de vehículos.",
      "pt": "Abra primeiro um espaço de veículos.",
      "de": "Zuerst einen Fahrzeug-Arbeitsbereich öffnen.",
      "fr": "Ouvrez d’abord un espace de véhicules.",
      "ru": "Сначала откройте рабочую область техники.",
      "ja": "先に車両ワークスペースを開いてください。"
    }
  ],
  [
    "旋转中点",
    {
      "en": "Rotation pivot",
      "zh-TW": "旋轉中點",
      "es": "Pivote de rotación",
      "pt": "Pivô de rotação",
      "de": "Drehpunkt",
      "fr": "Pivot de rotation",
      "ru": "Центр вращения",
      "ja": "回転中心"
    }
  ],
  [
    "进入位置",
    {
      "en": "Entry position",
      "zh-TW": "進入位置",
      "es": "Posición de entrada",
      "pt": "Posição de entrada",
      "de": "Einstiegsposition",
      "fr": "Position d’entrée",
      "ru": "Позиция входа",
      "ja": "乗車位置"
    }
  ],
  [
    "离开位置",
    {
      "en": "Exit position",
      "zh-TW": "離開位置",
      "es": "Posición de salida",
      "pt": "Posição de saída",
      "de": "Ausstiegsposition",
      "fr": "Position de sortie",
      "ru": "Позиция выхода",
      "ja": "降車位置"
    }
  ],
  [
    "未引用武器",
    {
      "en": "No weapon reference",
      "zh-TW": "未引用武器",
      "es": "Sin referencia de arma",
      "pt": "Sem referência de arma",
      "de": "Keine Waffenreferenz",
      "fr": "Aucune référence d’arme",
      "ru": "Нет ссылки на оружие",
      "ja": "武器の参照なし"
    }
  ],
  [
    "增加 shield",
    {
      "en": "Add shield",
      "zh-TW": "新增 shield",
      "es": "Añadir shield",
      "pt": "Adicionar shield",
      "de": "Shield hinzufügen",
      "fr": "Ajouter un shield",
      "ru": "Добавить shield",
      "ja": "shield を追加"
    }
  ],
  [
    "保存武器护盾",
    {
      "en": "Save weapon shields",
      "zh-TW": "儲存武器護盾",
      "es": "Guardar escudos del arma",
      "pt": "Salvar escudos da arma",
      "de": "Waffenschilde speichern",
      "fr": "Enregistrer les boucliers de l’arme",
      "ru": "Сохранить щиты оружия",
      "ja": "武器のシールドを保存"
    }
  ],
  [
    "删除此 shield",
    {
      "en": "Delete this shield",
      "zh-TW": "刪除此 shield",
      "es": "Eliminar este shield",
      "pt": "Excluir este shield",
      "de": "Dieses shield löschen",
      "fr": "Supprimer ce shield",
      "ru": "Удалить этот shield",
      "ja": "この shield を削除"
    }
  ],
  [
    "此武器没有 shield，可在下方增加。",
    {
      "en": "No shields. Add one below.",
      "zh-TW": "此武器沒有 shield，可在下方新增。",
      "es": "Sin escudos. Añade uno debajo.",
      "pt": "Sem escudos. Adicione abaixo.",
      "de": "Keine Schilde. Unten hinzufügen.",
      "fr": "Aucun bouclier. Ajoutez-en un ci-dessous.",
      "ru": "Нет щитов. Добавьте ниже.",
      "ja": "シールドなし。下から追加できます。"
    }
  ],
  [
    "指定单文件覆盖",
    {
      "en": "Override resource file",
      "zh-TW": "指定單檔覆蓋",
      "es": "Sustituir archivo de recurso",
      "pt": "Substituir arquivo de recurso",
      "de": "Ressourcendatei ersetzen",
      "fr": "Remplacer un fichier de ressource",
      "ru": "Заменить файл ресурса",
      "ja": "リソースファイルを差し替え"
    }
  ],
  [
    "先从顶部打开一个 `.vehicle` 文件。",
    {
      "en": "Open a file from the File menu.",
      "zh-TW": "先從檔案選單開啟一個檔案。",
      "es": "Abre un archivo desde Archivo.",
      "pt": "Abra um arquivo no menu Arquivo.",
      "de": "Eine Datei im Dateimenü öffnen.",
      "fr": "Ouvrez un fichier dans le menu Fichier.",
      "ru": "Откройте файл через меню «Файл».",
      "ja": "ファイルメニューから開いてください。"
    }
  ],
  [
    "选择包含各地图子目录的 maps 文件夹。",
    {
      "en": "Choose the maps folder.",
      "zh-TW": "選擇 maps 資料夾。",
      "es": "Elige la carpeta maps.",
      "pt": "Escolha a pasta maps.",
      "de": "Den maps-Ordner wählen.",
      "fr": "Choisissez le dossier maps.",
      "ru": "Выберите папку maps.",
      "ja": "maps フォルダーを選択してください。"
    }
  ],
  [
    "从左侧地图工作区点击一张地图即可载入。",
    {
      "en": "Select a map in the workspace.",
      "zh-TW": "從左側工作區選擇地圖。",
      "es": "Selecciona un mapa en el espacio de trabajo.",
      "pt": "Selecione um mapa no espaço de trabalho.",
      "de": "Eine Karte im Arbeitsbereich wählen.",
      "fr": "Sélectionnez une carte dans l’espace de travail.",
      "ru": "Выберите карту в рабочей области.",
      "ja": "ワークスペースからマップを選択してください。"
    }
  ],
  [
    "在地图或左侧列表中选择刷新点。",
    {
      "en": "Select a spawn on the map or in the list.",
      "zh-TW": "在地圖或左側清單選擇重生點。",
      "es": "Selecciona un punto en el mapa o la lista.",
      "pt": "Selecione um ponto no mapa ou lista.",
      "de": "Spawnpunkt auf der Karte oder in der Liste wählen.",
      "fr": "Sélectionnez un point sur la carte ou dans la liste.",
      "ru": "Выберите точку на карте или в списке.",
      "ja": "マップまたは一覧から出現地点を選択してください。"
    }
  ],
  [
    "搜索 key、tag、图层…",
    {
      "en": "Search key, tag, layer…",
      "zh-TW": "搜尋 key、tag、圖層…",
      "es": "Buscar key, tag, capa…",
      "pt": "Buscar key, tag, camada…",
      "de": "Key, tag, Ebene suchen…",
      "fr": "Rechercher key, tag, calque…",
      "ru": "Поиск key, tag, слоя…",
      "ja": "key、tag、レイヤーを検索…"
    }
  ],
  [
    "新预设名称；同名时覆盖更新",
    {
      "en": "New preset name; same name replaces",
      "zh-TW": "新預設名稱；同名時覆蓋更新",
      "es": "Nombre; reemplaza si ya existe",
      "pt": "Nome; substitui se já existir",
      "de": "Name; ersetzt gleichnamige Vorgabe",
      "fr": "Nom ; remplace le même nom",
      "ru": "Имя; заменяет одноимённый набор",
      "ja": "プリセット名。同名を上書き"
    }
  ],
  [
    "预设名称；同名覆盖",
    {
      "en": "Preset name; same name replaces",
      "zh-TW": "預設名稱；同名覆蓋",
      "es": "Nombre; reemplaza si ya existe",
      "pt": "Nome; substitui se já existir",
      "de": "Name; ersetzt gleichnamige Vorgabe",
      "fr": "Nom ; remplace le même nom",
      "ru": "Имя; заменяет одноимённый набор",
      "ja": "プリセット名。同名を上書き"
    }
  ],
  [
    "可选；主来源未找到时检索",
    {
      "en": "Optional fallback folder",
      "zh-TW": "可選；主來源未找到時檢索",
      "es": "Carpeta alternativa opcional",
      "pt": "Pasta alternativa opcional",
      "de": "Optionaler Ersatzordner",
      "fr": "Dossier de secours facultatif",
      "ru": "Дополнительная папка поиска",
      "ja": "任意の補助フォルダー"
    }
  ],
  [
    "删除此来源",
    {
      "en": "Remove this source",
      "zh-TW": "刪除此來源",
      "es": "Eliminar esta fuente",
      "pt": "Remover esta fonte",
      "de": "Diese Quelle entfernen",
      "fr": "Supprimer cette source",
      "ru": "Удалить этот источник",
      "ja": "この参照元を削除"
    }
  ],
  [
    "增加次要来源",
    {
      "en": "Add fallback source",
      "zh-TW": "新增次要來源",
      "es": "Añadir fuente alternativa",
      "pt": "Adicionar fonte alternativa",
      "de": "Zusätzliche Quelle hinzufügen",
      "fr": "Ajouter une source de secours",
      "ru": "Добавить запасной источник",
      "ja": "補助参照元を追加"
    }
  ],
  [
    "等待载具与资源",
    {
      "en": "Waiting for vehicle and resources",
      "zh-TW": "等待載具與資源",
      "es": "Esperando vehículo y recursos",
      "pt": "Aguardando veículo e recursos",
      "de": "Warten auf Fahrzeug und Ressourcen",
      "fr": "En attente du véhicule et des ressources",
      "ru": "Ожидание техники и ресурсов",
      "ja": "車両とリソースを待機中"
    }
  ],
  [
    "请选择 .vehicle 文件",
    {
      "en": "Choose a file",
      "zh-TW": "請選擇檔案",
      "es": "Elige un archivo",
      "pt": "Escolha um arquivo",
      "de": "Datei wählen",
      "fr": "Choisissez un fichier",
      "ru": "Выберите файл",
      "ja": "ファイルを選択してください"
    }
  ],
  [
    "请选择地图",
    {
      "en": "Choose a map",
      "zh-TW": "請選擇地圖",
      "es": "Elige un mapa",
      "pt": "Escolha um mapa",
      "de": "Karte wählen",
      "fr": "Choisissez une carte",
      "ru": "Выберите карту",
      "ja": "マップを選択してください"
    }
  ],
  [
    "有未保存的修改。",
    {
      "en": "has unsaved changes.",
      "zh-TW": "有未儲存的修改。",
      "es": "tiene cambios sin guardar.",
      "pt": "tem alterações não salvas.",
      "de": "hat ungespeicherte Änderungen.",
      "fr": "contient des modifications non enregistrées.",
      "ru": "содержит несохранённые изменения.",
      "ja": "に未保存の変更があります。"
    }
  ],
  [
    "未保存 · 关闭",
    {
      "en": "Unsaved · Close",
      "zh-TW": "未儲存 · 關閉",
      "es": "Sin guardar · Cerrar",
      "pt": "Não salvo · Fechar",
      "de": "Ungespeichert · Schließen",
      "fr": "Non enregistré · Fermer",
      "ru": "Не сохранено · Закрыть",
      "ja": "未保存 · 閉じる"
    }
  ],
  [
    "有未保存修改，仍要退出吗？",
    {
      "en": "Unsaved changes. Exit anyway?",
      "zh-TW": "有未儲存修改，仍要退出嗎？",
      "es": "Hay cambios sin guardar. ¿Salir?",
      "pt": "Alterações não salvas. Sair?",
      "de": "Ungespeicherte Änderungen. Trotzdem beenden?",
      "fr": "Modifications non enregistrées. Quitter ?",
      "ru": "Есть несохранённые изменения. Выйти?",
      "ja": "未保存の変更があります。終了しますか？"
    }
  ],
  [
    "此载具的未保存修改将丢失，仍要重新载入吗？",
    {
      "en": "Discard unsaved changes and reload?",
      "zh-TW": "未儲存變更將遺失，仍要重新載入嗎？",
      "es": "¿Descartar cambios y recargar?",
      "pt": "Descartar alterações e recarregar?",
      "de": "Änderungen verwerfen und neu laden?",
      "fr": "Abandonner les modifications et recharger ?",
      "ru": "Отменить изменения и перезагрузить?",
      "ja": "未保存の変更を破棄して再読み込みしますか？"
    }
  ],
  [
    "该文件已被其它程序修改，仍要用当前内容覆盖吗？",
    {
      "en": "File changed on disk. Overwrite it?",
      "zh-TW": "檔案已被其他程式修改，仍要覆蓋嗎？",
      "es": "El archivo cambió. ¿Sobrescribir?",
      "pt": "Arquivo alterado. Sobrescrever?",
      "de": "Datei extern geändert. Überschreiben?",
      "fr": "Fichier modifié ailleurs. Remplacer ?",
      "ru": "Файл изменён другим приложением. Перезаписать?",
      "ja": "他のアプリが変更しました。上書きしますか？"
    }
  ],
  [
    "已撤销上一次修改",
    {
      "en": "Change undone",
      "zh-TW": "已復原上次修改",
      "es": "Cambio deshecho",
      "pt": "Alteração desfeita",
      "de": "Änderung rückgängig",
      "fr": "Modification annulée",
      "ru": "Изменение отменено",
      "ja": "変更を元に戻しました"
    }
  ]
]);
