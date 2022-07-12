import Router from 'next/router'
import { createContext, useState } from 'react'
import { Api } from '../services/Api'
import {
  AuthContextData,
  IAuthProvider,
  ISignInCredentials,
  IUser,
} from './types'
import { setUserCookies } from './utils'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] =
    useState<Pick<IUser, 'email' | 'permissions' | 'roles'>>()

  const isAuthenticated = !!user

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await Api.post<IUser>('sessions', {
        email,
        password,
      })

      const { token, refreshToken, permissions, roles } = response.data

      setUserCookies(token)

      setUser({
        email,
        permissions,
        roles,
      })

      Router.push('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}
