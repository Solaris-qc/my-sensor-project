import React from "react";

const ProcessLog = () => {
  // 模拟系统日志数据
  const logs = [
    {
      time: "14:35:20",
      msg: "无人机 UAV-03 桥底巡检图像回传完成",
      type: "info",
    },
    { time: "14:35:18", msg: "多模态智能体触发病害识别模块", type: "info" },
    {
      time: "14:35:15",
      msg: "RAG 检索匹配历史裂缝特征数据库 (12条记录)",
      type: "warning",
    },
    {
      time: "14:35:10",
      msg: "大语言模型完成结构安全状态综合评估",
      type: "success",
    },
    {
      time: "14:34:55",
      msg: "接收节点 Node-07 传感器数据包 (128 bytes)",
      type: "info",
    },
  ];

  const Arrow = () => (
    <div style={{ color: "#1a365d", fontWeight: "bold", margin: "0 5px" }}>
      ➔
    </div>
  );

  const StepBlock = ({ icon, text, active }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: `1px solid ${active ? "#00e5ff" : "#1a365d"}`,
          background: active ? "rgba(0, 229, 255, 0.1)" : "transparent",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: active ? "#00e5ff" : "#8da2c0",
          fontSize: "18px",
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: active ? "#fff" : "#8da2c0",
          textAlign: "center",
          whiteSpace: "nowrap",
          transform: "scale(0.9)",
        }}
      >
        {text}
      </div>
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "15px",
        padding: "0 10px",
      }}
    >
      {/* 顶部：高级智能体数据处理流程图 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <StepBlock icon="🚁" text="无人机巡检" active={false} />
        <Arrow />
        <StepBlock icon="👁️" text="多模态识别" active={true} />
        <Arrow />
        <StepBlock icon="🧠" text="RAG 知识检索" active={false} />
        <Arrow />
        <StepBlock icon="🤖" text="LLM 状态评估" active={true} />
        <Arrow />
        <StepBlock icon="📊" text="维护决策输出" active={false} />
      </div>

      {/* 底部：系统实时日志 */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <span
            style={{ fontSize: "14px", color: "#8da2c0", fontWeight: "bold" }}
          >
            系统实时日志
          </span>
          <span
            style={{ fontSize: "12px", color: "#00e5ff", cursor: "pointer" }}
          >
            更多 {">"}
          </span>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          {logs.map((log, index) => (
            <div
              key={index}
              style={{ marginBottom: "8px", display: "flex", gap: "10px" }}
            >
              <span style={{ color: "#8da2c0" }}>[{log.time}]</span>
              <span
                style={{
                  color:
                    log.type === "success"
                      ? "#00ffaa"
                      : log.type === "warning"
                        ? "#ffc000"
                        : "#fff",
                }}
              >
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessLog;
