import React from "react";
import ReactECharts from "echarts-for-react";

const TrendLineChart = ({ data = [] }) => {
  // 提取 X 轴（时间）和 Y 轴（数值）数据
  const xData = data.map((item) => item.time);
  const yData = data.map((item) => item.value);

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(11,23,44,0.8)",
      borderColor: "#1a365d",
      textStyle: { color: "#fff" },
    },
    grid: { top: 30, right: 20, bottom: 30, left: 40 },
    xAxis: {
      type: "category",
      data: xData,
      axisLine: { lineStyle: { color: "#1a365d" } },
      axisLabel: { color: "#8da2c0", fontSize: 10 },
      splitLine: { show: false },
    },
    yAxis: {
      type: "value",
      min: "dataMin", // Y轴根据数据动态缩放
      axisLine: { show: false },
      axisLabel: { color: "#8da2c0", fontSize: 10 },
      splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
    },
    series: [
      {
        name: "平均应变",
        data: yData,
        type: "line",
        smooth: true,
        symbol: "none", // 去掉圆点，让曲线更平滑
        lineStyle: { color: "#00e5ff", width: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(0, 229, 255, 0.3)" },
              { offset: 1, color: "rgba(0, 229, 255, 0)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactECharts
        option={option}
        style={{ height: "100%", width: "100%" }}
        notMerge={false}
        lazyUpdate={true}
      />
    </div>
  );
};

export default TrendLineChart;
