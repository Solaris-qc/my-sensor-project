import React, { useState } from "react";
import ModelView from "./components/ModelView";
import RingChart from "./components/RingChart";
import TrendLineChart from "./components/TrendLineChart";
import BarChart from "./components/BarChart";
import EnvFlow from "./components/EnvFlow";
import ProcessLog from "./components/ProcessLog";
import "./App.css";

const initialSensors = [
  { id: "S61", position: [0, 1, 0], status: "alarm", name: "跨中节点-S61" },
];

function App() {
  const [selectedSensorId, setSelectedSensorId] = useState(null);

  return (
    <div className="app-wrapper">
      {/* 最左侧导航栏 */}
      <div className="sidebar">
        <div className="nav-item active">
          <div className="nav-icon"></div>
          <span>首页概览</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
          <span>结构模型</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
          <span>实时监测</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon"></div>
          <span>数据查询</span>
        </div>
      </div>

      {/* 右侧主内容区 */}
      <div className="main-content">
        {/* 顶部状态栏 */}
        <div className="top-header">
          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#fff",
              letterSpacing: "2px",
            }}
          >
            智能结构监测平台
          </div>
          <div style={{ display: "flex", gap: "40px", color: "#8da2c0" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: "rgba(0,255,170,0.2)",
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                传感器总数 <br />
                <strong style={{ color: "#fff", fontSize: "18px" }}>
                  128
                </strong>{" "}
                台
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: "rgba(0,255,170,0.2)",
                  borderRadius: "50%",
                }}
              ></div>
              <div>
                结构健康指数 <br />
                <strong style={{ color: "#00ffaa", fontSize: "18px" }}>
                  82
                </strong>{" "}
                /100
              </div>
            </div>
          </div>
        </div>

        {/* 核心三列内容 */}
        <div className="content-body">
          {/* 左列 */}
          <div className="col-left">
            <div className="panel" style={{ flex: 1.5 }}>
              <div className="panel-header">实时数据总览</div>
              <div
                style={{
                  padding: "10px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  flex: 1,
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "10px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8da2c0" }}>
                    平均腐蚀厚度
                  </div>
                  <div style={{ fontSize: "20px", color: "#fff" }}>
                    0.278 mm
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "10px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8da2c0" }}>
                    最大腐蚀厚度
                  </div>
                  <div style={{ fontSize: "20px", color: "#fff" }}>
                    0.512 mm
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "10px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8da2c0" }}>
                    平均应变
                  </div>
                  <div style={{ fontSize: "20px", color: "#fff" }}>184 με</div>
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    padding: "10px",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "#8da2c0" }}>
                    平均温度
                  </div>
                  <div style={{ fontSize: "20px", color: "#fff" }}>26.3 °C</div>
                </div>
              </div>
            </div>
            <div className="panel" style={{ flex: 1 }}>
              <div className="panel-header">腐蚀厚度分布 (实时)</div>
              <div style={{ flex: 1 }}>
                <BarChart />
              </div>
            </div>
            <div
              className="panel"
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              <div className="panel-header">环境监测与温度补偿</div>
              <div style={{ flex: 1, padding: "10px" }}>
                <EnvFlow />
              </div>
            </div>
          </div>

          {/* 中列 */}
          <div className="col-center">
            <div className="panel" style={{ flex: 2, position: "relative" }}>
              <div
                className="panel-header"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                  background: "rgba(11,23,44,0.8)",
                  border: "none",
                }}
              >
                结构三维模型与传感器布局
              </div>
              <ModelView
                sensors={initialSensors}
                onSelectSensor={setSelectedSensorId}
                selectedSensorId={selectedSensorId}
              />
            </div>
            <div style={{ display: "flex", gap: "10px", flex: 1 }}>
              <div className="panel" style={{ flex: 1.5 }}>
                <div className="panel-header">变化趋势 (mm)</div>
                <TrendLineChart />
              </div>
              <div className="panel" style={{ flex: 1 }}>
                <div className="panel-header">数据处理流程</div>
                <ProcessLog />
              </div>
            </div>
          </div>

          {/* 右列 */}
          <div className="col-right">
            <div className="panel" style={{ flex: 1.2 }}>
              <div className="panel-header">传感器状态</div>
              <RingChart />
            </div>
            <div className="panel" style={{ flex: 1.5 }}>
              <div className="panel-header">实时报警信息</div>
              <div
                style={{ padding: "10px", overflowY: "auto", fontSize: "12px" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr",
                    color: "#8da2c0",
                    marginBottom: "10px",
                  }}
                >
                  <span>时间</span>
                  <span>传感器</span>
                  <span>值</span>
                  <span>状态</span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1.5fr 2fr 1.5fr",
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  <span>14:34</span>
                  <span>S61</span>
                  <span>0.467</span>
                  <span style={{ color: "#ff4d4f" }}>报警</span>
                </div>
              </div>
            </div>
            <div className="panel" style={{ flex: 1 }}>
              <div className="panel-header">参数设置</div>
              <div style={{ padding: "15px" }}>
                <button
                  style={{
                    width: "100%",
                    background: "#00e5ff",
                    border: "none",
                    padding: "5px",
                  }}
                >
                  应用设置
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
