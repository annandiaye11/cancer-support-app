"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Plus, ChevronLeft, ChevronRight, Bell } from "lucide-react"

interface CalendarSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function CalendarSection({ userProfile }: CalendarSectionProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

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
    {
      id: 3,
      title: "Rendez-vous nutritionniste",
      date: "2025-11-02",
      time: "11:00",
      location: "Cabinet médical",
      type: "support",
    },
  ]

  const healthReminders =
    userProfile.gender === "female"
      ? [
          {
            id: "breast-exam",
            title: "Auto-examen des seins",
            description: "Palpation mensuelle recommandée",
            frequency: "Mensuel",
            icon: "🩺",
            nextDate: "2025-11-01",
          },
          ...(userProfile.age >= 25
            ? [
                {
                  id: "pap-smear",
                  title: "Frottis cervical",
                  description: "Dépistage du cancer du col de l'utérus",
                  frequency: "Tous les 3 ans",
                  icon: "🔬",
                  nextDate: "2026-01-15",
                },
              ]
            : []),
        ]
      : []

  const reminders = [
    {
      id: 1,
      title: "Prendre médicament du soir",
      time: "20:00",
      recurring: "daily",
    },
    {
      id: 2,
      title: "Exercices de respiration",
      time: "08:00",
      recurring: "daily",
    },
  ]

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Calendrier</h2>
            <p className="text-muted-foreground">Gérez vos rendez-vous et rappels</p>
          </div>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden md:inline">Ajouter</span>
        </Button>
      </div>

      {/* Calendar Widget */}
      <Card className="p-4 bg-linear-to-br from-background to-muted/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
          </h3>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:scale-105 transition-all duration-200"
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setMonth(newDate.getMonth() - 1)
                setCurrentDate(newDate)
              }}
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-full hover:scale-105 transition-all duration-200"
              onClick={() => {
                const newDate = new Date(currentDate)
                newDate.setMonth(newDate.getMonth() + 1)
                setCurrentDate(newDate)
              }}
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-3">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
            <div key={`weekday-${index}`} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 2
            const isToday = day === 24
            const hasAppointment = [28, 30].includes(day)
            return (
              <button
                key={`calendar-day-${i}`}
                className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 mx-auto ${
                  day < 1 || day > 31
                    ? "text-muted-foreground/30 cursor-default"
                    : isToday
                      ? "bg-linear-to-br from-primary via-primary to-primary/80 text-primary-foreground font-bold shadow-lg shadow-primary/20 scale-105"
                      : hasAppointment
                        ? "bg-linear-to-br from-accent/30 to-accent/60 text-accent-foreground font-semibold hover:scale-105 hover:shadow-md border border-accent/50"
                        : "text-foreground hover:bg-linear-to-br hover:from-muted/40 hover:to-muted/70 hover:scale-105"
                }`}
              >
                {day > 0 && day <= 31 ? (
                  <span className="transition-transform duration-200">{day}</span>
                ) : null}
              </button>
            )
          })}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-linear-to-br from-primary to-primary/80"></div>
            <span className="text-xs text-muted-foreground">Aujourd'hui</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-linear-to-br from-accent/40 to-accent/60 border border-accent/50"></div>
            <span className="text-xs text-muted-foreground">Rendez-vous</span>
          </div>
        </div>
      </Card>

      {/* Upcoming Appointments */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Rendez-vous à venir</h3>
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg shrink-0 ${
                    appointment.type === "medical"
                      ? "bg-primary/10"
                      : appointment.type === "treatment"
                        ? "bg-accent/10"
                        : "bg-muted"
                  }`}
                >
                  <Calendar
                    className={`w-5 h-5 ${
                      appointment.type === "medical"
                        ? "text-primary"
                        : appointment.type === "treatment"
                          ? "text-accent"
                          : "text-muted-foreground"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground mb-1">{appointment.title}</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>
                        {new Date(appointment.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}{" "}
                        à {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Détails
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Reminders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Rappels quotidiens</h3>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{reminder.title}</h4>
                  <p className="text-sm text-muted-foreground">Tous les jours à {reminder.time}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Modifier
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {healthReminders.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Rappels de dépistage</h3>
          </div>
          <div className="space-y-3">
            {healthReminders.map((reminder) => (
              <Card key={reminder.id} className="p-5 border-primary/20 bg-primary/5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{reminder.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{reminder.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{reminder.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">Fréquence:</span> {reminder.frequency}
                      </span>
                      <span className="text-muted-foreground">
                        <span className="font-medium text-foreground">Prochain:</span>{" "}
                        {new Date(reminder.nextDate).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" className="shrink-0">
                    En savoir plus
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
