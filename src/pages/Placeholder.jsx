import React from "react";

const Placeholder = ({ title }) => {
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
          {title}
        </div>
      </div>
      <div
        className="content-body"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#8da2c0" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>🚧</div>
          <h2 style={{ letterSpacing: "2px" }}>
            {title} 模块正在接入真实数据与三维资产
          </h2>
          <p>System under active development...</p>
        </div>
      </div>
    </>
  );
};

export default Placeholder;
