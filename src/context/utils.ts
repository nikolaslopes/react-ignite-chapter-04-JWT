import { setCookie } from 'nookies'

export function setUserCookies(token: string) {
  setCookie(undefined, 'NEXT_AUTH_BASE_TOKEN', token)
}
