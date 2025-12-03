// src/redux/posts/post.types.ts
import type { PostView } from "../../modules/posts/models/PostView";

// -------------------------------
// State
// -------------------------------
export interface PostState {
  loading: boolean;
  posts: PostView[];
  selectedPost: PostView | null;
  error: string | null;
}

// -------------------------------
// Saga Trigger Actions
// (MUST use const assertion + enum union)
// -------------------------------
export const POST_ACTIONS = {
  CREATE_POST: "posts/CREATE_POST",
  GET_ALL_POSTS: "posts/GET_ALL_POSTS",
  LIKE_POST: "posts/LIKE_POST",
  DISLIKE_POST: "posts/INTERNAL_DISLIKE",
  DELETE_POST: "posts/DELETE_POST",
  GET_POST: "posts/GET_POST",
  CREATE_COMMENT: "posts/CREATE_COMMENT",
  DELETE_COMMENT: "posts/DELETE_COMMENT",
} as const;

// Extract string literal types
export type PostActionTypes = typeof POST_ACTIONS[keyof typeof POST_ACTIONS];

// Export named constants (so saga can import them)
export const {
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} = POST_ACTIONS;

// -------------------------------
// Payload Types
// -------------------------------
export interface CreatePostPayload {
  text: string;
  image: string;
}

export interface LikePayload {
  postId: string;
}

export interface DislikePayload {
  postId: string;
}

export interface DeletePostPayload {
  postId: string;
}

export interface GetPostPayload {
  postId: string;
}

export interface CreateCommentPayload {
  postId: string;
  comment: string;
}

export interface DeleteCommentPayload {
  postId: string;
  commentId: string;
}
