"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, BookOpen, Video, Calendar, User, Heart, Shield, Menu, X } from "lucide-react"
import { ArticlesSection } from "@/components/articles-section"
import { VideosSection } from "@/components/videos-section"
import { HomeSection } from "@/components/home-section"
import { CalendarSection } from "@/components/calendar-section"
import { ProfileSection } from "@/components/profile-section"
import { AiPsyChat } from "@/components/ai-psy-chat"
import { AppointmentsSection } from "@/components/appointments-section"
import { PreventionVideosSection } from "@/components/prevention-videos-section"

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

  // Navigation adaptée selon le mode
  const navigationPreventive = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "calendar", label: "Dépistages", icon: Calendar },
    { id: "videos", label: "Vidéos", icon: Video },
    { id: "articles", label: "Guides", icon: BookOpen },
    { id: "appointments", label: "RDV", icon: Calendar },
    { id: "profile", label: "Profil", icon: User },
  ]

  const navigationCurative = [
    { id: "home", label: "Accueil", icon: Home },
    { id: "ai-psy", label: "Psy IA", icon: Heart },
    { id: "videos", label: "Témoignages", icon: Video },
    { id: "appointments", label: "Rendez-vous", icon: Calendar },
    { id: "articles", label: "Infos", icon: BookOpen },
    { id: "profile", label: "Profil", icon: User },
  ]

  const navigation = userProfile.mode === "preventive" ? navigationPreventive : navigationCurative

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                userProfile.gender === "female" 
                  ? "bg-pink-100 dark:bg-pink-950/30" 
                  : "bg-blue-100 dark:bg-blue-950/30"
              }`}>
                {userProfile.mode === "preventive" ? (
                  <Shield className={`w-5 h-5 ${
                    userProfile.gender === "female" ? "text-pink-600" : "text-blue-600"
                  }`} />
                ) : (
                  <Heart className={`w-5 h-5 ${
                    userProfile.gender === "female" ? "text-pink-600" : "text-blue-600"
                  }`} />
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
        {activeTab === "home" && (
          <HomeSection 
            userProfile={userProfile} 
            onViewAllArticles={() => setActiveTab("articles")}
            onArticleClick={(articleId) => {
              setActiveTab("articles")
              // L'article sera ouvert dans ArticlesSection
            }}
          />
        )}
        {activeTab === "articles" && <ArticlesSection userProfile={userProfile} />}
        {activeTab === "videos" && (
          userProfile.mode === "preventive" 
            ? <PreventionVideosSection userProfile={userProfile} />
            : <VideosSection userProfile={userProfile} />
        )}
        {activeTab === "ai-psy" && <AiPsyChat userProfile={userProfile} />}
        {activeTab === "calendar" && <CalendarSection userProfile={userProfile} />}
        {activeTab === "appointments" && <AppointmentsSection userProfile={userProfile} />}
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
