"use client"

import { useEffect, useState } from 'react'

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer l'ID utilisateur depuis la session ou localStorage
    const fetchUserId = async () => {
      try {
        // Option 1: Vérifier d'abord localStorage (pour éviter de créer un nouvel ID à chaque fois)
        const storedUserId = localStorage.getItem('userId')
        
        if (storedUserId) {
          // Si on a déjà un userId stocké, l'utiliser IMMÉDIATEMENT
          console.log('🆔 userId trouvé dans localStorage:', storedUserId)
          setUserId(storedUserId)
          setIsLoading(false)
          return // ⚠️ Important: sortir ici pour ne pas continuer
        }
        
        // Option 2: Essayer de récupérer depuis la session NextAuth (seulement si pas de localStorage)
        console.log('🔍 Vérification de la session NextAuth...')
        const response = await fetch('/api/auth/session')
        if (response.ok) {
          const session = await response.json()
          if (session?.user?.id) {
            // Stocker l'ID de session dans localStorage pour la persistance
            console.log('✅ userId trouvé dans la session:', session.user.id)
            localStorage.setItem('userId', session.user.id)
            setUserId(session.user.id)
            setIsLoading(false)
            return
          }
        }
        
        // Option 3: Créer un ID temporaire si aucun n'existe
        const tempUserId = `temp-${Date.now()}`
        localStorage.setItem('userId', tempUserId)
        setUserId(tempUserId)
        console.log('🆔 Nouvel ID utilisateur temporaire créé:', tempUserId)
        setIsLoading(false)
      } catch (error) {
        console.error('❌ Erreur lors de la récupération de l\'ID utilisateur:', error)
        
        // En cas d'erreur, vérifier localStorage avant de créer un nouveau
        const existingUserId = localStorage.getItem('userId')
        if (existingUserId) {
          console.log('🆔 Utilisation de l\'userId existant après erreur:', existingUserId)
          setUserId(existingUserId)
        } else {
          const tempUserId = `temp-${Date.now()}`
          localStorage.setItem('userId', tempUserId)
          setUserId(tempUserId)
          console.log('🆔 ID utilisateur temporaire créé après erreur:', tempUserId)
        }
        setIsLoading(false)
      }
    }

    fetchUserId()
  }, [])

  return { userId, isLoading }
}
