import { config } from 'dotenv'
import mongoose from 'mongoose'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const MONGODB_URI: string = process.env.MONGODB_URI

interface GlobalMongoose {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var mongoose: GlobalMongoose | undefined
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached?.conn) {
    console.log('🔄 Utilisation de la connexion MongoDB existante')
    return cached.conn
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 secondes timeout
      socketTimeoutMS: 45000,
    }

    console.log('🔌 Connexion à MongoDB...')
    console.log('📍 URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')) // Cache le password
    
    if (cached) {
      cached.promise = mongoose.connect(MONGODB_URI, opts)
    }
  }

  try {
    if (cached?.promise) {
      const startTime = Date.now()
      cached.conn = await cached.promise
      const duration = Date.now() - startTime
      console.log(`✅ MongoDB connecté en ${duration}ms`)
    }
  } catch (e) {
    console.error('❌ Erreur de connexion MongoDB:', e)
    if (cached) {
      cached.promise = null
    }
    throw e
  }

  return cached?.conn || mongoose
}

export default connectDB
