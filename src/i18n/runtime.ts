import { displayPath } from '../core/editor/display-path';
import { vehicleMessages } from './vehicle-messages';
import { vehiclePatterns } from './vehicle-patterns';
import type { AppLanguage } from './languages';
import { messageKey, translations } from './translations';
import { dynamicTranslations } from './dynamic-translations';
export type { AppLanguage } from './languages';

const englishMessages: Record<string, string> = {
  'RWR 体素编辑器': 'RWR Voxel Editor',
  'RWR 体素编辑器 Next': 'RWR Voxel Editor Next',
  文件操作: 'File actions',
  文件: 'File',
  新建空模型: 'New empty model',
  保存: 'Save',
  另存为: 'Save As',
  打开模型: 'Open Model',
  载入动画: 'Load Animation',
  '正在等待文件选择…': 'Waiting for file selection…',
  撤销: 'Undo',
  重做: 'Redo',
  编辑工具: 'Editing tools',
  选择: 'Select',
  雕刻: 'Sculpt',
  绘色: 'Paint',
  取色: 'Pick Color',
  移动: 'Move',
  框选: 'Marquee',
  '框选 · 穿透框选': 'Marquee · Through',
  框选模式: 'Marquee mode',
  穿透框选: 'Through Marquee',
  选中框内的所有体素: 'Select all voxels inside the rectangle',
  可视框选: 'Visible Marquee',
  仅选中可见的第一层体素: 'Select only the first visible voxel layer',
  设置: 'Settings',
  修改: 'Modify',
  修改工具: 'Modify tool',
  '工具：修改': 'Tool: Modify',
  黏贴: 'Paste',
  默认: 'Default',
  无人物模型: 'No character model',
  已退出动画预览: 'Animation preview exited',
  选择动画: 'Choose animation',
  展开或收起: 'Expand or collapse',
  骨骼和动画: 'Skeleton and animation',
  骨骼: 'Skeleton',
  动画: 'Animation',
  编辑: 'Edit',
  旋转: 'Rotate',
  人物动画预览: 'Character Animation Preview',
  搜索动画: 'Search animations',
  搜索人物动画: 'Search character animations',
  无匹配动画: 'No matching animations',
  动画来源: 'Animation source',
  已载入动画: 'Loaded animations',
  播放: 'Play',
  暂停: 'Pause',
  当前颜色: 'Current color',
  颜色选择器: 'Color picker',
  尚未载入模型: 'No model loaded',
  请选择一个RWR模型XML: 'Choose an RWR model XML file',
  场景光照: 'Scene lighting',
  柔和: 'Soft',
  标准: 'Standard',
  明亮: 'Bright',
  颜色校对: 'Color proofing',
  预览人物模型效果: 'Preview Character',
  关闭预览: 'Close Preview',
  当前工具: 'Current tool',
  切换编辑工具: 'Switch editing tool',
  操作模式: 'Operation mode',
  '左键拖动添加 · 右键单击删除 · 右键拖动视角':
    'Left-drag to add · Right-click to remove · Right-drag to look',
  移动操作台: 'Move Workbench',
  清除: 'Clear',
  按住Ctrl可同时选取多个体素: 'Hold Ctrl to select multiple voxels',
  未选择体素: 'No voxels selected',
  请先载入带骨骼的模型: 'Load a model with a skeleton first',
  移动所选体素: 'Move selected voxels',
  旋转所选体素: 'Rotate selected voxels',
  以所选轮廓中点为轴心: 'Around the selected bounds center',
  '旋转所选体素 90 度': 'Rotate selected voxels 90 degrees',
  自定义旋转轴: 'Custom rotation axis',
  'X 轴': 'X axis',
  'Y 轴正向': 'Positive Y axis',
  'Y 轴负向': 'Negative Y axis',
  'Y 轴': 'Y axis',
  'Z 轴': 'Z axis',
  度: 'deg',
  按角度旋转: 'Rotate by Angle',
  模型块: 'Model Blocks',
  可跨文件粘贴: 'Paste across files',
  复制当前模型: 'Copy Current Model',
  粘贴所选模型: 'Paste Selected Model',
  已复制模型库: 'Copied Model Library',
  选择已复制的模型: 'Choose a copied model',
  暂无已复制模型: 'No copied models',
  删除所选体素: 'Delete Selected Voxels',
  开始编辑RWR模型: 'Start Editing an RWR Model',
  选择模型文件: 'Choose Model File',
  新建空文件: 'New Empty File',
  拖放XML文件以打开: 'Drop an XML file to open it',
  只能拖入XML模型文件: 'Only XML model files can be dropped here.',
  无法读取拖入的模型: 'The dropped model could not be read.',
  无法读取启动时传入的模型: 'The model passed at startup could not be read.',
  无法旋转旋转后会与其它体素重叠: 'Cannot rotate: the result would overlap other voxels.',
  请输入有效的旋转角度: 'Enter a valid rotation angle.',
  '旋转角度不能是 0° 或 360° 的整数倍': 'The rotation angle cannot be 0° or a multiple of 360°.',
  当前模型没有可复制的体素: 'The current model has no voxels to copy.',
  无法保存复制模型: 'The copied model could not be saved.',
  请先载入或创建目标模型: 'Load or create a destination model first.',
  复制库中没有可粘贴的模型: 'There are no models available to paste.',
  无法粘贴没有找到不与现有体素重叠的位置: 'Cannot paste: no position free of existing voxels was found.',
  无法粘贴目标位置与现有体素重叠: 'Cannot paste: the target overlaps existing voxels.',
  透视视图: 'Perspective View',
  '右键拖动视角 · 透视': 'Right-drag Look · Perspective',
  就绪: 'Ready',
  体素: 'Voxels',
  已选: 'Selected',
  骨骼点: 'Bones',
  未加载: 'Not loaded',
  动画工作台: 'Animation Workbench',
  点击展开或收起动画工作台: 'Click to expand or collapse the animation workbench',
  未载入动画: 'No animation loaded',
  骨骼与绑定: 'Skeleton & Binding',
  绑定组: 'Binding groups',
  未绑定体素: 'Unbound voxels',
  重新绑定到最近骨骼: 'Rebind to Nearest Bone',
  动画预览与编辑: 'Animation Preview & Editing',
  预览: 'Preview',
  创建与编辑: 'Create & Edit',
  未载入动画文件: 'No animation file loaded',
  体素跟随骨骼: 'Voxels Follow Skeleton',
  请先载入模型: 'Load a model first',
  新建: 'New',
  复制: 'Copy',
  删除: 'Delete',
  动画名称: 'Animation name',
  总时长: 'Duration',
  速度: 'Speed',
  速度随机: 'Speed spread',
  循环播放: 'Loop playback',
  关键帧: 'Keyframes',
  没有关键帧: 'No keyframes',
  新增: 'Add',
  '＋ 新增': '＋ Add',
  '帧时间（秒）': 'Frame time (seconds)',
  骨骼点位置: 'Bone position',
  场景拖动可编辑: 'Drag in the scene to edit',
  恢复模型位置: 'Restore Model Position',
  导出动画XML: 'Export Animation XML',
  性能: 'Performance',
  功能: 'Behavior',
  外观: 'Appearance',
  快捷键: 'Shortcuts',
  语言: 'Language',
  关于: 'About',
  性能预设: 'Performance preset',
  抗锯齿阴影与渲染倍率: 'Antialiasing, shadows, and render scale',
  高质量: 'High quality',
  均衡: 'Balanced',
  高性能: 'High performance',
  颜色校对接近平涂效果: 'Color proofing approximates a flat-shaded view',
  渲染倍率: 'Render scale',
  抗锯齿: 'Antialiasing',
  动态阴影: 'Dynamic shadows',
  大型模型关闭后可提高帧率: 'Disable for better performance on large models',
  显示网格: 'Show grid',
  体素显示模式: 'Voxel display mode',
  悬浮留有间隙网格紧密排列并显示边线: 'Floating: spaced voxels. Grid: tightly packed with outlines.',
  '悬浮模式（默认）': 'Floating (default)',
  网格模式: 'Grid',
  相机移动速度: 'Camera movement speed',
  '· Shift 双倍速度': '· Shift doubles speed',
  自动恢复: 'Automatic recovery',
  保留最近编辑快照: 'Keep the latest editing snapshot',
  删除时确认: 'Confirm deletion',
  仅删除多个体素时询问: 'Ask when deleting multiple voxels',
  覆盖保存前确认: 'Confirm overwrite',
  主题: 'Theme',
  深色: 'Dark',
  浅色: 'Light',
  字体大小: 'Font size',
  '标准（16 px）': 'Standard (16 px)',
  '大（18 px）': 'Large (18 px)',
  '特大（20 px）': 'Extra large (20 px)',
  主题颜色: 'Accent color',
  界面亮度: 'Interface brightness',
  界面缩放: 'Interface scale',
  快捷键设置: 'Shortcut Settings',
  新建模型: 'New model',
  覆盖保存: 'Overwrite save',
  删除体素: 'Delete voxels',
  选择工具: 'Select tool',
  雕刻工具: 'Sculpt tool',
  绘色工具: 'Paint tool',
  取色工具: 'Color picker tool',
  移动工具: 'Move tool',
  视角前进: 'Camera forward',
  视角后退: 'Camera back',
  视角左移: 'Camera left',
  视角右移: 'Camera right',
  界面语言: 'Interface language',
  简体中文: 'Simplified Chinese',
  新模型已创建: 'Model created.',
  动画已创建: 'Animation created.',
  访问GitHub仓库: 'Open GitHub Repository',
  恢复默认: 'Restore Defaults',
  完成: 'Done',
  确定: 'OK',
  新建模型前如何处理当前文件: 'What should happen to the current file?',
  当前模型有未保存修改: 'The current model has unsaved changes.',
  放弃修改: 'Discard Changes',
  取消: 'Cancel',
  确认替换当前模型文件: 'Confirm Model File Replacement',
  原文件将被当前模型内容替换此操作无法在磁盘上撤销:
    'The current model will replace the original file. This cannot be undone on disk.',
  我确认要覆盖当前模型文件: 'I confirm that I want to overwrite the current model file',
  确认删除所选体素: 'Confirm Voxel Deletion',
  将删除当前选择的: 'This will delete the',
  个体素该操作可通过撤销恢复: 'selected voxels. You can undo this action.',
  确认删除: 'Delete',
  人物模型效果预览: 'Character Model Preview',
  关闭人物预览: 'Close character preview',
  人物模型预览场景: 'Character preview scene',
  'WASD 移动 · Shift 加速 · 左键转动视角 · 滚轮缩放': 'WASD move · Shift boost · Left drag look · Wheel zoom',
  预设动画: 'Preset animation',
  'running（循环）': 'running (loop)',
  'running, no weapon（循环）': 'running, no weapon (loop)',
  'crouch forward（循环）': 'crouch forward (loop)',
  'prone forward（循环）': 'prone forward (loop)',
  预览光照: 'Preview lighting',
  体素渲染尺寸: 'Voxel render size',
  固定镜头: 'Fixed camera',
  '固定镜头 · 左键拖动旋转人物模型': 'Fixed camera · Left drag rotates the character',
  请先载入人物模型再打开人物效果预览: 'Load a character model before opening the character preview.',
  当前模型没有骨骼无法播放人物预览动画:
    'The current model has no skeleton and cannot play preview animations.',
  当前模型尚未绑定体素与骨骼请先完成骨骼绑定:
    'The current model has no voxel-to-skeleton bindings. Bind it before opening the preview.',
  '工具：选择': 'Tool: Select',
  '工具：雕刻': 'Tool: Sculpt',
  '工具：绘色': 'Tool: Paint',
  '工具：取色': 'Tool: Pick Color',
  '工具：移动': 'Tool: Move',
  '工具：框选': 'Tool: Marquee',
  '框选 · 可视框选': 'Marquee · Visible',
  关闭: 'Close',
  有未保存修改: 'Unsaved changes',
  已载入: 'Loaded',
  已修改: 'Modified',
  已保存: 'Saved',
  未命名: 'Untitled',
  已撤销上一步: 'Last action undone',
  已重做: 'Action redone',
  设置已恢复默认值: 'Settings restored to defaults',
  场景光照已切换: 'Scene lighting changed.',
  骨骼绑定已重新计算: 'Skeleton bindings recalculated',
  目标位置被其它体素占用: 'The target position is occupied by other voxels.',
  动画已复制: 'Animation copied.',
  动画已删除: 'Animation deleted.',
  关键帧已复制: 'Keyframe copied.',
  关键帧已新增: 'Keyframe added.',
  关键帧已删除: 'Keyframe deleted.',
  动画至少需要保留一个关键帧: 'An animation must retain at least one keyframe.',
  '当前动画有未导出修改。确定放弃并载入其他动画文件吗？':
    'There are unexported changes. Discard them and load another animation?',
  请先载入一个带骨骼的模型: 'Load a model with a skeleton first.',
  无法读取模型: 'Could not read the model.',
  无法读取动画文件: 'Could not read the animation file.',
  导出失败: 'Export failed.',
  覆盖保存失败: 'Overwrite failed.',
  动画导出失败: 'Animation export failed.',
  '文件根节点不是 <model>': 'The root element is not <model>.',
  '模型中缺少 <voxels>': 'The model is missing <voxels>.',
  '无法导出：缺少 <voxels>': 'Cannot export: <voxels> is missing.',
  动画XML解析失败: 'Animation XML parsing failed.',
  只能打开本地XML文件: 'Only local XML files can be opened.',
  只能打开本地文件: 'Only local files can be opened.',
  只能保存到本地文件: 'Files can only be saved locally.',
  文件不是有效的UTF8XML: 'The file is not valid UTF-8 XML.',
  文件权限状态不可用: 'File permission state is unavailable.',
  启动文件状态不可用: 'Startup file state is unavailable.',
  文件选择器意外关闭: 'The file picker closed unexpectedly.',
  文件保存对话框意外关闭: 'The save dialog closed unexpectedly.',
  只能覆盖当前已打开的XML模型文件: 'Only an open XML model file can be overwritten.',
  该文件未由本次编辑会话打开或保存已拒绝覆盖:
    'This file was not opened or saved in this session; overwrite refused.',
};

