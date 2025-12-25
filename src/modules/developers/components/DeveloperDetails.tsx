import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Avatar,
  Typography,
  Tag,
  Divider,
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../../redux/store";
import type { IDeveloper } from "../../developers/models/IDeveloper";
import { FETCH_DEVELOPER } from "../../../redux/developers/developer.types";
import Spinner from "../../../layout/util/Spinner";

const { Title, Text, Paragraph } = Typography;

const DeveloperDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { developerId } = useParams<{ developerId: string }>();

  const { loading, selectedDeveloper } = useSelector(
    (state: RootState) => state.developer
  );
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (developerId) {
      dispatch({ type: FETCH_DEVELOPER, payload: { profileId: developerId } });
    }
  }, [developerId, dispatch]);

  if (loading || !selectedDeveloper) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <Spinner size="large" />
      </div>
    );
  }

  const dev: IDeveloper = selectedDeveloper;
  const userObj =
    typeof dev.user === "string" || !dev.user
      ? { name: "Unknown", avatar: undefined }
      : dev.user;

  /* ---------------------------------------------
     COLORS BASED ON THEME
  ---------------------------------------------- */
  const COLORS = {
    pageBg: mode === "dark" ? "#0d1117" : "#f4f6f9",
    cardBg: mode === "dark" ? "#1f2937" : "#ffffff",
    cardBorder: mode === "dark" ? "#374151" : "#e5e7eb",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    primary: "#1890ff",
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
      {/* --------------------------------------
            Header Card
      --------------------------------------- */}
      <Card
        style={{
          borderRadius: 12,
          marginBottom: 24,
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
        }}
        bodyStyle={{ padding: 24 }}
      >
        <Row gutter={24} align="middle">
          <Col xs={24} md={6} style={{ textAlign: "center" }}>
            <Avatar
              size={150}
              src={userObj?.avatar}
              icon={<UserOutlined />}
              style={{
                border: `4px solid ${COLORS.primary}`,
                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.15)",
              }}
            />

            <Title
              level={3}
              style={{
                marginTop: 16,
                color: COLORS.text,
              }}
            >
              {userObj?.name || "Unknown"}
            </Title>

            <Text strong style={{ color: COLORS.text }}>
              {dev.designation || "—"}
            </Text>
            <br />
            <Text style={{ color: COLORS.text }}>
              {dev.company || "—"}
            </Text>
            <br />
            <Text type="secondary" style={{ color: COLORS.muted }}>
              {dev.location || "—"}
            </Text>
          </Col>

          <Col xs={24} md={18}>
            <Title level={4} style={{ color: COLORS.text }}>
              About
            </Title>
            <Paragraph style={{ color: COLORS.muted }}>
              {dev.bio || "No biography available."}
            </Paragraph>

            <Divider style={{ borderColor: COLORS.cardBorder }} />

            <Title level={4} style={{ color: COLORS.text }}>
              Social Links
            </Title>
            <Row gutter={16}>
              {dev.social &&
                Object.entries(dev.social).map(([platform, url]) =>
                  url ? (
                    <Col key={platform}>
                      <a
                        href={url}
                        style={{ textDecoration: "none" }}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Tag
                          color="blue"
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontWeight: 600,
                          }}
                        >
                          {platform.toUpperCase()}
                        </Tag>
                      </a>
                    </Col>
                  ) : null
                )}
            </Row>
          </Col>
        </Row>
      </Card>

      {/* --------------------------------------
            Skills Section
      --------------------------------------- */}
      <Card
        title={
          <span style={{ color: COLORS.text, fontSize: 18 }}>
            Skills
          </span>
        }
        style={{
          borderRadius: 12,
          marginBottom: 24,
          background: COLORS.cardBg,
          border: `1px solid ${COLORS.cardBorder}`,
        }}
        bodyStyle={{ padding: 24 }}
      >
        {dev.skills?.length ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {dev.skills.map((skill) => (
              <div
                key={skill}
                style={{
                  padding: "6px 14px",
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
                  border: mode === "dark"
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
                    color: mode === "dark" ? "#4ade80" : "#08979c",
                  }}
                />
                {skill}
              </div>
            ))}
          </div>
        ) : (
          <Text style={{ color: COLORS.muted }}>No skills added.</Text>
        )}
      </Card>

      <Row gutter={24}>
        {/* --------------------------------------
              Experience Section
        --------------------------------------- */}
        <Col xs={24} md={12}>
          <Card
            title={
              <span style={{ color: COLORS.text }}>Experience</span>
            }
            style={{
              borderRadius: 12,
              marginBottom: 24,
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.cardBorder}`,
            }}
            bodyStyle={{ padding: 24 }}
          >
            {dev.experience?.length ? (
              dev.experience.map((exp) => (
                <Card
                  key={exp._id}
                  style={{
                    marginBottom: 12,
                    background: COLORS.pageBg,
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 10,
                  }}
                >
                  <Title level={5} style={{ color: COLORS.text }}>
                    {exp.title}
                  </Title>
                  <Text strong style={{ color: COLORS.text }}>
                    {exp.company}
                  </Text>
                  <br />
                  <Text style={{ color: COLORS.text }}>
                    {exp.location}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ color: COLORS.muted }}>
                    {exp.from} - {exp.to || "Current"}
                  </Text>
                  <Paragraph style={{ color: COLORS.muted }}>
                    {exp.description}
                  </Paragraph>
                </Card>
              ))
            ) : (
              <Text style={{ color: COLORS.muted }}>
                No experience added.
              </Text>
            )}
          </Card>
        </Col>

        {/* --------------------------------------
              Education Section
        --------------------------------------- */}
        <Col xs={24} md={12}>
          <Card
            title={
              <span style={{ color: COLORS.text }}>Education</span>
            }
            style={{
              borderRadius: 12,
              marginBottom: 24,
              background: COLORS.cardBg,
              border: `1px solid ${COLORS.cardBorder}`,
            }}
            bodyStyle={{ padding: 24 }}
          >
            {dev.education?.length ? (
              dev.education.map((edu) => (
                <Card
                  key={edu._id}
                  style={{
                    marginBottom: 12,
                    background: COLORS.pageBg,
                    border: `1px solid ${COLORS.cardBorder}`,
                    borderRadius: 10,
                  }}
                >
                  <Title level={5} style={{ color: COLORS.text }}>
                    {edu.degree}
                  </Title>
                  <Text strong style={{ color: COLORS.text }}>
                    {edu.school}
                  </Text>
                  <br />
                  <Text style={{ color: COLORS.text }}>
                    {edu.fieldOfStudy}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ color: COLORS.muted }}>
                    {edu.from} - {edu.to || "Current"}
                  </Text>
                  <Paragraph style={{ color: COLORS.muted }}>
                    {edu.description}
                  </Paragraph>
                </Card>
              ))
            ) : (
              <Text style={{ color: COLORS.muted }}>
                No education added.
              </Text>
            )}
          </Card>
        </Col>
      </Row>

      <div style={{ height: 80 }} />
    </div>
  );
};

export default DeveloperDetails;
