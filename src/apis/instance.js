import axios from 'axios'
import { userStorage } from 'src/utils/storage/user-storage'

const END_POINT = 'http://hejdev1.goqual.com:8080'

export const instance = axios.create({
  baseURL: `${END_POINT}/api`,
})

instance.interceptors.request.use(
  async (config) => {
    const user = userStorage.getUser()
    if (user) {
      config.headers = {
        ...config.headers,
        Authorization: `bearer${user.token}`,
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (error) => {
    try {
      return Promise.reject(error)
    } catch (e) {
      return Promise.reject(e)
    }
  },
)
