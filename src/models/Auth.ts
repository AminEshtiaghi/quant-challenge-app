export interface Auth {
  token: string,
  expires_at: Date,
  name: string
};

export interface LoginRequest {
  email: string,
  password: string,
  remember: boolean
};

export interface AuthActionResponse {
  token: string|null,
  expires_at: Date|null,
  name: string|null,
  message: string|null,
  errors: PossibleErrors|null
};

export interface PossibleErrors {
  email: Array<string>;
  password: Array<string>;
  remember: Array<string>;
};
export interface AuthErrors {
  message: string,
  errors: PossibleErrors
};
