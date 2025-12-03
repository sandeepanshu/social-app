import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Avatar,
  Space,
  Divider,
  Image,
  Form,
  Empty,
  Popconfirm,
  message,
  Grid,
} from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  MessageOutlined,
  DeleteOutlined,
  SendOutlined,
  GlobalOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { RootState } from "../../../redux/store";
import {
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
} from "../../../redux/posts/post.types";
import Spinner from "../../../layout/util/Spinner";
import type { PostView } from "../models/PostView";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [buttonLoading, setButtonLoading] = useState(false);

  // Redux
  const { user } = useSelector((state: RootState) => state.user);
  const { loading: postsLoading, posts } = useSelector(
    (state: RootState) => state.post
  );
  const mode = useSelector((state: RootState) => state.theme.mode);

  // Load posts
  useEffect(() => {
    dispatch({ type: GET_ALL_POSTS });
  }, [dispatch]);

  // Theme Colors
  const COLORS = {
    card: mode === "dark" ? "#0b1220" : "#ffffff",
    text: mode === "dark" ? "#e5e7eb" : "#111827",
    muted: mode === "dark" ? "#9ca3af" : "#4b5563",
    bg: mode === "dark" ? "#0d1117" : "#f4f7fb",
  };

  // Create Post
  const onCreatePost = (values: { text: string; image: string }) => {
    setButtonLoading(true);
    dispatch({ type: CREATE_POST, payload: values });
    form.resetFields();
    setTimeout(() => setButtonLoading(false), 400);
  };

  const hasLiked = (post: PostView) =>
    post.likes?.some((l) => l.user === user?._id) || false;

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "32px",
        minHeight: "100vh",
        background: COLORS.bg,
      }}
    >
      <Row justify="center">
        <Col xs={24} lg={18} xl={16}>
          <Card
            style={{
              marginBottom: 24,
              borderRadius: 12,
              background: COLORS.card,
            }}
          >
            <Title style={{ color: COLORS.text }} level={3}>
              <GlobalOutlined style={{ marginRight: 8 }} />
              React Social Community
            </Title>
            <Text style={{ color: COLORS.muted }}>
              Share posts & interact with developers worldwide.
            </Text>
          </Card>

          {/* Create Post */}
          <Card
            title="Create a Post"
            style={{
              marginBottom: 24,
              borderRadius: 12,
              background: COLORS.card,
            }}
            headStyle={{ background: "transparent", color: COLORS.text }}
          >
            <Form form={form} onFinish={onCreatePost} layout="vertical">
              <Row gutter={16} align="middle">
                <Col xs={24} md={3}>
                  <Avatar
                    size={64}
                    src={user?.avatar}
                    icon={!user?.avatar && <UserOutlined />}
                  />
                </Col>

                <Col xs={24} md={21}>
                  <Form.Item
                    name="text"
                    rules={[{ required: true }]}
                    style={{ marginBottom: 16 }}
                  >
                    <TextArea
                      rows={3}
                      showCount
                      maxLength={500}
                      placeholder="What's on your mind?"
                    />
                  </Form.Item>

                  <Form.Item
                    name="image"
                    rules={[{ type: "url", message: "Enter a valid URL" }]}
                    style={{ marginBottom: 16 }}
                  >
                    <Input
                      placeholder="Image URL (optional)"
                      prefix={<PictureOutlined />}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    htmlType="submit"
                    loading={buttonLoading}
                  >
                    Post
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>

          {/* Posts */}
          <Card
            title="All Posts"
            style={{
              borderRadius: 12,
              background: COLORS.card,
            }}
            headStyle={{ background: "transparent", color: COLORS.text }}
          >
            {postsLoading ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <Spinner tip="Loading posts..." />
              </div>
            ) : posts.length === 0 ? (
              <Empty description="No posts yet" />
            ) : (
              posts.map((post) => (
                <Card
                  key={post._id}
                  style={{
                    marginBottom: 16,
                    borderRadius: 10,
                    background: COLORS.card,
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={4} style={{ textAlign: "center" }}>
                      <Avatar
                        size={64}
                        src={post.avatar}
                        icon={!post.avatar && <UserOutlined />}
                      />
                      <div style={{ marginTop: 8 }}>
                        <Text style={{ color: COLORS.text }} strong>
                          {post.name}
                        </Text>
                      </div>
                    </Col>

                    <Col xs={24} sm={20}>
                      <Paragraph style={{ color: COLORS.text }}>
                        {post.text}
                      </Paragraph>

                      {post.image && (
                        <Image
                          src={post.image}
                          style={{
                            borderRadius: 8,
                            marginBottom: 10,
                            maxHeight: 450,
                          }}
                        />
                      )}

                      <Text style={{ color: COLORS.muted, fontSize: 12 }}>
                        {new Date(post.createdAt!).toLocaleString()}
                      </Text>
                    </Col>
                  </Row>

                  <Divider />

                  <Space wrap>
                    <Button
                      type={hasLiked(post) ? "primary" : "default"}
                      icon={<LikeOutlined />}
                      onClick={() =>
                        dispatch({
                          type: LIKE_POST,
                          payload: { postId: post._id! },
                        })
                      }
                    >
                      Like ({post.likes?.length || 0})
                    </Button>

                    <Button
                      icon={<DislikeOutlined />}
                      onClick={() =>
                        dispatch({
                          type: DISLIKE_POST,
                          payload: { postId: post._id! },
                        })
                      }
                    >
                      Dislike
                    </Button>

                    <Link to={`/posts/${post._id}`}>
                      <Button icon={<MessageOutlined />}>
                        Comments ({post.comments?.length || 0})
                      </Button>
                    </Link>

                    {user?._id === post.user && (
                      <Popconfirm
                        title="Delete post?"
                        onConfirm={() => {
                          dispatch({
                            type: DELETE_POST,
                            payload: { postId: post._id! },
                          });
                          message.success("Post deleted");
                        }}
                      >
                        <Button danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>
                    )}
                  </Space>
                </Card>
              ))
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PostList;
