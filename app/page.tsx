'use client'

import { useState, FormEvent } from 'react'

export default function Home() {
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

  // Smooth scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-semibold tracking-tight">
              ArtisanOS
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#fonctionnalites" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fonctionnalités
              </a>
              <a href="#comment-ca-marche" className="text-gray-600 hover:text-gray-900 transition-colors">
                Comment ça marche
              </a>
              <a href="#tarifs" className="text-gray-600 hover:text-gray-900 transition-colors">
                Tarifs
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
              <button
                onClick={scrollToContact}
                className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column */}
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                L'OS des artisans qui n'ont pas le temps pour l'administratif
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                ArtisanOS centralise tes devis, chantiers, heures et factures. Tu cliques moins, tu factures plus vite, et ton équipe sait toujours quoi faire, où et quand.
              </p>

              {/* Benefits List */}
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Devis → chantier → facture dans un seul flux
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Planning clair pour chaque équipe
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="ml-3 text-gray-700">
                    Suivi photo avant / après depuis le terrain
                  </span>
                </li>
              </ul>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={scrollToContact}
                  className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-all shadow-sm hover:shadow-md"
                >
                  Demander une démo
                </button>
                <button className="px-8 py-4 text-gray-700 border border-gray-300 rounded-lg font-medium hover:border-gray-400 transition-all">
                  Voir un exemple de chantier
                </button>
              </div>
            </div>

            {/* Right Column - Dashboard Mockup */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 shadow-xl">
                {/* Mini Dashboard Cards */}
                <div className="space-y-4">
                  {/* KPI Cards Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">Devis en cours</div>
                      <div className="text-2xl font-bold">12</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="text-sm text-gray-500 mb-1">Chantiers actifs</div>
                      <div className="text-2xl font-bold">8</div>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="text-sm font-medium text-gray-700 mb-4">Facturation ce mois</div>
                    <div className="h-32 flex items-end space-x-2">
                      <div className="flex-1 bg-primary/20 rounded-t" style={{height: '40%'}}></div>
                      <div className="flex-1 bg-primary/20 rounded-t" style={{height: '70%'}}></div>
                      <div className="flex-1 bg-primary/20 rounded-t" style={{height: '50%'}}></div>
                      <div className="flex-1 bg-primary rounded-t" style={{height: '90%'}}></div>
                    </div>
                  </div>

                  {/* List Items */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Rénovation SDB - Dupont</span>
                      </div>
                      <span className="text-xs text-gray-500">En cours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Installation électrique</span>
                      </div>
                      <span className="text-xs text-gray-500">Planifié</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Plomberie - Martin</span>
                      </div>
                      <span className="text-xs text-gray-500">Devis</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Context Section */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Pensé pour les artisans suisses : plomberie, électricité, peinture, rénovation…
          </h2>
          <p className="text-gray-600">
            Plus besoin de jongler entre WhatsApp, Excel et les blocs-notes.
          </p>
        </div>
      </section>

      {/* Main Benefits Section */}
      <section id="fonctionnalites" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ce que tu gagnes avec ArtisanOS
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Un pipeline simple : du devis à la facture
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Crée ton devis, transforme-le en chantier en un clic, suis l'avancement, puis convertis en facture sans retaper une ligne. ArtisanOS garde la trace de tout : TVA, marges, paiements.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Un planning d'équipe qui tient sur un écran
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Vois qui fait quoi, où et quand. Planifie les interventions par chantier, par équipe ou par technicien. Ton équipe reçoit uniquement ce dont elle a besoin.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Des chantiers documentés sans effort
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Photos avant / après, checklists, incidents, heures pointées : tout est attaché au chantier. Tu peux prouver en quelques secondes ce qui a été fait et quand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard / KPIs Section */}
      <section className="py-24 bg-gray-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Un seul tableau de bord pour garder le contrôle
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vue d'ensemble de ton carnet de commandes, de tes chantiers en cours, de ce qui est facturé et de ce qui ne l'est pas encore.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* KPI Card 1 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Devis en cours</div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-xs text-gray-500">
                En attente de validation client
              </div>
            </div>

            {/* KPI Card 2 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Chantiers actifs</div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-xs text-gray-500">
                En cours de réalisation
              </div>
            </div>

            {/* KPI Card 3 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Factures en attente</div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-xs text-gray-500">
                À envoyer ou en attente de paiement
              </div>
            </div>

            {/* KPI Card 4 */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="text-sm text-gray-500 mb-2">Heures pointées cette semaine</div>
              <div className="text-4xl font-bold mb-2">126</div>
              <div className="text-xs text-gray-500">
                Réparties sur tous les chantiers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="comment-ca-marche" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Du premier appel à la facture payée
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ArtisanOS suit exactement ton flux de travail, sans te rajouter des étapes inutiles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">La demande</h3>
              <p className="text-gray-600">
                Le client t'appelle ou t'écrit. Tu le crées en quelques secondes avec son chantier et ses coordonnées.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Le devis</h3>
              <p className="text-gray-600">
                Tu construis ton devis avec tes modèles, ton catalogue de matériaux et tes taux horaires.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Le chantier</h3>
              <p className="text-gray-600">
                Une fois le devis accepté, ArtisanOS crée le chantier, les interventions et les checklists pour ton équipe.
              </p>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">La facture</h3>
              <p className="text-gray-600">
                Les heures et matériaux validés remontent dans la facture. Tu envoies, tu suis, tu encaisses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Ils ne reviendraient plus en arrière
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Depuis qu'on utilise ArtisanOS, on a divisé par deux le temps passé sur l'administratif. Les devis se transforment en chantiers en un clic, c'est magique."
              </p>
              <div>
                <div className="font-semibold">Marc Dubois</div>
                <div className="text-sm text-gray-500">Plombier, Genève</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Le planning est enfin clair pour toute l'équipe. Plus de confusion sur qui va où, tout le monde sait exactement quoi faire."
              </p>
              <div>
                <div className="font-semibold">Sophie Martin</div>
                <div className="text-sm text-gray-500">Électricienne, Lausanne</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Les photos avant/après sont un game-changer. On peut montrer au client exactement ce qu'on a fait, c'est hyper professionnel."
              </p>
              <div>
                <div className="font-semibold">Thomas Perrin</div>
                <div className="text-sm text-gray-500">Peintre, Fribourg</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Commence petit, grandis avec tes chantiers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Plan Solo */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Plan Solo</h3>
              <p className="text-gray-600 mb-6">
                Pour un artisan ou une petite équipe.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">1 à 3 utilisateurs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Devis, chantiers, factures</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Support par email</span>
                </li>
              </ul>

              <button
                onClick={scrollToContact}
                className="w-full px-8 py-4 border border-gray-300 rounded-lg font-medium hover:border-primary hover:text-primary transition-all"
              >
                Parler de mon activité
              </button>
            </div>

            {/* Plan Équipe */}
            <div className="bg-white rounded-xl p-8 border-2 border-primary hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                Populaire
              </div>

              <h3 className="text-2xl font-bold mb-2">Plan Équipe</h3>
              <p className="text-gray-600 mb-6">
                Pour les équipes qui tournent tous les jours.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Jusqu'à 15 utilisateurs</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Planning avancé, checklists, suivi heures</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Support prioritaire</span>
                </li>
              </ul>

              <button
                onClick={scrollToContact}
                className="w-full px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-all shadow-sm hover:shadow-md"
              >
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Demo Request Section */}
      <section id="contact" className="py-24 bg-gray-50 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Parlons de ton activité
            </h2>
            <p className="text-xl text-gray-600">
              Dis-moi comment tu travailles aujourd'hui, et on verra si ArtisanOS peut t'enlever du poids.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom / Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Jean Dupont"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="jean@exemple.ch"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="+41 79 123 45 67"
                />
              </div>

              {/* Activity Type Field */}
              <div>
                <label htmlFor="activityType" className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'activité
                </label>
                <select
                  id="activityType"
                  name="activityType"
                  value={formData.activityType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="Plomberie">Plomberie</option>
                  <option value="Électricité">Électricité</option>
                  <option value="Peinture">Peinture</option>
                  <option value="Rénovation">Rénovation</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Parle-moi de ton activité, de tes besoins, des outils que tu utilises actuellement..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary-hover transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>

              {/* Success Message */}
              {isSubmitted && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-center font-medium">
                    Merci, nous te répondrons rapidement.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Side */}
            <div>
              <div className="text-2xl font-semibold text-white mb-3">
                ArtisanOS
              </div>
              <p className="text-gray-400">
                Outil de pilotage pour artisans suisses.
              </p>
            </div>

            {/* Right Side - Links */}
            <div className="flex flex-col sm:flex-row gap-6 sm:justify-end">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            © 2024 ArtisanOS. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
