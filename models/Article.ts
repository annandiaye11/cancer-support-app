import mongoose, { Document, Schema } from 'mongoose'

export interface IArticle extends Document {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  author: {
    name: string
    role: string
    avatar?: string
  }
  image: string
  readTime: number // en minutes
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

const ArticleSchema = new Schema<IArticle>({
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
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['Prévention', 'Dépistage', 'Nutrition', 'Traitement', 'Soutien psychologique', 'Témoignages', 'Recherche', 'Bien-être', 'Soutien familial']
  },
  tags: [{
    type: String,
    trim: true
  }],
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
  image: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    required: true,
    min: 1
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
ArticleSchema.index({ slug: 1 })
ArticleSchema.index({ category: 1 })
ArticleSchema.index({ isPublished: 1 })
ArticleSchema.index({ isFeatured: 1 })
ArticleSchema.index({ publishedAt: -1 })
ArticleSchema.index({ views: -1 })
ArticleSchema.index({ tags: 1 })

// Index de recherche textuelle
ArticleSchema.index({ 
  title: 'text', 
  content: 'text', 
  excerpt: 'text',
  tags: 'text'
})

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)
