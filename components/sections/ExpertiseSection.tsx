'use client'

import Image from 'next/image'

export function ExpertiseSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Notre expertise au service de vos chantiers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des professionnels du bâtiment qui comprennent vos défis quotidiens et vous accompagnent avec un outil pensé pour le terrain.
          </p>
        </div>

        {/* Images Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image 1 - Construction Workers */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/construction-workers.jpg"
                alt="Équipe de construction professionnelle"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay bleu moderne au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Texte overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Équipes coordonnées
                </h3>
                <p className="text-blue-100">
                  Gestion simplifiée des équipes et planning en temps réel pour une coordination optimale sur tous vos chantiers.
                </p>
              </div>
            </div>
          </div>

          {/* Image 2 - Construction Site */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl">
            <div className="relative h-[400px] w-full">
              <Image
                src="/images/construction-site.jpg"
                alt="Chantier de construction moderne"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay bleu moderne au hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Texte overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Suivi de chantier
                </h3>
                <p className="text-blue-100">
                  Photos, rapports et documentation centralisés pour un suivi précis de l'avancement de chaque projet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section avec thème bleu */}
        <div className="mt-16 grid sm:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200/50">
            <div className="text-4xl font-bold text-blue-700 mb-2">+2000</div>
            <p className="text-gray-700 font-medium">Artisans utilisateurs</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200/50">
            <div className="text-4xl font-bold text-blue-700 mb-2">95%</div>
            <p className="text-gray-700 font-medium">Taux de satisfaction</p>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-200/50">
            <div className="text-4xl font-bold text-blue-700 mb-2">-40%</div>
            <p className="text-gray-700 font-medium">Temps administratif économisé</p>
          </div>
        </div>
      </div>
    </section>
  )
}
