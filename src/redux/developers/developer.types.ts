import type { IDeveloper } from "../../modules/developers/models/IDeveloper";

export interface DeveloperState {
  loading: boolean;
  developers: IDeveloper[];
  selectedDeveloper: IDeveloper | null;
  error: string | null;
}

// Saga trigger actions
export const FETCH_ALL_DEVELOPERS = "developers/FETCH_ALL_DEVELOPERS";
export const FETCH_DEVELOPER = "developers/FETCH_DEVELOPER";

export interface FetchDeveloperPayload {
  profileId: string;
}
