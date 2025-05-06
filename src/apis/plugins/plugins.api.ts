import { AxiosInstance } from 'axios'
import { GetDeviceKeysResponse, GetDeviceValuesResponse } from './dao/plugins.dao'
import { GetDeviceValuesParams } from './dto/plugins.dto'
import instance from '../instance'

const DEVICE_ID = 'e6d8ace0-1b87-11f0-b556-e7ea660b8ad9'

class PluginsApi {
  private instance: AxiosInstance
  constructor() {
    this.instance = instance
  }

  /**
   * 디바이스 상태 key 조회
   */
  async getDeviceKeys(): Promise<GetDeviceKeysResponse> {
    try {
      const response = await this.instance.get(
        `/plugins/telemetry/DEVICE/${DEVICE_ID}/keys/timeseries`,
      )
      return response.data
    } catch (e) {
      throw e
    }
  }

  /**
   * 디바이스 상태 value 조회
   */
  async getDeviceValues(params: GetDeviceValuesParams): Promise<GetDeviceValuesResponse> {
    try {
      const response = await this.instance.get(
        `/plugins/telemetry/DEVICE/${DEVICE_ID}/values/timeseries`,
        { params },
      )
      return response.data
    } catch (e) {
      throw e
    }
  }
  /**
   * 디바이스 상태 value 제어
   */
  async setDeviceValue(): Promise<any> {
    try {
      const response = await this.instance.post(
        `/plugins/telemetry/DEVICE/${DEVICE_ID}/SERVER_SCOPE`,
      )
      return response
    } catch (e) {
      throw e
    }
  }
}

export const pluginsApi = new PluginsApi()
