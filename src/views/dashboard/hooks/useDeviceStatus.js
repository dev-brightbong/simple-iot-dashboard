import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { pluginsApi } from 'src/apis/plugins/plugins.api'
import { convertDeviceStatusData, labels } from '../utils/dashboard-utils'

const ONE_SECOND = 1000
const TEN_MINUTES = 10 * 60 * ONE_SECOND

const useDeviceStatus = () => {
  const [deviceStatus, setDeviceStatus] = useState({
    labels: [],
    datasets: [],
  })
  const [deviceStatusKeys, setDeviceStatusKeys] = useState([])
  const [interval, setInterval] = useState({ value: null })

  const { data: deviceStatusKeysData } = useQuery({
    queryKey: ['deviceStatusKeys'],
    queryFn: () => pluginsApi.getDeviceKeys(),
  })

  const { data: deviceStatusValuesData } = useQuery({
    queryKey: ['deviceStatusValues'],
    queryFn: () =>
      pluginsApi.getDeviceValues({
        keys: deviceStatusKeys.filter((item) => [...labels, 'interval'].includes(item)).join(','),
        startTs: Date.now() - TEN_MINUTES,
        endTs: Date.now(),
      }),
    enabled: deviceStatusKeys.length > 0,
    refetchInterval: parseFloat(interval.value) * ONE_SECOND,
  })

  useEffect(
    function initDeviceKeys() {
      if (deviceStatusKeysData) {
        setDeviceStatusKeys(deviceStatusKeysData)
      }
    },
    [deviceStatusKeysData],
  )

  useEffect(
    function updateDeviceStatusValues() {
      if (deviceStatusValuesData) {
        setInterval(deviceStatusValuesData.interval[0])
        const data = convertDeviceStatusData(deviceStatusValuesData)
        setDeviceStatus(data)
      }
    },
    [deviceStatusValuesData],
  )

  return { data: deviceStatus, interval }
}

export default useDeviceStatus
