/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Space,
  Alert,
} from "antd";
import {
  UserOutlined,
  BuildOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { IExperience } from "../../../modules/profiles/models/ProfileView";
import {
  ADD_EXPERIENCE,
  type AddExperiencePayload,
} from "../../../redux/profiles/profile.types";

const { Title, Text } = Typography;
const { TextArea } = Input;

const AddExperience: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    setError(null);

    try {
      // Format dates for backend
      const experienceData: IExperience = {
        title: values.title,
        company: values.company,
        location: values.location,
        from: dayjs(values.from).format("YYYY-MM-DD"),
        to: values.current
          ? undefined
          : values.to
            ? dayjs(values.to).format("YYYY-MM-DD")
            : undefined,
        current: values.current || false,
        description: values.description,
      };

      const payload: AddExperiencePayload = {
        experience: experienceData,
        navigate,
      };

      dispatch({ type: ADD_EXPERIENCE, payload });
    } catch (err) {
      setError("Failed to process form data. Please check your inputs.");
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleCurrentChange = (e: any) => {
    setIsCurrent(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ to: null });
    }
  };

  // Date validation - ensure "to" date is not before "from" date
  const validateDateRange = (_: any, value: any) => {
    const fromDate = form.getFieldValue("from");
    if (value && fromDate && dayjs(value).isBefore(dayjs(fromDate))) {
      return Promise.reject(new Error("End date cannot be before start date"));
    }
    return Promise.resolve();
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={16} xl={14}>
          <Card
            style={{ borderRadius: 8 }}
            title={
              <div>
                <Title level={3} style={{ margin: 0 }}>
                  <BuildOutlined style={{ marginRight: 8 }} />
                  Add Experience
                </Title>
                <Text type="secondary">
                  Add your professional experience including company, title, and
                  work duration
                </Text>
              </div>
            }
          >
            {error && (
              <Alert
                message="Error"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: 24 }}
                closable
                onClose={() => setError(null)}
              />
            )}

            <Form
              form={form}
              name="add-experience"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{ current: false }}
            >
              <Row gutter={[16, 16]}>
                {/* Title */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Job Title"
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your job title",
                      },
                      {
                        min: 2,
                        message: "Title must be at least 2 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="e.g., Senior Software Engineer"
                      prefix={<UserOutlined />}
                      allowClear
                    />
                  </Form.Item>
                </Col>

                {/* Company */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Company"
                    name="company"
                    rules={[
                      { required: true, message: "Please enter company name" },
                      {
                        min: 2,
                        message: "Company name must be at least 2 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="e.g., Google Inc."
                      prefix={<BuildOutlined />}
                      allowClear
                    />
                  </Form.Item>
                </Col>

                {/* Location */}
                <Col xs={24}>
                  <Form.Item
                    label="Location"
                    name="location"
                    rules={[
                      { required: true, message: "Please enter job location" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="e.g., San Francisco, CA"
                      prefix={<EnvironmentOutlined />}
                      allowClear
                    />
                  </Form.Item>
                </Col>

                {/* From Date */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Start Date"
                    name="from"
                    rules={[
                      { required: true, message: "Please select start date" },
                      () => ({
                        validator(_, value) {
                          if (!value || dayjs(value).isBefore(dayjs())) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Start date cannot be in the future")
                          );
                        },
                      }),
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select start date"
                      suffixIcon={<CalendarOutlined />}
                      format="YYYY-MM-DD"
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                  </Form.Item>
                </Col>

                {/* Current Checkbox and To Date */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Current Job"
                    name="current"
                    valuePropName="checked"
                  >
                    <Checkbox onChange={handleCurrentChange}>
                      I currently work here
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    name="to"
                    rules={[
                      {
                        required: !isCurrent,
                        message:
                          "Please select end date unless this is your current job",
                      },
                      { validator: validateDateRange },
                      () => ({
                        validator(_, value) {
                          if (!value || dayjs(value).isBefore(dayjs())) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("End date cannot be in the future")
                          );
                        },
                      }),
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select end date"
                      suffixIcon={<CalendarOutlined />}
                      format="YYYY-MM-DD"
                      disabled={isCurrent}
                      disabledDate={(current) => {
                        const fromDate = form.getFieldValue("from");
                        return (
                          current &&
                          (current > dayjs().endOf("day") ||
                            (fromDate && current < dayjs(fromDate)))
                        );
                      }}
                    />
                  </Form.Item>
                </Col>

                {/* Description */}
                <Col xs={24}>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter job description",
                      },
                      {
                        min: 10,
                        message: "Description must be at least 10 characters",
                      },
                      {
                        max: 1000,
                        message: "Description must not exceed 1000 characters",
                      },
                    ]}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Describe your responsibilities, achievements, and skills used..."
                      showCount
                      maxLength={1000}
                      style={{ resize: "none" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Submit Buttons */}
              <Form.Item style={{ marginTop: 32 }}>
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<PlusOutlined />}
                    loading={loading}
                  >
                    {loading ? "Adding Experience..." : "Add Experience"}
                  </Button>
                  <Button
                    type="default"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/profiles/dashboard")}
                  >
                    Back to Dashboard
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>

          {/* Help Text */}
          <div style={{ marginTop: 24 }}>
            <Card size="small">
              <Text type="secondary">
                <strong>Tips for a great experience entry:</strong>
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                  <li>Be specific about your role and responsibilities</li>
                  <li>Include key achievements and projects</li>
                  <li>Mention technologies and tools you used</li>
                  <li>
                    Use bullet points in the description (you can use * for
                    bullets)
                  </li>
                  <li>
                    Quantify achievements when possible (e.g., "Improved
                    performance by 40%")
                  </li>
                </ul>
              </Text>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddExperience;
