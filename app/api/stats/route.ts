import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'
import Video from '@/models/Video'
import Appointment from '@/models/Appointment'
import { useUserId } from '@/hooks/use-user-id'

// GET /api/stats - Récupérer les statistiques du dashboard
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    // Récupérer les statistiques depuis MongoDB
    const [
      totalArticles,
      totalVideos,
      userAppointments
    ] = await Promise.all([
      Article.countDocuments({ isPublished: true }),
      Video.countDocuments({ isPublished: true }),
      userId ? Appointment.find({ userId }).lean() : Promise.resolve([])
    ])
    
    // Calculer les rendez-vous à venir
    const now = new Date()
    const upcomingAppointments = userAppointments.filter(apt => {
      const aptDate = new Date(apt.date)
      return aptDate >= now && apt.status !== 'cancelled' && apt.status !== 'completed'
    }).length
    
    // Calculer les tâches complétées (rendez-vous terminés)
    const completedTasks = userAppointments.filter(apt => 
      apt.status === 'completed'
    ).length
    
    // Statistiques additionnelles
    const featuredArticles = await Article.countDocuments({ 
      isPublished: true, 
      isFeatured: true 
    })
    
    const recentArticles = await Article.countDocuments({
      isPublished: true,
      publishedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Derniers 30 jours
    })
    
    const stats = {
      totalArticles,
      totalVideos,
      completedTasks,
      upcomingAppointments,
      featuredArticles,
      recentArticles,
      lastUpdate: new Date().toISOString()
    }
    
    return NextResponse.json(stats, { status: 200 })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des statistiques',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
