'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Settings, LogOut, Mail, Heart, Shield } from 'lucide-react'

export function ProfileSection() {
  const [profile, setProfile] = useState<{
    userId: string
    name: string
    email: string
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  } | null>(null)
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    age: '',
    gender: 'female' as 'male' | 'female',
    mode: 'preventive' as 'preventive' | 'curative'
  })

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        setProfile(parsed)
        setEditForm({
          name: parsed.name || '',
          email: parsed.email || '',
          age: parsed.age?.toString() || '',
          gender: parsed.gender || 'female',
          mode: parsed.mode || 'preventive'
        })
      } catch (error) {
        console.error('Erreur de chargement du profil:', error)
      }
    }
  }, [])

  const handleEditProfile = () => {
    if (profile) {
      setEditForm({
        name: profile.name,
        email: profile.email,
        age: profile.age.toString(),
        gender: profile.gender,
        mode: profile.mode
      })
      setIsEditDialogOpen(true)
    }
  }

  const handleSaveProfile = () => {
    if (!profile) return
    
    const updatedProfile = {
      userId: profile.userId, // Préserver le userId
      name: editForm.name,
      email: editForm.email,
      age: parseInt(editForm.age),
      gender: editForm.gender,
      mode: editForm.mode
    }
    
    setProfile(updatedProfile)
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile))
    setIsEditDialogOpen(false)
    window.location.reload()
  }

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('userProfile')
      localStorage.removeItem('isOnboarded')
      window.location.reload()
    }
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Chargement du profil...</p>
      </div>
    )
  }

  // Si l'ancien profil n'a pas de nom/email/userId, forcer la déconnexion pour refaire l'onboarding
  if (!profile.name || !profile.email || !profile.userId) {
    localStorage.removeItem('userProfile')
    localStorage.removeItem('isOnboarded')
    window.location.reload()
    return null
  }

  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <>
      <div className="space-y-6 pb-20 md:pb-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-xl bg-primary/10 text-primary">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{profile.name}</h2>
              <p className="text-muted-foreground flex items-center gap-1 mt-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge variant="outline">
                  {profile.gender === 'female' ? 'Femme' : 'Homme'}
                </Badge>
                <Badge variant="outline">
                  {profile.age} ans
                </Badge>
                <Badge variant={profile.mode === 'preventive' ? 'default' : 'secondary'} className="flex items-center gap-1">
                  {profile.mode === 'preventive' ? (
                    <>
                      <Shield className="w-3 h-3" />
                      Mode Préventif
                    </>
                  ) : (
                    <>
                      <Heart className="w-3 h-3" />
                      Mode Curatif
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={handleEditProfile} className="flex-1">
              <Settings className="w-4 h-4 mr-2" />
              Modifier mon profil
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">À propos de mon mode</h3>
          {profile.mode === 'preventive' ? (
            <div className="flex gap-3">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-medium">Mode Préventif</p>
                <p className="text-sm text-muted-foreground">
                  Vous avez accès à des conseils de prévention, des rappels de dépistage personnalisés.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <Heart className="w-5 h-5 text-secondary shrink-0 mt-1" />
              <div>
                <p className="font-medium">Mode Curatif</p>
                <p className="text-sm text-muted-foreground">
                  Vous bénéficiez d'un accompagnement personnalisé avec suivi médical.
                </p>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6">
          <Button variant="destructive" className="w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Se déconnecter
          </Button>
        </Card>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier mon profil</DialogTitle>
            <DialogDescription>
              Modifiez vos informations personnelles.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom complet</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                placeholder="Votre nom"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                placeholder="votre@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Âge</label>
              <Input
                type="number"
                value={editForm.age}
                onChange={(e) => setEditForm({...editForm, age: e.target.value})}
                min="1"
                max="120"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Genre</label>
              <Select value={editForm.gender} onValueChange={(value: 'male' | 'female') => setEditForm({...editForm, gender: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="male">Homme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mode</label>
              <Select value={editForm.mode} onValueChange={(value: 'preventive' | 'curative') => setEditForm({...editForm, mode: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="preventive">Préventif</SelectItem>
                  <SelectItem value="curative">Curatif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleSaveProfile}
              disabled={!editForm.name || !editForm.email || !editForm.age}
            >
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
