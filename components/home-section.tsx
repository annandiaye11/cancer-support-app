"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react"
import { useState } from "react"

interface HomeSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function HomeSection({ userProfile }: HomeSectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [screenings, setScreenings] = useState<Record<string, boolean>>({
    "2025-01": false,
    "2025-02": false,
    "2025-03": false,
  })
  const [articles] = useState([
    {
      id: 1,
      title: "Les 10 habitudes pour réduire les risques",
      category: "Prévention",
      image: "/healthy-lifestyle-prevention.jpg",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Comprendre le dépistage précoce",
      category: "Dépistage",
      image: "/medical-screening-checkup.jpg",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "Alimentation et prévention du cancer",
      category: "Nutrition",
      image: "/healthy-food-nutrition.png",
      readTime: "6 min",
    },
  ])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  const monthKey = `${year}-${String(month + 1).padStart(2, "0")}`

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const toggleScreening = (key: string) => {
    setScreenings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getRecentScreenings = () => {
    return Object.entries(screenings)
      .filter(([_, completed]) => completed)
      .slice(-3)
      .map(([date]) => {
        const [year, month] = date.split("-")
        return new Date(Number.parseInt(year), Number.parseInt(month) - 1).toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        })
      })
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Calendar Section */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Calendrier de dépistage</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={previousMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium text-foreground min-w-[120px] text-center">
              {currentMonth.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startingDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const isToday =
              new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year
            return (
              <div
                key={day}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                  isToday ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>

        {userProfile.gender === "female" && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`screening-${monthKey}`}
                  checked={screenings[monthKey] || false}
                  onCheckedChange={() => toggleScreening(monthKey)}
                />
                <label htmlFor={`screening-${monthKey}`} className="text-sm font-medium text-foreground cursor-pointer">
                  Auto-examen des seins ce mois-ci
                </label>
              </div>
              {screenings[monthKey] && <CheckCircle2 className="w-5 h-5 text-primary" />}
            </div>
            {userProfile.age >= 25 && (
              <div className="flex items-center gap-3 mt-3">
                <Checkbox id="pap-smear" />
                <label htmlFor="pap-smear" className="text-sm text-muted-foreground cursor-pointer">
                  Frottis cervical (tous les 3 ans)
                </label>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Articles Carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Articles recommandés</h3>
          <Button variant="ghost" size="sm">
            Voir tout
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="flex-shrink-0 w-[280px] overflow-hidden hover:shadow-lg transition-shadow cursor-pointer snap-start"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 relative">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="inline-block px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-2">
                  {article.category}
                </div>
                <h4 className="font-semibold text-foreground mb-2 line-clamp-2">{article.title}</h4>
                <p className="text-xs text-muted-foreground">{article.readTime} de lecture</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Screenings */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-foreground mb-4">Derniers dépistages</h3>
        {getRecentScreenings().length > 0 ? (
          <div className="space-y-3">
            {getRecentScreenings().map((date, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Auto-examen des seins</p>
                  <p className="text-xs text-muted-foreground">{date}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Circle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">Aucun dépistage enregistré</p>
            <p className="text-xs text-muted-foreground mt-1">Cochez vos dépistages dans le calendrier ci-dessus</p>
          </div>
        )}
      </Card>
    </div>
  )
}
