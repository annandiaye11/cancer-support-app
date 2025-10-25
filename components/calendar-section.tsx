"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus, CheckCircle2, AlertCircle, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BreastExamInteractive } from "@/components/breast-exam-interactive"

interface CalendarSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

interface ScreeningCheck {
  id: string
  date: string
  completed: boolean
}

export function CalendarSection({ userProfile }: CalendarSectionProps) {
  const [screeningChecks, setScreeningChecks] = useState<Record<string, ScreeningCheck[]>>({})
  const [showBreastExamGuide, setShowBreastExamGuide] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("screeningChecks")
    if (saved) {
      try {
        setScreeningChecks(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load screening checks:", e)
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(screeningChecks).length > 0) {
      localStorage.setItem("screeningChecks", JSON.stringify(screeningChecks))
    }
  }, [screeningChecks])

  const markScreeningDone = (screeningId: string) => {
    const today = new Date().toISOString().split("T")[0]
    setScreeningChecks((prev) => ({
      ...prev,
      [screeningId]: [
        ...(prev[screeningId] || []),
        { id: Date.now().toString(), date: today, completed: true },
      ],
    }))
  }

  const getLastCheck = (screeningId: string): Date | null => {
    const checks = screeningChecks[screeningId] || []
    if (checks.length === 0) return null
    const lastCheck = checks[checks.length - 1]
    return new Date(lastCheck.date)
  }

  const getNextDate = (screeningId: string, frequencyMonths: number): Date => {
    const lastCheck = getLastCheck(screeningId)
    const baseDate = lastCheck || new Date()
    const nextDate = new Date(baseDate)
    nextDate.setMonth(nextDate.getMonth() + frequencyMonths)
    return nextDate
  }

  const isOverdue = (nextDate: Date): boolean => {
    return nextDate < new Date()
  }

  // Dépistages préventifs selon le genre
  const preventiveScreenings =
    userProfile.gender === "female"
      ? [
          {
            id: "breast-self-exam",
            title: "Autopalpation des seins",
            description: "À faire chaque mois, 3-5 jours après vos règles",
            frequencyMonths: 1,
            icon: "🩺",
            ageMin: 20,
            guide: "breast-exam",
          },
          ...(userProfile.age >= 25
            ? [
                {
                  id: "pap-smear",
                  title: "Frottis cervical (Pap test)",
                  description: "Dépistage du cancer du col de l'utérus",
                  frequencyMonths: 36,
                  icon: "🔬",
                  ageMin: 25,
                  guide: "pap-smear",
                },
              ]
            : []),
          ...(userProfile.age >= 50
            ? [
                {
                  id: "mammogram",
                  title: "Mammographie",
                  description: "Dépistage du cancer du sein",
                  frequencyMonths: 24,
                  icon: "📸",
                  ageMin: 50,
                  guide: null,
                },
                {
                  id: "colorectal-screening-f",
                  title: "Dépistage cancer colorectal",
                  description: "Test immunologique fécal (FIT)",
                  frequencyMonths: 24,
                  icon: "🧪",
                  ageMin: 50,
                  guide: null,
                },
              ]
            : []),
          {
            id: "skin-check-f",
            title: "Surveillance de la peau",
            description: "Vérifier les grains de beauté et taches suspectes",
            frequencyMonths: 6,
            icon: "👁️",
            ageMin: 18,
            guide: null,
          },
        ]
      : [
          // DÉPISTAGES MASCULINS
          ...(userProfile.age >= 50
            ? [
                {
                  id: "prostate-psa",
                  title: "Dépistage cancer de la prostate (PSA)",
                  description: "Test sanguin PSA + toucher rectal",
                  frequencyMonths: 12,
                  icon: "🔬",
                  ageMin: 50,
                  guide: null,
                },
                {
                  id: "colorectal-screening",
                  title: "Dépistage cancer colorectal",
                  description: "Test immunologique fécal (FIT) ou coloscopie",
                  frequencyMonths: 24,
                  icon: "🧪",
                  ageMin: 50,
                  guide: null,
                },
              ]
            : []),
          ...(userProfile.age >= 40
            ? [
                {
                  id: "testicular-self-exam",
                  title: "Autopalpation testiculaire",
                  description: "Auto-examen mensuel recommandé (surtout 15-35 ans)",
                  frequencyMonths: 1,
                  icon: "🩺",
                  ageMin: 15,
                  guide: null,
                },
              ]
            : []),
          {
            id: "skin-check",
            title: "Surveillance de la peau",
            description: "Vérifier les grains de beauté et taches suspectes",
            frequencyMonths: 6,
            icon: "👁️",
            ageMin: 18,
            guide: null,
          },
        ]

  const appointments = [
    {
      id: 1,
      title: "Consultation oncologie",
      date: "2025-10-28",
      time: "14:30",
      location: "Hôpital Saint-Louis",
      type: "medical",
    },
    {
      id: 2,
      title: "Séance de chimiothérapie",
      date: "2025-10-30",
      time: "09:00",
      location: "Centre de traitement",
      type: "treatment",
    },
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {userProfile.mode === "preventive" ? "Mes Dépistages" : "Mes Rendez-vous"}
            </h2>
            <p className="text-muted-foreground">
              {userProfile.mode === "preventive"
                ? "Suivez vos contrôles préventifs réguliers"
                : "Gérez vos rendez-vous médicaux"}
            </p>
          </div>
        </div>
        {userProfile.mode === "curative" && (
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Ajouter</span>
          </Button>
        )}
      </div>

      {userProfile.mode === "preventive" && preventiveScreenings.length > 0 && (
        <div className="space-y-4">
          {preventiveScreenings.map((screening) => {
            const nextDate = getNextDate(screening.id, screening.frequencyMonths)
            const lastCheck = getLastCheck(screening.id)
            const overdue = isOverdue(nextDate)
            const checks = screeningChecks[screening.id] || []

            return (
              <Card key={screening.id} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{screening.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{screening.title}</h4>
                    <p className="text-sm text-muted-foreground">{screening.description}</p>
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <span>Prochain: {nextDate.toLocaleDateString("fr-FR")}</span>
                      {lastCheck && <span>Dernier: {lastCheck.toLocaleDateString("fr-FR")}</span>}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      {screening.id === "breast-self-exam" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowBreastExamGuide(true)}
                        >
                          📖 Voir le guide
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => markScreeningDone(screening.id)}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Je l'ai fait
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {userProfile.mode === "curative" && (
        <div className="space-y-4">
          {appointments.map((apt) => (
            <Card key={apt.id} className="p-4">
              <h4 className="font-semibold">{apt.title}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(apt.date).toLocaleDateString("fr-FR")} à {apt.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{apt.location}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Guide interactif d'autopalpation */}
      {showBreastExamGuide && (
        <BreastExamInteractive
          onComplete={() => {
            markScreeningDone("breast-self-exam")
            setShowBreastExamGuide(false)
          }}
          onClose={() => setShowBreastExamGuide(false)}
        />
      )}
    </div>
  )
}
