import type { AppLanguage } from './languages';

// Source | Traditional Chinese | Spanish | Portuguese | German | French | Russian | Japanese.
// Keep placeholders intact: filenames, animation names and numeric values are not translated.
const rows = `
RWR 体素编辑器|RWR 體素編輯器|Editor de vóxeles RWR|Editor de voxels RWR|RWR-Voxel-Editor|Éditeur de voxels RWR|Редактор вокселей RWR|RWR ボクセルエディター
RWR 体素编辑器 Next|RWR 體素編輯器 Next|Editor de vóxeles RWR Next|Editor de voxels RWR Next|RWR-Voxel-Editor Next|Éditeur de voxels RWR Next|Редактор вокселей RWR Next|RWR ボクセルエディター Next
文件操作|檔案操作|Acciones de archivo|Ações de arquivo|Dateiaktionen|Actions sur les fichiers|Действия с файлами|ファイル操作
文件|檔案|Archivo|Arquivo|Datei|Fichier|Файл|ファイル
新建空模型|新增空模型|Nuevo modelo vacío|Novo modelo vazio|Neues leeres Modell|Nouveau modèle vide|Новая пустая модель|空のモデルを作成
保存|儲存|Guardar|Salvar|Speichern|Enregistrer|Сохранить|保存
另存为|另存新檔|Guardar como|Salvar como|Speichern unter|Enregistrer sous|Сохранить как|名前を付けて保存
打开模型|開啟模型|Abrir modelo|Abrir modelo|Modell öffnen|Ouvrir un modèle|Открыть модель|モデルを開く
载入动画|載入動畫|Cargar animación|Carregar animação|Animation laden|Charger une animation|Загрузить анимацию|アニメーションを読み込む
正在等待文件选择…|正在等待選擇檔案…|Esperando la selección de archivo…|Aguardando a seleção de arquivo…|Warten auf Dateiauswahl…|En attente du choix du fichier…|Ожидание выбора файла…|ファイルの選択を待っています…
撤销|復原|Deshacer|Desfazer|Rückgängig|Annuler|Отменить|元に戻す
重做|重做|Rehacer|Refazer|Wiederholen|Rétablir|Повторить|やり直す
编辑工具|編輯工具|Herramientas de edición|Ferramentas de edição|Bearbeitungswerkzeuge|Outils d’édition|Инструменты редактирования|編集ツール
选择|選取|Seleccionar|Selecionar|Auswählen|Sélectionner|Выбрать|選択
修改|修改|Modificar|Modificar|Ändern|Modifier|Изменить|変更
修改工具|修改工具|Herramienta de modificación|Ferramenta de modificação|Änderungswerkzeug|Outil de modification|Инструмент изменения|変更ツール
绘色|著色|Pintar|Pintar|Malen|Peindre|Окрашивание|ペイント
取色|取色|Cuentagotas|Conta-gotas|Pipette|Pipette|Пипетка|スポイト
移动|移動|Mover|Mover|Verschieben|Déplacer|Перемещение|移動
框选|框選|Selección rectangular|Seleção retangular|Rechteckauswahl|Sélection rectangulaire|Рамка выделения|矩形選択
框选 · 穿透框选|框選 · 穿透框選|Selección · A través|Seleção · Através|Auswahl · Durchgehend|Sélection · Traversante|Выделение · Сквозное|矩形選択 · 貫通
框选 · 可视框选|框選 · 可視框選|Selección · Visible|Seleção · Visível|Auswahl · Sichtbar|Sélection · Visible|Выделение · Видимое|矩形選択 · 可視
框选模式|框選模式|Modo de selección|Modo de seleção|Auswahlmodus|Mode de sélection|Режим выделения|矩形選択モード
穿透框选|穿透框選|Selección a través|Seleção através|Durchgehende Auswahl|Sélection traversante|Сквозное выделение|貫通選択
可视框选|可視框選|Selección visible|Seleção visível|Sichtbare Auswahl|Sélection visible|Видимое выделение|可視選択
设置|設定|Ajustes|Configurações|Einstellungen|Paramètres|Настройки|設定
黏贴|貼上|Pegar|Colar|Einfügen|Coller|Вставить|貼り付け
默认|預設|Predeterminado|Padrão|Standard|Par défaut|По умолчанию|デフォルト
无人物模型|無人物模型|No hay modelo de personaje|Nenhum modelo de personagem|Kein Charaktermodell|Aucun modèle de personnage|Нет модели персонажа|人物モデルがありません
已退出动画预览|已退出動畫預覽|Vista previa cerrada|Prévia encerrada|Animationsvorschau beendet|Aperçu d’animation fermé|Просмотр анимации закрыт|アニメーションプレビューを終了しました
选择动画|選擇動畫|Elegir animación|Escolher animação|Animation auswählen|Choisir une animation|Выбрать анимацию|アニメーションを選択
展开或收起|展開或收合|Expandir o contraer|Expandir ou recolher|Ein- oder ausklappen|Développer ou réduire|Развернуть или свернуть|展開・折りたたみ
骨骼和动画|骨架與動畫|Esqueleto y animación|Esqueleto e animação|Skelett und Animation|Squelette et animation|Скелет и анимация|ボーンとアニメーション
骨骼|骨架|Esqueleto|Esqueleto|Skelett|Squelette|Скелет|ボーン
动画|動畫|Animación|Animação|Animation|Animation|Анимация|アニメーション
编辑|編輯|Editar|Editar|Bearbeiten|Modifier|Редактировать|編集
旋转|旋轉|Girar|Girar|Drehen|Pivoter|Поворот|回転
人物动画预览|人物動畫預覽|Vista previa del personaje|Prévia de animação do personagem|Charakteranimationsvorschau|Aperçu d’animation du personnage|Просмотр анимации персонажа|人物アニメーションプレビュー
搜索动画|搜尋動畫|Buscar animaciones|Buscar animações|Animationen suchen|Rechercher une animation|Поиск анимаций|アニメーションを検索
搜索人物动画|搜尋人物動畫|Buscar animaciones del personaje|Buscar animações do personagem|Charakteranimationen suchen|Rechercher une animation du personnage|Поиск анимаций персонажа|人物アニメーションを検索
无匹配动画|無符合的動畫|Sin coincidencias|Nenhuma animação encontrada|Keine passende Animation|Aucune animation correspondante|Нет подходящих анимаций|一致するアニメーションがありません
已载入动画|已載入動畫|Animaciones cargadas|Animações carregadas|Geladene Animationen|Animations chargées|Загруженные анимации|読み込み済みのアニメーション
播放|播放|Reproducir|Reproduzir|Abspielen|Lire|Воспроизвести|再生
暂停|暫停|Pausar|Pausar|Pause|Pause|Пауза|一時停止
颜色选择器|色彩選擇器|Selector de color|Seletor de cores|Farbauswahl|Sélecteur de couleur|Выбор цвета|カラーピッカー
尚未载入模型|尚未載入模型|Ningún modelo cargado|Nenhum modelo carregado|Kein Modell geladen|Aucun modèle chargé|Модель не загружена|モデル未読み込み
场景光照|場景光照|Iluminación de escena|Iluminação da cena|Szenenbeleuchtung|Éclairage de la scène|Освещение сцены|シーン照明
标准|標準|Estándar|Padrão|Standard|Standard|Стандартное|標準
颜色校对|色彩校對|Prueba de color|Prova de cores|Farbprüfung|Épreuvage couleur|Проверка цветов|色校正
当前工具|目前工具|Herramienta actual|Ferramenta atual|Aktuelles Werkzeug|Outil actuel|Текущий инструмент|現在のツール
切换编辑工具|切換編輯工具|Cambiar herramienta|Trocar ferramenta|Werkzeug wechseln|Changer d’outil|Сменить инструмент|編集ツールを切り替え
清除|清除|Limpiar|Limpar|Leeren|Effacer|Очистить|クリア
未选择体素|未選取體素|Ningún vóxel seleccionado|Nenhum voxel selecionado|Keine Voxel ausgewählt|Aucun voxel sélectionné|Воксели не выбраны|ボクセル未選択
请先载入带骨骼的模型|請先載入帶骨架的模型|Carga primero un modelo con esqueleto|Carregue primeiro um modelo com esqueleto|Zuerst ein Modell mit Skelett laden|Chargez d’abord un modèle avec squelette|Сначала загрузите модель со скелетом|まずボーン付きモデルを読み込んでください
移动所选体素|移動所選體素|Mover vóxeles seleccionados|Mover voxels selecionados|Ausgewählte Voxel verschieben|Déplacer les voxels sélectionnés|Переместить выбранные воксели|選択ボクセルを移動
旋转所选体素90度|旋轉所選體素90度|Girar los vóxeles 90 grados|Girar os voxels 90 graus|Voxel um 90 Grad drehen|Pivoter les voxels de 90 degrés|Повернуть воксели на 90 градусов|選択ボクセルを90度回転
自定义旋转轴|自訂旋轉軸|Eje de giro personalizado|Eixo de rotação personalizado|Eigene Drehachse|Axe de rotation personnalisé|Своя ось вращения|回転軸を指定
X轴|X軸|Eje X|Eixo X|X-Achse|Axe X|Ось X|X軸
Y轴|Y軸|Eje Y|Eixo Y|Y-Achse|Axe Y|Ось Y|Y軸
Z轴|Z軸|Eje Z|Eixo Z|Z-Achse|Axe Z|Ось Z|Z軸
Y轴正向|Y軸正向|Y positivo|Y positivo|Positive Y-Richtung|Y positif|Положительное Y|Y軸正方向
Y轴负向|Y軸負向|Y negativo|Y negativo|Negative Y-Richtung|Y négatif|Отрицательное Y|Y軸負方向
度|度|grados|graus|Grad|degrés|град.|度
模型块|模型區塊|Bloques de modelo|Blocos de modelo|Modellblöcke|Blocs de modèle|Блоки модели|モデルブロック
复制|複製|Copiar|Copiar|Kopieren|Copier|Копировать|コピー
已复制模型库|已複製模型庫|Biblioteca de modelos copiados|Biblioteca de modelos copiados|Kopierte Modellbibliothek|Bibliothèque de modèles copiés|Библиотека скопированных моделей|コピー済みモデルライブラリ
选择已复制的模型|選擇已複製的模型|Elegir un modelo copiado|Escolher modelo copiado|Kopiertes Modell auswählen|Choisir un modèle copié|Выбрать скопированную модель|コピー済みモデルを選択
暂无已复制模型|尚無已複製模型|No hay modelos copiados|Nenhum modelo copiado|Keine kopierten Modelle|Aucun modèle copié|Нет скопированных моделей|コピー済みモデルがありません
删除|刪除|Eliminar|Excluir|Löschen|Supprimer|Удалить|削除
只能拖入XML模型文件|只能拖入XML模型檔案|Solo se pueden soltar modelos XML.|Só é possível soltar modelos XML.|Nur XML-Modelldateien können abgelegt werden.|Seuls les modèles XML peuvent être déposés.|Можно перетаскивать только модели XML.|ドロップできるのはXMLモデルのみです。
无法读取拖入的模型|無法讀取拖入的模型|No se pudo leer el modelo soltado.|Não foi possível ler o modelo solto.|Das abgelegte Modell konnte nicht gelesen werden.|Impossible de lire le modèle déposé.|Не удалось прочитать перетащенную модель.|ドロップしたモデルを読み込めません。
无法读取启动时传入的模型|無法讀取啟動時傳入的模型|No se pudo leer el modelo inicial.|Não foi possível ler o modelo inicial.|Das Startmodell konnte nicht gelesen werden.|Impossible de lire le modèle au démarrage.|Не удалось прочитать начальную модель.|起動時のモデルを読み込めません。
无法旋转旋转后会与其它体素重叠|無法旋轉：旋轉後會與其他體素重疊。|No se puede girar: se solaparía con otros vóxeles.|Não é possível girar: haveria sobreposição de voxels.|Drehen nicht möglich: Voxel würden sich überlappen.|Rotation impossible : les voxels se chevaucheraient.|Поворот невозможен: воксели будут пересекаться.|回転できません。他のボクセルと重なります。
请输入有效的旋转角度|請輸入有效的旋轉角度。|Introduce un ángulo válido.|Insira um ângulo válido.|Gültigen Drehwinkel eingeben.|Saisissez un angle valide.|Введите допустимый угол.|有効な回転角度を入力してください。
旋转角度不能是0°或360°的整数倍|旋轉角度不能是0°或360°的整數倍。|El ángulo no puede ser 0° ni un múltiplo de 360°.|O ângulo não pode ser 0° nem múltiplo de 360°.|Der Winkel darf nicht 0° oder ein Vielfaches von 360° sein.|L’angle ne peut être 0° ou un multiple de 360°.|Угол не может быть 0° или кратным 360°.|角度は0°または360°の倍数にはできません。
当前模型没有可复制的体素|目前模型沒有可複製的體素。|El modelo no tiene vóxeles para copiar.|O modelo não tem voxels para copiar.|Das Modell enthält keine kopierbaren Voxel.|Le modèle ne contient aucun voxel à copier.|В модели нет вокселей для копирования.|コピーできるボクセルがありません。
无法保存复制模型|無法儲存複製模型。|No se pudo guardar el modelo copiado.|Não foi possível salvar o modelo copiado.|Kopiertes Modell konnte nicht gespeichert werden.|Impossible d’enregistrer le modèle copié.|Не удалось сохранить скопированную модель.|コピーしたモデルを保存できません。
请先载入或创建目标模型|請先載入或建立目標模型。|Carga o crea primero un modelo de destino.|Carregue ou crie primeiro um modelo de destino.|Zuerst ein Zielmodell laden oder erstellen.|Chargez ou créez d’abord un modèle cible.|Сначала загрузите или создайте целевую модель.|まず貼り付け先のモデルを読み込むか作成してください。
复制库中没有可粘贴的模型|複製庫中沒有可貼上的模型。|No hay modelos disponibles para pegar.|Não há modelos disponíveis para colar.|Keine Modelle zum Einfügen verfügbar.|Aucun modèle disponible à coller.|Нет моделей для вставки.|貼り付け可能なモデルがありません。
无法粘贴没有找到不与现有体素重叠的位置|無法貼上：找不到不與現有體素重疊的位置。|No se puede pegar: no hay una posición libre.|Não é possível colar: não há posição livre.|Einfügen nicht möglich: keine freie Position.|Collage impossible : aucune position libre.|Вставка невозможна: нет свободного места.|貼り付けできません。空き位置がありません。
无法粘贴目标位置与现有体素重叠|無法貼上：目標位置與現有體素重疊。|No se puede pegar: el destino está ocupado.|Não é possível colar: o destino está ocupado.|Einfügen nicht möglich: Zielposition ist belegt.|Collage impossible : la cible est occupée.|Вставка невозможна: место занято.|貼り付けできません。移動先が重なっています。
就绪|就緒|Listo|Pronto|Bereit|Prêt|Готово|準備完了
体素|體素|Vóxeles|Voxels|Voxel|Voxels|Воксели|ボクセル
已选|已選|Seleccionados|Selecionados|Ausgewählt|Sélectionnés|Выбрано|選択数
骨骼点|骨架點|Huesos|Ossos|Knochen|Os|Кости|ボーン
未加载|未載入|No cargado|Não carregado|Nicht geladen|Non chargé|Не загружено|未読み込み
有未保存修改|有未儲存修改|Cambios sin guardar|Alterações não salvas|Ungespeicherte Änderungen|Modifications non enregistrées|Несохранённые изменения|未保存の変更あり
已载入|已載入|Cargado|Carregado|Geladen|Chargé|Загружено|読み込み済み
已修改|已修改|Modificado|Modificado|Geändert|Modifié|Изменено|変更済み
已保存|已儲存|Guardado|Salvo|Gespeichert|Enregistré|Сохранено|保存済み
未命名|未命名|Sin título|Sem título|Unbenannt|Sans titre|Без имени|無題
动画工作台|動畫工作台|Área de animación|Área de animação|Animationsbereich|Atelier d’animation|Панель анимации|アニメーションワークスペース
未载入动画|未載入動畫|Ninguna animación cargada|Nenhuma animação carregada|Keine Animation geladen|Aucune animation chargée|Анимация не загружена|アニメーション未読み込み
绑定组|綁定群組|Grupos de enlace|Grupos de vinculação|Bindungsgruppen|Groupes de liaison|Группы привязки|バインドグループ
未绑定体素|未綁定體素|Vóxeles sin enlace|Voxels não vinculados|Ungebundene Voxel|Voxels non liés|Непривязанные воксели|未バインドのボクセル
重新绑定到最近骨骼|重新綁定至最近骨架|Enlazar al hueso más cercano|Vincular ao osso mais próximo|An nächsten Knochen binden|Lier à l’os le plus proche|Привязать к ближайшей кости|最も近いボーンに再バインド
预览|預覽|Vista previa|Prévia|Vorschau|Aperçu|Просмотр|プレビュー
未载入动画文件|未載入動畫檔案|Ningún archivo de animación cargado|Nenhum arquivo de animação carregado|Keine Animationsdatei geladen|Aucun fichier d’animation chargé|Файл анимации не загружен|アニメーションファイル未読み込み
请先载入模型|請先載入模型|Carga primero un modelo|Carregue primeiro um modelo|Zuerst ein Modell laden|Chargez d’abord un modèle|Сначала загрузите модель|まずモデルを読み込んでください
新建|新增|Nuevo|Novo|Neu|Nouveau|Создать|新規
动画名称|動畫名稱|Nombre de animación|Nome da animação|Animationsname|Nom de l’animation|Название анимации|アニメーション名
总时长|總時長|Duración|Duração|Dauer|Durée|Длительность|総時間
速度|速度|Velocidad|Velocidade|Geschwindigkeit|Vitesse|Скорость|速度
速度随机|速度隨機|Variación de velocidad|Variação de velocidade|Geschwindigkeitsstreuung|Variation de vitesse|Разброс скорости|速度のばらつき
循环播放|循環播放|Repetir|Repetir|Wiederholung|Lecture en boucle|Зациклить|ループ再生
关键帧|關鍵影格|Fotogramas clave|Quadros-chave|Schlüsselbilder|Images clés|Ключевые кадры|キーフレーム
没有关键帧|沒有關鍵影格|Sin fotogramas clave|Nenhum quadro-chave|Keine Schlüsselbilder|Aucune image clé|Нет ключевых кадров|キーフレームがありません
＋新增|＋新增|＋ Añadir|＋ Adicionar|＋ Hinzufügen|＋ Ajouter|＋ Добавить|＋ 追加
帧时间（秒）|影格時間（秒）|Tiempo del fotograma (s)|Tempo do quadro (s)|Bildzeit (Sekunden)|Temps de l’image (s)|Время кадра (с)|フレーム時間（秒）
骨骼点位置|骨架點位置|Posición del hueso|Posição do osso|Knochenposition|Position de l’os|Положение кости|ボーン位置
恢复模型位置|還原模型位置|Restaurar posición del modelo|Restaurar posição do modelo|Modellposition wiederherstellen|Restaurer la position du modèle|Восстановить положение модели|モデル位置を復元
导出动画XML|匯出動畫XML|Exportar animación XML|Exportar animação XML|Animation als XML exportieren|Exporter l’animation XML|Экспорт анимации XML|アニメーションXMLを出力
快捷键|快捷鍵|Atajos|Atalhos|Tastenkürzel|Raccourcis|Горячие клавиши|ショートカット
界面语言|介面語言|Idioma de la interfaz|Idioma da interface|Oberflächensprache|Langue de l’interface|Язык интерфейса|表示言語
关于|關於|Acerca de|Sobre|Über|À propos|О программе|情報
主题|主題|Tema|Tema|Design|Thème|Тема|テーマ
深色|深色|Oscuro|Escuro|Dunkel|Sombre|Тёмная|ダーク
浅色|淺色|Claro|Claro|Hell|Clair|Светлая|ライト
字体大小|字體大小|Tamaño de fuente|Tamanho da fonte|Schriftgröße|Taille du texte|Размер шрифта|文字サイズ
主题颜色|主題色彩|Color de acento|Cor de destaque|Akzentfarbe|Couleur d’accent|Цвет акцента|アクセントカラー
界面缩放|介面縮放|Escala de interfaz|Escala da interface|Oberflächenskalierung|Échelle de l’interface|Масштаб интерфейса|UIの拡大率
新建模型|新增模型|Nuevo modelo|Novo modelo|Neues Modell|Nouveau modèle|Новая модель|新規モデル
覆盖保存|覆寫儲存|Sobrescribir|Sobrescrever|Überschreiben|Écraser|Перезаписать|上書き保存
删除体素|刪除體素|Eliminar vóxeles|Excluir voxels|Voxel löschen|Supprimer les voxels|Удалить воксели|ボクセルを削除
选择工具|選取工具|Herramienta de selección|Ferramenta de seleção|Auswahlwerkzeug|Outil de sélection|Инструмент выделения|選択ツール
绘色工具|著色工具|Herramienta de pintura|Ferramenta de pintura|Malwerkzeug|Outil de peinture|Инструмент окрашивания|ペイントツール
视角前进|視角前進|Cámara adelante|Câmera para frente|Kamera vorwärts|Caméra vers l’avant|Камера вперёд|カメラ前進
视角后退|視角後退|Cámara atrás|Câmera para trás|Kamera rückwärts|Caméra vers l’arrière|Камера назад|カメラ後退
视角左移|視角左移|Cámara a la izquierda|Câmera à esquerda|Kamera nach links|Caméra à gauche|Камера влево|カメラ左移動
视角右移|視角右移|Cámara a la derecha|Câmera à direita|Kamera nach rechts|Caméra à droite|Камера вправо|カメラ右移動
新模型已创建|新模型已建立。|Modelo creado.|Modelo criado.|Modell erstellt.|Modèle créé.|Модель создана.|モデルを作成しました。
动画已创建|動畫已建立。|Animación creada.|Animação criada.|Animation erstellt.|Animation créée.|Анимация создана.|アニメーションを作成しました。
访问GitHub仓库|開啟GitHub儲存庫|Abrir repositorio de GitHub|Abrir repositório do GitHub|GitHub-Repository öffnen|Ouvrir le dépôt GitHub|Открыть репозиторий GitHub|GitHubリポジトリを開く
恢复默认|還原預設|Restaurar valores predeterminados|Restaurar padrões|Standard wiederherstellen|Rétablir les valeurs par défaut|Восстановить настройки|デフォルトに戻す
完成|完成|Listo|Concluir|Fertig|Terminé|Готово|完了
确定|確定|Aceptar|OK|OK|OK|ОК|OK
关闭|關閉|Cerrar|Fechar|Schließen|Fermer|Закрыть|閉じる
新建模型前如何处理当前文件|新增模型前如何處理目前檔案？|¿Qué hacer con el archivo actual?|O que fazer com o arquivo atual?|Was soll mit der aktuellen Datei geschehen?|Que faire du fichier actuel ?|Что сделать с текущим файлом?|現在のファイルをどうしますか？
当前模型有未保存修改|目前模型有未儲存修改。|El modelo tiene cambios sin guardar.|O modelo tem alterações não salvas.|Das Modell enthält ungespeicherte Änderungen.|Le modèle contient des modifications non enregistrées.|В модели есть несохранённые изменения.|モデルに未保存の変更があります。
放弃修改|放棄修改|Descartar cambios|Descartar alterações|Änderungen verwerfen|Abandonner les modifications|Отбросить изменения|変更を破棄
取消|取消|Cancelar|Cancelar|Abbrechen|Annuler|Отмена|キャンセル
确认替换当前模型文件|確認取代目前模型檔案|Confirmar reemplazo del modelo|Confirmar substituição do modelo|Modelldatei ersetzen bestätigen|Confirmer le remplacement du modèle|Подтвердить замену модели|モデルファイルの置換を確認
原文件将被当前模型内容替换此操作无法在磁盘上撤销|原檔案將由目前模型取代，此操作無法在磁碟上復原。|El modelo reemplazará el archivo original. No se puede deshacer en disco.|O modelo substituirá o arquivo original. Isso não pode ser desfeito no disco.|Das Modell ersetzt die Originaldatei. Dies lässt sich auf dem Datenträger nicht rückgängig machen.|Le modèle remplacera le fichier original. Cette opération est irréversible sur le disque.|Модель заменит исходный файл. На диске это нельзя отменить.|元のファイルが置換されます。ディスク上の操作は元に戻せません。
我确认要覆盖当前模型文件|我確認要覆寫目前模型檔案|Confirmo que deseo sobrescribir el modelo|Confirmo que quero sobrescrever o modelo|Ich bestätige das Überschreiben der Modelldatei|Je confirme l’écrasement du modèle|Подтверждаю перезапись файла модели|モデルファイルの上書きを確認します
确认删除所选体素|確認刪除所選體素|Confirmar eliminación de vóxeles|Confirmar exclusão de voxels|Löschen der Voxel bestätigen|Confirmer la suppression des voxels|Подтвердить удаление вокселей|選択ボクセルの削除を確認
将删除当前选择的|將刪除目前選取的|Se eliminarán|Serão excluídos|Gelöscht werden|Seront supprimés|Будут удалены|削除するボクセル数：
个体素该操作可通过撤销恢复|個體素。此操作可透過復原恢復。|vóxeles seleccionados. Puedes deshacer esta acción.|voxels selecionados. Você pode desfazer esta ação.|ausgewählte Voxel. Diese Aktion kann rückgängig gemacht werden.|voxels sélectionnés. Cette action peut être annulée.|выбранных вокселей. Действие можно отменить.|個。この操作は元に戻せます。
确认删除|確認刪除|Eliminar|Excluir|Löschen|Supprimer|Удалить|削除
关闭人物预览|關閉人物預覽|Cerrar vista previa del personaje|Fechar prévia do personagem|Charaktervorschau schließen|Fermer l’aperçu du personnage|Закрыть просмотр персонажа|人物プレビューを閉じる
人物模型预览场景|人物模型預覽場景|Escena de vista previa del personaje|Cena de prévia do personagem|Charaktervorschau-Szene|Scène d’aperçu du personnage|Сцена просмотра персонажа|人物プレビューシーン
预览光照|預覽光照|Iluminación de vista previa|Iluminação da prévia|Vorschaubeleuchtung|Éclairage de l’aperçu|Освещение просмотра|プレビュー照明
固定镜头|固定鏡頭|Cámara fija|Câmera fixa|Feste Kamera|Caméra fixe|Неподвижная камера|固定カメラ
动画已复制|動畫已複製。|Animación copiada.|Animação copiada.|Animation kopiert.|Animation copiée.|Анимация скопирована.|アニメーションをコピーしました。
动画已删除|動畫已刪除。|Animación eliminada.|Animação excluída.|Animation gelöscht.|Animation supprimée.|Анимация удалена.|アニメーションを削除しました。
关键帧已复制|關鍵影格已複製。|Fotograma clave copiado.|Quadro-chave copiado.|Schlüsselbild kopiert.|Image clé copiée.|Ключевой кадр скопирован.|キーフレームをコピーしました。
关键帧已新增|關鍵影格已新增。|Fotograma clave añadido.|Quadro-chave adicionado.|Schlüsselbild hinzugefügt.|Image clé ajoutée.|Ключевой кадр добавлен.|キーフレームを追加しました。
关键帧已删除|關鍵影格已刪除。|Fotograma clave eliminado.|Quadro-chave excluído.|Schlüsselbild gelöscht.|Image clé supprimée.|Ключевой кадр удалён.|キーフレームを削除しました。
动画至少需要保留一个关键帧|動畫至少需保留一個關鍵影格。|La animación necesita al menos un fotograma clave.|A animação precisa de pelo menos um quadro-chave.|Eine Animation benötigt mindestens ein Schlüsselbild.|L’animation nécessite au moins une image clé.|Нужен хотя бы один ключевой кадр.|最低1つのキーフレームが必要です。
当前动画有未导出修改。确定放弃并载入其他动画文件吗？|目前動畫有未匯出修改。確定放棄並載入其他動畫檔案嗎？|Hay cambios sin exportar. ¿Descartarlos y cargar otra animación?|Há alterações não exportadas. Descartar e carregar outra animação?|Nicht exportierte Änderungen verwerfen und eine andere Animation laden?|Abandonner les modifications non exportées et charger une autre animation ?|Отбросить неэкспортированные изменения и загрузить другую анимацию?|未出力の変更を破棄して別のアニメーションを読み込みますか？
目标位置被其它体素占用|目標位置被其他體素佔用。|La posición está ocupada por otros vóxeles.|A posição está ocupada por outros voxels.|Die Zielposition ist durch andere Voxel belegt.|La position cible est occupée par d’autres voxels.|Место занято другими вокселями.|移動先は他のボクセルで埋まっています。
已撤销上一步|已復原上一步|Última acción deshecha|Última ação desfeita|Letzte Aktion rückgängig gemacht|Dernière action annulée|Последнее действие отменено|直前の操作を元に戻しました
已重做|已重做|Acción rehecha|Ação refeita|Aktion wiederholt|Action rétablie|Действие повторено|操作をやり直しました
设置已恢复默认值|設定已還原預設值|Ajustes restaurados|Configurações restauradas|Standardeinstellungen wiederhergestellt|Paramètres par défaut rétablis|Настройки восстановлены|設定をデフォルトに戻しました
场景光照已切换|場景光照已切換。|Iluminación cambiada.|Iluminação alterada.|Beleuchtung geändert.|Éclairage modifié.|Освещение изменено.|照明を切り替えました。
骨骼绑定已重新计算|骨架綁定已重新計算|Enlaces del esqueleto recalculados|Vínculos do esqueleto recalculados|Skelettbindung neu berechnet|Liaisons du squelette recalculées|Привязки скелета пересчитаны|ボーンのバインドを再計算しました
无法读取模型|無法讀取模型。|No se pudo leer el modelo.|Não foi possível ler o modelo.|Modell konnte nicht gelesen werden.|Impossible de lire le modèle.|Не удалось прочитать модель.|モデルを読み込めません。
无法读取动画文件|無法讀取動畫檔案。|No se pudo leer la animación.|Não foi possível ler a animação.|Animation konnte nicht gelesen werden.|Impossible de lire l’animation.|Не удалось прочитать анимацию.|アニメーションを読み込めません。
导出失败|匯出失敗。|Error al exportar.|Falha ao exportar.|Export fehlgeschlagen.|Échec de l’exportation.|Ошибка экспорта.|出力に失敗しました。
覆盖保存失败|覆寫儲存失敗。|Error al sobrescribir.|Falha ao sobrescrever.|Überschreiben fehlgeschlagen.|Échec de l’écrasement.|Ошибка перезаписи.|上書き保存に失敗しました。
动画导出失败|動畫匯出失敗。|Error al exportar la animación.|Falha ao exportar a animação.|Animationsexport fehlgeschlagen.|Échec de l’exportation de l’animation.|Ошибка экспорта анимации.|アニメーションの出力に失敗しました。
请先载入一个带骨骼的模型|請先載入一個帶骨架的模型。|Carga primero un modelo con esqueleto.|Carregue primeiro um modelo com esqueleto.|Zuerst ein Modell mit Skelett laden.|Chargez d’abord un modèle avec squelette.|Сначала загрузите модель со скелетом.|まずボーン付きモデルを読み込んでください。
文件根节点不是<model>|檔案根節點不是<model>。|La raíz no es <model>.|A raiz não é <model>.|Wurzelelement ist nicht <model>.|L’élément racine n’est pas <model>.|Корневой элемент не <model>.|ルート要素が<model>ではありません。
模型中缺少<voxels>|模型中缺少<voxels>。|Falta <voxels> en el modelo.|Falta <voxels> no modelo.|Im Modell fehlt <voxels>.|Le modèle ne contient pas <voxels>.|В модели отсутствует <voxels>.|モデルに<voxels>がありません。
无法导出：缺少<voxels>|無法匯出：缺少<voxels>。|No se puede exportar: falta <voxels>.|Não é possível exportar: falta <voxels>.|Export nicht möglich: <voxels> fehlt.|Exportation impossible : <voxels> absent.|Экспорт невозможен: нет <voxels>.|出力できません。<voxels>がありません。
动画XML解析失败|動畫XML解析失敗。|Error al analizar el XML de animación.|Falha ao analisar o XML de animação.|Animations-XML konnte nicht gelesen werden.|Échec de l’analyse du XML d’animation.|Ошибка разбора XML анимации.|アニメーションXMLを解析できません。
只能打开本地XML文件|只能開啟本機XML檔案。|Solo se pueden abrir archivos XML locales.|Só é possível abrir arquivos XML locais.|Nur lokale XML-Dateien können geöffnet werden.|Seuls les fichiers XML locaux peuvent être ouverts.|Можно открыть только локальные XML-файлы.|ローカルのXMLファイルのみ開けます。
只能打开本地文件|只能開啟本機檔案。|Solo se pueden abrir archivos locales.|Só é possível abrir arquivos locais.|Nur lokale Dateien können geöffnet werden.|Seuls les fichiers locaux peuvent être ouverts.|Можно открыть только локальные файлы.|ローカルファイルのみ開けます。
只能保存到本地文件|只能儲存至本機檔案。|Solo se puede guardar en archivos locales.|Só é possível salvar em arquivos locais.|Nur lokale Dateien können gespeichert werden.|Enregistrement possible uniquement dans un fichier local.|Можно сохранить только в локальный файл.|ローカルファイルにのみ保存できます。
文件不是有效的UTF-8XML|檔案不是有效的UTF-8XML。|El archivo no es XML UTF-8 válido.|O arquivo não é XML UTF-8 válido.|Die Datei ist kein gültiges UTF-8-XML.|Le fichier n’est pas un XML UTF-8 valide.|Файл не является допустимым XML UTF-8.|有効なUTF-8 XMLではありません。
文件权限状态不可用|檔案權限狀態不可用。|Permisos de archivo no disponibles.|Permissões de arquivo indisponíveis.|Dateiberechtigungen nicht verfügbar.|État des permissions indisponible.|Состояние прав доступа недоступно.|ファイルの権限状態を確認できません。
启动文件状态不可用|啟動檔案狀態不可用。|Estado del archivo inicial no disponible.|Estado do arquivo inicial indisponível.|Status der Startdatei nicht verfügbar.|État du fichier de démarrage indisponible.|Состояние начального файла недоступно.|起動ファイルの状態を確認できません。
文件选择器意外关闭|檔案選擇器意外關閉。|El selector de archivos se cerró inesperadamente.|O seletor de arquivos fechou inesperadamente.|Dateiauswahl unerwartet geschlossen.|Le sélecteur de fichiers s’est fermé inopinément.|Диалог выбора файла неожиданно закрылся.|ファイル選択が予期せず閉じました。
文件保存对话框意外关闭|檔案儲存對話框意外關閉。|El diálogo de guardado se cerró inesperadamente.|O diálogo de salvamento fechou inesperadamente.|Speicherdialog unerwartet geschlossen.|La fenêtre d’enregistrement s’est fermée inopinément.|Диалог сохранения неожиданно закрылся.|保存ダイアログが予期せず閉じました。
只能覆盖当前已打开的XML模型文件|只能覆寫目前已開啟的XML模型檔案。|Solo se puede sobrescribir el modelo XML abierto.|Só é possível sobrescrever o modelo XML aberto.|Nur das geöffnete XML-Modell kann überschrieben werden.|Seul le modèle XML ouvert peut être écrasé.|Можно перезаписать только открытый XML-модель.|開いているXMLモデルのみ上書きできます。
该文件未由本次编辑会话打开或保存已拒绝覆盖|此檔案未由本次編輯開啟或儲存，已拒絕覆寫。|Archivo no abierto ni guardado en esta sesión; sobrescritura rechazada.|Arquivo não aberto nem salvo nesta sessão; sobrescrita recusada.|Datei wurde in dieser Sitzung nicht geöffnet oder gespeichert; Überschreiben abgelehnt.|Fichier non ouvert ou enregistré dans cette session ; écrasement refusé.|Файл не открыт и не сохранён в этой сессии; перезапись отклонена.|このセッションで開くか保存していないため上書きを拒否しました。
`;

export const translatedLanguages = ['zh-TW', 'es', 'pt', 'de', 'fr', 'ru', 'ja'] as const;
export function messageKey(value: string): string {
  return value.trim().replace(/[\s，。；：？、“”‘’（）()·/→+\-]/g, '');
}
export const translations = new Map<string, Partial<Record<AppLanguage, string>>>(
  rows
    .trim()
    .split('\n')
    .map((row) => {
      const [source, ...values] = row.split('|');
      if (values.length !== translatedLanguages.length) throw new Error('Invalid translation row: ' + source);
      return [
        messageKey(source!),
        Object.fromEntries(translatedLanguages.map((code, index) => [code, values[index]!])),
      ];
    }),
);
