export interface AuthState {
  token: string|null,
  expires_at: Date,
  name: string|null
}