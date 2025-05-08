import React, { createContext, useContext, useState, useEffect } from 'react'
import { userStorage } from 'src/utils/local-storage/user-storage'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userStorage.getUser())
  const [isAuthenticated, setIsAuthenticated] = useState(!!userStorage.getUser())

  const login = (userData) => {
    userStorage.setUser(userData)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    userStorage.removeUser()
    setUser(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const _user = userStorage.getUser()
    setUser(_user)
    setIsAuthenticated(!!_user)
  }, [])

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth context is null')
  }
  return context
}
