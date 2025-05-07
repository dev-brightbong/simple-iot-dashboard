import { useState } from 'react'
import { CCol } from '@coreui/react'
import { cilLightbulb } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const BrightnessControl = () => {
  const [brightness, setBrightness] = useState(0)

  return (
    <CCol className="mt-4" style={{ textAlign: 'center' }}>
      {/* <CCol>
        {Array.from({ length: brightness }).map((_, index) => (
          <CCol key={`brightness-bar-${index}`} style={{ position: 'absolute' }}>
            <CCol style={{ width: '3px', height: '20px', backgroundColor: 'black' }} />
          </CCol>
        ))}
      </CCol> */}

      <CCol style={{ position: 'relative' }}>
        <CIcon width={80} height={80} icon={cilLightbulb} />
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
