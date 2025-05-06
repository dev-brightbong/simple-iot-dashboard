import { useEffect, useState } from 'react'

const useLogin = () => {
  const user = localStorage.getItem('@user')
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (user) {
      setIsLogin(true)
    }
  }, [])

  return {
    isLogin,
  }
}

export default useLogin
