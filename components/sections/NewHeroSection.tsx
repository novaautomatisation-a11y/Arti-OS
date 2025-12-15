'use client'

import { Button } from '../ui/Button'

export function NewHeroSection() {
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
    <section className="relative pt-32 pb-24 bg-white overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight mb-6">
              L'OS des artisans suisses
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Moins d'administratif, plus de chantiers.
              ArtisanOS transforme tes devis, planning et factures en un seul flux simple.
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-10">
              {[
                'Planning synchronisé pour toutes les équipes',
                'Photos organisées par chantier automatiquement',
                'Facturation directe depuis les heures terrain',
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 group-hover:bg-blue-200 transition-colors">
                    <svg
                      className="w-3.5 h-3.5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                Demander une démo
              </button>
              <button
                onClick={scrollToDashboard}
                className="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all hover:shadow-md"
              >
                Voir l'interface →
              </button>
            </div>

            {/* Trust badge */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">Utilisé par des artisans à</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>Lausanne</span>
                <span className="text-gray-300">•</span>
                <span>Neuchâtel</span>
                <span className="text-gray-300">•</span>
                <span>Genève</span>
                <span className="text-gray-300">•</span>
                <span>Fribourg</span>
              </div>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative lg:ml-8">
            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
              {/* Header */}
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <span className="font-semibold text-gray-900">ArtisanOS</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-gray-300" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Chantiers actifs', value: '8', trend: '+2', color: 'blue' },
                    { label: 'Devis en cours', value: '12', trend: '+5', color: 'orange' },
                    { label: 'Facturation', value: 'CHF 47.2k', trend: '+12%', color: 'green' },
                    { label: 'Heures équipe', value: '156h', trend: '94%', color: 'purple' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="group p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all cursor-pointer"
                    >
                      <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <p className={`text-xs font-medium ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'orange' ? 'text-orange-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        'text-purple-600'
                      }`}>
                        {stat.trend}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Project List */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Cette semaine
                  </p>
                  {[
                    { name: 'Rénovation SDB - Dupont', location: 'Lausanne', progress: 85, status: 'En cours' },
                    { name: 'Installation chauffage', location: 'Montreux', progress: 60, status: 'En cours' },
                    { name: 'Électricité villa', location: 'Vevey', progress: 30, status: 'Planifié' },
                  ].map((project, i) => (
                    <div
                      key={i}
                      className="group p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {project.name}
                          </p>
                          <p className="text-xs text-gray-500">{project.location}</p>
                        </div>
                        <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-md ${
                          project.status === 'En cours'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500 group-hover:bg-blue-600"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating mini card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl border border-gray-200 shadow-xl p-4 hover:shadow-2xl transition-shadow max-w-[200px]">
              <p className="text-xs text-gray-500 mb-1">Taux de facturation</p>
              <p className="text-3xl font-bold text-gray-900">94%</p>
              <p className="text-xs text-green-600 mt-1">+8% ce mois</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
