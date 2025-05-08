export const USER_STORAGE_KEY = '@user'

class UserStorage {
  getUser() {
    try {
      const userStr = localStorage.getItem(USER_STORAGE_KEY)
      return userStr ? JSON.parse(userStr) : null
    } catch (e) {
      throw new Error(e)
    }
  }

  setUser(user) {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
    } catch (e) {
      throw new Error(e)
    }
  }

  removeUser() {
    try {
      localStorage.removeItem(USER_STORAGE_KEY)
    } catch (e) {
      throw new Error(e)
    }
  }
}

export const userStorage = new UserStorage()
