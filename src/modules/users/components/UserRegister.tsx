import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import { registerUser } from "../../../redux/users/user.actions";
import type { RootState } from "../../../redux/store";
import Spinner from "../../../layout/util/Spinner";
import type { UserView } from "../models/UserView";

const { Title } = Typography;

const UserRegister: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isRegistered, error, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const themeMode = useSelector((state: RootState) => state.theme.mode);

  /* ---------------------------
     THEME COLORS
  ---------------------------- */
  const COLORS = {
    pageBg: themeMode === "dark" ? "#0d1117" : "#f0f2f5",
    cardBg: themeMode === "dark" ? "#1f2937" : "#ffffff",
    text: themeMode === "dark" ? "#e5e7eb" : "#111827",
    muted: themeMode === "dark" ? "#9ca3af" : "#555",
    border: themeMode === "dark" ? "#374151" : "#d9d9d9",
    shadow:
      themeMode === "dark"
        ? "0 8px 35px rgba(0,0,0,0.50)"
        : "0 8px 30px rgba(0,0,0,0.08)",
  };

  /* ---------------------------
     REDIRECTION LOGIC
  ---------------------------- */
  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => navigate("/users/login"), 2000);
    }
  }, [isRegistered, navigate]);

  useEffect(() => {
    if (isAuthenticated) navigate("/profiles/dashboard");
  }, [isAuthenticated, navigate]);

  /* ---------------------------
     SUBMIT HANDLER
  ---------------------------- */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    const userData: UserView = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dispatch(registerUser({ user: userData }));
  };

  /* ---------------------------
     LOADING STATE
  ---------------------------- */
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: COLORS.pageBg,
        }}
      >
        <Spinner tip="Creating your account..." />
      </div>
    );
  }

  /* ---------------------------
     RETURN UI
  ---------------------------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: COLORS.pageBg,
        transition: "0.3s ease",
      }}
    >
      <Card
        style={{
          width: 420,
          minHeight: 550,
          padding: "25px 20px",
          borderRadius: 16,
          background: COLORS.cardBg,
          color: COLORS.text,
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`,
          transition: "0.3s ease",
        }}
      >
        <Title
          level={2}
          style={{ textAlign: "center", color: COLORS.text, marginBottom: 25 }}
        >
          Create Account
        </Title>

        {/* SUCCESS MESSAGE */}
        {isRegistered && (
          <Alert
            type="success"
            showIcon
            message="Registration Successful"
            description="Redirecting you to login..."
            icon={<CheckCircleOutlined />}
            style={{ marginBottom: 20 }}
          />
        )}

        {/* ERROR MESSAGE */}
        {error && !isRegistered && (
          <Alert
            type="error"
            showIcon
            message="Registration Error"
            description={error}
            style={{ marginBottom: 20 }}
            closable
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          disabled={loading || isRegistered}
        >
          {/* Name */}
          <Form.Item
            name="name"
            label={<span style={{ color: COLORS.text }}>Full Name</span>}
            rules={[
              { required: true, message: "Please enter your full name" },
              { min: 2, message: "Name must be at least 2 characters" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
              style={{
                background: themeMode === "dark" ? "#111827" : "#fff",
                color: COLORS.text,
                borderColor: COLORS.border,
              }}
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label={<span style={{ color: COLORS.text }}>Email</span>}
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              style={{
                background: themeMode === "dark" ? "#111827" : "#fff",
                color: COLORS.text,
                borderColor: COLORS.border,
              }}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            label={<span style={{ color: COLORS.text }}>Password</span>}
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              style={{
                background: themeMode === "dark" ? "#111827" : "#fff",
                color: COLORS.text,
                borderColor: COLORS.border,
              }}
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label={<span style={{ color: COLORS.text }}>Confirm Password</span>}
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue("password") === value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              style={{
                background: themeMode === "dark" ? "#111827" : "#fff",
                color: COLORS.text,
                borderColor: COLORS.border,
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            disabled={isRegistered}
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <div style={{ textAlign: "center", marginTop: 15 }}>
            <span style={{ color: COLORS.muted }}>
              Already have an account?
            </span>{" "}
            <Button type="link" onClick={() => navigate("/users/login")}>
              Login here
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserRegister;
