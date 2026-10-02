# RWR Vehicle Studio

RWR Vehicle Studio 是面向 _Running With Rifles_ 模组工作流的离线载具可视化编辑器。它可以读取 `.vehicle`、OGRE `.mesh`、纹理、`.weapon` 以及人物模型/动画 XML，在独立 3D 视口中直接检查和调整载具数据，减少反复进入游戏校准 XML 数值的成本。

## 技术结构

- **Vue 3 + TypeScript**：组件界面、载具文档模型、资源索引与编辑状态；
- **Three.js**：OGRE/体素资源预览、坐标变换、选择框与碰撞范围；
- **Tauri 2 + Rust**：原生窗口、文件对话框、递归目录扫描和受控文件保存；
- **Vitest + Rust tests**：XML 继承、资源匹配、坐标映射和桌面命令回归测试。

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

构建结果位于 `src-tauri/target/release/bundle/`。


## 许可

本项目采用 [GNU General Public License v3.0](LICENSE)。

项目仓库：[sfg129/RWR-Vehicle-Studio](https://github.com/sfg129/RWR-Vehicle-Studio)
