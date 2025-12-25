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
        height: "100vh",
        width: "100%",
      }}
    >
      <Spin tip={tip} size={size} />
    </div>
  );
};

export default Spinner;
