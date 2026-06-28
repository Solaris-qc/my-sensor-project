import React from "react";

const EnvFlow = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "15px",
      }}
    >
      {/* 环境指标 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        {[
          { label: "环境温度", val: "26.3 °C", color: "#ff4d4f" },
          { label: "相对湿度", val: "68.5 %RH", color: "#00e5ff" },
          { label: "大气压", val: "101.2 kPa", color: "#00e5ff" },
        ].map((item, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                background: item.color,
                borderRadius: "50%",
              }}
            ></div>
            <div>
              <div style={{ fontSize: "11px", color: "#8da2c0" }}>
                {item.label}
              </div>
              <div
                style={{ fontSize: "14px", color: "#fff", fontWeight: "bold" }}
              >
                {item.val}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 算法流向图 */}
      <div
        style={{
          flex: 1,
          background: "rgba(0,0,0,0.2)",
          borderRadius: "6px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#8da2c0",
            fontSize: "11px",
            textAlign: "center",
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "5px" }}>原始信号</div>
            <div style={{ color: "#ff4d4f" }}>〰</div>
          </div>
          <div style={{ color: "#00e5ff", margin: "0 5px" }}>➔</div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "5px" }}>温度影响</div>
            <div
              style={{
                border: "1px solid #1a365d",
                padding: "2px",
                borderRadius: "4px",
              }}
            >
              🌡️
            </div>
          </div>
          <div style={{ color: "#00e5ff", margin: "0 5px" }}>➔</div>

          <div style={{ flex: 1.5 }}>
            <div style={{ marginBottom: "5px" }}>补偿算法</div>
            <div
              style={{
                color: "#00e5ff",
                background: "rgba(0, 229, 255, 0.1)",
                padding: "4px",
                borderRadius: "4px",
                fontSize: "12px",
              }}
            >
              Δλ = k * ΔT
            </div>
          </div>
          <div style={{ color: "#00e5ff", margin: "0 5px" }}>➔</div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "5px" }}>补偿信号</div>
            <div style={{ color: "#00ffaa" }}>〰</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "15px",
            fontSize: "11px",
          }}
        >
          <span style={{ color: "#00ffaa" }}>状态：正常</span>
          <span style={{ color: "#00ffaa" }}>精度：± 1.2 με</span>
        </div>
      </div>
    </div>
  );
};

export default EnvFlow;
