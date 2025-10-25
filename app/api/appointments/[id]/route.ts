import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

// GET /api/appointments/[id] - Récupérer un rendez-vous spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const appointment = await Appointment.findById(params.id)
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du rendez-vous' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments/[id] - Mettre à jour un rendez-vous
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du rendez-vous' },
      { status: 500 }
    )
  }
}

// DELETE /api/appointments/[id] - Supprimer un rendez-vous
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const appointment = await Appointment.findByIdAndDelete(params.id)
    
    if (!appointment) {
      return NextResponse.json(
        { error: 'Rendez-vous non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      message: 'Rendez-vous supprimé avec succès',
      appointment 
    })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du rendez-vous' },
      { status: 500 }
    )
  }
}