const english = new Map(
  Object.entries(englishMessages).map(([source, translation]) => [lookupKey(source), translation]),
);

export const patterns: Array<[RegExp, string]> = [
  [/^版本\s*([\d.]+)$/, 'Version $1'],
  [/^已载入 (\d+) 个体素$/, '$1 voxels loaded'],
  [/^模型已载入：(.*)$/, 'Model loaded: $1'],
  [/^已载入 (\d+) 个动画$/, '$1 animations loaded'],
  [/^(.*) · (\d+) 帧$/, '$1 · $2 frames'],
  [/^第 (\d+) 帧 · (.*)$/, 'Frame $1 · $2'],
  [/^(\d+) 帧$/, '$1 frames'],
  [/^骨骼点 (\d+)$/, 'Bone $1'],
  [/^已选择 (\d+) 个体素$/, '$1 voxels selected'],
  [/^范围 (.*)$/, 'Bounds $1'],
  [/^(\d+) \/ (\d+) 个体素已绑定$/, '$1 / $2 voxels bound'],
  [/^(\d+) \/ (\d+) 已绑定 · (\d+) 个保持原位$/, '$1 / $2 bound · $3 remain in place'],
  [/^已载入：(.*)$/, 'Loaded: $1'],
  [/^已保存：(.*)$/, 'Saved: $1'],
  [/^已覆盖：(.*)$/, 'Overwritten: $1'],
  [/^已另存为：(.*)$/, 'Saved as: $1'],
  [/^已覆盖保存：(.*)$/, 'Overwritten: $1'],
  [/^已导出：(.*)$/, 'Exported: $1'],
  [/^动画已导出：(.*)$/, 'Animation exported: $1'],
  [/^动画已保存：(.*)$/, 'Animation saved: $1'],
  [/^工具：(.*)$/, 'Tool: $1'],
  [/^框选了 (\d+) 个体素$/, 'Selected $1 voxels'],
  [/^已绘色 (\d+) 个体素$/, 'Painted $1 voxels'],
  [/^已移动 (\d+) 个体素$/, 'Moved $1 voxels'],
  [/^已沿 ([XYZ]) 轴旋转 (\d+) 个体素 (.*)°$/, 'Rotated $2 voxels $3° around the $1 axis'],
  [/^编号 #(\d+) · (\d+) 个体素 · 来源 (.*)$/, 'ID #$1 · $2 voxels · Source $3'],
  [/^当前模型已保存到复制库，编号 #(\d+)。$/, 'Current model saved to the copy library as #$1.'],
  [/^已复制模型 #(\d+) · (\d+) 个体素$/, 'Copied model #$1 · $2 voxels'],
  [/^已粘贴模型 #(\d+) · (\d+) 个体素$/, 'Pasted model #$1 · $2 voxels'],
  [/^已粘贴模型 #(\d+)，并选中新增体素。$/, 'Pasted model #$1 and selected the new voxels.'],
  [/^已删除 (\d+) 个体素$/, 'Deleted $1 voxels'],
  [/^已创建含 (\d+) 个基点体素的新模型$/, 'Created a new model with $1 base voxel(s)'],
  [/^即将替换：(.*)$/, 'Will replace: $1'],
  [/^快捷键 (.*) 已被占用$/, 'Shortcut $1 is already assigned.'],
  [/^撤销 \((.*)\)$/, 'Undo ($1)'],
  [/^重做 \((.*)\)$/, 'Redo ($1)'],
  [/^已为 (\d+) 个体素重新绑定骨骼$/, 'Rebound $1 voxels to the skeleton'],
  [/^模型有 (\d+) 个骨骼点；(.*) 预设提供 (\d+) 个。?$/, 'Model: $1 bones; $2 preset: $3.'],
  [/^模型有 (\d+) 个骨骼点；(.*) 动画包含 (\d+) 个。?$/, 'Model: $1 bones; $2 animation: $3.'],
  [/^内置 (.*) 动画无法读取。?$/, 'The built-in $1 animation could not be loaded.'],
  [/^人物预览界面元素不存在：(.*)$/, 'Character preview element not found: $1'],
  [/^(\d+) 个动画$/, '$1 animations'],
  [/^(\d+) 个动画 · 未导出$/, '$1 animations · Not exported'],
  [/^#(\d+) · (.*) · (\d+) 个体素$/, '#$1 · $2 · $3 voxels'],
  [/^已编辑骨骼点 (\d+)$/, 'Edited bone $1'],
  [/^已连续绘色 (\d+) 个体素$/, 'Painted $1 voxels in a stroke'],
  [/^已连续添加 (\d+) 个体素$/, 'Added $1 voxels in a stroke'],
  [/^已删除体素 \((.*)\)$/, 'Deleted voxel ($1)'],
  [/^确定删除动画“(.*)”吗？$/, 'Delete animation “$1”?'],
  [/^XML 解析失败：(.*)$/, 'XML parsing failed: $1'],
  [/^无法确认文件路径：(.*)$/, 'Could not verify file path: $1'],
  [/^读取文件失败：(.*)$/, 'Failed to read file: $1'],
  [/^保存文件失败：(.*)$/, 'Failed to save file: $1'],
  [/^找不到要覆盖的文件：(.*)$/, 'Could not find file to overwrite: $1'],
  [/^覆盖保存失败：(.*)$/, 'Overwrite failed: $1'],
  [/^界面元素不存在：(.*)$/, 'Interface element not found: $1'],
];

const textSources = new WeakMap<Text, string>();
const attributeSources = new WeakMap<Element, Map<string, string>>();
const textOutputs = new WeakMap<Text, string>();
const attributeOutputs = new WeakMap<Element, Map<string, string>>();
const translatableAttributes = ['aria-label', 'title', 'placeholder'] as const;
let language: AppLanguage = 'zh-CN';
let observer: MutationObserver | null = null;

function normalized(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function lookupKey(value: string): string {
  return messageKey(normalized(value));
}

export function translate(source: string, target: AppLanguage = 'en'): string {
  source = displayPath(source);
  if (target === 'zh-CN') return source.trim();
  const content = normalized(source);
  const vehicle = vehicleMessages.get(content)?.[target];
  if (vehicle) return vehicle;
  for (const { pattern, templates } of vehiclePatterns) {
    const match = pattern.exec(content);
    const template = templates[target];
    if (match && template) return template.replace(/\{(\d+)\}/g, (_, index: string) => match[Number(index)] ?? '');
  }
  const sceneLabel = /^(物理 \/ 碰撞|物理修正|操控|轮组|炮塔|外观|乘员)( \d+)?( · .*)?$/.exec(content);
  if (sceneLabel) return translate(sceneLabel[1], target) + (sceneLabel[2] ?? '') + (sceneLabel[3] ?? '');
  if (content.endsWith(' · 基础只读')) return content.slice(0, -7) + ' · ' + translate('基础只读', target);
  const localized = translations.get(lookupKey(content))?.[target];
  if (localized) return localized;
  const exact = english.get(lookupKey(content));
  if (exact && target === 'en' && !content.startsWith('工具：')) return exact;
  for (const [pattern, replacement] of patterns) {
    const match = pattern.exec(content);
    if (match) {
      const template = dynamicTranslations.get(replacement)?.[target] ?? replacement;
      return template.replace(/\$(\d+)/g, (_, index: string) => {
        const argument = match[Number(index)] ?? '';
        return replacement === 'Tool: $1' ? translate(argument, target) : argument;
      });
    }
  }
  return exact ?? source.trim();
}

export function localized(source: string): string {
  return translate(source, language);
}

// UI controls that copy labels must copy the source, not the current translated output.
export function sourceTextContent(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return textSources.get(node as Text) ?? node.textContent ?? '';
  return Array.from(node.childNodes, sourceTextContent).join('');
}

function skipLocalization(node: Node): boolean {
  const element = node instanceof Element ? node : node.parentElement;
  return Boolean(element?.closest('[data-no-localize], script, style'));
}

function localizeTextNode(node: Text): void {
  if (skipLocalization(node)) return;
  const current = node.data;
  const currentContent = normalized(current);
  if (!currentContent) return;
  let source = textSources.get(node);
  if (source === undefined || textOutputs.get(node) !== currentContent) {
    source = currentContent;
    textSources.set(node, source);
  }
  const content = translate(source, language);
  textOutputs.set(node, normalized(content));
  const leading = current.match(/^\s*/)?.[0] ?? '';
  const trailing = current.match(/\s*$/)?.[0] ?? '';
  const next = `${leading}${content}${trailing}`;
  if (next !== current) node.data = next;
}

function localizeAttribute(element: Element, name: (typeof translatableAttributes)[number]): void {
  if (skipLocalization(element)) return;
  const current = element.getAttribute(name);
  if (!current) return;
  let sources = attributeSources.get(element);
  if (!sources) {
    sources = new Map();
    attributeSources.set(element, sources);
  }
  let source = sources.get(name);
  let outputs = attributeOutputs.get(element);
  if (!outputs) {
    outputs = new Map();
    attributeOutputs.set(element, outputs);
  }
  if (source === undefined || outputs.get(name) !== current) {
    source = normalized(current);
    sources.set(name, source);
  }
  const next = translate(source, language);
  outputs.set(name, next);
  if (next !== current) element.setAttribute(name, next);
}

function localizeTree(root: Node): void {
  if (skipLocalization(root)) return;
  if (root.nodeType === Node.TEXT_NODE) localizeTextNode(root as Text);
  if (root instanceof Element) {
    translatableAttributes.forEach((name) => localizeAttribute(root, name));
  }
  const walker = document.createTreeWalker(root, 0x1 | 0x4);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) localizeTextNode(node as Text);
    else translatableAttributes.forEach((name) => localizeAttribute(node as Element, name));
    node = walker.nextNode();
  }
}

export function setLanguage(nextLanguage: AppLanguage): void {
  language = nextLanguage;
  document.documentElement.lang = nextLanguage;
  localizeTree(document.documentElement);
}

export function initializeLocalization(initialLanguage: AppLanguage): void {
  if (!observer) {
    const Observer = globalThis.MutationObserver ?? document.defaultView?.MutationObserver;
    if (!Observer) throw new Error('MutationObserver is unavailable in this environment.');
    observer = new Observer((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData') localizeTextNode(mutation.target as Text);
        else if (mutation.type === 'attributes') {
          localizeAttribute(
            mutation.target as Element,
            mutation.attributeName as (typeof translatableAttributes)[number],
          );
        } else {
          mutation.addedNodes.forEach(localizeTree);
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatableAttributes],
    });
  }
  setLanguage(initialLanguage);
}
