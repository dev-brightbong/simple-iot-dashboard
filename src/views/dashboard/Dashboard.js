import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react'

import useDeviceStatus from './hooks/useDeviceStatus'

const options = {
  scales: {
    y: {
      beginAtZero: false,
      ticks: {
        count: 20,
        precision: 3,
        callback: function (value) {
          return value.toString()
        },
      },
    },
  },
}

const Dashboard = () => {
  const { data } = useDeviceStatus()

  return (
    <CCol>
      <CCard className="mb-4">
        <CCardHeader>기기 상태 조회</CCardHeader>
        <CCardBody>
          <CChartLine data={data} options={options} />
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default Dashboard
