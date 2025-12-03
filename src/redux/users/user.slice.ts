import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState } from "./user.types";
import type { UserView } from "../../modules/users/models/UserView";

const initialState: UserState = {
  loading: false,
  user: null,
  isAuthenticated: false,
  token: null,
  error: null,
  isRegistered: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },

    registerStart(state) {
      state.loading = true;
      state.error = null;
      state.isRegistered = false;
    },

    registerSuccess(state) {
      state.loading = false;
      state.isRegistered = true;
      state.error = null;
    },
    
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isRegistered = false;
    },

    loginSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload;
      state.error = null;
    },
    
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = null;
    },

    getUserInfoSuccess(state, action: PayloadAction<UserView>) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    getUserInfoFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },

    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      state.error = null;
      state.isRegistered = false;
    },

    resetRegisterState(state) {
      state.isRegistered = false;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  registerStart,
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  logout,
  resetRegisterState,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;