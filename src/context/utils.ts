import Router from 'next/router'
import { destroyCookie, setCookie } from 'nookies'

export const TOKEN_NAME = 'NEXT_AUTH_BASE_TOKEN'
export const REFRESH_TOKEN_NAME = 'NEXT_AUTH_REFRESH_TOKEN'

export const setUserToken = (token: string) => {
  setCookie(undefined, TOKEN_NAME, token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export const setUserRefreshToken = (refreshToken: string) => {
  setCookie(undefined, REFRESH_TOKEN_NAME, refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export const signOut = () => {
  destroyCookie(undefined, TOKEN_NAME)
  destroyCookie(undefined, REFRESH_TOKEN_NAME)
  Router.push('/')
}
