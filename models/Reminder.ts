import mongoose, { Document, Schema } from 'mongoose'

export interface IReminder extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  type: 'medication' | 'appointment' | 'screening' | 'exercise' | 'nutrition' | 'custom'
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly'
  time?: string
  date?: Date
  isActive: boolean
  isCompleted: boolean
  completedAt?: Date
  metadata?: {
    medicationName?: string
    dosage?: string
    screeningType?: string
    appointmentId?: mongoose.Types.ObjectId
  }
  createdAt: Date
  updatedAt: Date
}

const ReminderSchema = new Schema<IReminder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
    enum: ['medication', 'appointment', 'screening', 'exercise', 'nutrition', 'custom'],
    required: true
  },
  frequency: {
    type: String,
    enum: ['once', 'daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  time: {
    type: String,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  date: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  metadata: {
    medicationName: {
      type: String
    },
    dosage: {
      type: String
    },
    screeningType: {
      type: String
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances
ReminderSchema.index({ userId: 1 })
ReminderSchema.index({ type: 1 })
ReminderSchema.index({ frequency: 1 })
ReminderSchema.index({ isActive: 1 })
ReminderSchema.index({ date: 1 })
ReminderSchema.index({ userId: 1, isActive: 1 })

export default mongoose.models.Reminder || mongoose.model<IReminder>('Reminder', ReminderSchema)
