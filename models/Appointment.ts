import mongoose, { Document, Schema } from 'mongoose'

export interface IAppointment extends Document {
  _id: string
  userId: string  // Changé de ObjectId à string pour plus de flexibilité
  title: string
  description?: string
  type: 'medical' | 'treatment' | 'support' | 'screening'
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled'
  date: Date
  time: string
  duration: number // en minutes
  location: {
    name: string
    address?: string
    phone?: string
    type: 'hospital' | 'clinic' | 'home' | 'online'
  }
  doctor?: {
    name: string
    specialty: string
    phone?: string
    email?: string
  }
  notes?: string
  reminders: {
    enabled: boolean
    intervals: number[] // en minutes avant le RDV
  }
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointment>({
  userId: {
    type: String,  // Changé de ObjectId à String
    required: true
    // index: true retiré car on a un index explicite plus bas
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    maxlength: 500
  },
  type: {
    type: String,
    enum: ['medical', 'treatment', 'support', 'screening'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    default: 30
  },
  location: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    phone: {
      type: String
    },
    type: {
      type: String,
      enum: ['hospital', 'clinic', 'home', 'online'],
      default: 'clinic'
    }
  },
  doctor: {
    name: {
      type: String
    },
    specialty: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  notes: {
    type: String,
    maxlength: 1000
  },
  reminders: {
    enabled: {
      type: Boolean,
      default: true
    },
    intervals: [{
      type: Number
    }]
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances
AppointmentSchema.index({ userId: 1 })
AppointmentSchema.index({ date: 1 })
AppointmentSchema.index({ status: 1 })
AppointmentSchema.index({ type: 1 })
AppointmentSchema.index({ userId: 1, date: 1 })

export default mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema)
