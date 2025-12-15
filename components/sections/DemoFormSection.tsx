'use client'

import { useState } from 'react'

export function DemoFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    teamSize: '',
    trade: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-32 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl border border-gray-200 p-12 shadow-xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Demande envoyée !
            </h3>
            <p className="text-gray-600">
              Nous vous contactons dans les 24h pour organiser votre démo personnalisée.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Voir ArtisanOS en action
          </h2>
          <p className="text-xl text-gray-600">
            Demandez une démo adaptée à votre métier et à la taille de votre équipe
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900 mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Jean"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900 mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Dupont"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
              Email professionnel
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="jean.dupont@entreprise.ch"
            />
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="+41 21 123 45 67"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Team Size */}
            <div>
              <label htmlFor="teamSize" className="block text-sm font-semibold text-gray-900 mb-2">
                Taille de l'équipe
              </label>
              <select
                id="teamSize"
                required
                value={formData.teamSize}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Sélectionner</option>
                <option value="1-2">1-2 personnes</option>
                <option value="3-5">3-5 personnes</option>
                <option value="6-15">6-15 personnes</option>
                <option value="15+">15+ personnes</option>
              </select>
            </div>

            {/* Trade */}
            <div>
              <label htmlFor="trade" className="block text-sm font-semibold text-gray-900 mb-2">
                Métier principal
              </label>
              <select
                id="trade"
                required
                value={formData.trade}
                onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="">Sélectionner</option>
                <option value="plomberie">Plomberie</option>
                <option value="electricite">Électricité</option>
                <option value="peinture">Peinture</option>
                <option value="renovation">Rénovation</option>
                <option value="chauffage">Chauffage</option>
                <option value="maconnerie">Maçonnerie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Envoi en cours...
              </span>
            ) : (
              'Demander une démo gratuite'
            )}
          </button>

          {/* Footer note */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Pas de spam. Réponse en moins de 24h. Démo de 30 minutes adaptée à votre besoin.
          </p>
        </form>

        {/* Trust elements */}
        <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Données en Suisse
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            RGPD compliant
          </span>
        </div>
      </div>
    </section>
  )
}
