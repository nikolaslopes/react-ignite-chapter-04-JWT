import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'

export interface IAxiosErrorResponse {
  code?: string
}

let cookies = parseCookies()

export const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['NEXT_AUTH_BASE_TOKEN']}`,
  },
})

Api.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError<IAxiosErrorResponse>) => {
    if (error.response?.status === 401) {
      if (error.response?.data?.code === 'token.expired') {
        cookies = parseCookies()
      } else {
      }
    }
  }
)
