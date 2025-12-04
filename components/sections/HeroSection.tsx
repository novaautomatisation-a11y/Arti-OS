'use client'

import Image from 'next/image'
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
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background avec overlay bleu foncé moderne */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Pour les artisans qui préfèrent le chantier aux tableaux Excel
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
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
                    className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
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
                  <span className="text-blue-50">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-900/50"
              >
                Demander une démo
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToDashboard}
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                Voir un exemple de chantier
              </Button>
            </div>
          </div>

          {/* Right Column - Construction Image with Glassmorphism Card */}
          <div className="relative">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Image de construction en arrière-plan */}
              <Image
                src="/images/construction-crane.jpg"
                alt="Chantier de construction"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay bleu foncé pour cohérence */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-slate-900/50 to-blue-950/70 z-10" />

              {/* Glassmorphism Dashboard Card */}
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-blue-100/50 p-6 w-full max-w-md">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">
                    Vue d'ensemble
                  </h3>

                  {/* KPI Grid - Plus de bleu */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-4 shadow-lg">
                      <p className="text-sm text-blue-100 font-medium mb-1">
                        Devis en cours
                      </p>
                      <p className="text-3xl font-bold text-white">12</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg p-4 shadow-lg">
                      <p className="text-sm text-emerald-100 font-medium mb-1">
                        Chantiers actifs
                      </p>
                      <p className="text-3xl font-bold text-white">8</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg p-4 shadow-lg">
                      <p className="text-sm text-orange-100 font-medium mb-1">
                        Facturation du mois
                      </p>
                      <p className="text-2xl font-bold text-white">
                        CHF 47'200
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg p-4 shadow-lg">
                      <p className="text-sm text-indigo-100 font-medium mb-1">
                        Taux de facturation
                      </p>
                      <p className="text-3xl font-bold text-white">94%</p>
                    </div>
                  </div>

                  {/* Mini Status Bar */}
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-xs text-blue-600 font-medium mb-2">
                      Chantiers cette semaine
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full w-3/4 shadow-sm" />
                      </div>
                      <span className="text-sm font-semibold text-blue-900">
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
