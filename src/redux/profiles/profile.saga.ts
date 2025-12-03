/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/profiles/profile.saga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";

import {
  FETCH_MY_PROFILE,
  DELETE_EXPERIENCE,
  DELETE_EDUCATION,
  CREATE_PROFILE,
  UPDATE_PROFILE,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  type DeletePayload,
  type SubmitProfilePayload,
  type AddEducationPayload,
  type AddExperiencePayload,
} from "./profile.types";

import { setLoading, setProfile, setError } from "./profile.slice";
import { profileAPI } from "./profile.api";
import { addAlertWithTimeout, setAlert } from "../alerts/alert.actions";
import type { ApiError } from "../../types/ApiError";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";

// ----------------------------------
// GET MY PROFILE
// ----------------------------------
function* handleGetMyProfile() {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ profile: ProfileView }> = yield call(
      profileAPI.getMyProfile
    );

    if (response.data.profile) {
      yield put(setProfile(response.data.profile));
    } else {
      yield put(setError("No profile found"));
    }
  } catch (error) {
    const err = error as ApiError;
    const errorMsg = err.response?.data?.message ?? "Failed to load profile";
    yield put(setError(errorMsg));

    if (err.response?.status === 404) {
      yield put(setProfile(null));
    }
  }
}

// ----------------------------------
// DELETE EXPERIENCE
// ----------------------------------
function* handleDeleteExperience(action: PayloadAction<DeletePayload>) {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.deleteExperience, action.payload.id);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete experience"));
  }
}

// ----------------------------------
// DELETE EDUCATION
// ----------------------------------
function* handleDeleteEducation(action: PayloadAction<DeletePayload>) {
  try {
    yield put(setLoading());
    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.deleteEducation, action.payload.id);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));
  } catch {
    yield put(setError("Failed to delete education"));
  }
}

// ----------------------------------
// CREATE PROFILE (FIXED — NO NAVIGATE)
// ----------------------------------
function* handleCreateProfile(action: PayloadAction<SubmitProfilePayload>) {
  try {
    const { profile } = action.payload;

    yield put(setLoading());
    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.createProfile, profile);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.errors?.[0]?.msg ??
      error.response?.data?.message ??
      "Failed to create profile";

    yield put(setError(errorMsg));
    yield put(setAlert(errorMsg, "danger"));
  }
}

// ----------------------------------
// UPDATE PROFILE
// ----------------------------------
function* handleUpdateProfile(action: PayloadAction<SubmitProfilePayload>) {
  try {
    const { profile, navigate } = action.payload;

    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.updateProfile, profile);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));

    navigate("/profiles/dashboard");
  } catch (error: any) {
    const msg =
      error.response?.data?.errors?.[0]?.msg ??
      error.response?.data?.message ??
      "Failed to update profile";

    yield put(setError(msg));
    yield put(addAlertWithTimeout(msg, "danger"));
  }
}

// ----------------------------------
// ADD EDUCATION
// ----------------------------------
function* handleAddEducation(action: PayloadAction<AddEducationPayload>) {
  try {
    const { education, navigate } = action.payload;

    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.addEducation, education);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));

    // 🚀 Navigate after success
    navigate("/profiles/dashboard");
  } catch (error) {
    console.error(error);
    yield put(setError("Failed to add education"));
  }
}

// ----------------------------------
// ADD EXPERIENCE
// ----------------------------------
function* handleAddExperience(action: PayloadAction<AddExperiencePayload>) {
  try {
    const { experience, navigate } = action.payload;

    yield put(setLoading());

    const response: AxiosResponse<{ profile: ProfileView; msg: string }> =
      yield call(profileAPI.addExperience, experience);

    yield put(setProfile(response.data.profile));
    yield put(addAlertWithTimeout(response.data.msg, "success"));

    // 👉 Navigate after success
    navigate("/profiles/dashboard");
  } catch {
    yield put(setError("Failed to add experience"));
  }
}

// ----------------------------------
// ROOT SAGA
// ----------------------------------
export function* profileSaga() {
  yield takeLatest(FETCH_MY_PROFILE, handleGetMyProfile);
  yield takeLatest(DELETE_EXPERIENCE, handleDeleteExperience);
  yield takeLatest(DELETE_EDUCATION, handleDeleteEducation);
  yield takeLatest(CREATE_PROFILE, handleCreateProfile);
  yield takeLatest(UPDATE_PROFILE, handleUpdateProfile);
  yield takeLatest(ADD_EDUCATION, handleAddEducation);
  yield takeLatest(ADD_EXPERIENCE, handleAddExperience);
}
