import Router from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'
import { Api } from '../services/Api'
import {
  AuthContextData,
  IAuthProvider,
  ISignInCredentials,
  IUser,
} from './types'
import { setUserRefreshToken, setUserToken } from './utils'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] =
    useState<Pick<IUser, 'email' | 'permissions' | 'roles'>>()

  const isAuthenticated = !!user

  useEffect(() => {
    const { NEXT_AUTH_BASE_TOKEN: token } = parseCookies()

    if (token) {
      Api.get('/me').then((response) => {
        console.log(response)
      })
    }
  }, [])

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await Api.post<IUser>('sessions', {
        email,
        password,
      })

      const { token, refreshToken, permissions, roles } = response.data

      setUserToken(token)
      setUserRefreshToken(refreshToken)

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
