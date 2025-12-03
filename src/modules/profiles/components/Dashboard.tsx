import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Table,
  Button,
  Typography,
  Space,
  Tag,
  Row,
  Col,
  Divider,
  Empty,
  Statistic,
  Grid,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  PlusOutlined,
  ReadOutlined,
  ShopOutlined,
  DeleteOutlined,
  DashboardOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../../layout/util/Spinner";
import type { RootState } from "../../../redux/store";
import type { BaseExperience, BaseEducation } from "../../../shared/types";
import {
  FETCH_MY_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
} from "../../../redux/profiles/profile.types";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const { loading, user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );
  const { profile, loading: profileLoading } = useSelector(
    (state: RootState) => state.profile
  );
  const mode = useSelector((state: RootState) => state.theme.mode);

  // THEME COLORS
  const COLORS = {
    bg: mode === "dark" ? "#0d1117" : "#f4f7fb",
    card: mode === "dark" ? "#0b1220" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
  };

  // Redirect on logout
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/users/login");
    }
  }, [isAuthenticated, loading, navigate]);

  // Fetch profile
  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: FETCH_MY_PROFILE });
    }
  }, [dispatch, isAuthenticated]);

  const handleDeleteExperience = (id?: string) => {
    if (id && window.confirm("Delete this experience?")) {
      dispatch({ type: DELETE_EXPERIENCE, payload: { id } });
    }
  };

  const handleDeleteEducation = (id?: string) => {
    if (id && window.confirm("Delete this education?")) {
      dispatch({ type: DELETE_EDUCATION, payload: { id } });
    }
  };

  // Experience table
  const experienceColumns = [
    { title: "Title", dataIndex: "title" },
    { title: "Company", dataIndex: "company" },
    {
      title: "Location",
      dataIndex: "location",
      render: (v: string) => v || "-",
    },
    {
      title: "From",
      dataIndex: "from",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "To",
      dataIndex: "to",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "Present",
    },
    {
      title: "Action",
      render: (_: unknown, r: BaseExperience) => (
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteExperience(r._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  // Education table
  const educationColumns = [
    { title: "School", dataIndex: "school" },
    { title: "Degree", dataIndex: "degree" },
    {
      title: "Field",
      dataIndex: "fieldOfStudy",
      render: (v: string) => v || "-",
    },
    {
      title: "From",
      dataIndex: "from",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "To",
      dataIndex: "to",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "Present",
    },
    {
      title: "Action",
      render: (_: unknown, r: BaseEducation) => (
        <Button
          danger
          type="primary"
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDeleteEducation(r._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  if (loading || profileLoading) return <Spinner tip="Loading dashboard..." />;

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "32px",
        minHeight: "100vh",
        background: COLORS.bg,
        transition: "0.3s",
      }}
    >
      <Row gutter={[24, 24]}>
        {/* LEFT CARD */}
        <Col xs={24} md={8}>
          <Card
            style={{
              height: "100%",
              borderRadius: 14,
              background: COLORS.card,
              color: COLORS.text,
            }}
            bodyStyle={{ padding: 0 }}
            cover={
              <div
                style={{
                  background:
                    mode === "dark"
                      ? "linear-gradient(135deg,#1d2736,#0f1625)"
                      : "linear-gradient(135deg,#e6f0ff,#ffffff)",
                  textAlign: "center",
                  padding: "28px 0",
                  borderTopLeftRadius: 14,
                  borderTopRightRadius: 14,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    background: "#1890ff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  <UserOutlined style={{ fontSize: 50, color: "#fff" }} />
                </div>

                <Title level={3} style={{ marginTop: 16, color: COLORS.text }}>
                  {user?.name}
                </Title>
                <Text style={{ color: COLORS.muted }}>{user?.email}</Text>
              </div>
            }
          >
            <div style={{ padding: 20, textAlign: "center" }}>
              <Statistic
                title={<Text style={{ color: COLORS.muted }}>Experience</Text>}
                value={profile?.experience?.length || 0}
                prefix={<ShopOutlined />}
              />
              <Divider />
              <Statistic
                title={<Text style={{ color: COLORS.muted }}>Education</Text>}
                value={profile?.education?.length || 0}
                prefix={<ReadOutlined />}
              />
            </div>
          </Card>
        </Col>

        {/* RIGHT SIDE */}
        <Col xs={24} md={16}>
          {/* HEADER */}
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 14,
              background: COLORS.card,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div>
                <Title level={2} style={{ margin: 0, color: COLORS.text }}>
                  <DashboardOutlined /> Dashboard
                </Title>
                <Text style={{ color: COLORS.muted }}>
                  Welcome back, {user?.name}
                </Text>
              </div>

              <Space wrap>
                {profile ? (
                  <>
                    <Link to={`/profiles/edit/${profile._id}`}>
                      <Button type="primary" icon={<EditOutlined />}>
                        Edit Profile
                      </Button>
                    </Link>
                    <Link to="/profiles/experience">
                      <Button icon={<PlusOutlined />}>Add Experience</Button>
                    </Link>
                    <Link to="/profiles/education">
                      <Button icon={<ReadOutlined />}>Add Education</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/profiles/create">
                    <Button type="primary" icon={<RocketOutlined />}>
                      Create Profile
                    </Button>
                  </Link>
                )}
              </Space>
            </div>
          </Card>

          {/* SKILLS */}
          {profile?.skills?.length > 0 && (
            <Card
              title="Skills"
              style={{
                marginBottom: 24,
                borderRadius: 14,
                background: COLORS.card,
              }}
            >
              <Space wrap>
                {profile?.skills?.map((skill: string, i: number) => (
                  <Tag
                    key={i}
                    color="blue"
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      fontWeight: 500,
                    }}
                  >
                    {skill}
                  </Tag>
                ))}
              </Space>
            </Card>
          )}

          {/* BIO */}
          {profile?.bio && (
            <Card
              title="About"
              style={{
                marginBottom: 24,
                borderRadius: 14,
                background: COLORS.card,
              }}
            >
              <Paragraph style={{ color: COLORS.text }}>
                {profile.bio}
              </Paragraph>
            </Card>
          )}

          {/* EXPERIENCE */}
          <Card
            title={
              <Space>
                <ShopOutlined /> Experience
              </Space>
            }
            style={{
              marginBottom: 24,
              borderRadius: 14,
              background: COLORS.card,
            }}
          >
            {profile?.experience?.length ? (
              <Table
                columns={experienceColumns}
                dataSource={profile.experience}
                pagination={false}
                rowKey="_id"
              />
            ) : (
              <Empty description="No experience added yet">
                <Link to="/profiles/experience">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Experience
                  </Button>
                </Link>
              </Empty>
            )}
          </Card>

          {/* EDUCATION */}
          <Card
            title={
              <Space>
                <ReadOutlined /> Education
              </Space>
            }
            style={{ borderRadius: 14, background: COLORS.card }}
          >
            {profile?.education?.length ? (
              <Table
                columns={educationColumns}
                dataSource={profile.education}
                pagination={false}
                rowKey="_id"
              />
            ) : (
              <Empty description="No education added yet">
                <Link to="/profiles/education">
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Education
                  </Button>
                </Link>
              </Empty>
            )}
          </Card>

          {/* EXTRA INFO */}
          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            {profile?.company && (
              <Col xs={24} sm={12} md={8}>
                <Card
                  size="small"
                  style={{ borderRadius: 10, background: COLORS.card }}
                >
                  <Text strong style={{ color: COLORS.text }}>
                    Company
                  </Text>
                  <br />
                  <Text style={{ color: COLORS.muted }}>{profile.company}</Text>
                </Card>
              </Col>
            )}

            {profile?.website && (
              <Col xs={24} sm={12} md={8}>
                <Card
                  size="small"
                  style={{ borderRadius: 10, background: COLORS.card }}
                >
                  <Text strong style={{ color: COLORS.text }}>
                    Website
                  </Text>
                  <br />
                  <a href={profile.website} target="_blank" rel="noreferrer">
                    {profile.website}
                  </a>
                </Card>
              </Col>
            )}

            {profile?.location && (
              <Col xs={24} sm={12} md={8}>
                <Card
                  size="small"
                  style={{ borderRadius: 10, background: COLORS.card }}
                >
                  <Text strong style={{ color: COLORS.text }}>
                    Location
                  </Text>
                  <br />
                  <Text style={{ color: COLORS.muted }}>
                    {profile.location}
                  </Text>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
