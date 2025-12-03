import axios from "axios";
import type { CreatePostPayload } from "./post.types";

const BASE_URL = import.meta.env.VITE_EXPRESS_URL;

export const postAPI = {
  createPost: (data: CreatePostPayload) =>
    axios.post(`${BASE_URL}/api/posts`, data),

  getAllPosts: () => axios.get(`${BASE_URL}/api/posts`),

  likePost: (postId: string) =>
    axios.put(`${BASE_URL}/api/posts/like/${postId}`),

  dislikePost: (postId: string) =>
    axios.put(`${BASE_URL}/api/posts/unlike/${postId}`),

  deletePost: (postId: string) =>
    axios.delete(`${BASE_URL}/api/posts/${postId}`),

  getPost: (postId: string) => axios.get(`${BASE_URL}/api/posts/${postId}`),

  addComment: (postId: string, comment: string) =>
    axios.post(`${BASE_URL}/api/posts/comment/${postId}`, { text: comment }),

  deleteComment: (postId: string, commentId: string) =>
    axios.delete(`${BASE_URL}/api/posts/comment/${postId}/${commentId}`),
};
