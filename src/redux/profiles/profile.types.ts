import type { ProfileView } from "../../modules/profiles/models/ProfileView";
import type {
  IEducation,
  IExperience,
} from "../../modules/developers/models/IDeveloper";

// ------------------------
// State
// ------------------------
export interface ProfileState {
  loading: boolean;
  profile: ProfileView | null;
  error: string | null;
}

export interface CreateProfileRequest {
  company: string;
  website: string;
  location: string;
  designation: string;
  skills: string[];
  bio: string;
  githubUsername: string;

  social?: {
    youtube?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// ------------------------
// Saga Trigger Action Types
// ------------------------
export const FETCH_MY_PROFILE = "profile/FETCH_MY_PROFILE" as const;
export const DELETE_EXPERIENCE = "profile/DELETE_EXPERIENCE" as const;
export const DELETE_EDUCATION = "profile/DELETE_EDUCATION" as const;
export const CREATE_PROFILE = "profile/CREATE_PROFILE" as const;
export const UPDATE_PROFILE = "profile/UPDATE_PROFILE" as const;
export const ADD_EDUCATION = "profile/ADD_EDUCATION" as const;
export const ADD_EXPERIENCE = "profile/ADD_EXPERIENCE" as const;

// ------------------------
// Payloads
// ------------------------
export interface DeletePayload {
  id: string;
}

export interface SubmitProfilePayload {
  profile: CreateProfileRequest;
  navigate: (path: string) => void;
}

export interface AddEducationPayload {
  education: IEducation;
  navigate: (path: string) => void;
}

export interface AddExperiencePayload {
  experience: IExperience;
  navigate: (path: string) => void;
}
