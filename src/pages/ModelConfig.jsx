import React from "react";
import ModelView from "../components/ModelView";

const ModelConfig = ({ globalSensors, setGlobalSensors }) => {
  // 处理在 3D 模型上的点击事件

  const handleModelClick = (point) => {
    const newSensor = {
      id: `S${Math.floor(Math.random() * 1000)}`,
      position: [point.x, point.y + 0.15, point.z],
      name: `新增节点-${new Date().getSeconds()}s`,
      // 赋予随机的环境/材质偏差，使得每个节点数据都彼此独立
      offsetConfig: {
        strain: Math.floor(Math.random() * 30) - 15, // 应变偏差 -15 到 +15
        temp: (Math.random() * 2 - 1).toFixed(1), // 温度偏差 -1.0 到 +1.0
        corrosion: (Math.random() * 0.05 - 0.025).toFixed(3), // 腐蚀偏差
      },
    };
    setGlobalSensors([...globalSensors, newSensor]);
  };

  const removeSensor = (id) => {
    setGlobalSensors(globalSensors.filter((s) => s.id !== id));
  };

  return (
    <div
      style={{ display: "flex", height: "100%", padding: "20px", gap: "20px" }}
    >
      {/* 左侧：标定工作台 */}
      <div className="panel" style={{ flex: 2, position: "relative" }}>
        <div className="panel-header">
          数字孪生资产与标定工作台 (点击模型表面添加传感器)
        </div>
        <ModelView
          sensors={globalSensors.map((s) => ({ ...s, status: "normal" }))}
          onModelClick={handleModelClick}
        />
      </div>

      {/* 右侧：资产与传感器列表 */}
      <div
        className="panel"
        style={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        <div className="panel-header">传感器与模型管理</div>

        <div style={{ padding: "15px", borderBottom: "1px solid #1a365d" }}>
          <div
            style={{ fontSize: "12px", color: "#8da2c0", marginBottom: "10px" }}
          >
            模型文件管理
          </div>
          <button
            style={{
              width: "100%",
              background: "#1a365d",
              color: "#00e5ff",
              border: "1px solid #00e5ff",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            + 上传自定义 3D 模型 (.glb)
          </button>
          <div
            style={{
              fontSize: "10px",
              color: "#666",
              marginTop: "5px",
              textAlign: "center",
            }}
          >
            该功能即将开放...
          </div>
        </div>

        <div style={{ flex: 1, padding: "15px", overflowY: "auto" }}>
          <div
            style={{ fontSize: "12px", color: "#8da2c0", marginBottom: "10px" }}
          >
            已标定传感器 ({globalSensors.length})
          </div>
          {globalSensors.length === 0 && (
            <div
              style={{
                padding: "20px",
                color: "#8da2c0",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              <p>当前桥梁模型暂无传感器节点。</p>
              <p>请在左侧 3D 模型表面点击鼠标，完成节点自动化标定。</p>
            </div>
          )}
          {globalSensors.map((sensor) => (
            <div
              key={sensor.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(255,255,255,0.05)",
                padding: "10px",
                marginBottom: "8px",
                borderRadius: "4px",
              }}
            >
              <div>
                <div style={{ color: "#fff", fontSize: "14px" }}>
                  {sensor.name} [{sensor.id}]
                </div>
                <div
                  style={{
                    color: "#8da2c0",
                    fontSize: "10px",
                    marginTop: "4px",
                  }}
                >
                  XYZ: {sensor.position[0].toFixed(2)},{" "}
                  {sensor.position[1].toFixed(2)},{" "}
                  {sensor.position[2].toFixed(2)}
                </div>
              </div>
              <button
                onClick={() => removeSensor(sensor.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff4d4f",
                  cursor: "pointer",
                }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelConfig;
