import { GetDeviceKeysResponse } from '../dao/plugins.dao'

export type GetDeviceValuesParams = {
  keys: GetDeviceKeysResponse
  startTs: number
  endTs: number
}
