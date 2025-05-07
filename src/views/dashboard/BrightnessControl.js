import { useState } from 'react'
import { CCol } from '@coreui/react'
import { cilLightbulb } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const BrightnessControl = () => {
  const [brightness, setBrightness] = useState(0)

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
        onChange={(e) => setBrightness(parseInt(e.target.value))}
      />
      <CCol>
        <label htmlFor="volume">밝기 ({brightness}%)</label>
      </CCol>
    </CCol>
  )
}

export default BrightnessControl
