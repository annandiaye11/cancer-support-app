'use client'

import { ArticlesSection } from '@/components/articles-section'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ArticlesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header avec navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Articles</h1>
                <p className="text-xs text-gray-600">Guides & Conseils</p>
              </div>
            </div>

            {/* Menu burger pour mobile */}
            <Link href="/" className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost">Accueil</Button>
              </Link>
              <Button variant="default">Articles</Button>
            </nav>
          </div>
        </div>
      </header>

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
