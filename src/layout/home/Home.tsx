// src/components/home/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col, Button, Typography, Card, Grid } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  TeamOutlined,
  ThunderboltOutlined,
  GithubOutlined,
  LinkedinOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../redux/store";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

const OAUTH_GITHUB = "/auth/github";
const OAUTH_LINKEDIN = "/auth/linkedin";

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((s: RootState) => s.user);
  const mode = useSelector((s: RootState) => s.theme?.mode ?? "light");
  const screens = useBreakpoint();

  /* ---------------------------------------------------------
     Consistent THEME palette (exact same system as other pages)
  ----------------------------------------------------------- */
  const COLORS = {
    pageBg: mode === "dark" ? "#0d1117" : "#f4f6f9",
    cardBg: mode === "dark" ? "#1f2937" : "#ffffff",
    heroBg:
      mode === "dark"
        ? "linear-gradient(135deg,#111827,#000000)"
        : "linear-gradient(135deg,#ffffff,#f9fcff)",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    border: mode === "dark" ? "#374151" : "#e5e7eb",
    primary: "#1890ff",
    accent: "#faad14",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.pageBg,
        padding: "32px 12px",
        transition: "0.3s",
      }}
    >
      <div style={{ maxWidth: 1250, margin: "0 auto" }}>
        <Row gutter={[32, 32]} align="middle">
          {/* ---------------------------------------------------------
               LEFT SIDE — HERO AREA
          ----------------------------------------------------------- */}
          <Col xs={24} md={14}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                background: COLORS.heroBg,
                padding: screens.xs ? 20 : 40,
                boxShadow:
                  mode === "dark"
                    ? "0 8px 26px rgba(0,0,0,0.55)"
                    : "0 8px 26px rgba(0,0,0,0.08)",
                border: `1px solid ${COLORS.border}`,
                backdropFilter: "blur(6px)",
              }}
            >
              <Title
                style={{
                  color: COLORS.text,
                  marginBottom: 4,
                  fontSize: screens.xs ? 28 : 42,
                  fontWeight: 800,
                  lineHeight: 1.2,
                }}
              >
                Build. Share. Connect.
              </Title>

              <Title
                level={2}
                style={{
                  color: COLORS.primary,
                  margin: 0,
                  fontSize: screens.xs ? 22 : 32,
                  fontWeight: 700,
                }}
              >
                React Developer Community
              </Title>

              <Paragraph
                style={{
                  color: COLORS.muted,
                  marginTop: 16,
                  fontSize: screens.xs ? 14 : 18,
                }}
              >
                Create your profile, explore developers, share posts, and
                collaborate — powered by MERN + Redux Toolkit + Ant Design.
              </Paragraph>

              {/* ---------------------------------------------------------
                   AUTH BUTTONS (Login, Register, OAuth)
              ----------------------------------------------------------- */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginTop: 20,
                }}
              >
                {!isAuthenticated ? (
                  <>
                    <Link to="/users/register">
                      <Button
                        type="primary"
                        size={screens.xs ? "middle" : "large"}
                        icon={<UserAddOutlined />}
                      >
                        Register
                      </Button>
                    </Link>

                    <Link to="/users/login">
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<LoginOutlined />}
                      >
                        Login
                      </Button>
                    </Link>

                    <a href={OAUTH_GITHUB}>
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<GithubOutlined />}
                      >
                        GitHub
                      </Button>
                    </a>

                    <a href={OAUTH_LINKEDIN}>
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<LinkedinOutlined />}
                      >
                        LinkedIn
                      </Button>
                    </a>
                  </>
                ) : (
                  <>
                    <Link to="/profiles/dashboard">
                      <Button
                        type="primary"
                        size={screens.xs ? "middle" : "large"}
                        icon={<DashboardOutlined />}
                      >
                        Dashboard
                      </Button>
                    </Link>

                    <Link to="/profiles/dashboard">
                      <Button
                        size={screens.xs ? "middle" : "large"}
                        icon={<UserOutlined />}
                      >
                        View Profile
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Card>
          </Col>

          {/* ---------------------------------------------------------
               RIGHT SIDE — FEATURES GRID
          ----------------------------------------------------------- */}
          <Col xs={24} md={10}>
            <Row gutter={[20, 20]}>
              {/* Feature 1 */}
              <Col xs={24} sm={12}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 20,
                    background: COLORS.cardBg,
                    border: `1px solid ${COLORS.border}`,
                    boxShadow:
                      mode === "dark"
                        ? "0 6px 16px rgba(0,0,0,0.45)"
                        : "0 6px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <TeamOutlined
                    style={{
                      fontSize: 32,
                      color: COLORS.primary,
                    }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 12, color: COLORS.text }}
                  >
                    Meet Developers
                  </Title>
                  <Paragraph style={{ color: COLORS.muted, marginBottom: 0 }}>
                    Discover community members & collaborate.
                  </Paragraph>
                </Card>
              </Col>

              {/* Feature 2 */}
              <Col xs={24} sm={12}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 20,
                    background: COLORS.cardBg,
                    border: `1px solid ${COLORS.border}`,
                    boxShadow:
                      mode === "dark"
                        ? "0 6px 16px rgba(0,0,0,0.45)"
                        : "0 6px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <ThunderboltOutlined
                    style={{
                      fontSize: 32,
                      color: COLORS.accent,
                    }}
                  />
                  <Title
                    level={4}
                    style={{ marginTop: 12, color: COLORS.text }}
                  >
                    Share Posts
                  </Title>
                  <Paragraph style={{ color: COLORS.muted, marginBottom: 0 }}>
                    Ask questions, share knowledge & updates.
                  </Paragraph>
                </Card>
              </Col>

              {/* Feature 3 */}
              <Col xs={24}>
                <Card
                  bordered={false}
                  style={{
                    borderRadius: 14,
                    padding: 20,
                    background: COLORS.cardBg,
                    border: `1px solid ${COLORS.border}`,
                    boxShadow:
                      mode === "dark"
                        ? "0 6px 16px rgba(0,0,0,0.45)"
                        : "0 6px 16px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "center" }}
                  >
                    <GithubOutlined
                      style={{ fontSize: 32, color: COLORS.text }}
                    />
                    <div>
                      <Title
                        level={5}
                        style={{ margin: 0, color: COLORS.text }}
                      >
                        Showcase Projects
                      </Title>
                      <Text style={{ color: COLORS.muted }}>
                        Highlight your open-source work.
                      </Text>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
