import { AxiosError } from 'axios'
import { createContext, useState } from 'react'
import { Api } from '../services/Api'
import {
  AuthContextData,
  IAuthProvider,
  ISignInCredentials,
  IUser,
} from './types'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser>()
  const isAuthenticated = false

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await Api.post<IUser>('sessions', {
        email,
        password,
      })

      const { permissions, roles } = response.data

      setUser({
        email,
        permissions,
        roles,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
