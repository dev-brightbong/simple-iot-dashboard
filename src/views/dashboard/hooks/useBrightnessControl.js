import { useState } from 'react'
import { pluginsApi } from 'src/apis/plugins/plugins.api'

const useBrightnessControl = () => {
  const [brightness, setBrightness] = useState(0)

  const onChange = (e) => {
    const value = e.target.value
    setBrightness(value)
  }

  const onMouseUp = () => {
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

  return { brightness, onChange, onMouseUp }
}

export default useBrightnessControl
