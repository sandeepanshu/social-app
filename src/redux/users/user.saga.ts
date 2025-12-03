import { takeLatest, put, call, delay } from "redux-saga/effects";
import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER_INFO,
  LOGOUT_USER,
  type RegisterPayload,
  type LoginPayload,
} from "./user.types";

import {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  getUserInfoSuccess,
  getUserInfoFailure,
  setLoading,
  logout,
} from "./user.slice";

import { userAPI } from "./user.api";
import { addAlert, removeAlert } from "../alerts/alert.slice";
import { AuthUtil } from "../../../src/authUtil/AuthUtil";
import { UserUtil } from "../../../src/authUtil/UserUtil";
import type { ApiError } from "../../../src/types/ApiError";
import type { UserView } from "../../modules/users/models/UserView";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

// Helper function to show alert in saga
function* showAlertSaga(
  message: string,
  color: "success" | "danger" | "warning" | "info"
) {
  const id = uuid();
  yield put(addAlert({ id, message, color }));

  // Auto remove after 3 seconds
  yield delay(3000);
  yield put(removeAlert(id));
}

// REGISTER
function* handleRegister(action: PayloadAction<RegisterPayload>) {
  try {
    yield put(setLoading());

    const response: { data: { msg: string } } = yield call(() =>
      userAPI.register(action.payload.user)
    );

    yield put(registerSuccess());
    yield call(showAlertSaga, response.data.msg, "success");
  } catch (error) {
    const err = error as ApiError;
    yield put(
      registerFailure(err.response?.data?.message ?? "Register failed")
    );

    const errors = err.response?.data?.errors || [];
    if (errors.length > 0) {
      for (const e of errors) {
        yield call(showAlertSaga, e.msg, "danger");
      }
    } else {
      yield call(
        showAlertSaga,
        err.response?.data?.message ?? "Registration failed",
        "danger"
      );
    }
  }
}

// LOGIN - ✅ Fixed: No navigation in saga
function* handleLogin(action: PayloadAction<LoginPayload>) {
  try {
    yield put(setLoading());
    const response: { data: { token: string } } = yield call(() =>
      userAPI.login(action.payload.user)
    );

    // Save token
    UserUtil.saveToken(response.data.token);
    AuthUtil.setTokenHeader(response.data.token);

    yield put(loginSuccess(response.data.token));
    yield call(showAlertSaga, "Login Successful", "success");

    // ✅ Get user info after successful login
    yield put({ type: GET_USER_INFO });
  } catch (error) {
    const err = error as ApiError;
    const errorMsg = err.response?.data?.message ?? "Login failed";
    yield put(loginFailure(errorMsg));
    yield call(showAlertSaga, errorMsg, "danger");
  }
}

// GET USER INFO
function* handleGetUserInfo() {
  try {
    yield put(setLoading());
    const response: { data: { user: UserView } } = yield call(() =>
      userAPI.getUserInfo()
    );
    yield put(getUserInfoSuccess(response.data.user));
  } catch (error) {
    const err = error as ApiError;
    const errorMsg = err.response?.data?.message ?? "Failed to fetch user info";
    yield put(getUserInfoFailure(errorMsg));

    // Clear invalid token
    UserUtil.removeToken();
    AuthUtil.setTokenHeader(null);
    yield put(logout());

    yield call(
      showAlertSaga,
      "Session expired. Please login again.",
      "warning"
    );
  }
}

// LOGOUT HANDLER
function* handleLogout() {
  try {
    // Clear token from storage
    UserUtil.removeToken();

    // Clear token from axios headers
    AuthUtil.setTokenHeader(null);

    // Dispatch logout action to update state
    yield put(logout());

    // Show success message
    yield call(showAlertSaga, "Logged out successfully", "success");
  } catch (error) {
    console.error("Logout error:", error);
    yield call(showAlertSaga, "Error during logout", "danger");
  }
}

export function* userSaga() {
  yield takeLatest(REGISTER_USER, handleRegister);
  yield takeLatest(LOGIN_USER, handleLogin);
  yield takeLatest(GET_USER_INFO, handleGetUserInfo);
  yield takeLatest(LOGOUT_USER, handleLogout);
}
