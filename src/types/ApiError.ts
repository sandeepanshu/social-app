export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Array<{ msg: string }>;
    };
    status?: number;
  };
  message?: string;
}
