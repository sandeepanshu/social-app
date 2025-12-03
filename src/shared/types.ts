export interface BaseExperience {
  _id?: string;
  title: string;
  company: string;
  location?: string;
  from: string;
  to?: string;
  current?: boolean;
  description?: string;
}

export interface BaseEducation {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  from: string;
  to?: string;
  current?: boolean;
  description?: string;
}