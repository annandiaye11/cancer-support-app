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
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return <Dashboard userProfile={userProfile!} />
}
