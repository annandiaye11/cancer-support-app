"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Heart, Shield, Settings, Bell, Lock, HelpCircle, LogOut } from "lucide-react"

interface ProfileSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
  }
}

export function ProfileSection({ userProfile }: ProfileSectionProps) {
  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-full bg-primary/10">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">Profil</h2>
          <p className="text-muted-foreground">Gérez vos informations personnelles</p>
        </div>
      </div>

      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">Utilisateur</h3>
            <p className="text-muted-foreground mb-3">user@example.com</p>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {userProfile.mode === "preventive" ? (
                  <>
                    <Shield className="w-4 h-4" />
                    <span>Mode Préventif</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    <span>Mode Curatif</span>
                  </>
                )}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">
                <User className="w-4 h-4" />
                <span>{userProfile.gender === "female" ? "Femme" : "Homme"}</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Modifier
          </Button>
        </div>
      </Card>

      {/* Settings Sections */}
      <div className="space-y-3">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Paramètres généraux</h4>
              <p className="text-sm text-muted-foreground">Langue, thème, préférences</p>
            </div>
            <Button variant="ghost" size="sm">
              Accéder
            </Button>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Bell className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Notifications</h4>
              <p className="text-sm text-muted-foreground">Gérer les alertes et rappels</p>
            </div>
            <Button variant="ghost" size="sm">
              Accéder
            </Button>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Confidentialité et sécurité</h4>
              <p className="text-sm text-muted-foreground">Mot de passe, données personnelles</p>
            </div>
            <Button variant="ghost" size="sm">
              Accéder
            </Button>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <HelpCircle className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Aide et support</h4>
              <p className="text-sm text-muted-foreground">FAQ, contact, ressources</p>
            </div>
            <Button variant="ghost" size="sm">
              Accéder
            </Button>
          </div>
        </Card>
      </div>

      {/* Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Votre activité</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-1">12</p>
            <p className="text-sm text-muted-foreground">Articles lus</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent mb-1">8</p>
            <p className="text-sm text-muted-foreground">Vidéos vues</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-1">3</p>
            <p className="text-sm text-muted-foreground">RDV planifiés</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent mb-1">15</p>
            <p className="text-sm text-muted-foreground">Jours actifs</p>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-4 border-destructive/20 hover:border-destructive/40 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-destructive/10">
            <LogOut className="w-5 h-5 text-destructive" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-destructive">Se déconnecter</h4>
            <p className="text-sm text-muted-foreground">Quitter votre session</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
