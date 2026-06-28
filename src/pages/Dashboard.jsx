import React, { useState, useEffect } from "react";
import ModelView from "../components/ModelView";
import RingChart from "../components/RingChart";
import TrendLineChart from "../components/TrendLineChart";
import BarChart from "../components/BarChart";
import EnvFlow from "../components/EnvFlow";
import ProcessLog from "../components/ProcessLog";

const Dashboard = ({ globalSensors = [] }) => {
  const [selectedSensorId, setSelectedSensorId] = useState(null);

  const [realtimeData, setRealtimeData] = useState({
    avgCorrosion: 0.278,
    maxCorrosion: 0.512,
    avgStrain: 184,
    avgTemp: 26.3,
  });

  const [historyData, setHistoryData] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    setSensors(
      globalSensors.map((sensor) => ({
        ...sensor,
        status: "normal",
        currentData: { strain: "-", temp: "-", corrosion: "-" },
      })),
    );
  }, [globalSensors]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");

    ws.onmessage = (event) => {
      const incomingData = JSON.parse(event.data);
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });

      setRealtimeData({
        avgCorrosion: incomingData.avgCorrosion,
        maxCorrosion: incomingData.maxCorrosion,
        avgStrain: incomingData.avgStrain,
        avgTemp: incomingData.avgTemp,
      });

      setHistoryData((prev) => {
        const newData = [
          ...prev,
          { time: currentTime, value: incomingData.avgStrain },
        ];
        if (newData.length > 15) newData.shift();
        return newData;
      });

      setSensors((prevSensors) =>
        prevSensors.map((sensor) => {
          const offset = sensor.offsetConfig || {
            strain: 0,
            temp: 0,
            corrosion: 0,
          };
          const specificStrain = Math.round(
            incomingData.avgStrain + parseFloat(offset.strain),
          );
          const specificTemp = (
            incomingData.avgTemp + parseFloat(offset.temp)
          ).toFixed(1);
          const specificCorrosion = (
            incomingData.avgCorrosion + parseFloat(offset.corrosion)
          ).toFixed(3);

          return {
            ...sensor,
            currentData: {
              strain: specificStrain,
              temp: specificTemp,
              corrosion: specificCorrosion,
            },
            status: specificStrain > 185 ? "alarm" : "normal",
          };
        }),
      );
    };

    return () => ws.close();
  }, []);

  const selectedSensor = sensors.find((s) => s.id === selectedSensorId);
  const displayTitle = selectedSensor
    ? `[专属视图] 节点 ${selectedSensor.name}`
    : "全局系统实时大盘";

  // 【修复核心】：引入 ?. 可选链，如果 currentData 为空则自动 fallback 到 '-'
  const displayNum = selectedSensor
    ? {
        corrosion: selectedSensor.currentData?.corrosion || "-",
        maxCorrosion: realtimeData.maxCorrosion.toFixed(3),
        strain: selectedSensor.currentData?.strain || "-",
        temp: selectedSensor.currentData?.temp || "-",
      }
    : {
        corrosion: realtimeData.avgCorrosion.toFixed(3),
        maxCorrosion: realtimeData.maxCorrosion.toFixed(3),
        strain: realtimeData.avgStrain,
        temp: realtimeData.avgTemp.toFixed(1),
      };

  const alarmingSensors = sensors.filter((s) => s.status === "alarm");

  return (
    <>
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
                {globalSensors.length}
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
              <strong
                style={{
                  color: alarmingSensors.length > 0 ? "#ff4d4f" : "#00ffaa",
                  fontSize: "18px",
                }}
              >
                {100 - alarmingSensors.length * 5}
              </strong>{" "}
              /100
            </div>
          </div>
        </div>
      </div>

      <div className="content-body">
        <div className="col-left">
          <div
            className="panel"
            style={{
              flex: 1.5,
              borderColor: selectedSensor ? "#00e5ff" : "#1a365d",
            }}
          >
            <div
              className="panel-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                background: selectedSensor
                  ? "rgba(0, 229, 255, 0.2)"
                  : "linear-gradient(90deg, rgba(0, 163, 255, 0.1) 0%, transparent 100%)",
              }}
            >
              <span>{displayTitle}</span>
              {selectedSensor && (
                <button
                  onClick={() => setSelectedSensorId(null)}
                  style={{
                    background: "transparent",
                    color: "#ff4d4f",
                    border: "1px solid #ff4d4f",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "2px 8px",
                  }}
                >
                  X 取消选中
                </button>
              )}
            </div>
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
                  {selectedSensor ? "该点腐蚀厚度" : "平均腐蚀厚度"}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: selectedSensor ? "#00e5ff" : "#fff",
                  }}
                >
                  {displayNum.corrosion}{" "}
                  <span style={{ fontSize: "12px", color: "#8da2c0" }}>mm</span>
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
                  全桥最大腐蚀
                </div>
                <div style={{ fontSize: "20px", color: "#fff" }}>
                  {displayNum.maxCorrosion}{" "}
                  <span style={{ fontSize: "12px", color: "#8da2c0" }}>mm</span>
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
                  {selectedSensor ? "该点实时应变" : "系统平均应变"}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: selectedSensor
                      ? displayNum.strain > 185
                        ? "#ff4d4f"
                        : "#00e5ff"
                      : "#fff",
                  }}
                >
                  {displayNum.strain}{" "}
                  <span style={{ fontSize: "12px", color: "#8da2c0" }}>με</span>
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
                  {selectedSensor ? "该点环境温度" : "大盘平均温度"}
                </div>
                <div
                  style={{
                    fontSize: "20px",
                    color: selectedSensor ? "#00e5ff" : "#fff",
                  }}
                >
                  {displayNum.temp}{" "}
                  <span style={{ fontSize: "12px", color: "#8da2c0" }}>°C</span>
                </div>
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
              结构三维模型与传感器布局 (点击节点查看详情)
            </div>
            <ModelView
              sensors={sensors}
              onSelectSensor={setSelectedSensorId}
              selectedSensorId={selectedSensorId}
            />
          </div>
          <div style={{ display: "flex", gap: "10px", flex: 1 }}>
            <div className="panel" style={{ flex: 1.5 }}>
              <div className="panel-header">大盘平均应变趋势 (με)</div>
              <TrendLineChart data={historyData} />
            </div>
            <div className="panel" style={{ flex: 1 }}>
              <div className="panel-header">数据处理流程</div>
              <ProcessLog />
            </div>
          </div>
        </div>

        <div className="col-right">
          <div className="panel" style={{ flex: 1.2 }}>
            <div className="panel-header">传感器状态</div>
            <RingChart sensors={sensors} />
          </div>
          <div className="panel" style={{ flex: 1.5 }}>
            <div className="panel-header">节点独立报警追踪</div>
            <div
              style={{
                padding: "10px",
                overflowY: "auto",
                fontSize: "12px",
                flex: 1,
              }}
            >
              {alarmingSensors.length > 0 ? (
                alarmingSensors.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "#fff",
                      background: "rgba(255, 77, 79, 0.1)",
                      padding: "5px",
                      marginBottom: "5px",
                      borderLeft: "3px solid #ff4d4f",
                    }}
                  >
                    <span>{s.name}</span>
                    {/* 【修复核心】：引入 ?. 可选链防崩溃 */}
                    <span>{s?.currentData?.strain || "-"} με</span>
                    <span style={{ color: "#ff4d4f" }}>超标报警</span>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    color: "#00ffaa",
                    textAlign: "center",
                    marginTop: "20px",
                  }}
                >
                  ✅ 全桥节点状态正常
                </div>
              )}
            </div>
          </div>
          <div className="panel" style={{ flex: 1 }}>
            <div className="panel-header">参数设置</div>
            <div style={{ padding: "15px" }}>
              <button
                style={{
                  width: "100%",
                  background: "#00e5ff",
                  color: "#000",
                  fontWeight: "bold",
                  border: "none",
                  padding: "8px",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              >
                应用设置
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
