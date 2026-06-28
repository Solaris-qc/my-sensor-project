import React, { useMemo } from "react";
import ReactECharts from "echarts-for-react";

const RingChart = ({ sensors = [] }) => {
  // 动态计算传感器状态数量
  const total = sensors.length;
  const alarmCount = sensors.filter((s) => s.status === "alarm").length;
  const normalCount = total - alarmCount;

  // 使用 useMemo 优化，只有当状态变化时才重新渲染图表配置
  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(11,23,44,0.8)",
        borderColor: "#1a365d",
        textStyle: { color: "#fff" },
      },
      legend: {
        bottom: "0%",
        left: "center",
        textStyle: { color: "#8da2c0", fontSize: 10 },
        itemWidth: 10,
        itemHeight: 10,
      },
      series: [
        {
          name: "传感器状态",
          type: "pie",
          radius: ["55%", "75%"],
          center: ["50%", "45%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "center",
            formatter: () => `{total|${total}}\n{text|总节点数}`,
            rich: {
              total: {
                fontSize: 24,
                fontWeight: "bold",
                color: "#fff",
                padding: [0, 0, 5, 0],
              },
              text: { fontSize: 12, color: "#8da2c0" },
            },
          },
          labelLine: { show: false },
          data:
            total === 0
              ? [
                  {
                    value: 0,
                    name: "暂无节点",
                    itemStyle: { color: "#1a365d" },
                  },
                ]
              : [
                  {
                    value: normalCount,
                    name: "在线/正常",
                    itemStyle: { color: "#00e5ff" },
                  },
                  {
                    value: alarmCount,
                    name: "异常/报警",
                    itemStyle: { color: "#ff4d4f" },
                  },
                ].filter((item) => item.value > 0), // 只显示有数据的色块
        },
      ],
    };
  }, [total, alarmCount, normalCount]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default RingChart;
