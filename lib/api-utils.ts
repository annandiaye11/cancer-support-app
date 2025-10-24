import { NextResponse } from 'next/server'

export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export function handleApiError(error: unknown) {
  console.error('API Error:', error)
  
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    )
  }
  
  if (error instanceof Error) {
    // Erreurs de validation Mongoose
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Données invalides', details: error.message },
        { status: 400 }
      )
    }
    
    // Erreur de clé dupliquée
    if (error.message.includes('duplicate key')) {
      return NextResponse.json(
        { error: 'Cette ressource existe déjà' },
        { status: 409 }
      )
    }
    
    // Erreur d'ID invalide
    if (error.message.includes('Cast to ObjectId failed')) {
      return NextResponse.json(
        { error: 'ID invalide' },
        { status: 400 }
      )
    }
  }
  
  // Erreur générique
  return NextResponse.json(
    { error: 'Erreur interne du serveur' },
    { status: 500 }
  )
}

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}

export function paginatedResponse(
  data: any[],
  page: number,
  limit: number,
  total: number,
  status: number = 200
) {
  return NextResponse.json({
    data,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  }, { status })
}
