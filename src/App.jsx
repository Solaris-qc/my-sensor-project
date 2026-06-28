import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ModelConfig from "./pages/ModelConfig"; // 我们即将新建的页面
import Placeholder from "./pages/Placeholder";
import "./App.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navItems = [
    { path: "/", label: "首页概览" },
    { path: "/model", label: "结构模型" },
    { path: "/monitor", label: "实时监测" },
    { path: "/query", label: "数据查询" },
  ];

  return (
    <div className="sidebar">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
          onClick={() => navigate(item.path)}
        >
          <div className="nav-icon"></div>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

function App() {
  // 全局共享的传感器数组，增加 offsetConfig 用于生成个体差异数据
  const [globalSensors, setGlobalSensors] = useState([]);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* 首页大屏：接收全局传感器数据展示 */}
            <Route
              path="/"
              element={<Dashboard globalSensors={globalSensors} />}
            />
            {/* 结构模型管理页：负责添加、编辑传感器 */}
            <Route
              path="/model"
              element={
                <ModelConfig
                  globalSensors={globalSensors}
                  setGlobalSensors={setGlobalSensors}
                />
              }
            />
            <Route path="/monitor" element={<Placeholder title="实时监测" />} />
            <Route path="/query" element={<Placeholder title="数据查询" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
