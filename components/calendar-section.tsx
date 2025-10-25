'use client'

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus, CheckCircle2, AlertCircle, Bell } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BreastExamInteractive } from "@/components/breast-exam-interactive"

interface CalendarSectionProps {
  userProfile: {
    userId: string
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

interface Appointment {
  _id: string
  title: string
  description?: string
  type: 'medical' | 'treatment' | 'support' | 'screening'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  date: string
  time: string
  duration: number
  location: {
    name: string
    address?: string
    phone?: string
    type: 'hospital' | 'clinic' | 'home' | 'online'
  }
  doctor?: {
    name: string
    specialty: string
  }
}

export function CalendarSection({ userProfile }: CalendarSectionProps) {
  const [screeningChecks, setScreeningChecks] = useState<Record<string, ScreeningCheck[]>>({})
  const [showBreastExamGuide, setShowBreastExamGuide] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false)

  // Charger les rendez-vous depuis l'API
  useEffect(() => {
    if (userProfile.mode === "curative" && userProfile.userId) {
      setIsLoadingAppointments(true)
      fetch(`/api/appointments?userId=${userProfile.userId}`)
        .then(res => res.json())
        .then(data => {
          setAppointments(data.appointments || [])
        })
        .catch(error => {
          console.error('Erreur lors du chargement des rendez-vous:', error)
        })
        .finally(() => {
          setIsLoadingAppointments(false)
        })
    }
  }, [userProfile.userId, userProfile.mode])

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
          {isLoadingAppointments ? (
            <Card className="p-8">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Chargement des rendez-vous...</p>
              </div>
            </Card>
          ) : appointments.length === 0 ? (
            <Card className="p-8">
              <div className="text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Aucun rendez-vous prévu</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Cliquez sur "Ajouter" pour planifier un nouveau rendez-vous
                </p>
              </div>
            </Card>
          ) : (
            appointments.map((apt) => (
              <Card key={apt._id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{apt.title}</h4>
                    {apt.description && (
                      <p className="text-sm text-muted-foreground mt-1">{apt.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Clock className="w-4 h-4" />
                      <span>{new Date(apt.date).toLocaleDateString("fr-FR")} à {apt.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{apt.location.name}</span>
                    </div>
                    {apt.doctor && (
                      <div className="text-sm text-muted-foreground mt-1">
                        👨‍⚕️ {apt.doctor.name} - {apt.doctor.specialty}
                      </div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    apt.status === 'scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    apt.status === 'completed' ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {apt.status === 'scheduled' && 'Planifié'}
                    {apt.status === 'confirmed' && 'Confirmé'}
                    {apt.status === 'completed' && 'Terminé'}
                    {apt.status === 'cancelled' && 'Annulé'}
                    {apt.status === 'rescheduled' && 'Reporté'}
                  </div>
                </div>
              </Card>
            ))
          )}
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
