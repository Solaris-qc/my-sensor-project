import React from "react";
import ReactECharts from "echarts-for-react";

const BarChart = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "rgba(11,23,44,0.9)",
      textStyle: { color: "#fff" },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: ["S1", "S20", "S40", "S60", "S80", "S100", "S120"],
      axisLabel: { color: "#8da2c0" },
      axisLine: { lineStyle: { color: "#1a365d" } },
    },
    yAxis: {
      type: "value",
      name: "单位: mm",
      nameTextStyle: { color: "#8da2c0", padding: [0, 0, 0, -20] },
      axisLabel: { color: "#8da2c0" },
      splitLine: { lineStyle: { color: "#1a365d", type: "dashed" } },
    },
    series: [
      {
        name: "腐蚀厚度",
        type: "bar",
        barWidth: "60%",
        itemStyle: {
          color: function (params) {
            if (params.value > 0.4) return "#ffc000";
            if (params.value > 0.2) return "#00b050";
            return "#00e5ff";
          },
        },
        data: [0.15, 0.32, 0.45, 0.51, 0.28, 0.35, 0.22],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%", minHeight: "180px" }}
    />
  );
};

export default BarChart;
