import { useEffect, useState } from 'react'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken')
      const userProfile = localStorage.getItem('userProfile')
      const isOnboarded = localStorage.getItem('isOnboarded')

      if (token && userProfile && isOnboarded === 'true') {
        try {
          const parsed = JSON.parse(userProfile)
          setUser(parsed)
          setIsAuthenticated(true)
        } catch (error) {
          console.error('Erreur parsing user profile:', error)
          // Nettoyer les données corrompues
          localStorage.removeItem('authToken')
          localStorage.removeItem('userProfile')
          localStorage.removeItem('isOnboarded')
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('isOnboarded')
    setIsAuthenticated(false)
    setUser(null)
    globalThis.location.href = '/'
  }

  return {
    isAuthenticated,
    user,
    isLoading,
    logout
  }
}
