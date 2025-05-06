import { AxiosInstance } from 'axios'
import { LoginParams } from './dto/auth.dto'
import { LoginResponse } from './dao/auth.dao'
import instance from '../instance'

class AuthApi {
  private instance: AxiosInstance

  constructor() {
    this.instance = instance
  }

  /**
   * 로그인
   */
  async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await this.instance.post('/auth/login', params)
      return response.data
    } catch (e) {
      throw e
    }
  }
}

export const authApi = new AuthApi()
