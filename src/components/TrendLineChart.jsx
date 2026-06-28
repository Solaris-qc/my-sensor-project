import React from "react";
import ReactECharts from "echarts-for-react";

const TrendLineChart = () => {
  const option = {
    // 悬浮提示框，展示多条线同时的数据
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(16, 32, 64, 0.9)",
      borderColor: "#00e5ff",
      textStyle: { color: "#fff" },
    },
    // 顶部图例
    legend: {
      top: 0,
      right: "10%",
      textStyle: { color: "#aaa" },
      icon: "circle",
    },
    // 图表在容器中的占位边距
    grid: {
      left: "3%",
      right: "4%",
      bottom: "5%",
      top: "15%",
      containLabel: true,
    },
    // X轴：时间序列
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19"],
      axisLabel: { color: "#aaa" },
      axisLine: { lineStyle: { color: "#334" } },
    },
    // Y轴：数值
    yAxis: {
      type: "value",
      name: "单位: mm",
      nameTextStyle: { color: "#aaa", padding: [0, 0, 0, -30] },
      axisLabel: { color: "#aaa" },
      splitLine: { lineStyle: { color: "#1a365d", type: "dashed" } }, // 科技感虚线网格
    },
    // 数据系列：多条折线
    series: [
      {
        name: "S03",
        type: "line",
        symbol: "none", // 去掉节点上的小圆点，看起来更清爽
        lineStyle: { color: "#00e5ff", width: 2 },
        data: [0.15, 0.16, 0.18, 0.17, 0.19, 0.21, 0.25],
      },
      {
        name: "S15",
        type: "line",
        symbol: "none",
        lineStyle: { color: "#00b050", width: 2 },
        data: [0.22, 0.24, 0.26, 0.27, 0.26, 0.28, 0.32],
      },
      {
        name: "S61",
        type: "line",
        symbol: "none",
        lineStyle: { color: "#ff0000", width: 2 },
        data: [0.32, 0.35, 0.38, 0.41, 0.42, 0.45, 0.48],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%", minHeight: "200px" }}
    />
  );
};

export default TrendLineChart;
