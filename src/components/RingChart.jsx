import React from "react";
import ReactECharts from "echarts-for-react";

const RingChart = () => {
  const option = {
    // 鼠标悬浮提示
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(16, 32, 64, 0.9)",
      borderColor: "#00e5ff",
      textStyle: { color: "#fff" },
    },
    // 图例配置：放在右侧垂直排列
    legend: {
      orient: "vertical",
      right: "5%",
      top: "center",
      itemWidth: 10,
      itemHeight: 10,
      textStyle: { color: "#aaa", fontSize: 12 },
      // 自定义图例文字，加上数值和百分比
      formatter: function (name) {
        const data = [
          { name: "正常", value: 98, percent: "76.6%" },
          { name: "预警", value: 18, percent: "14.1%" },
          { name: "报警", value: 8, percent: "6.3%" },
          { name: "离线", value: 4, percent: "3.1%" },
        ];
        const item = data.find((d) => d.name === name);
        return `${name}    ${item.value} (${item.percent})`;
      },
    },
    // 核心数据系列
    series: [
      {
        name: "传感器状态",
        type: "pie",
        radius: ["50%", "75%"], // 设置内半径和外半径，形成环形
        center: ["30%", "50%"], // 把环形靠左放，给右侧图例留出空间
        avoidLabelOverlap: false,
        label: { show: false }, // 隐藏饼图上的连线标签
        labelLine: { show: false },
        data: [
          { value: 98, name: "正常", itemStyle: { color: "#00b050" } }, // 绿色
          { value: 18, name: "预警", itemStyle: { color: "#ffc000" } }, // 橙色
          { value: 8, name: "报警", itemStyle: { color: "#ff0000" } }, // 红色
          { value: 4, name: "离线", itemStyle: { color: "#5b9bd5" } }, // 蓝色
        ],
      },
    ],
  };

  return (
    // 使用 echarts-for-react 渲染，外层 div 控制相对定位，用于放置中心文字
    <div
      style={{
        position: "relative",
        height: "100%",
        width: "100%",
        minHeight: "180px",
      }}
    >
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
      {/* 环形正中间的文字统计 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "30%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          pointerEvents: "none", // 防止挡住图表的鼠标交互
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold", color: "#fff" }}>
          128
        </div>
        <div style={{ fontSize: "12px", color: "#aaa" }}>总数</div>
      </div>
    </div>
  );
};

export default RingChart;
