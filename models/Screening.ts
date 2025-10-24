import mongoose, { Document, Schema } from 'mongoose'

export interface IScreening extends Document {
  _id: string
  userId: mongoose.Types.ObjectId
  type: 'breast-exam' | 'pap-smear' | 'mammography' | 'colonoscopy' | 'skin-check' | 'blood-test'
  date: Date
  status: 'completed' | 'scheduled' | 'overdue'
  result?: {
    status: 'normal' | 'abnormal' | 'follow-up-needed'
    notes?: string
    doctorNotes?: string
  }
  nextDueDate?: Date
  frequency: 'monthly' | 'yearly' | 'every-2-years' | 'every-3-years' | 'every-5-years'
  reminderSent: boolean
  createdAt: Date
  updatedAt: Date
}

const ScreeningSchema = new Schema<IScreening>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['breast-exam', 'pap-smear', 'mammography', 'colonoscopy', 'skin-check', 'blood-test'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'scheduled', 'overdue'],
    default: 'scheduled'
  },
  result: {
    status: {
      type: String,
      enum: ['normal', 'abnormal', 'follow-up-needed']
    },
    notes: {
      type: String,
      maxlength: 1000
    },
    doctorNotes: {
      type: String,
      maxlength: 1000
    }
  },
  nextDueDate: {
    type: Date
  },
  frequency: {
    type: String,
    enum: ['monthly', 'yearly', 'every-2-years', 'every-3-years', 'every-5-years'],
    required: true
  },
  reminderSent: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances
ScreeningSchema.index({ userId: 1 })
ScreeningSchema.index({ type: 1 })
ScreeningSchema.index({ date: 1 })
ScreeningSchema.index({ status: 1 })
ScreeningSchema.index({ nextDueDate: 1 })
ScreeningSchema.index({ userId: 1, type: 1 })

export default mongoose.models.Screening || mongoose.model<IScreening>('Screening', ScreeningSchema)
