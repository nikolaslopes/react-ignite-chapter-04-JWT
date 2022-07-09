export interface SignInCredentials {
  email: string
  password: string
}

export interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
}
