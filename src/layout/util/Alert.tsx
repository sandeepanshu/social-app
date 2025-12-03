/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert as AntAlert } from "antd";
import type { RootState } from "../../redux/store";
import { removeAlert } from "../../redux/alerts/alert.slice";

const Alert: React.FC = () => {
  // NOTE: your alerts reducer path is `state.alerts.alerts`
  const alerts = useSelector((state: RootState) => state.alerts?.alerts ?? []);
  const dispatch = useDispatch();
  const [visibleAlerts, setVisibleAlerts] = useState<string[]>([]);

  useEffect(() => {
    if (!alerts || alerts.length === 0) return;

    alerts.forEach((alert: any) => {
      if (!visibleAlerts.includes(alert.id)) {
        setVisibleAlerts((prev) => [...prev, alert.id]);

        // Remove after 3s (also keep local visible list in sync)
        setTimeout(() => {
          dispatch(removeAlert(alert.id));
          setVisibleAlerts((prev) => prev.filter((id) => id !== alert.id));
        }, 3000);
      }
    });
  }, [alerts, dispatch, visibleAlerts]);

  if (!alerts || alerts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none", // let clicks pass through margins
      }}
    >
      {alerts.map((alert: any) => (
        <div key={alert.id} style={{ pointerEvents: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
          <AntAlert
            message={alert.message}
            type={alert.color === "danger" ? "error" : (alert.color as any) || "info"}
            showIcon
            closable
            onClose={() => dispatch(removeAlert(alert.id))}
            style={{ marginBottom: 8, maxWidth: 640, width: "calc(100% - 24px)" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Alert;
