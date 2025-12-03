import { takeLatest, put, call } from "redux-saga/effects";
import { POST_ACTIONS } from "./post.types";

const {
  CREATE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  GET_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} = POST_ACTIONS;

import {
  
  type CreatePostPayload,
  type LikePayload,
  type DislikePayload,
  type DeletePostPayload,
  type GetPostPayload,
  type CreateCommentPayload,
  type DeleteCommentPayload,
} from "./post.types";

import {
  setLoading,
  setPosts,
  addPost,
  updatePost,
  removePost,
  setSelectedPost,
  setError,
} from "./post.slice";

import { postAPI } from "./post.api";
import { setAlert } from "../alerts/alert.actions";
import type { AxiosResponse } from "axios";
import type { PostView } from "../../modules/posts/models/PostView";

// ---------------------- CREATE POST ----------------------
function* handleCreatePost(action: { payload: CreatePostPayload }) {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ post: PostView; msg: string }> = yield call(
      postAPI.createPost,
      action.payload
    );

    yield put(addPost(response.data.post));
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to create post"));
  }
}

// ---------------------- GET ALL POSTS ----------------------
function* handleGetAllPosts() {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ posts: PostView[] }> = yield call(
      postAPI.getAllPosts
    );
    yield put(setPosts(response.data.posts));
  } catch {
    yield put(setError("Failed to load posts"));
  }
}

// ---------------------- LIKE POST ----------------------
function* handleLikePost(action: { payload: LikePayload }) {
  try {
    const response: AxiosResponse<{ post: PostView }> = yield call(
      postAPI.likePost,
      action.payload.postId
    );
    yield put(updatePost(response.data.post));
  } catch {
    yield put(setError("Failed to like post"));
  }
}

// ---------------------- DISLIKE POST ----------------------
function* handleDislikePost(action: { payload: DislikePayload }) {
  try {
    const response: AxiosResponse<{ post: PostView }> = yield call(
      postAPI.dislikePost,
      action.payload.postId
    );
    yield put(updatePost(response.data.post));
  } catch {
    yield put(setError("Failed to dislike post"));
  }
}

// ---------------------- DELETE POST ----------------------
function* handleDeletePost(action: { payload: DeletePostPayload }) {
  try {
    const response: AxiosResponse<{ post: PostView; msg: string }> = yield call(
      postAPI.deletePost,
      action.payload.postId
    );

    if (response.data.post._id) {
      yield put(removePost(response.data.post._id));
    } else {
      yield put(setError("Deleted post id is missing"));
    }
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete post"));
  }
}

// ---------------------- GET SINGLE POST ----------------------
function* handleGetPost(action: { payload: GetPostPayload }) {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ post: PostView }> = yield call(
      postAPI.getPost,
      action.payload.postId
    );
    yield put(setSelectedPost(response.data.post));
  } catch {
    yield put(setError("Failed to fetch post"));
  }
}

// ---------------------- CREATE COMMENT ----------------------
function* handleCreateComment(action: { payload: CreateCommentPayload }) {
  try {
    const response: AxiosResponse<{ post: PostView; msg: string }> = yield call(
      postAPI.addComment,
      action.payload.postId,
      action.payload.comment
    );
    yield put(setSelectedPost(response.data.post));
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to add comment"));
  }
}

// ---------------------- DELETE COMMENT ----------------------
function* handleDeleteComment(action: { payload: DeleteCommentPayload }) {
  try {
    const response: AxiosResponse<{ post: PostView; msg: string }> = yield call(
      postAPI.deleteComment,
      action.payload.postId,
      action.payload.commentId
    );

    yield put(setSelectedPost(response.data.post));
    yield put(setAlert(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete comment"));
  }
}


export function* postSaga() {
  yield takeLatest(CREATE_POST, handleCreatePost);
  yield takeLatest(GET_ALL_POSTS, handleGetAllPosts);
  yield takeLatest(LIKE_POST, handleLikePost);
  yield takeLatest(DISLIKE_POST, handleDislikePost);
  yield takeLatest(DELETE_POST, handleDeletePost);
  yield takeLatest(GET_POST, handleGetPost);
  yield takeLatest(CREATE_COMMENT, handleCreateComment);
  yield takeLatest(DELETE_COMMENT, handleDeleteComment);
}
