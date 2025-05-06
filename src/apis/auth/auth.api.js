import { instance } from '../instance'

class AuthApi {
  /**
   * 로그인
   */
  async login(params) {
    try {
      const response = await instance.post('/auth/login', params)
      return response.data
    } catch (e) {
      throw e
    }
  }
}

export const authApi = new AuthApi()
