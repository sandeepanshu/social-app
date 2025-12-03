// src/modules/profiles/pages/CreateProfile.tsx

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Select,
  Divider,
  Alert,
} from "antd";

import {
  UserOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  EditOutlined,
  GithubOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  CREATE_PROFILE,
  type SubmitProfilePayload,
} from "../../../redux/profiles/profile.types";
import type { RootState } from "../../../redux/store";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface ProfileFormValues {
  company: string;
  website: string;
  location: string;
  designation: string;
  skills: string;
  bio: string;
  githubUsername: string;
  youtube?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const CreateProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm<ProfileFormValues>();
  const [error, setError] = useState<string | null>(null);

  const {
    profile,
    loading,
    error: profileError,
  } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (!loading && profile) {
      navigate("/profiles/dashboard");
    }
  }, [loading, profile, navigate]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (profileError) setError(profileError);
  }, [profileError]);

  const onFinish = (values: ProfileFormValues) => {
    setError(null);

    const request = {
      company: values.company,
      website: values.website,
      location: values.location,
      designation: values.designation,
      skills: values.skills,
      bio: values.bio,
      githubUsername: values.githubUsername,
      youtube: values.youtube ?? "",
      facebook: values.facebook ?? "",
      twitter: values.twitter ?? "",
      instagram: values.instagram ?? "",
      linkedin: values.linkedin ?? "",
    };

    const payload: SubmitProfilePayload = {
      profile: request,
    };

    dispatch({ type: CREATE_PROFILE, payload });
  };

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Title level={3} style={{ textAlign: "center" }}>
              <UserOutlined /> Create Your Profile
            </Title>

            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Company"
                name="company"
                rules={[{ required: true }]}
              >
                <Input prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                label="Website"
                name="website"
                rules={[{ required: true }, { type: "url" }]}
              >
                <Input prefix={<GlobalOutlined />} />
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true }]}
              >
                <Input prefix={<EnvironmentOutlined />} />
              </Form.Item>

              <Form.Item
                label="Designation"
                name="designation"
                rules={[{ required: true }]}
              >
                <Select>
                  {[
                    "Junior Developer",
                    "Developer",
                    "Senior Developer",
                    "Tech Lead",
                    "Software Engineer",
                    "Full Stack Developer",
                    "Frontend Developer",
                    "Backend Developer",
                    "DevOps Engineer",
                    "CEO",
                  ].map((d) => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true }]}
              >
                <Input prefix={<CodeOutlined />} />
              </Form.Item>

              <Form.Item
                label="GitHub Username"
                name="githubUsername"
                rules={[{ required: true }]}
              >
                <Input prefix={<GithubOutlined />} />
              </Form.Item>

              <Form.Item
                label="Bio"
                name="bio"
                rules={[{ required: true }, { min: 10 }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Divider>Social Links (Optional)</Divider>

              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Form.Item name="youtube" label="YouTube">
                    <Input prefix={<YoutubeOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="facebook" label="Facebook">
                    <Input prefix={<FacebookOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="twitter" label="Twitter">
                    <Input prefix={<TwitterOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="instagram" label="Instagram">
                    <Input prefix={<InstagramOutlined />} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="linkedin" label="LinkedIn">
                    <Input prefix={<LinkedinOutlined />} />
                  </Form.Item>
                </Col>
              </Row>

              <Button
                type="primary"
                htmlType="submit"
                icon={<PlusOutlined />}
                block
                size="large"
                loading={loading}
              >
                Create Profile
              </Button>

              <Button
                style={{ marginTop: 12 }}
                onClick={() => navigate("/profiles/dashboard")}
                block
              >
                <EditOutlined /> Back to Dashboard
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateProfile;
