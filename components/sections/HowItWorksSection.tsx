export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'On configure tes modèles de devis et chantiers',
      description: 'Dis-nous comment tu travailles : types de chantiers, phases habituelles, prix standards. On prépare tes modèles une fois, tu les réutilises ensuite en 2 clics.'
    },
    {
      number: '02',
      title: 'Ton équipe coche ce qu\'elle fait sur le terrain',
      description: 'Depuis leur téléphone, ils pointent les heures, cochent les tâches terminées, prennent des photos. Tout remonte dans le chantier en temps réel. Plus besoin de redemander.'
    },
    {
      number: '03',
      title: 'Les factures se préparent toutes seules',
      description: 'Les heures, les matériaux, les prestations : tout est déjà dans le système. Tu valides, tu envoies. Le suivi des paiements est intégré, tu sais toujours qui te doit quoi.'
    },
  ]

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Comment ça marche
          </h2>
          <p className="text-xl text-gray-600">
            Trois étapes simples pour arrêter de courir après les papiers
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg">
                {step.number}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
