import axios, { type AxiosResponse } from "axios";
import type { IDeveloper } from "../../modules/developers/models/IDeveloper";

const BASE_URL = import.meta.env.VITE_EXPRESS_URL || "";

export interface GetAllDevelopersResponse {
  profiles: IDeveloper[];
}

export interface GetDeveloperResponse {
  profile: IDeveloper;
}

export const developerAPI = {
  getAll: (): Promise<AxiosResponse<GetAllDevelopersResponse>> =>
    axios.get(`${BASE_URL}/api/profiles/all`),

  getOne: (profileId: string): Promise<AxiosResponse<GetDeveloperResponse>> =>
    axios.get(`${BASE_URL}/api/profiles/${profileId}`),
};
