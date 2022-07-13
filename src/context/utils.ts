import { setCookie } from 'nookies'

export const setUserToken = (token: string) => {
  setCookie(undefined, 'NEXT_AUTH_BASE_TOKEN', token, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}

export const setUserRefreshToken = (refreshToken: string) => {
  setCookie(undefined, 'NEXT_AUTH_REFRESH_TOKEN', refreshToken, {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
}
