'use client'

import { Button } from '../ui/Button'

export function HeroSection() {
  const scrollToContact = () => {
    const section = document.getElementById('contact')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToDashboard = () => {
    const section = document.getElementById('dashboard-preview')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mb-6">
              Pour les artisans qui préfèrent le chantier aux tableaux Excel
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 leading-relaxed">
              Devis qui traînent dans WhatsApp, heures notées sur des bouts de papier, factures en retard... ArtisanOS relie tout ça en un seul endroit. Moins de clics, plus de temps sur le terrain.
            </p>

            {/* Bullet Points */}
            <ul className="space-y-3 mb-8">
              {[
                'Un planning clair pour chaque équipe et chaque véhicule',
                'Photos avant/après rangées par chantier, pas dans ton téléphone',
                'Les heures et matériaux deviennent automatiquement des factures',
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" onClick={scrollToContact}>
                Demander une démo
              </Button>
              <Button variant="secondary" size="lg" onClick={scrollToDashboard}>
                Voir un exemple de chantier
              </Button>
            </div>
          </div>

          {/* Right Column - Visual Block */}
          <div className="relative">
            {/* Background - Gradient (replace with actual image: /hero-construction.jpg from Freepik) */}
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
              {/* Background gradient simulating construction site */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-gray-900 to-blue-900" />
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-900/50 z-10" />

              {/* Glassmorphism Dashboard Card */}
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 w-full max-w-md">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Vue d\'ensemble
                  </h3>

                  {/* KPI Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <p className="text-sm text-blue-600 font-medium mb-1">
                        Devis en cours
                      </p>
                      <p className="text-3xl font-bold text-blue-900">12</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <p className="text-sm text-green-600 font-medium mb-1">
                        Chantiers actifs
                      </p>
                      <p className="text-3xl font-bold text-green-900">8</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
                      <p className="text-sm text-orange-600 font-medium mb-1">
                        Facturation du mois
                      </p>
                      <p className="text-2xl font-bold text-orange-900">
                        CHF 47\'200
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                      <p className="text-sm text-purple-600 font-medium mb-1">
                        Taux de facturation
                      </p>
                      <p className="text-3xl font-bold text-purple-900">94%</p>
                    </div>
                  </div>

                  {/* Mini Status Bar */}
                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <p className="text-xs text-gray-500 mb-2">
                      Chantiers cette semaine
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-3/4" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        6/8
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
