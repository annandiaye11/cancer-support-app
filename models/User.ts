import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  email: string
  password?: string
  name: string
  avatar?: string
  profile: {
    gender: 'male' | 'female'
    age: number
    mode: 'preventive' | 'curative'
    medicalHistory?: string[]
    allergies?: string[]
    currentTreatments?: string[]
  }
  preferences: {
    notifications: boolean
    reminderFrequency: 'daily' | 'weekly' | 'monthly'
    language: string
  }
  role: 'user' | 'admin' | 'doctor'
  isActive: boolean
  emailVerified?: Date
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    select: false // Ne pas inclure le mot de passe par défaut dans les requêtes
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: null
  },
  profile: {
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 120
    },
    mode: {
      type: String,
      enum: ['preventive', 'curative'],
      required: true
    },
    medicalHistory: [{
      type: String
    }],
    allergies: [{
      type: String
    }],
    currentTreatments: [{
      type: String
    }]
  },
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    reminderFrequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly'],
      default: 'daily'
    },
    language: {
      type: String,
      default: 'fr'
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'doctor'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Date,
    default: null
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances (email a déjà un index unique)
UserSchema.index({ role: 1 })
UserSchema.index({ isActive: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
