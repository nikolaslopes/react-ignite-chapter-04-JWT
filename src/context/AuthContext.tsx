import { createContext } from 'react'
import { AuthContextData, IAuthProvider, ISignInCredentials } from './types'

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: IAuthProvider) => {
  const isAuthenticated = false

  async function signIn({ email, password }: ISignInCredentials) {
    console.log({ email, password })
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
