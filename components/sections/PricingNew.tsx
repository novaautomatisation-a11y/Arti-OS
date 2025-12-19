'use client'

export function PricingNew() {
  const scrollToContact = () => {
    const section = document.getElementById('contact')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const plans = [
    {
      name: 'Solo',
      price: '49',
      description: '1–2 personnes',
      features: [
        'Devis & factures illimités',
        'Jusqu\'à 3 utilisateurs',
        'Photos par chantier',
        'Planning de base',
        'Support par email',
      ],
      cta: 'Commencer',
      highlighted: false,
    },
    {
      name: 'Équipe',
      price: '149',
      description: '3–15 personnes',
      badge: 'Le plus choisi',
      features: [
        'Tout du plan Solo',
        'Jusqu\'à 15 utilisateurs',
        'Planning multi-équipes',
        'Catalogue matériaux',
        'Rapports & stats',
        'Support prioritaire',
      ],
      cta: 'Demander une démo',
      highlighted: true,
    },
    {
      name: 'Entreprise',
      price: null,
      description: '15+ personnes',
      features: [
        'Tout du plan Équipe',
        'Utilisateurs illimités',
        'Intégrations personnalisées',
        'Formation sur site',
        'Account manager dédié',
        'Support téléphonique 24/7',
      ],
      cta: 'Nous contacter',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Tarifs simples et transparents
          </h2>
          <p className="text-xl text-gray-600">
            Tous les prix en CHF, hors TVA. Sans engagement, sans frais cachés.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gray-900 text-white ring-4 ring-gray-900 ring-offset-4 shadow-2xl scale-105'
                  : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-block px-4 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                {/* Price */}
                {plan.price ? (
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      CHF {plan.price}
                    </span>
                    <span className={`text-lg ${plan.highlighted ? 'text-gray-400' : 'text-gray-500'}`}>
                      /mois
                    </span>
                  </div>
                ) : (
                  <div className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    Sur mesure
                  </div>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.highlighted ? 'text-blue-400' : 'text-blue-600'
                      }`}
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
                    <span className={`text-sm ${plan.highlighted ? 'text-gray-200' : 'text-gray-700'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToContact}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                  plan.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-gray-600">
            Tous les plans incluent <strong>30 jours d&apos;essai gratuit</strong>. Aucune carte bancaire requise.
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Annulation à tout moment
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Migration de données gratuite
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
