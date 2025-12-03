import {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER_INFO,
  LOGOUT_USER,
  RESET_REGISTER_STATE,
  type RegisterPayload,
  type LoginPayload,
} from "./user.types";

export const registerUser = (payload: RegisterPayload) => ({
  type: REGISTER_USER,
  payload,
});

export const loginUser = (payload: LoginPayload) => ({
  type: LOGIN_USER,
  payload,
});

export const getUserInfo = () => ({
  type: GET_USER_INFO,
});

export const logOutUser = () => ({
  type: LOGOUT_USER,
});

export const resetRegisterState = () => ({
  type: RESET_REGISTER_STATE,
});