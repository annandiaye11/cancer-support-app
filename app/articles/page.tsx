'use client'

import { ArticlesSection } from '@/components/articles-section'

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto p-4 pt-8">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Articles & <span className="text-pink-600">Conseils</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trouvez des informations fiables et des conseils pratiques pour vous accompagner dans votre parcours
          </p>
        </div>

        {/* Section Articles */}
        <ArticlesSection />
      </div>
    </div>
  )
}
