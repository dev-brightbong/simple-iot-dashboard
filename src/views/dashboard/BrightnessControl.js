import { useState } from 'react'
import { CCol } from '@coreui/react'
import { cilLightbulb } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { pluginsApi } from 'src/apis/plugins/plugins.api'

const BrightnessControl = () => {
  const [brightness, setBrightness] = useState(0)
  const [isAdjusting, setIsAdjusting] = useState(false)

  const handleBrightnessChange = (e) => {
    const value = e.target.value
    setBrightness(value)
    if (!isAdjusting) {
      controlBrightness(value)
    }
  }

  const handleDragStart = () => {
    setIsAdjusting(true)
  }

  const handleDragEnd = () => {
    setIsAdjusting(false)
    controlBrightness(brightness)
  }

  const controlBrightness = async (value) => {
    try {
      await pluginsApi.setDeviceValue({
        brightness: value.toString(),
      })
    } catch (e) {
      alert(e.response.data.message)
    }
  }

  return (
    <CCol className="mt-4" style={{ textAlign: 'center' }}>
      <CCol
        style={{
          position: 'relative',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CCol
          style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            background: `radial-gradient(circle, rgba(255,215,0,${brightness / 100}) 0%, rgba(255,215,0,0) 60%)`,
            opacity: brightness / 100,
            transform: 'scale(' + (0.5 + brightness / 100) + ')',
            transition: 'all 0.3s ease',
          }}
        />

        <CIcon
          width={80}
          height={80}
          icon={cilLightbulb}
          style={{
            position: 'relative',
            zIndex: 1,
            color: brightness > 0 ? '#ffd700' : '#888',
            opacity: brightness > 0 ? brightness / 10 : 0.1,
          }}
        />
      </CCol>

      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="100"
        value={brightness}
        onChange={handleBrightnessChange}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      />
      <CCol>
        <label htmlFor="volume">밝기 ({brightness}%)</label>
      </CCol>
    </CCol>
  )
}

export default BrightnessControl
