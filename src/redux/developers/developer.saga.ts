/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/developers/developer.saga.ts
import { takeLatest, put, call } from "redux-saga/effects";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import type { SagaIterator } from "redux-saga";

import {
  FETCH_ALL_DEVELOPERS,
  FETCH_DEVELOPER,
  type FetchDeveloperPayload,
} from "./developer.types";

import {
  setLoading,
  fetchAllSuccess,
  fetchAllFailure,
  fetchDeveloperSuccess,
  fetchDeveloperFailure,
} from "./developer.slice";

import {
  developerAPI,
  type GetAllDevelopersResponse,
  type GetDeveloperResponse,
} from "./developer.api";

function* handleFetchAll(): SagaIterator {
  try {
    yield put(setLoading());
    const response: AxiosResponse<GetAllDevelopersResponse> = yield call(
      developerAPI.getAll
    );
    // backend returns { profiles: [...] }
    yield put(fetchAllSuccess(response.data.profiles || []));
  } catch (error: any) {
    const message = error?.message ?? "Failed to fetch developers";
    yield put(fetchAllFailure(message));
  }
}

function* handleFetchDeveloper(
  action: PayloadAction<FetchDeveloperPayload>
): SagaIterator {
  try {
    yield put(setLoading());
    const response: AxiosResponse<GetDeveloperResponse> = yield call(
      developerAPI.getOne,
      action.payload.profileId
    );
    yield put(fetchDeveloperSuccess(response.data.profile));
  } catch (error: any) {
    const message = error?.message ?? "Failed to fetch developer";
    yield put(fetchDeveloperFailure(message));
  }
}

export function* developerSaga(): SagaIterator {
  yield takeLatest(FETCH_ALL_DEVELOPERS, handleFetchAll);
  yield takeLatest(FETCH_DEVELOPER, handleFetchDeveloper);
}
