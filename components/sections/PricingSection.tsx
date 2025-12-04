'use client'

import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function PricingSection() {
  const scrollToContact = () => {
    const section = document.getElementById('contact')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const plans = [
    {
      name: 'Plan Solo',
      price: '49',
      description: 'Pour les artisans qui travaillent seuls ou avec 1-2 employés',
      features: [
        'Jusqu\'à 3 utilisateurs',
        'Devis & factures illimités',
        'Suivi de chantiers',
        'Photos par chantier',
        'Planning de base',
        'Support par email',
      ],
      cta: 'Commencer',
      highlighted: false,
    },
    {
      name: 'Plan Équipe',
      price: '149',
      description: 'Pour les entreprises avec plusieurs équipes sur le terrain',
      features: [
        'Jusqu\'à 15 utilisateurs',
        'Tout du Plan Solo +',
        'Planning avancé multi-équipes',
        'Catalogue matériaux',
        'Rapports et statistiques',
        'Support prioritaire',
      ],
      cta: 'Demander une démo',
      highlighted: true,
    },
    {
      name: 'Plan Entreprise',
      price: 'Sur mesure',
      description: 'Pour les grandes entreprises avec besoins spécifiques',
      features: [
        'Utilisateurs illimités',
        'Tout du Plan Équipe +',
        'Intégrations personnalisées',
        'Formation sur site',
        'Gestionnaire de compte dédié',
        'Support téléphonique 24/7',
      ],
      cta: 'Nous contacter',
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Des tarifs clairs, sans surprise
          </h2>
          <p className="text-xl text-gray-600">
            Tous les prix sont en CHF, hors TVA. Pas de frais cachés, pas d\'engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              padding="lg"
              className={plan.highlighted ? 'border-2 border-blue-500 shadow-xl' : ''}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-3">
                  {plan.price === 'Sur mesure' ? (
                    <p className="text-3xl font-bold text-gray-900">Sur mesure</p>
                  ) : (
                    <p className="text-5xl font-bold text-gray-900">
                      CHF {plan.price}
                      <span className="text-lg text-gray-500 font-normal">/mois</span>
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
                onClick={scrollToContact}
              >
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Tous les plans incluent 30 jours d\'essai gratuit. Aucune carte bancaire requise.
          </p>
        </div>
      </div>
    </section>
  )
}
