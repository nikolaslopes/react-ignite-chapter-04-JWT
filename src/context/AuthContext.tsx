import { AxiosError } from 'axios'
import { createContext } from 'react'
import { Api } from '../services/Api'
import { AuthContextData, IAuthProvider, ISignInCredentials } from './types'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const isAuthenticated = false

  async function signIn({ email, password }: ISignInCredentials) {
    try {
      const response = await Api.post('sessions', {
        email,
        password,
      })

      console.log(response.data)
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
