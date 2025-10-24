import mongoose, { Document, Schema } from 'mongoose'

export interface IVideo extends Document {
  _id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  thumbnail: string
  videoUrl: string
  duration: number // en secondes
  author: {
    name: string
    role: string
    avatar?: string
  }
  isPublished: boolean
  isFeatured: boolean
  views: number
  likes: number
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
  }
}

const VideoSchema = new Schema<IVideo>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['Exercices', 'Relaxation', 'Nutrition', 'Témoignages', 'Éducation', 'Méditation', 'Yoga']
  },
  tags: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  author: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: 60
    },
    metaDescription: {
      type: String,
      maxlength: 160
    },
    keywords: [{
      type: String
    }]
  }
}, {
  timestamps: true
})

// Index pour améliorer les performances
VideoSchema.index({ slug: 1 })
VideoSchema.index({ category: 1 })
VideoSchema.index({ isPublished: 1 })
VideoSchema.index({ isFeatured: 1 })
VideoSchema.index({ publishedAt: -1 })
VideoSchema.index({ views: -1 })
VideoSchema.index({ duration: 1 })
VideoSchema.index({ tags: 1 })

// Index de recherche textuelle
VideoSchema.index({ 
  title: 'text', 
  description: 'text',
  tags: 'text'
})

export default mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema)
