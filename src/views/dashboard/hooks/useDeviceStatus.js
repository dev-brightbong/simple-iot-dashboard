import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { pluginsApi } from 'src/apis/plugins/plugins.api'
import { convertDeviceStatusData, labels } from '../utils/dashboard-utils'

const SECOND = 1000
const TEN_MINUTES = 10 * 60 * SECOND

const QUERY_KEYS = {
  DEVICE_STATUS_KEYS: 'deviceStatusKeys',
  DEVICE_STATUS_VALUES: 'deviceStatusValues',
}

const useDeviceStatus = () => {
  const [deviceStatus, setDeviceStatus] = useState({
    labels: [],
    datasets: [],
  })

  const [interval, setInterval] = useState({ value: null })

  const { data: deviceStatusKeys } = useQuery({
    queryKey: [QUERY_KEYS.DEVICE_STATUS_KEYS],
    queryFn: () => pluginsApi.getDeviceKeys(),
  })

  const { data: deviceStatusValues } = useQuery({
    queryKey: [QUERY_KEYS.DEVICE_STATUS_VALUES, deviceStatusKeys, interval.value],
    queryFn: () =>
      pluginsApi.getDeviceValues({
        keys: deviceStatusKeys.filter((item) => [...labels, 'interval'].includes(item)).join(','),
        startTs: Date.now() - TEN_MINUTES,
        endTs: Date.now(),
      }),
    enabled: deviceStatusKeys?.length > 0,
    refetchInterval: (interval.value ? parseFloat(interval.value) : 8) * SECOND,
  })

  useEffect(
    function updateDeviceStatusValues() {
      if (deviceStatusValues) {
        setInterval(deviceStatusValues.interval[0])
        const data = convertDeviceStatusData(deviceStatusValues)
        setDeviceStatus(data)
      }
    },
    [deviceStatusValues],
  )

  return { data: deviceStatus, interval }
}

export default useDeviceStatus
