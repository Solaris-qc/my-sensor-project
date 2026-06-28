import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DataPanel = ({ sensor }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!sensor) return;

    setChartData(
      Array.from({ length: 10 }, (_, i) => ({
        time: new Date(Date.now() - (10 - i) * 1000).toLocaleTimeString(),
        value: Math.random() * 100,
      })),
    );

    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [
          ...prevData.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            value:
              sensor.status === "alarm"
                ? 80 + Math.random() * 40
                : 20 + Math.random() * 20,
          },
        ];
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sensor]);

  if (!sensor) {
    return (
      <div style={{ textAlign: "center", marginTop: "50%" }}>
        请在左侧模型中选择一个传感器节点
      </div>
    );
  }

  const currentStress =
    chartData.length > 0 ? chartData[chartData.length - 1].value.toFixed(2) : 0;
  const temperature = (20 + Math.random() * 5).toFixed(1);

  return (
    <div>
      <h2>{sensor.name} - 实时监控</h2>
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            padding: "15px",
            background: "#fff",
            borderRadius: "8px",
            flex: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>
            当前应力 (MPa)
          </h4>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: sensor.status === "alarm" ? "red" : "#333",
            }}
          >
            {currentStress}
          </span>
        </div>
        <div
          style={{
            padding: "15px",
            background: "#fff",
            borderRadius: "8px",
            flex: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h4 style={{ margin: "0 0 10px 0", color: "#666" }}>环境温度 (°C)</h4>
          <span style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            {temperature}
          </span>
        </div>
      </div>

      <div
        style={{
          height: "300px",
          width: "100%",
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxSizing: "border-box",
        }}
      >
        <h4 style={{ marginTop: 0 }}>历史趋势</h4>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={sensor.status === "alarm" ? "#ff0000" : "#8884d8"}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DataPanel;
