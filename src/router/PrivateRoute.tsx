import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Spinner from "../layout/util/Spinner";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.user
  );

  // Show spinner while checking authentication
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Spinner tip="Checking authentication..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/users/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default PrivateRoute;
