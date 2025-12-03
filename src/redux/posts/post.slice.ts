import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PostState } from "./post.types";
import type { PostView } from "../../modules/posts/models/PostView";

const initialState: PostState = {
  loading: false,
  posts: [],
  selectedPost: null,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
    },

    setPosts(state, action: PayloadAction<PostView[]>) {
      state.loading = false;
      state.posts = action.payload;
    },

    addPost(state, action: PayloadAction<PostView>) {
      state.loading = false;
      state.posts = [action.payload, ...state.posts];
    },

    updatePost(state, action: PayloadAction<PostView>) {
      state.loading = false;
      state.posts = state.posts.map((p) =>
        p._id === action.payload._id ? action.payload : p
      );
    },

    removePost(state, action: PayloadAction<string>) {
      state.loading = false;
      state.posts = state.posts.filter((p) => p._id !== action.payload);
    },

    setSelectedPost(state, action: PayloadAction<PostView>) {
      state.loading = false;
      state.selectedPost = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setPosts,
  addPost,
  updatePost,
  removePost,
  setSelectedPost,
  setError,
} = postSlice.actions;

export default postSlice.reducer;
