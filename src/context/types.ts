import { ReactNode } from 'react'

export interface AuthContextData {
  signIn(credentials: ISignInCredentials): Promise<void>
  isAuthenticated: boolean
}
export interface IAuthProvider {
  children: ReactNode
}
export interface ISignInCredentials {
  email: string
  password: string
}

export interface IUser {
  email: string
  permissions: string[]
  roles: string[]
}
