'use client'

import { useState } from 'react'

export function ConstructionShowcase() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo interactive - Grue de construction */}
          <div
            className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: 'url(/construction-crane.jpg)' }}
            />
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isHovered
                  ? 'bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent'
                  : 'bg-gradient-to-t from-gray-900/50 via-gray-900/20 to-transparent'
              }`}
            />

            {/* Badge flottant */}
            <div
              className={`absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg transition-all duration-500 ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
            >
              <p className="text-sm font-semibold text-blue-600">Vue en temps réel</p>
            </div>

            {/* Info au bas */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-90'
              }`}
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Chantier en cours
                </h3>
                <p className="text-sm text-gray-600">
                  Suivez l'avancement en direct depuis le bureau ou le terrain
                </p>
              </div>
            </div>
          </div>

          {/* Contenu texte */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Gardez le contrôle, même à distance
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Ton équipe sur le terrain met à jour le chantier en temps réel. Toi, depuis le bureau ou la route, tu vois exactement où en est chaque projet.
            </p>

            <ul className="space-y-4">
              {[
                {
                  title: 'Photos avant/pendant/après',
                  description: 'Chaque étape documentée, organisée par chantier',
                },
                {
                  title: 'Statut en temps réel',
                  description: 'Sais exactement ce qui est fait et ce qui reste',
                },
                {
                  title: 'Communication simplifiée',
                  description: 'Toute l\'équipe voit la même information, au même moment',
                },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <svg
                      className="w-4 h-4 text-blue-600"
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
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.title}</p>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
