export interface IUserMini {
  _id: string;
  name: string;
  avatar?: string;
}

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

export interface IDeveloper {
  _id: string;
  user?: IUserMini | string; // backend sometimes returns populated user object; this keeps it flexible
  company?: string;
  designation?: string;
  location?: string;
  skills?: string[];
  bio?: string;
  experience?: IExperience[];
  education?: IEducation[];
  social?: {
    youtube?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}
