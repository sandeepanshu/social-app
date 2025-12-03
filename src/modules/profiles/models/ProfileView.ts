export interface IExperience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface IEducation {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  from: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface ProfileView {
  _id?: string;
  user?: {
    _id: string;
    name: string;
    avatar: string;
  };
  company?: string;
  website?: string;
  location?: string;
  designation?: string;
  skills?: string[];
  bio?: string;
  githubUsername?: string;
  experience?: IExperience[];
  education?: IEducation[];
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
