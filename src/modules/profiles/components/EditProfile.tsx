/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Select,
  Row,
  Col,
  Divider,
  Alert,
  Spin,
} from "antd";

import {
  YoutubeOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  UserOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  CodeOutlined,
  GithubOutlined,
  EditOutlined,
} from "@ant-design/icons";

import type { RootState } from "../../../redux/store";
import {
  FETCH_MY_PROFILE,
  UPDATE_PROFILE,
  type CreateProfileRequest,
} from "../../../redux/profiles/profile.types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const EditProfile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const { loading, profile, error } = useSelector(
    (state: RootState) => state.profile
  );

  // Load my profile immediately
  useEffect(() => {
    dispatch({ type: FETCH_MY_PROFILE });
  }, [dispatch]);

  // When profile loads, fill form values
  useEffect(() => {

    if (profile) {
      form.setFieldsValue({
        company: profile.company || "",
        website: profile.website || "",
        location: profile.location || "",
        designation: profile.designation || "",
        skills: profile.skills?.join(", ") || "",
        bio: profile.bio || "",
        githubUsername: profile.githubUsername || "",

        youtube: profile.social?.youtube || "",
        facebook: profile.social?.facebook || "",
        twitter: profile.social?.twitter || "",
        instagram: profile.social?.instagram || "",
        linkedin: profile.social?.linkedin || "",
      });
    }
  }, [profile, form]);

  // Navigate when update succeeds
  useEffect(() => {
    if (!loading && profile) {
      // Profile successfully updated
      // navigate("/profiles/dashboard"); // enable if needed
    }
  }, [loading, profile, navigate]);

  const onFinish = (values: any) => {
    if (!profile) return;

    const updated: CreateProfileRequest = {
      company: values.company,
      website: values.website,
      location: values.location,
      designation: values.designation,
      skills: values.skills.split(",").map((s: string) => s.trim()),
      bio: values.bio,
      githubUsername: values.githubUsername,

      social: {
        youtube: values.youtube ?? "",
        facebook: values.facebook ?? "",
        twitter: values.twitter ?? "",
        instagram: values.instagram ?? "",
        linkedin: values.linkedin ?? "",
      },
    };

    dispatch({
      type: UPDATE_PROFILE,
      payload: { profile: updated, navigate },
    });
  };

  if (loading || !profile)
    return (
      <div style={{ textAlign: "center", marginTop: 80 }}>
        <Spin size="large" />
      </div>
    );

  return (
    <div style={{ padding: "24px", background: "#f0f2f5", minHeight: "100vh" }}>
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card>
            <Title level={3} style={{ textAlign: "center" }}>
              <EditOutlined /> Edit Profile
            </Title>

            <Text
              type="secondary"
              style={{ display: "block", textAlign: "center" }}
            >
              Modify your professional and social details below.
            </Text>

            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginTop: 16, marginBottom: 16 }}
              />
            )}

            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
            >
              {/* Primary Fields */}
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
                <Select placeholder="Select your designation">
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
                    "Director",
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

              <Form.Item label="Bio" name="bio" rules={[{ required: true }]}>
                <TextArea rows={3} />
              </Form.Item>

              <Divider>Social Media</Divider>

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

              <Button htmlType="submit" type="primary" block size="large">
                Update Profile
              </Button>

              <Button
                style={{ marginTop: 12 }}
                block
                onClick={() => navigate("/profiles/dashboard")}
              >
                Back to Dashboard
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditProfile;
