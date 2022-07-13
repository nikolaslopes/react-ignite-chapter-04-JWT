import axios, { Axios, AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { setUserRefreshToken, setUserToken } from '../context/utils'

export interface IAxiosErrorResponse {
  code?: string
}

let cookies = parseCookies()
let isRefreshing = false
let failedRequestsQueue: any[] = []

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

        const { NEXT_AUTH_REFRESH_TOKEN: refreshToken } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          Api.post('/refresh', {
            refreshToken,
          })
            .then((response) => {
              const { token } = response.data

              setUserToken(token)
              setUserRefreshToken(response.data.refreshToken)

              Api.defaults.headers.common['Authorization'] = `Bearer ${token}`
              failedRequestsQueue.forEach((request) => request.onSuccess(token))
            })

            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              if (!originalConfig?.headers) {
                return
              }

              originalConfig.headers['Authorization'] = `Bearer ${token}`

              resolve(Api(originalConfig))
            },
            onError: (err: AxiosError) => {
              reject(err)
            },
          })
        })
      } else {
      }
    }
  }
)
