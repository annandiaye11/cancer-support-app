"use client"

import { useState, useEffect } from "react"
import { OnboardingFlow } from "@/components/onboarding-flow"
import { Dashboard } from "@/components/dashboard"

export default function Home() {
  const [isOnboarded, setIsOnboarded] = useState(false)
  const [userProfile, setUserProfile] = useState<{
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Charger les données depuis le localStorage au démarrage
    const savedProfile = localStorage.getItem('userProfile')
    const savedOnboarded = localStorage.getItem('isOnboarded')
    
    if (savedProfile && savedOnboarded === 'true') {
      try {
        const profile = JSON.parse(savedProfile)
        setUserProfile(profile)
        setIsOnboarded(true)
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error)
        // En cas d'erreur, on supprime les données corrompues
        localStorage.removeItem('userProfile')
        localStorage.removeItem('isOnboarded')
      }
    }
    
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (userProfile) {
      // Apply theme based on gender AFTER onboarding
      document.body.className = userProfile.gender === "female" ? "theme-female" : "theme-male"
    }
  }, [userProfile])

  const handleOnboardingComplete = (profile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }) => {
    setUserProfile(profile)
    setIsOnboarded(true)
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile))
    localStorage.setItem('isOnboarded', 'true')
  }

  // Afficher un loader pendant le chargement initial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return <Dashboard userProfile={userProfile!} />
}
