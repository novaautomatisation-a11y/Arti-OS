'use client'

import { useState } from 'react'

export function TrustQuality() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  const stats = [
    { number: '500+', label: 'Chantiers réalisés', color: 'blue' },
    { number: '98%', label: 'Clients satisfaits', color: 'green' },
    { number: '24/7', label: 'Support disponible', color: 'orange' },
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Photo de fond avec parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/construction-team.jpg)',
            backgroundAttachment: 'fixed',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-900/95" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Fait par des artisans, pour des artisans
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            On comprend ton métier parce qu'on vient du terrain. ArtisanOS est construit avec des vrais artisans suisses qui nous ont dit ce dont ils avaient vraiment besoin.
          </p>
        </div>

        {/* Stats interactives */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 cursor-pointer transition-all duration-500 ${
                hoveredStat === index
                  ? 'transform scale-105 bg-white/20 shadow-2xl'
                  : 'hover:bg-white/15'
              }`}
              onMouseEnter={() => setHoveredStat(index)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <p
                className={`text-5xl font-bold mb-2 transition-colors duration-300 ${
                  stat.color === 'blue'
                    ? 'text-blue-400'
                    : stat.color === 'green'
                    ? 'text-green-400'
                    : 'text-orange-400'
                }`}
              >
                {stat.number}
              </p>
              <p className="text-gray-200 text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Points clés */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              ),
              title: 'Données sécurisées',
              description: 'Hébergement en Suisse, conformité RGPD',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              ),
              title: 'Personnalisable',
              description: 'Adapte ArtisanOS à ta façon de travailler',
            },
            {
              icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              title: 'Ultra-rapide',
              description: 'Interface fluide, même sur mobile 4G',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center group cursor-pointer"
              onMouseEnter={() => setHoveredStat(index + 10)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-xl mb-4 text-white transition-all duration-300 ${
                  hoveredStat === index + 10
                    ? 'bg-blue-500 transform scale-110 shadow-xl'
                    : 'group-hover:bg-white/20'
                }`}
              >
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
