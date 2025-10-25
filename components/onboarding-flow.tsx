"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Shield, User, Users, Mail, UserCircle } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: (profile: { 
    userId: string
    name: string
    email: string
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number 
  }) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [mode, setMode] = useState<"preventive" | "curative" | null>(null)
  const [age, setAge] = useState<string>("")
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [error, setError] = useState<string>("")

  const handleComplete = async () => {
    if (name && email && gender && mode && age) {
      setIsCreatingUser(true)
      setError("")

      try {
        // Créer l'utilisateur dans MongoDB
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password: 'temp-password-' + Date.now(), // Mot de passe temporaire
            profile: {
              gender,
              age: Number.parseInt(age),
              mode,
            },
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Erreur lors de la création du profil')
        }

        const userData = await response.json()
        
        // Appeler onComplete avec le userId de MongoDB
        onComplete({ 
          userId: userData._id,
          name, 
          email, 
          gender, 
          mode, 
          age: Number.parseInt(age) 
        })
      } catch (error) {
        console.error('Erreur création utilisateur:', error)
        setError(error instanceof Error ? error.message : 'Erreur de connexion')
        setIsCreatingUser(false)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#212E53] via-slate-100 to-sky-50 dark:from-[#212E53] dark:via-slate-900 dark:to-sky-950/20 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <img src="/kaera-logo.png" alt="Kaëra" className="h-24 w-auto" />
          </div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">Kaëra</h1>
          <p className="text-muted-foreground text-lg">Ensemble face au cancer</p>
        </div>

        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Créons votre compte</h2>
              <p className="text-muted-foreground">Commençons par quelques informations basiques</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4" />
                  Votre nom complet
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Marie Dupont"
                  className="h-12"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Votre adresse email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemple@email.com"
                  className="h-12"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Vos informations sont sécurisées et ne seront jamais partagées.
              </p>
            </div>

            <Button 
              onClick={() => setStep(2)} 
              disabled={!name.trim() || !email.trim() || !email.includes('@')} 
              className="w-full" 
              size="lg"
            >
              Continuer
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Bienvenue {name.split(' ')[0]}</h2>
              <p className="text-muted-foreground">Personnalisons votre expérience pour mieux vous accompagner</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">Je suis :</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender("female")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 shadow-md ${
                    gender === "female"
                      ? "border-[#212E53] bg-[#212E53]/10 dark:bg-[#212E53]/30 shadow-[#212E53]/20 dark:shadow-[#212E53]/40"
                      : "border-border bg-card hover:border-[#212E53]/50 dark:hover:border-[#212E53]/70"
                  }`}
                >
                  <User className={`w-8 h-8 mx-auto mb-3 ${gender === "female" ? "text-[#212E53]" : "text-muted-foreground"}`} />
                  <p className="font-medium text-foreground">Une femme</p>
                </button>
                <button
                  onClick={() => setGender("male")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 shadow-md ${
                    gender === "male" 
                      ? "border-[#212E53] bg-[#212E53]/10 dark:bg-[#212E53]/30 shadow-[#212E53]/20 dark:shadow-[#212E53]/40" 
                      : "border-border bg-card hover:border-[#212E53]/50 dark:hover:border-[#212E53]/70"
                  }`}
                >
                  <Users className={`w-8 h-8 mx-auto mb-3 ${gender === "male" ? "text-[#212E53]" : "text-muted-foreground"}`} />
                  <p className="font-medium text-foreground">Un homme</p>
                </button>
              </div>
            </div>

            <Button onClick={() => setStep(3)} disabled={!gender} className="w-full" size="lg">
              Continuer
            </Button>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Votre parcours</h2>
              <p className="text-muted-foreground">Choisissez le mode qui correspond à votre situation</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setMode("preventive")}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:scale-[1.02] text-left shadow-md ${
                  mode === "preventive"
                    ? "border-[#212E53] bg-[#212E53]/10 dark:bg-[#212E53]/30 shadow-[#212E53]/20 dark:shadow-[#212E53]/40"
                    : "border-border bg-card hover:border-[#212E53]/50 dark:hover:border-[#212E53]/70"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${mode === "preventive" ? "bg-[#212E53]/20 dark:bg-[#212E53]/40" : "bg-accent/20"}`}>
                    <Shield className={`w-6 h-6 ${mode === "preventive" ? "text-[#212E53]" : "text-accent"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">Mode Préventif</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Découvrez les bonnes pratiques, les dépistages recommandés et adoptez un mode de vie sain pour
                      réduire les risques.
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setMode("curative")}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:scale-[1.02] text-left shadow-md ${
                  mode === "curative"
                    ? "border-sky-500 bg-sky-50 dark:bg-sky-950/30 shadow-sky-200 dark:shadow-sky-900"
                    : "border-border bg-card hover:border-sky-300 dark:hover:border-sky-700"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${mode === "curative" ? "bg-sky-100 dark:bg-sky-900/50" : "bg-accent/20"}`}>
                    <Heart className={`w-6 h-6 ${mode === "curative" ? "text-sky-600" : "text-accent"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground mb-1">Mode Curatif</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Accédez à un accompagnement personnalisé, des ressources adaptées et un suivi pour votre parcours
                      de soins.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1" size="lg">
                Retour
              </Button>
              <Button onClick={() => setStep(4)} disabled={!mode} className="flex-1" size="lg">
                Continuer
              </Button>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Votre âge</h2>
              <p className="text-muted-foreground">Pour vous proposer des recommandations personnalisées</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="text-sm font-medium text-foreground mb-2 block">
                  Quel âge avez-vous ?
                </label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Entrez votre âge"
                  className="text-lg h-14"
                  disabled={isCreatingUser}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Cette information nous permet de vous proposer des rappels de dépistage adaptés à votre âge.
              </p>
              
              {error && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={() => setStep(3)} 
                variant="outline" 
                className="flex-1" 
                size="lg"
                disabled={isCreatingUser}
              >
                Retour
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!age || Number.parseInt(age) < 1 || Number.parseInt(age) > 120 || isCreatingUser}
                className="flex-1"
                size="lg"
              >
                {isCreatingUser ? "Création du profil..." : "Commencer"}
              </Button>
            </div>
          </Card>
        )}

        <div className="flex justify-center gap-2 mt-6">
          <div className={`h-2 rounded-full transition-all ${step === 1 ? "bg-purple-500 w-8" : "bg-gray-300 dark:bg-gray-700 w-2"}`} />
          <div className={`h-2 rounded-full transition-all ${step === 2 ? "bg-purple-500 w-8" : "bg-gray-300 dark:bg-gray-700 w-2"}`} />
          <div className={`h-2 rounded-full transition-all ${step === 3 ? "bg-purple-500 w-8" : "bg-gray-300 dark:bg-gray-700 w-2"}`} />
          <div className={`h-2 rounded-full transition-all ${step === 4 ? "bg-purple-500 w-8" : "bg-gray-300 dark:bg-gray-700 w-2"}`} />
        </div>
      </div>
    </div>
  )
}
