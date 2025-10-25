import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Appointment from '@/models/Appointment'

// GET /api/appointments - Récupérer les rendez-vous
export async function GET(request: NextRequest) {
  const startTime = Date.now()
  try {
    console.log('📅 API Appointments - Début de la requête')
    
    await connectDB()
    console.log(`⏱️  Connexion DB: ${Date.now() - startTime}ms`)
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    const fromDate = searchParams.get('fromDate')
    const toDate = searchParams.get('toDate')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    console.log('📅 Filtres:', { userId, status, type, fromDate, toDate, page, limit })
    
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
    
    const queryStartTime = Date.now()
    const appointments = await Appointment.find(query)
      .sort({ date: 1, time: 1 })
      .limit(limit)
      .skip((page - 1) * limit)
    console.log(`⏱️  Query find: ${Date.now() - queryStartTime}ms`)
    
    const countStartTime = Date.now()
    const total = await Appointment.countDocuments(query)
    console.log(`⏱️  Query count: ${Date.now() - countStartTime}ms`)
    
    console.log(`📅 Trouvé ${appointments.length} rendez-vous (total: ${total})`)
    console.log(`⏱️  Total API: ${Date.now() - startTime}ms`)
    
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
    console.error('❌ Error fetching appointments:', error)
    console.log(`⏱️  Erreur après: ${Date.now() - startTime}ms`)
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
    
    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du rendez-vous', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// PUT /api/appointments - Mettre à jour un ou plusieurs rendez-vous
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    // Si un ID spécifique est fourni, mettre à jour ce rendez-vous uniquement
    if (id) {
      const appointment = await Appointment.findByIdAndUpdate(
        id,
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
    }
    
    // Sinon, mise à jour en masse
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

// DELETE /api/appointments - Supprimer un rendez-vous
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID requis pour la suppression' },
        { status: 400 }
      )
    }
    
    const appointment = await Appointment.findByIdAndDelete(id)
    
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
