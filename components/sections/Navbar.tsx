'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/Button'

export function Navbar() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'fr' | 'de'>('fr')

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  const goToLogin = () => {
    router.push('/login')
  }

  const navLinks = [
    { label: 'Fonctionnalités', id: 'features' },
    { label: 'Comment ça marche', id: 'how-it-works' },
    { label: 'Tarifs', id: 'pricing' },
    { label: 'Ressources', id: 'resources' },
    { label: 'Contact', id: 'contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              ArtisanOS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('fr')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'fr'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('de')}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  language === 'de'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                DE
              </button>
            </div>

            <Button variant="ghost" size="sm" onClick={goToLogin}>
              Se connecter
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => scrollToSection('contact')}
            >
              Demander une démo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-base font-medium text-gray-700 hover:text-gray-900"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 space-y-3">
              <Button variant="ghost" size="md" className="w-full" onClick={goToLogin}>
                Se connecter
              </Button>
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => scrollToSection('contact')}
              >
                Demander une démo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
