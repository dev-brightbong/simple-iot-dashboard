export type GetDeviceKeysResponse = Array<string>

export type GetDeviceValuesResponse = {
  key: Array<{
    ts: number
    value: string
  }>
}
