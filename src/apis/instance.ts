import axios, { AxiosError } from 'axios'

const END_POINT = 'http://hejdev1.goqual.com:8080'

const instance = axios.create({
  baseURL: `${END_POINT}/api`,
})

instance.interceptors.request.use(
  async (config) => {
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
  async (error: AxiosError) => {
    try {
      return Promise.reject(error)
    } catch (e) {
      return Promise.reject(e)
    }
  },
)

export default instance
