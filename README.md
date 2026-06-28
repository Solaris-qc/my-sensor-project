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

- **🗺️ 交互式 3D 数字孪生 (Interactive 3D Digital Twin)**
  - 集成 `@react-three/fiber`，支持导入复杂结构模型（GLTF/GLB）。
  - 传感器空间坐标高精度映射，支持运行状态的实时视觉反馈（如报警节点的高亮与呼吸灯闪烁）。
- **📊 高密度数据可视化 (High-Density Data Visualization)**
  - 深度集成 `ECharts`，提供极其流畅的实时折线图、状态环形图与多维柱状图。
  - 毫秒级数据流更新响应，支持环境补偿算法（温度、湿度、大气压）的动态展示。
- **🧠 智能工作流面板 (Intelligent Processing Pipeline)**
  - 内置从“无人机多模态图像采集 -> RAG 知识检索 -> LLM 状态评估”的完整数字孪生业务流向图。
  - 附带可滚动的系统运行日志终端。
- **🖥️ 工业级一屏到底布局 (Industrial UI/UX Design)**
  - 采用严格的 CSS Flexbox/Grid 锁屏布局（Scroll-locked）。
  - 完美适配各分辨率显示器，告别恼人的滚动条，呈现“深空科幻蓝”专业质感。

---

## 📸 界面预览 (Screenshots)

<img width="1920" height="950" alt="image" src="https://github.com/user-attachments/assets/4282fa94-577a-4d03-bcbd-7ef0aedb0cbc" />

---

## 🛠️ 技术栈 (Tech Stack)

- **核心框架:** React 18, Vite
- **3D 渲染引擎:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **数据可视化:** Apache ECharts, `echarts-for-react`
- **样式布局:** 纯 CSS (CSS3 Flexbox, CSS Grid)

---

## 🚀 快速开始 (Getting Started)

### 1. 环境准备

确保你的计算机上已安装 [Node.js](https://nodejs.org/) (建议版本 v18.0.0 或以上)。
------------------------以上为版本①-----------------------------
更新后：2026.6.28 17:30

# 智能结构监测平台 (Bridge Digital Twin System)

这是一个基于 **React** 和 **Three.js** 开发的实时桥梁结构监测数字孪生系统。该系统通过 WebSocket 技术接入物联网（IoT）传感器数据，实现对桥梁结构健康状态的实时监控、三维模型可视化标定以及异常报警追踪。

## 🚀 核心特性

- **实时数据流**：基于 WebSocket 协议，实现秒级传感器数据推送与前端展示。
- **三维模型可视化**：利用 `Three.js` 构建桥梁结构模型，支持交互式传感器节点标定。
- **独立节点监控**：每个监测节点具备独立的偏差配置与报警判定逻辑，摆脱单一均值监控的局限。
- **全栈架构**：React (前端) + Python (后端数据服务)。

## 🛠 技术栈

- **前端**：React, Three.js (@react-three/fiber), ECharts
- **通信**：WebSocket
- **后端**：Python (websockets 库)
- **开发工具**：Anaconda, Node.js

### 📦 安装与运行

## 1. 前端启动

Bash
 进入项目目录
npm install

 启动开发服务器
npm run dev

## 2. 后端数据引擎
确保已安装 Python 环境，并安装依赖：
Bash
pip install websockets

在根目录外或专门的后端文件夹启动服务：
Bash
python server.py

## 📝 开发流程说明

传感器标定：进入“结构模型”页面，通过鼠标点击桥梁模型表面，自动计算并记录传感器的三维坐标信息。

数据联动：前端根据传感器 ID 实时接收并计算偏移后的独立数据，确保每个节点的监测准确性。

报警追踪：实时分析应变数据，当节点数值超过阈值时，自动触发模型颜色闪烁及右侧列表报警追踪。

## 🏗 未来演进计划

 集成 GLTFLoader 加载真实桥梁 BIM 模型。

 接入多模态病害识别 AI 模块。

 部署至 Tencent Cloud Ubuntu 服务器，实现 24/7 在线监测。

本项目为结构健康监测与数字孪生交叉领域研究原型。
---
