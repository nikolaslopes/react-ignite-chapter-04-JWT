import { ReactNode } from 'react'

export interface AuthContextData {
  signIn(credentials: ISignInCredentials): Promise<void>
  user: Pick<IUser, 'email' | 'permissions' | 'roles'> | undefined
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
  token: string
  refreshToken: string
  permissions: string[]
  roles: string[]
}
