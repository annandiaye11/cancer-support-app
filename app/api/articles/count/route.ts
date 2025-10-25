import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Article from '@/models/Article'

export async function GET() {
  try {
    await connectDB()
    
    const totalArticles = await Article.countDocuments()
    const articlesByCategory = await Article.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ])
    
    return NextResponse.json({
      total: totalArticles,
      byCategory: articlesByCategory
    })
  } catch (error) {
    console.error('Error counting articles:', error)
    return NextResponse.json(
      { error: 'Erreur lors du comptage des articles' },
      { status: 500 }
    )
  }
}
