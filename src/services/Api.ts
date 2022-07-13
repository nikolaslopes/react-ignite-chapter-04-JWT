import axios from 'axios'
import { parseCookies } from 'nookies'

const { NEXT_AUTH_BASE_TOKEN: token } = parseCookies()

export const Api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
