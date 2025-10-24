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
    return cached.conn
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
    }

    if (cached) {
      cached.promise = mongoose.connect(MONGODB_URI, opts)
    }
  }

  try {
    if (cached?.promise) {
      cached.conn = await cached.promise
    }
  } catch (e) {
    if (cached) {
      cached.promise = null
    }
    throw e
  }

  return cached?.conn || mongoose
}

export default connectDB
