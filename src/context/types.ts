import { ReactNode } from 'react'

export interface AuthContextData {
  signIn(credentials: ISignInCredentials): Promise<void>
  isAuthenticated: boolean
}
export interface ISignInCredentials {
  email: string
  password: string
}

export interface IAuthProvider {
  children: ReactNode
}
