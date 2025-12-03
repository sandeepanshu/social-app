/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/profiles/profile.api.ts
import axios from "axios";
import type { ProfileView } from "../../modules/profiles/models/ProfileView";

const BASE_URL = import.meta.env.VITE_EXPRESS_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Add token to all requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const profileAPI = {
  getMyProfile: () =>
    axios.get<{ profile: ProfileView }>(`${BASE_URL}/api/profiles/me`),

  deleteExperience: (id: string) =>
    axios.delete<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/experience/${id}`
    ),

  deleteEducation: (id: string) =>
    axios.delete<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/education/${id}`
    ),

  createProfile: (data: any) =>
    axios.post<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles`,
      data
    ),

  updateProfile: (
    data: any // Changed to any to match backend structure
  ) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles`,
      data
    ),

  addEducation: (data: any) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/education`,
      data
    ),

  addExperience: (data: any) =>
    axios.put<{ profile: ProfileView; msg: string }>(
      `${BASE_URL}/api/profiles/experience`,
      data
    ),
};
