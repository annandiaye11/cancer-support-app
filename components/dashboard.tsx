"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Video, Calendar, User, Heart, Shield, Menu, X } from "lucide-react"
import { ArticlesSection } from "@/components/articles-section"
import { VideosSection } from "@/components/videos-section"
import { HomeSection } from "@/components/home-section"
import { CalendarSection } from "@/components/calendar-section"
import { ProfileSection } from "@/components/profile-section"

interface DashboardProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function Dashboard({ userProfile }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "articles", label: "Articles", icon: BookOpen },
    { id: "videos", label: "Vidéos", icon: Video },
    { id: "calendar", label: "Calendrier", icon: Calendar },
    { id: "profile", label: "Profil", icon: User },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                {userProfile.mode === "preventive" ? (
                  <Shield className="w-5 h-5 text-primary" />
                ) : (
                  <Heart className="w-5 h-5 text-primary" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">CareCompanion</h1>
                <p className="text-xs text-muted-foreground">
                  Mode {userProfile.mode === "preventive" ? "Préventif" : "Curatif"}
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-6">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        {activeTab === "home" && <HomeSection userProfile={userProfile} />}
        {activeTab === "articles" && <ArticlesSection userProfile={userProfile} />}
        {activeTab === "videos" && <VideosSection userProfile={userProfile} />}
        {activeTab === "calendar" && <CalendarSection userProfile={userProfile} />}
        {activeTab === "profile" && <ProfileSection userProfile={userProfile} />}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex justify-around">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-3 px-4 flex-1 transition-colors ${
                  activeTab === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
