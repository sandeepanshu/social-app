import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Image,
  Form,
  Divider,
  Empty,
  Popconfirm,
  Grid,
} from "antd";
import {
  ArrowLeftOutlined,
  SendOutlined,
  DeleteOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../redux/store";
import {
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../../../redux/posts/post.types";
import Spinner from "../../../layout/util/Spinner";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

const PostDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { postId } = useParams();
  const [form] = Form.useForm();

  const { loading, selectedPost } = useSelector(
    (state: RootState) => state.post
  );
  const { user } = useSelector((state: RootState) => state.user);
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Load post
  useEffect(() => {
    if (postId) {
      dispatch({ type: GET_POST, payload: { postId } });
    }
  }, [postId, dispatch]);

  const COLORS = {
    bg: mode === "dark" ? "#0d1117" : "#f4f7fb",
    card: mode === "dark" ? "#0b1220" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
  };

  if (loading || !selectedPost) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner tip="Loading post..." />
      </div>
    );
  }

  const addComment = (values: { text: string }) => {
    dispatch({
      type: CREATE_COMMENT,
      payload: { postId: postId!, comment: values.text },
    });
    form.resetFields();
  };

  return (
    <div
      style={{
        padding: screens.xs ? 16 : 24,
        minHeight: "100vh",
        background: COLORS.bg,
      }}
    >
      <Row justify="center">
        <Col xs={24} lg={18} xl={16}>
          {/* Back */}
          <Card
            style={{
              borderRadius: 12,
              marginBottom: 16,
              background: COLORS.card,
            }}
          >
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/posts/list")}
            >
              Back to Posts
            </Button>
          </Card>

          {/* Post Content */}
          <Card
            style={{
              borderRadius: 12,
              marginBottom: 24,
              background: COLORS.card,
            }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={4} style={{ textAlign: "center" }}>
                <Avatar
                  size={72}
                  src={selectedPost.avatar}
                  icon={!selectedPost.avatar && <UserOutlined />}
                />
                <Title level={5} style={{ marginTop: 8, color: COLORS.text }}>
                  {selectedPost.name}
                </Title>
              </Col>

              <Col xs={24} sm={20}>
                <Paragraph style={{ color: COLORS.text }}>
                  {selectedPost.text}
                </Paragraph>

                {selectedPost.image && (
                  <Image
                    src={selectedPost.image}
                    style={{
                      borderRadius: 8,
                      marginBottom: 10,
                      maxHeight: 450,
                    }}
                  />
                )}

                <Text style={{ color: COLORS.muted }}>
                  {new Date(selectedPost.createdAt!).toLocaleString()}
                </Text>
              </Col>
            </Row>
          </Card>

          {/* Comments */}
          <Card
            title={
              <Space>
                <MessageOutlined />
                <span>Comments ({selectedPost.comments?.length || 0})</span>
              </Space>
            }
            headStyle={{
              background: "transparent",
              color: COLORS.text,
            }}
            style={{ borderRadius: 12, background: COLORS.card }}
          >
            {/* Add Comment */}
            {user && (
              <Form form={form} onFinish={addComment} layout="vertical">
                <Row gutter={12} align="middle">
                  <Col xs={4} sm={2}>
                    <Avatar src={user.avatar} />
                  </Col>

                  <Col xs={20} sm={22}>
                    <Form.Item name="text" rules={[{ required: true }]}>
                      <TextArea
                        rows={3}
                        placeholder="Add a comment..."
                        maxLength={400}
                        showCount
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                    >
                      Comment
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}

            <Divider />

            {/* List */}
            {selectedPost.comments && selectedPost.comments.length > 0 ? (
              selectedPost.comments.map((c) => (
                <Card
                  key={c._id}
                  style={{
                    marginBottom: 12,
                    borderRadius: 10,
                    background: COLORS.card,
                  }}
                  size="small"
                >
                  <Row gutter={12}>
                    <Col xs={4} sm={2} style={{ textAlign: "center" }}>
                      <Avatar
                        src={c.avatar}
                        icon={!c.avatar && <UserOutlined />}
                      />
                    </Col>

                    <Col xs={18} sm={20}>
                      <Text strong style={{ color: COLORS.text }}>
                        {c.name}
                      </Text>
                      <Paragraph style={{ marginTop: 6, color: COLORS.text }}>
                        {c.text}
                      </Paragraph>

                      <Text style={{ color: COLORS.muted }}>
                        {new Date(c.date!).toLocaleDateString()}
                      </Text>
                    </Col>

                    <Col xs={2} style={{ textAlign: "right" }}>
                      {user?._id === c.user && (
                        <Popconfirm
                          title="Delete this comment?"
                          onConfirm={() =>
                            dispatch({
                              type: DELETE_COMMENT,
                              payload: { postId: postId!, commentId: c._id! },
                            })
                          }
                        >
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            size="small"
                          />
                        </Popconfirm>
                      )}
                    </Col>
                  </Row>
                </Card>
              ))
            ) : (
              <Empty description="No comments yet" />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PostDetails;
