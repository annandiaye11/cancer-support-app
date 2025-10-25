'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, Settings, Calendar, BookOpen, Activity, Shield, Bell, LogOut } from 'lucide-react'
import { useUserProfile, useUserPreferences } from '@/hooks/useApi'

export function ProfileSection() {
  // Utiliser les vrais hooks API
  const { profile, loading: profileLoading, error: profileError } = useUserProfile()
  const { preferences, loading: preferencesLoading, error: preferencesError } = useUserPreferences()

  if (profileLoading || preferencesLoading) {
    return (
      <div className="space-y-6 pb-20 md:pb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="w-20 h-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </Card>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (profileError || preferencesError) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Erreur lors du chargement du profil</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Informations du profil */}
      {profile && (
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-xl">
                {profile.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground">{profile.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                  {profile.gender === 'female' ? 'Femme' : 'Homme'}
                </Badge>
                <Badge variant="outline">
                  {profile.age} ans
                </Badge>
                <Badge variant={profile.mode === 'preventive' ? 'default' : 'secondary'}>
                  {profile.mode === 'preventive' ? 'Préventif' : 'Curatif'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              Modifier le profil
            </Button>
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Confidentialité
            </Button>
          </div>
        </Card>
      )}

      {/* Statistiques d'utilisation */}
      {profile && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Mon activité</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats?.articlesRead || 0}</div>
              <div className="text-sm text-muted-foreground">Articles lus</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats?.videosWatched || 0}</div>
              <div className="text-sm text-muted-foreground">Vidéos vues</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats?.appointmentsScheduled || 0}</div>
              <div className="text-sm text-muted-foreground">RDV planifiés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{profile.stats?.screeningsCompleted || 0}</div>
              <div className="text-sm text-muted-foreground">Dépistages</div>
            </div>
          </div>
        </Card>
      )}

      {/* Préférences */}
      {preferences && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Préférences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Rappels et alertes</p>
                </div>
              </div>
              <Badge variant={preferences.notifications ? 'default' : 'secondary'}>
                {preferences.notifications ? 'Activées' : 'Désactivées'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Rappels de dépistage</p>
                  <p className="text-sm text-muted-foreground">Fréquence: {preferences.screeningReminders}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Contenu préféré</p>
                  <p className="text-sm text-muted-foreground">
                    {preferences.contentPreferences?.join(', ') || 'Aucune préférence'}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Personnaliser
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Actions rapides */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button variant="outline" className="justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Programmer un RDV
          </Button>
          <Button variant="outline" className="justify-start">
            <Activity className="w-4 h-4 mr-2" />
            Historique médical
          </Button>
          <Button variant="outline" className="justify-start">
            <BookOpen className="w-4 h-4 mr-2" />
            Mes articles sauvegardés
          </Button>
          <Button variant="outline" className="justify-start">
            <Shield className="w-4 h-4 mr-2" />
            Sécurité du compte
          </Button>
        </div>
      </Card>

      {/* Déconnexion */}
      <Card className="p-6">
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              localStorage.removeItem('userProfile')
              localStorage.removeItem('isOnboarded')
              window.location.reload()
            }}
          >
            <Settings className="w-4 h-4 mr-2" />
            Modifier mes informations
          </Button>
          <Button variant="destructive" className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </div>
      </Card>
    </div>
  )
}
