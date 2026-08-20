# RWR Vehicle Studio

RWR Vehicle Studio 是面向 _Running With Rifles_ 模组工作流的离线载具可视化编辑器。它可以读取 `.vehicle`、OGRE `.mesh`、纹理、`.weapon` 以及人物模型/动画 XML，在独立 3D 视口中直接检查和调整载具数据，减少反复进入游戏校准 XML 数值的成本。

## 主要功能

- 从载具工作区直接浏览并打开 `.vehicle`，工作区和资源目录预设会在重启后保留；
- 自动从模型、纹理和武器目录匹配引用资源，也可在文件覆盖界面逐项指定；
- 显示载具外观、损毁外观、碰撞框、炮塔、武器模型、护盾范围以及动画乘员；
- 按游戏规则处理载具基础文件、父炮塔、乘员 `attached_on_turret`、`rotation` 和 `hiding`；
- 在属性面板中编辑 XML 数值，支持增加/删除对象与属性、撤销和 `Ctrl+Z`；
- 快捷键：`Ctrl+O` 打开载具，`Ctrl+R` 重新载入，`Ctrl+S` 保存，`Ctrl+Shift+S` 另存为，`Ctrl+Z` 撤销（macOS 使用 `Cmd` 修饰键）；
- 编辑武器的一个或多个 `<shield>`，并通过独立命令保存回对应 `.weapon`；
- 常规保存写回载具 XML，不修改模型、纹理、人物模型或动画文件；

## 技术结构

- **Vue 3 + TypeScript**：组件界面、载具文档模型、资源索引与编辑状态；
- **Three.js**：OGRE/体素资源预览、坐标变换、选择框与碰撞范围；
- **Tauri 2 + Rust**：原生窗口、文件对话框、递归目录扫描和受控文件保存；
- **Vitest + Rust tests**：XML 继承、资源匹配、坐标映射和桌面命令回归测试。

## 正式发布资产

正式版本在 [Releases](https://github.com/sfg129/RWR-Vehicle-Studio/releases) 提供以下三平台产物：

- Windows：NSIS 安装程序（`.exe`）与便携版（portable `.exe`）；
- macOS：磁盘映像（`.dmg`）与便携版（`.app.zip`）；
- Linux：Debian 包（`.deb`）与便携版（`.AppImage`）。

## 开发与构建

需要 Bun、Rust stable，以及各平台的 Tauri 2 系统依赖：Windows 的 WebView2/C++ 构建环境、macOS 的 Xcode 命令行工具、Linux 的 WebKitGTK（`libwebkit2gtk-4.1-dev` 等）。

```powershell
bun install
bun run test
bun run build:frontend
bun run dev
```

正式构建：

```powershell
bun run build
```

构建结果位于 `src-tauri/target/release/bundle/`。仓库不会跟踪 `release/`、`dist/`、`node_modules/` 或 Rust `target/` 等生成内容。


## 许可

本项目采用 [GNU General Public License v3.0](LICENSE)。你可以依照 GPL-3.0 使用、研究、修改和再分发本项目；分发修改版本时需要继续提供相应源代码并保留相同许可。

_Running With Rifles_、其名称及游戏资源的权利归各自权利人所有。本项目与游戏开发商不存在从属关系；GPL-3.0 不会改变用户自行载入的第三方游戏或模组资源的许可。

项目仓库：[sfg129/RWR-Vehicle-Studio](https://github.com/sfg129/RWR-Vehicle-Studio)
