"use client"

import { useEffect, useState } from 'react'

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'ID utilisateur depuis la session ou localStorage
    const fetchUserId = async () => {
      try {
        // Option 1: Depuis la session NextAuth
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const session = await response.json()
          if (session?.user?.id) {
            setUserId(session.user.id)
            setIsLoading(false)
            return
          }
        }
        
        // Option 2: Depuis localStorage (pour le développement)
        const storedUserId = localStorage.getItem('userId')
        if (storedUserId) {
          setUserId(storedUserId)
        } else {
          // Créer un ID temporaire si aucun n'existe
          const tempUserId = `temp-${Date.now()}`
          localStorage.setItem('userId', tempUserId)
          setUserId(tempUserId)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'ID utilisateur:', error)
        // Utiliser un ID temporaire en cas d'erreur
        const tempUserId = `temp-${Date.now()}`
        localStorage.setItem('userId', tempUserId)
        setUserId(tempUserId)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserId()
  }, [])

  return { userId, isLoading }
}
