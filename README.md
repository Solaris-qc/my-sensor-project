# 🌉 Smart Structural Health Monitoring & Digital Twin Dashboard
# 智能结构健康监测与数字孪生大屏

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.x-646CFF.svg)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-black.svg)](https://threejs.org/)
[![ECharts](https://img.shields.io/badge/ECharts-5.x-E43961.svg)](https://echarts.apache.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> 这是一个专为土木工程、桥梁及大型建筑设计的工业级结构健康监测（SHM）数字孪生前端展示面板。基于现代 Web 技术栈构建，支持 3D 模型交互、高密度实时数据可视化以及多模态智能评估工作流的展示。

---

## ✨ 核心特性 (Key Features)

* **🗺️ 交互式 3D 数字孪生 (Interactive 3D Digital Twin)**
  * 集成 `@react-three/fiber`，支持导入复杂结构模型（GLTF/GLB）。
  * 传感器空间坐标高精度映射，支持运行状态的实时视觉反馈（如报警节点的高亮与呼吸灯闪烁）。
* **📊 高密度数据可视化 (High-Density Data Visualization)**
  * 深度集成 `ECharts`，提供极其流畅的实时折线图、状态环形图与多维柱状图。
  * 毫秒级数据流更新响应，支持环境补偿算法（温度、湿度、大气压）的动态展示。
* **🧠 智能工作流面板 (Intelligent Processing Pipeline)**
  * 内置从“无人机多模态图像采集 -> RAG 知识检索 -> LLM 状态评估”的完整数字孪生业务流向图。
  * 附带可滚动的系统运行日志终端。
* **🖥️ 工业级一屏到底布局 (Industrial UI/UX Design)**
  * 采用严格的 CSS Flexbox/Grid 锁屏布局（Scroll-locked）。
  * 完美适配各分辨率显示器，告别恼人的滚动条，呈现“深空科幻蓝”专业质感。

---

## 📸 界面预览 (Screenshots)

<img width="1920" height="950" alt="image" src="https://github.com/user-attachments/assets/4282fa94-577a-4d03-bcbd-7ef0aedb0cbc" />

---

## 🛠️ 技术栈 (Tech Stack)

* **核心框架:** React 18, Vite
* **3D 渲染引擎:** Three.js, `@react-three/fiber`, `@react-three/drei`
* **数据可视化:** Apache ECharts, `echarts-for-react`
* **样式布局:** 纯 CSS (CSS3 Flexbox, CSS Grid)

---

## 🚀 快速开始 (Getting Started)

### 1. 环境准备
确保你的计算机上已安装 [Node.js](https://nodejs.org/) (建议版本 v18.0.0 或以上)。
