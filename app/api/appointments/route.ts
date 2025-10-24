import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

// GET /api/appointments - Récupérer les rendez-vous
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    let query: any = {}
    
    if (userId) {
      query.userId = userId
    }
    
    if (status) {
      query.status = status
    }
    
    if (type) {
      query.type = type
    }
    
    if (fromDate || toDate) {
      query.date = {}
      if (fromDate) query.date.$gte = new Date(fromDate)
      if (toDate) query.date.$lte = new Date(toDate)
    }
    
    const appointments = await Appointment.find(query)
      .populate('userId', 'name email')
      .sort({ date: 1, time: 1 })
      .limit(limit)
      .skip((page - 1) * limit)
    
    const total = await Appointment.countDocuments(query)
    
    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des rendez-vous' },
      { status: 500 }
    )
  }
}

// POST /api/appointments - Créer un nouveau rendez-vous
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const appointment = new Appointment(body)
    await appointment.save()
    
    // Peupler les données de l'utilisateur
    await appointment.populate('userId', 'name email')
    
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du rendez-vous' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments - Mettre à jour le statut de plusieurs rendez-vous
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { ids, status } = body
    
    const result = await Appointment.updateMany(
      { _id: { $in: ids } },
      { status }
    )
    
    return NextResponse.json({ 
      message: `${result.modifiedCount} rendez-vous mis à jour` 
    })
  } catch (error) {
    console.error('Error updating appointments:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des rendez-vous' },
      { status: 500 }
    )
  }
}
