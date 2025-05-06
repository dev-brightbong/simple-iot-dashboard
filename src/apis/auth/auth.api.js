import { instance } from '../instance'

/**
 * 로그인 함수
 */
async function login(params) {
  try {
    const response = await instance.post('/auth/login', params)
    return response.data
  } catch (e) {
    throw e
  }
}

export const authApi = {
  login,
}
