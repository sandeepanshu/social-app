import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, Alert } from "antd";
import { LoginOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import type { UserView } from "../../../modules/users/models/UserView";
import { loginUser } from "../../../redux/users/user.actions";
import type { RootState } from "../../../redux/store";
import Spinner from "../../../layout/util/Spinner";

const { Title, Paragraph } = Typography;

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, error } = useSelector(
    (state: RootState) => state.user
  );

  const themeMode = useSelector((state: RootState) => state.theme.mode);

  // 🌙 Theme-based colors
  const COLORS = {
    pageBg: themeMode === "dark" ? "#0d1117" : "#f0f2f5",
    cardBg: themeMode === "dark" ? "#1f2937" : "#ffffff",
    text: themeMode === "dark" ? "#e5e7eb" : "#111827",
    muted: themeMode === "dark" ? "#9ca3af" : "#555",
    border: themeMode === "dark" ? "#374151" : "#d9d9d9",
    shadow:
      themeMode === "dark"
        ? "0 8px 30px rgba(0,0,0,0.55)"
        : "0 8px 30px rgba(0,0,0,0.08)",
  };

  // Redirect user after login
  useEffect(() => {
    if (isAuthenticated) navigate("/profiles/dashboard");
  }, [isAuthenticated, navigate]);

  const onFinish = (values: UserView) => {
    dispatch(loginUser({ user: values }));
  };

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
        <Spinner tip="Logging in..." />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background: COLORS.pageBg,
        transition: "0.3s ease-in-out",
      }}
    >
      <Card
        style={{
          width: 450,
          minHeight: 520,
          borderRadius: 16,
          padding: "20px 10px",
          background: COLORS.cardBg,
          boxShadow: COLORS.shadow,
          border: `1px solid ${COLORS.border}`,
          transition: "0.3s ease",
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: 10,
            color: COLORS.text,
          }}
        >
          <LoginOutlined /> Login to Your Account
        </Title>

        <Paragraph
          style={{
            textAlign: "center",
            marginBottom: 32,
            color: COLORS.muted,
            fontSize: 15,
          }}
        >
          Welcome back! Enter your credentials to continue.
        </Paragraph>

        {error && (
          <Alert
            message="Login Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        <Form
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 20, color: COLORS.text }}
          disabled={loading}
        >
          {/* Email */}
          <Form.Item
            label={<span style={{ color: COLORS.text }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Email is required" },
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
            label={<span style={{ color: COLORS.text }}>Password</span>}
            name="password"
            rules={[
              { required: true, message: "Password is required" },
              { min: 6, message: "Minimum 6 characters" },
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

          <Form.Item style={{ marginTop: 30 }}>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              block
              icon={<LoginOutlined />}
              loading={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 15 }}>
            <span style={{ color: COLORS.muted }}>Don't have an account?</span>{" "}
            <Link to="/users/register">
              <strong>Create account</strong>
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default UserLogin;
