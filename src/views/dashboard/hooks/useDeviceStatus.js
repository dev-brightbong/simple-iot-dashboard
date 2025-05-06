import { useState, useEffect } from 'react'
import { pluginsApi } from 'src/apis/plugins/plugins.api'
import { convertDeviceStatusData, labels } from '../utils/dashboard-utils'

const useDeviceStatus = () => {
  const [deviceStatus, setDeviceStatus] = useState({
    labels: [],
    datasets: [],
  })
  const [interval, setInterval] = useState('')

  const getDeviceKeys = async () => {
    try {
      const res = await pluginsApi.getDeviceKeys()
      const requiredKeys = res.filter((item) => [...labels, 'interval'].includes(item)) || []
      if (requiredKeys.length > 0) {
        getDeviceValues(requiredKeys)
      }
    } catch (err) {
      alert('디바이스 상태 key 조회 오류')
    }
  }

  const getDeviceValues = async (keys) => {
    try {
      const endTs = Date.now()
      const startTs = endTs - 10 * 60 * 1000
      const params = {
        keys: keys.join(','),
        startTs,
        endTs,
      }
      const res = await pluginsApi.getDeviceValues({ ...params })
      console.log(res)
      const data = convertDeviceStatusData(res)
      setDeviceStatus(data)
      setInterval(res.interval[0])
    } catch (err) {
      alert('디바이스 상태 value 조회 오류')
    }
  }

  useEffect(() => {
    getDeviceKeys()
  }, [])

  return { data: deviceStatus, interval }
}

export default useDeviceStatus
