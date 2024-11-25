import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (email, password) => {
    // Simulate authentication
    const user = {
      id: '1',
      email,
      isSuperUser: email === 'admin@visioncave.com',
      permissions: {
        residential: true,
        school: true,
        hospital: email === 'admin@visioncave.com',
        minesite: email === 'admin@visioncave.com',
        traffic: true
      }
    }
    setCurrentUser(user)
    localStorage.setItem('user', JSON.stringify(user))
    return Promise.resolve(user)
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
    return Promise.resolve()
  }

  const value = {
    currentUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
