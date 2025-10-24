"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Heart, Shield, User, Users } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: (profile: { gender: "male" | "female"; mode: "preventive" | "curative"; age: number }) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [gender, setGender] = useState<"male" | "female" | null>(null)
  const [mode, setMode] = useState<"preventive" | "curative" | null>(null)
  const [age, setAge] = useState<string>("")

  const handleComplete = () => {
    if (gender && mode && age) {
      onComplete({ gender, mode, age: Number.parseInt(age) })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Heart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">CareCompanion</h1>
          <p className="text-muted-foreground text-lg">Votre allié dans la prévention et l'accompagnement</p>
        </div>

        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Bienvenue</h2>
              <p className="text-muted-foreground">Personnalisons votre expérience pour mieux vous accompagner</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-foreground">Je suis :</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGender("female")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    gender === "female"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <User className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="font-medium text-foreground">Une femme</p>
                </button>
                <button
                  onClick={() => setGender("male")}
                  className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                    gender === "male" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="font-medium text-foreground">Un homme</p>
                </button>
              </div>
            </div>

            <Button onClick={() => setStep(2)} disabled={!gender} className="w-full" size="lg">
              Continuer
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Votre parcours</h2>
              <p className="text-muted-foreground">Choisissez le mode qui correspond à votre situation</p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setMode("preventive")}
                className={`w-full p-6 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                  mode === "preventive"
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/20">
                    <Shield className="w-6 h-6 text-accent" />
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
                className={`w-full p-6 rounded-xl border-2 transition-all hover:scale-[1.02] text-left ${
                  mode === "curative" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <Heart className="w-6 h-6 text-primary" />
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
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1" size="lg">
                Retour
              </Button>
              <Button onClick={() => setStep(3)} disabled={!mode} className="flex-1" size="lg">
                Continuer
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
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
                  min="18"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Entrez votre âge"
                  className="text-lg h-14"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Cette information nous permet de vous proposer des rappels de dépistage adaptés à votre âge.
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1" size="lg">
                Retour
              </Button>
              <Button
                onClick={handleComplete}
                disabled={!age || Number.parseInt(age) < 18}
                className="flex-1"
                size="lg"
              >
                Commencer
              </Button>
            </div>
          </Card>
        )}

        <div className="flex justify-center gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full transition-all ${step === 1 ? "bg-primary w-8" : "bg-border"}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${step === 2 ? "bg-primary w-8" : "bg-border"}`} />
          <div className={`w-2 h-2 rounded-full transition-all ${step === 3 ? "bg-primary w-8" : "bg-border"}`} />
        </div>
      </div>
    </div>
  )
}
