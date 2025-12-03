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
  Select,
} from "antd";
import {
  ReadOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import type { IEducation } from "../../../modules/profiles/models/ProfileView";
import {
  ADD_EDUCATION,
  type AddEducationPayload,
} from "../../../redux/profiles/profile.types";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// Define form values interface
interface EducationFormValues {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: Dayjs;
  to?: Dayjs;
  current: boolean;
  description: string;
}

// Define form item field data type
type FieldData = {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
};

const AddEducation: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<EducationFormValues>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCurrent, setIsCurrent] = useState(false);

  // Common degree options
  const degreeOptions = [
    { value: "High School Diploma", label: "High School Diploma" },
    { value: "Associate's Degree", label: "Associate's Degree" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: "Doctorate (Ph.D.)", label: "Doctorate (Ph.D.)" },
    { value: "Professional Degree", label: "Professional Degree" },
    { value: "Certificate", label: "Certificate" },
    { value: "Diploma", label: "Diploma" },
    { value: "Postgraduate Diploma", label: "Postgraduate Diploma" },
  ];

  // Common field of study options
  const fieldOfStudyOptions = [
    { value: "Computer Science", label: "Computer Science" },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Software Engineering", label: "Software Engineering" },
    { value: "Computer Engineering", label: "Computer Engineering" },
    { value: "Data Science", label: "Data Science" },
    { value: "Artificial Intelligence", label: "Artificial Intelligence" },
    { value: "Business Administration", label: "Business Administration" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Physics", label: "Physics" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "Biology", label: "Biology" },
    { value: "Psychology", label: "Psychology" },
    { value: "Economics", label: "Economics" },
    { value: "Finance", label: "Finance" },
    { value: "Marketing", label: "Marketing" },
    { value: "Law", label: "Law" },
    { value: "Medicine", label: "Medicine" },
    { value: "Other", label: "Other" },
  ];

  const onFinish = (values: EducationFormValues) => {
    setLoading(true);
    setError(null);

    try {
      // Format dates for backend
      const educationData: IEducation = {
        school: values.school,
        degree: values.degree,
        fieldOfStudy: values.fieldOfStudy,
        from: dayjs(values.from).format("YYYY-MM-DD"),
        to: values.current
          ? undefined
          : values.to
            ? dayjs(values.to).format("YYYY-MM-DD")
            : undefined,
        current: values.current || false,
        description: values.description,
      };

      const payload: AddEducationPayload = {
        education: educationData,
        navigate,
      };

      dispatch({ type: ADD_EDUCATION, payload });
    } catch (err) {
      console.error(err);
      setError("Failed to process form data. Please check your inputs.");
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: {
    errorFields: FieldData[];
    values: EducationFormValues;
  }) => {
    console.log("Failed:", errorInfo);
    setError("Please check the form for errors and try again.");
  };

  const handleCurrentChange = (e: { target: { checked: boolean } }) => {
    setIsCurrent(e.target.checked);
    if (e.target.checked) {
      form.setFieldsValue({ to: undefined });
    }
  };

  // Date validation - ensure "to" date is not before "from" date
  const validateDateRange = (_: unknown, value: Dayjs) => {
    const fromDate = form.getFieldValue("from") as Dayjs;
    if (value && fromDate && dayjs(value).isBefore(dayjs(fromDate))) {
      return Promise.reject(new Error("End date cannot be before start date"));
    }
    return Promise.resolve();
  };

  // Custom validator for start date
  const validateStartDate = (_: unknown, value: Dayjs) => {
    if (!value || dayjs(value).isBefore(dayjs())) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Start date cannot be in the future"));
  };

  // Custom validator for end date
  const validateEndDate = (_: unknown, value: Dayjs) => {
    if (!value || dayjs(value).isBefore(dayjs())) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("End date cannot be in the future"));
  };

  // Disable future dates
  const disabledFutureDate = (current: Dayjs) => {
    return current && current > dayjs().endOf("day");
  };

  // Disable dates before start date
  const disabledBeforeStartDate = (current: Dayjs) => {
    const fromDate = form.getFieldValue("from") as Dayjs;
    return (
      current &&
      (current > dayjs().endOf("day") ||
        (fromDate && current < dayjs(fromDate)))
    );
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
                  <ReadOutlined style={{ marginRight: 8 }} />
                  Add Education
                </Title>
                <Text type="secondary">
                  Add your academic details including school, degree, and
                  duration
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
              name="add-education"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              initialValues={{ current: false }}
            >
              <Row gutter={[16, 16]}>
                {/* School */}
                <Col xs={24}>
                  <Form.Item
                    label="School/Institution"
                    name="school"
                    rules={[
                      {
                        required: true,
                        message: "Please enter school/institution name",
                      },
                      {
                        min: 2,
                        message: "School name must be at least 2 characters",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="e.g., University of California, Berkeley"
                      prefix={<ShopOutlined />}
                      allowClear
                    />
                  </Form.Item>
                </Col>

                {/* Degree */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Degree"
                    name="degree"
                    rules={[
                      { required: true, message: "Please select your degree" },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select your degree"
                      allowClear
                      showSearch
                      optionFilterProp="children"
                    >
                      {degreeOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* Field of Study */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Field of Study"
                    name="fieldOfStudy"
                    rules={[
                      {
                        required: true,
                        message: "Please select your field of study",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      placeholder="Select field of study"
                      allowClear
                      showSearch
                      optionFilterProp="children"
                    >
                      {fieldOfStudyOptions.map((option) => (
                        <Option key={option.value} value={option.value}>
                          {option.label}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                {/* From Date */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Start Date"
                    name="from"
                    rules={[
                      { required: true, message: "Please select start date" },
                      { validator: validateStartDate },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select start date"
                      suffixIcon={<CalendarOutlined />}
                      format="YYYY-MM-DD"
                      disabledDate={disabledFutureDate}
                    />
                  </Form.Item>
                </Col>

                {/* Current Checkbox and To Date */}
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Currently Studying"
                    name="current"
                    valuePropName="checked"
                  >
                    <Checkbox onChange={handleCurrentChange}>
                      I am currently studying here
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    label="End Date"
                    name="to"
                    rules={[
                      {
                        required: !isCurrent,
                        message:
                          "Please select end date unless this is your current education",
                      },
                      { validator: validateDateRange },
                      { validator: validateEndDate },
                    ]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select end date"
                      suffixIcon={<CalendarOutlined />}
                      format="YYYY-MM-DD"
                      disabled={isCurrent}
                      disabledDate={disabledBeforeStartDate}
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
                        message: "Please enter education description",
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
                    extra="Describe your coursework, achievements, projects, or honors"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Describe your academic experience, coursework, projects, achievements, or honors..."
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
                    {loading ? "Adding Education..." : "Add Education"}
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
                <strong>Tips for a great education entry:</strong>
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 20 }}>
                  <li>Be accurate with your degree and field of study</li>
                  <li>Include relevant coursework or specializations</li>
                  <li>Mention academic honors, awards, or scholarships</li>
                  <li>Include GPA if it's strong (e.g., 3.5/4.0 or above)</li>
                  <li>Describe relevant projects, thesis, or research work</li>
                  <li>
                    Include extracurricular activities or leadership roles
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

export default AddEducation;
