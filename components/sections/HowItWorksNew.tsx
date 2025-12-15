export function HowItWorksNew() {
  const steps = [
    {
      number: '01',
      title: 'Devis',
      description: 'Crée un devis en 2 minutes. Le client accepte ? Un clic et c'est un chantier.',
      features: ['Template réutilisables', 'PDF automatique', 'Envoi direct par email'],
    },
    {
      number: '02',
      title: 'Chantier',
      description: 'Ton équipe voit le planning, ajoute les heures et photos. Tout remonte en temps réel.',
      features: ['Planning multi-équipes', 'Photos par phase', 'Heures terrain'],
    },
    {
      number: '03',
      title: 'Facture',
      description: 'Les heures et matériaux sont déjà là. Il ne reste qu'à valider et envoyer.',
      features: ['Auto-remplissage', 'TVA suisse', 'Rappels automatiques'],
    },
  ]

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Un seul flux, du devis à la facture
          </h2>
          <p className="text-xl text-gray-600">
            Pas besoin de jongler entre Excel, WhatsApp et ton carnet. Tout est connecté.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-8">
          {/* Connection line (desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200" style={{ width: 'calc(100% - 12rem)', left: '6rem' }} />

          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step card */}
              <div className="group relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-blue-300 hover:shadow-xl transition-all duration-300">
                {/* Number badge */}
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Content */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hover arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-14 -right-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Tout est automatiquement sauvegardé et synchronisé
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Hébergé en Suisse
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Sauvegarde automatique
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Accès mobile
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
