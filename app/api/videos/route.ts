import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Video from '@/models/Video'

// GET /api/videos - Récupérer les vidéos avec filtres
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    let query: any = { isPublished: true }
    
    if (category && category !== 'all') {
      query.category = category
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    if (featured === 'true') {
      query.isFeatured = true
    }
    
    const [videos, total] = await Promise.all([
      Video.find(query)
        .sort({ publishedAt: -1 })
        .limit(limit)
        .skip(offset)
        .lean(),
      Video.countDocuments(query)
    ])
    
    return NextResponse.json({
      videos,
      total,
      limit,
      offset
    }, { status: 200 })
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la récupération des vidéos',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST /api/videos - Créer une nouvelle vidéo
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    const video = new Video(body)
    await video.save()
    
    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Error creating video:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la création de la vidéo',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// PUT /api/videos - Mettre à jour une vidéo
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID requis pour la mise à jour' },
        { status: 400 }
      )
    }
    
    const video = await Video.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!video) {
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(video)
  } catch (error) {
    console.error('Error updating video:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la mise à jour de la vidéo',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// DELETE /api/videos - Supprimer une vidéo
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
    
    const video = await Video.findByIdAndDelete(id)
    
    if (!video) {
      return NextResponse.json(
        { error: 'Vidéo non trouvée' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      message: 'Vidéo supprimée avec succès',
      video 
    })
  } catch (error) {
    console.error('Error deleting video:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la suppression de la vidéo',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
