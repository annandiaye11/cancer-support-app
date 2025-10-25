"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Plus, MapPin, Clock, User, Phone, FileText, Trash2, Edit, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { format, isAfter, isBefore, parseISO, addDays } from "date-fns"
import { fr } from "date-fns/locale"
import { useUserId } from "@/hooks/use-user-id"

interface Appointment {
  _id?: string
  title: string
  description?: string
  type: "medical" | "treatment" | "support" | "screening"
  status: "scheduled" | "confirmed" | "completed" | "cancelled"
  date: string
  time: string
  duration: number
  location: {
    name: string
    address?: string
    phone?: string
    type: "hospital" | "clinic" | "home" | "online"
  }
  doctor?: {
    name: string
    specialty: string
    phone?: string
  }
  notes?: string
}

interface AppointmentsSectionProps {
  userProfile: {
    gender: "male" | "female"
    mode: "preventive" | "curative"
    age: number
  }
}

export function AppointmentsSection({ userProfile }: AppointmentsSectionProps) {
  const { userId, isLoading: isLoadingUserId } = useUserId()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState<"upcoming" | "past" | "all">("upcoming")
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState<Appointment>({
    title: "",
    description: "",
    type: userProfile.mode === "preventive" ? "screening" : "medical",
    status: "scheduled",
    date: "",
    time: "",
    duration: 30,
    location: {
      name: "",
      address: "",
      phone: "",
      type: "clinic"
    },
    doctor: {
      name: "",
      specialty: "",
      phone: ""
    },
    notes: ""
  })

  // Charger les rendez-vous depuis l'API
  const fetchAppointments = async () => {
    if (!userId) return
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/appointments?userId=${userId}`)
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des rendez-vous')
      }
      
      const data = await response.json()
      setAppointments(data.appointments || [])
    } catch (error) {
      console.error('Erreur:', error)
      // Afficher un message d'erreur à l'utilisateur
      alert('Impossible de charger les rendez-vous')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (userId && !isLoadingUserId) {
      fetchAppointments()
    }
  }, [userId, isLoadingUserId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      
      if (editingAppointment) {
        // Modification
        const response = await fetch(`/api/appointments?id=${editingAppointment._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userId
          }),
        })
        
        if (!response.ok) {
          throw new Error('Erreur lors de la modification du rendez-vous')
        }
        
        const updatedAppointment = await response.json()
        setAppointments(appointments.map(apt => 
          apt._id === updatedAppointment._id ? updatedAppointment : apt
        ))
      } else {
        // Création
        const response = await fetch('/api/appointments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userId
          }),
        })
        
        if (!response.ok) {
          throw new Error('Erreur lors de la création du rendez-vous')
        }
        
        const newAppointment = await response.json()
        setAppointments([...appointments, newAppointment])
      }
      
      resetForm()
      setIsDialogOpen(false)
      alert('Rendez-vous enregistré avec succès!')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'enregistrement du rendez-vous')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: userProfile.mode === "preventive" ? "screening" : "medical",
      status: "scheduled",
      date: "",
      time: "",
      duration: 30,
      location: {
        name: "",
        address: "",
        phone: "",
        type: "clinic"
      },
      doctor: {
        name: "",
        specialty: "",
        phone: ""
      },
      notes: ""
    })
    setEditingAppointment(null)
  }

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setFormData(appointment)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      return
    }
    
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du rendez-vous')
      }
      
      setAppointments(appointments.filter(apt => apt._id !== id))
      alert('Rendez-vous supprimé avec succès!')
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression du rendez-vous')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: Appointment["status"]) => {
    try {
      setIsLoading(true)
      
      const response = await fetch(`/api/appointments?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })
      
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du statut')
      }
      
      const updatedAppointment = await response.json()
      setAppointments(appointments.map(apt => 
        apt._id === updatedAppointment._id ? updatedAppointment : apt
      ))
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la mise à jour du statut')
    } finally {
      setIsLoading(false)
    }
  }

  // Filtrer les rendez-vous
  const filteredAppointments = appointments.filter(apt => {
    const appointmentDate = parseISO(apt.date)
    const today = new Date()
    
    if (filter === "upcoming") {
      return isAfter(appointmentDate, today) || format(appointmentDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
    } else if (filter === "past") {
      return isBefore(appointmentDate, today) && format(appointmentDate, "yyyy-MM-dd") !== format(today, "yyyy-MM-dd")
    }
    return true
  }).sort((a, b) => {
    const dateA = parseISO(a.date)
    const dateB = parseISO(b.date)
    return dateA.getTime() - dateB.getTime()
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-blue-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      scheduled: "Programmé",
      confirmed: "Confirmé",
      completed: "Terminé",
      cancelled: "Annulé"
    }
    return labels[status] || status
  }

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      medical: "Consultation médicale",
      treatment: "Traitement",
      support: "Accompagnement",
      screening: "Dépistage"
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6 pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {userProfile.mode === "preventive" ? "Rendez-vous de dépistage" : "Mes rendez-vous"}
            </h2>
            <p className="text-muted-foreground">
              {userProfile.mode === "preventive" 
                ? "Planifiez vos dépistages et consultations préventives"
                : "Gérez vos consultations et traitements"}
            </p>
          </div>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingAppointment ? "Modifier le rendez-vous" : "Nouveau rendez-vous"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type et Statut */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="screening">Dépistage</SelectItem>
                      <SelectItem value="medical">Consultation</SelectItem>
                      <SelectItem value="treatment">Traitement</SelectItem>
                      <SelectItem value="support">Accompagnement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Programmé</SelectItem>
                      <SelectItem value="confirmed">Confirmé</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                      <SelectItem value="cancelled">Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Titre */}
              <div className="space-y-2">
                <Label htmlFor="title">Titre *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Mammographie de contrôle"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Détails supplémentaires..."
                  rows={2}
                />
              </div>

              {/* Date et Heure */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Lieu */}
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Lieu
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Établissement *</Label>
                    <Input
                      id="locationName"
                      value={formData.location.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, name: e.target.value }
                      })}
                      placeholder="Nom de l'établissement"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locationType">Type</Label>
                    <Select
                      value={formData.location.type}
                      onValueChange={(value: any) => setFormData({ 
                        ...formData, 
                        location: { ...formData.location, type: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clinic">Clinique</SelectItem>
                        <SelectItem value="hospital">Hôpital</SelectItem>
                        <SelectItem value="online">En ligne</SelectItem>
                        <SelectItem value="home">À domicile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationAddress">Adresse</Label>
                  <Input
                    id="locationAddress"
                    value={formData.location.address}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, address: e.target.value }
                    })}
                    placeholder="Adresse complète"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationPhone">Téléphone</Label>
                  <Input
                    id="locationPhone"
                    type="tel"
                    value={formData.location.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      location: { ...formData.location, phone: e.target.value }
                    })}
                    placeholder="+221 77 555 78 45"
                  />
                </div>
              </div>

              {/* Médecin */}
              <div className="space-y-3 p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Praticien
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="doctorName">Nom</Label>
                    <Input
                      id="doctorName"
                      value={formData.doctor?.name}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        doctor: { ...formData.doctor!, name: e.target.value }
                      })}
                      placeholder="Dr. Moussa"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="doctorSpecialty">Spécialité</Label>
                    <Input
                      id="doctorSpecialty"
                      value={formData.doctor?.specialty}
                      onChange={(e) => setFormData({ 
                        ...formData, 
                        doctor: { ...formData.doctor!, specialty: e.target.value }
                      })}
                      placeholder="Oncologue"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctorPhone">Téléphone</Label>
                  <Input
                    id="doctorPhone"
                    type="tel"
                    value={formData.doctor?.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      doctor: { ...formData.doctor!, phone: e.target.value }
                    })}
                    placeholder="+221 77 555 78 45"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Documents à apporter, préparation, etc."
                  rows={2}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Enregistrement..." : editingAppointment ? "Enregistrer" : "Créer"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    resetForm()
                    setIsDialogOpen(false)
                  }}
                  disabled={isLoading}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres */}
      <div className="flex gap-2">
        <Button
          variant={filter === "upcoming" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("upcoming")}
        >
          À venir
        </Button>
        <Button
          variant={filter === "past" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("past")}
        >
          Passés
        </Button>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Tous
        </Button>
      </div>

      {/* Liste des rendez-vous */}
      <div className="space-y-4">
        {isLoading && appointments.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Chargement des rendez-vous...</p>
            </div>
          </Card>
        ) : filteredAppointments.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun rendez-vous
            </h3>
            <p className="text-muted-foreground mb-4">
              Commencez par ajouter votre premier rendez-vous
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Ajouter un rendez-vous
            </Button>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card key={appointment._id} className="p-4 md:p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Date */}
                <div className="shrink-0 text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-3xl font-bold text-primary">
                    {format(parseISO(appointment.date), "dd")}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase">
                    {format(parseISO(appointment.date), "MMM", { locale: fr })}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {format(parseISO(appointment.date), "yyyy")}
                  </div>
                </div>

                {/* Contenu */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(appointment.status)}
                        <span className="text-xs text-muted-foreground">
                          {getStatusLabel(appointment.status)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {appointment.title}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {getTypeLabel(appointment.type)}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(appointment)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(appointment._id!)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {appointment.description && (
                    <p className="text-sm text-muted-foreground">
                      {appointment.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.location.name}</span>
                    </div>
                    {appointment.doctor?.name && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{appointment.doctor.name}</span>
                      </div>
                    )}
                  </div>

                  {appointment.notes && (
                    <div className="p-3 bg-muted/50 rounded-lg text-sm">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{appointment.notes}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions rapides sur le statut */}
                  {appointment.status === "scheduled" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(appointment._id!, "confirmed")}
                      >
                        Confirmer
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(appointment._id!, "cancelled")}
                      >
                        Annuler
                      </Button>
                    </div>
                  )}
                  {appointment.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(appointment._id!, "completed")}
                    >
                      Marquer comme terminé
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
