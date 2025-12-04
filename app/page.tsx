'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    activityType: 'Plomberie',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // ============================================================================
  // HANDLERS
  // ============================================================================

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setMobileMenuOpen(false)
    }
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Handle form submission (fake for now)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        activityType: 'Plomberie',
        message: ''
      })
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============================================================================
          NAVBAR
          ============================================================================ */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl font-bold tracking-tight text-gray-900">
                ArtisanOS
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('fonctionnalites')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => scrollToSection('comment-ca-marche')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Comment ça marche
              </button>
              <button
                onClick={() => scrollToSection('tarifs')}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Tarifs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Demander une démo
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection('fonctionnalites')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 transition-colors"
              >
                Fonctionnalités
              </button>
              <button
                onClick={() => scrollToSection('comment-ca-marche')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 transition-colors"
              >
                Comment ça marche
              </button>
              <button
                onClick={() => scrollToSection('tarifs')}
                className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 transition-colors"
              >
                Tarifs
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
              >
                Demander une démo
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ============================================================================
          HERO SECTION
          ============================================================================ */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
                <span className="text-xs font-medium text-blue-700">
                  Nouvel OS pour artisans suisses
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1]">
                Ton chantier avance,
                <br />
                <span className="text-blue-600">l'administratif suit</span> tout seul.
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                ArtisanOS relie devis, chantiers, planning d'équipe et factures dans un seul outil.
                Tu gagnes du temps, ton équipe sait quoi faire, et tu te fais payer plus vite.
              </p>

              {/* Benefits */}
              <ul className="space-y-4">
                {[
                  'Devis → chantier → facture sans ressaisie',
                  'Planning clair par équipe et par jour',
                  'Photos avant/après rangées par chantier'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  Demander une démo
                </button>
                <button className="px-8 py-4 text-base font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200 hover:border-gray-400">
                  Voir un exemple de chantier
                </button>
              </div>

              {/* Reassurance */}
              <p className="text-sm text-gray-500">
                Pas de carte bancaire. On voit juste si ArtisanOS est adapté à ton activité.
              </p>
            </div>

            {/* Right Column - Dashboard Mockup */}
            <div className="relative lg:pl-8">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 space-y-6">
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50">
                    <div className="text-2xl font-bold text-blue-900">8</div>
                    <div className="text-xs text-blue-700 mt-1">Chantiers en cours</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200/50">
                    <div className="text-2xl font-bold text-green-900">12</div>
                    <div className="text-xs text-green-700 mt-1">Devis acceptés</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200/50">
                    <div className="text-2xl font-bold text-purple-900">156h</div>
                    <div className="text-xs text-purple-700 mt-1">Planifiées</div>
                  </div>
                </div>

                {/* Chart Section */}
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-900">Heures planifiées vs réalisées</span>
                    <span className="text-xs text-gray-500">Cette semaine</span>
                  </div>
                  <div className="h-40 flex items-end justify-between gap-3">
                    {[
                      { planned: 75, actual: 70, day: 'Lun' },
                      { planned: 85, actual: 90, day: 'Mar' },
                      { planned: 70, actual: 65, day: 'Mer' },
                      { planned: 90, actual: 85, day: 'Jeu' },
                      { planned: 80, actual: 82, day: 'Ven' }
                    ].map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full relative" style={{ height: '120px' }}>
                          <div
                            className="absolute bottom-0 w-full bg-blue-200 rounded-t"
                            style={{ height: `${data.planned}%` }}
                          />
                          <div
                            className="absolute bottom-0 w-full bg-blue-600 rounded-t"
                            style={{ height: `${data.actual}%`, width: '70%', left: '15%' }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 mt-1">{data.day}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-blue-200" />
                      <span className="text-gray-600">Planifiées</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm bg-blue-600" />
                      <span className="text-gray-600">Réalisées</span>
                    </div>
                  </div>
                </div>

                {/* Projects List */}
                <div className="space-y-3">
                  {[
                    { name: 'Rénovation SDB - Dupont', status: 'En cours', color: 'green' },
                    { name: 'Installation électrique - Martin', status: 'Planifié', color: 'blue' },
                    { name: 'Peinture bureau - Moreau', status: 'Terminé', color: 'gray' }
                  ].map((project, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          project.color === 'green' ? 'bg-green-500' :
                          project.color === 'blue' ? 'bg-blue-500' :
                          'bg-gray-400'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">{project.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.color === 'green' ? 'bg-green-100 text-green-700' :
                        project.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative blur */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          TRUST INDICATOR
          ============================================================================ */}
      <section className="py-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Pensé pour les artisans suisses
            </p>
            <p className="text-lg text-gray-600">
              Plomberie · Électricité · Peinture · Rénovation · Plus besoin de jongler entre WhatsApp, Excel et les blocs-notes.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================================
          FONCTIONNALITÉS
          ============================================================================ */}
      <section id="fonctionnalites" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont tu as besoin, rien de plus
            </h2>
            <p className="text-lg text-gray-600">
              Un outil pensé pour le quotidien des artisans, pas pour les grandes entreprises.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                title: 'Devis & facturation',
                description: 'Crée ton devis en 5 minutes. Transforme-le en facture quand le job est terminé. ArtisanOS gère la TVA suisse pour toi.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Planning des équipes',
                description: 'Planifie qui fait quoi, où et quand. Ton équipe voit son planning en temps réel, plus besoin d\'appeler.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Suivi chantier',
                description: 'Checklists, photos avant/après, heures pointées : tout est attaché au chantier. Prouve ce qui a été fait.'
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Suivi financier',
                description: 'Vois ce qui est facturé, ce qui reste à encaisser, tes marges par chantier. Garde le contrôle sur ta trésorerie.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-50 rounded-2xl border border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================================
          COMMENT ÇA MARCHE
          ============================================================================ */}
      <section id="comment-ca-marche" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Du premier appel à la facture payée
            </h2>
            <p className="text-lg text-gray-600">
              ArtisanOS suit exactement ton flux de travail, sans te rajouter des étapes inutiles.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 -translate-y-1/2" />

            {/* Steps */}
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 relative">
              {[
                {
                  number: '01',
                  title: 'Créer le devis',
                  description: 'Le client t\'appelle. Tu crées le devis avec ton catalogue de prix et tes modèles. Envoi en 1 clic par email.'
                },
                {
                  number: '02',
                  title: 'Lancer le chantier',
                  description: 'Le devis est accepté ? ArtisanOS crée le chantier, génère les checklists et planifie ton équipe automatiquement.'
                },
                {
                  number: '03',
                  title: 'Facturer en 1 clic',
                  description: 'Les heures et matériaux remontent dans la facture. Tu valides, tu envoies. Suivi des paiements intégré.'
                }
              ].map((step, index) => (
                <div key={index} className="relative">
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-400 transition-all duration-200 hover:shadow-xl group">
                    {/* Number Badge */}
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200">
                      {step.number}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector Arrow (mobile only) */}
                  {index < 2 && (
                    <div className="lg:hidden flex justify-center my-4">
                      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================================
          TARIFS
          ============================================================================ */}
      <section id="tarifs" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Commence petit, grandis avec tes chantiers
            </h2>
            <p className="text-lg text-gray-600">
              Pas d'engagement, pas de frais cachés. Résilie quand tu veux.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan Solo */}
            <div className="relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-gray-300 transition-all duration-200">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Plan Solo</h3>
                <p className="text-gray-600">Pour un artisan ou une petite équipe</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  '1 à 3 utilisateurs',
                  'Devis, chantiers, factures',
                  'Checklists et photos',
                  'Support par email'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-6 py-3 text-base font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-xl transition-all duration-200"
              >
                Parler de mon activité
              </button>
            </div>

            {/* Plan Équipe */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-200 hover:-translate-y-1">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="px-4 py-1.5 bg-white text-blue-600 text-sm font-semibold rounded-full shadow-lg">
                  ⭐ Le plus populaire
                </div>
              </div>

              <div className="mb-6 mt-4">
                <h3 className="text-2xl font-bold mb-2">Plan Équipe</h3>
                <p className="text-blue-100">Pour les équipes qui tournent tous les jours</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Jusqu\'à 15 utilisateurs',
                  'Tout du Plan Solo +',
                  'Planning avancé & suivi heures',
                  'Catalogue matériaux',
                  'Support prioritaire'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full px-6 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Demander une démo
              </button>
            </div>
          </div>

          {/* Bottom Reassurance */}
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600">
              💳 Pas de carte bancaire nécessaire · 🔒 Données hébergées en Suisse · ✨ Résiliation en 1 clic
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================================
          CONTACT / DEMO REQUEST
          ============================================================================ */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Parlons de ton activité
            </h2>
            <p className="text-lg text-gray-600">
              Dis-moi comment tu travailles aujourd'hui, et on verra si ArtisanOS peut t'enlever du poids.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom / Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                  placeholder="jean@exemple.ch"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                  placeholder="+41 79 123 45 67"
                />
              </div>

              {/* Activity Type */}
              <div>
                <label htmlFor="activityType" className="block text-sm font-semibold text-gray-900 mb-2">
                  Type d'activité
                </label>
                <select
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-gray-900"
                >
                  <option value="Plomberie">Plomberie</option>
                  <option value="Électricité">Électricité</option>
                  <option value="Peinture">Peinture</option>
                  <option value="Rénovation">Rénovation</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none text-gray-900"
                  placeholder="Parle-moi de ton activité, de tes besoins, des outils que tu utilises actuellement..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div className="p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-900">Merci !</p>
                      <p className="text-sm text-green-700 mt-1">Nous te répondrons rapidement pour discuter de tes besoins.</p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ============================================================================
          FOOTER
          ============================================================================ */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left */}
            <div>
              <div className="text-xl font-bold text-white mb-3">
                ArtisanOS
              </div>
              <p className="text-gray-400 max-w-sm">
                Outil de pilotage pour artisans suisses. Devis, chantiers, planning et factures dans un seul endroit.
              </p>
            </div>

            {/* Right */}
            <div className="flex flex-col sm:flex-row gap-6 sm:justify-end sm:items-start">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Politique de confidentialité
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-400 hover:text-white transition-colors text-sm text-left sm:text-right"
              >
                Contact
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 ArtisanOS. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500">
              Fait en Suisse 🇨🇭 pour les artisans suisses
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
