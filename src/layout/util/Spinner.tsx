import React from "react";
import { Spin } from "antd";

interface SpinnerProps {
  tip?: string;
  size?: "small" | "default" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({
  tip = "Loading...",
  size = "large",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "200px",
        width: "100%",
      }}
    >
      <Spin tip={tip} size={size}>
        <div style={{ width: 0, height: 0 }} />
      </Spin>
    </div>
  );
};

export default Spinner;
