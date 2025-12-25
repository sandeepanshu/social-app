import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Avatar, Typography, Button } from "antd";
import { UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import type { RootState } from "../../../redux/store";
import type { IDeveloper } from "../../developers/models/IDeveloper";
import { FETCH_ALL_DEVELOPERS } from "../../../redux/developers/developer.types";
import Spinner from "../../../layout/util/Spinner";

const { Title, Text } = Typography;

const DeveloperList: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, developers } = useSelector(
    (state: RootState) => state.developer
  );
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    dispatch({ type: FETCH_ALL_DEVELOPERS });
  }, [dispatch]);

  /* ---------------------------------------------
     THEME COLORS
  ---------------------------------------------- */
  const COLORS = {
    pageBg: mode === "dark" ? "#0d1117" : "#f4f6f9",
    cardBg: mode === "dark" ? "#1f2937" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    border: mode === "dark" ? "#374151" : "#e5e7eb",
  };

  return (
    <div
      style={{
        padding: 32,
        minHeight: "100vh",
        background: COLORS.pageBg,
        transition: "0.3s",
      }}
    >
      <Title level={2} style={{ marginBottom: 8, color: COLORS.text }}>
        👨‍💻 Developers
      </Title>
      <Text style={{ fontSize: 16, color: COLORS.muted }}>
        Explore talented developers, view their profiles, and collaborate.
      </Text>

      {/* ---------------------------------------------
          LOADING SPINNER
      ---------------------------------------------- */}
      {loading ? (
          <Spinner size="large" />
    
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {developers && developers.length ? (
            developers.map((developer: IDeveloper) => {
              const userObj =
                typeof developer.user === "string" || !developer.user
                  ? { name: "Unknown", avatar: undefined }
                  : developer.user;

              return (
                <Col xs={24} md={12} lg={8} key={developer._id}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: 14,
                      background: COLORS.cardBg,
                      border: `1px solid ${COLORS.border}`,
                      boxShadow:
                        mode === "dark"
                          ? "0 6px 14px rgba(0,0,0,0.45)"
                          : "0 4px 14px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                    }}
                    bodyStyle={{ padding: 20 }}
                  >
                    {/* ---------------------------------------------
                        Developer Header (Avatar + Basic Info)
                    ---------------------------------------------- */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        marginBottom: 12,
                      }}
                    >
                      <Avatar
                        size={64}
                        src={userObj?.avatar}
                        icon={!userObj?.avatar && <UserOutlined />}
                        style={{
                          border:
                            mode === "dark"
                              ? "2px solid #374151"
                              : "2px solid #e5e7eb",
                        }}
                      />

                      <div>
                        <Title
                          level={4}
                          style={{
                            margin: 0,
                            color: COLORS.text,
                          }}
                        >
                          {userObj?.name}
                        </Title>

                        <Text style={{ color: COLORS.muted }}>
                          {developer.designation || "—"}
                        </Text>
                        <br />
                        <Text style={{ color: COLORS.text }}>
                          {developer.company || "—"}
                        </Text>
                        <br />
                        <Text style={{ color: COLORS.muted }}>
                          {developer.location || "—"}
                        </Text>
                      </div>
                    </div>

                    {/* ---------------------------------------------
                        Skills Section (Beautiful Chips)
                    ---------------------------------------------- */}
                    <div style={{ marginTop: 16 }}>
                      <Title level={5} style={{ color: COLORS.text }}>
                        Skills
                      </Title>

                      {developer.skills?.length ? (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                          }}
                        >
                          {developer.skills.map((skill) => (
                            <div
                              key={skill}
                              style={{
                                padding: "6px 12px",
                                borderRadius: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 600,
                                background:
                                  mode === "dark"
                                    ? "linear-gradient(135deg,#1f2937,#111827)"
                                    : "linear-gradient(135deg,#e6f7ff,#bae6fd)",
                                color: mode === "dark" ? "#e5e7eb" : "#0a2540",
                                border:
                                  mode === "dark"
                                    ? "1px solid #374151"
                                    : "1px solid #91d5ff",
                                boxShadow:
                                  mode === "dark"
                                    ? "0 4px 12px rgba(0,0,0,0.35)"
                                    : "0 4px 12px rgba(0,0,0,0.08)",
                              }}
                            >
                              <CheckCircleOutlined
                                style={{
                                  color:
                                    mode === "dark" ? "#4ade80" : "#08979c",
                                }}
                              />
                              {skill}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Text style={{ color: COLORS.muted }}>
                          No skills added.
                        </Text>
                      )}
                    </div>

                    {/* ---------------------------------------------
                        View Profile Button
                    ---------------------------------------------- */}
                    <Link to={`/developers/${developer._id}`}>
                      <Button
                        type="primary"
                        block
                        style={{
                          marginTop: 16,
                          fontWeight: 600,
                        }}
                      >
                        View Profile
                      </Button>
                    </Link>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col span={24}>
              <Card
                style={{
                  background: COLORS.cardBg,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <Text style={{ color: COLORS.muted }}>
                  No developers found.
                </Text>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default DeveloperList;
