export function TestimonialsNew() {
  const testimonials = [
    {
      quote: "Avant ArtisanOS, je perdais 2 heures par jour à tout noter dans Excel. Maintenant mes gars rentrent les heures sur leur téléphone et mes factures sont prêtes le soir.",
      author: "Julien Meier",
      role: "Patron, 6 électriciens",
      location: "Lausanne, VD",
      metric: "2h/jour gagnées",
    },
    {
      quote: "Le planning synchronisé a changé notre vie. Plus de coups de fil à 7h du matin pour savoir qui va où. Tout le monde voit son agenda en temps réel.",
      author: "Sophie Keller",
      role: "Gérante, rénovation",
      location: "Neuchâtel, NE",
      metric: "3 équipes coordonnées",
    },
    {
      quote: "J'oubliais toujours du matériel en faisant mes factures. Depuis qu'ArtisanOS remplit automatiquement depuis le chantier, j'ai récupéré 8% de marge.",
      author: "Marc Dubois",
      role: "Plombier indépendant",
      location: "Fribourg, FR",
      metric: "+8% de marge",
    },
  ]

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            Ce que disent les artisans
          </h2>
          <p className="text-xl text-gray-600">
            Des vrais témoignages d'entreprises artisanales en Suisse romande
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-xl transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-8 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8 mt-4">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 mt-1">{testimonial.role}</p>
                    <p className="text-xs text-gray-500 mt-1">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {testimonial.metric}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-xl border border-gray-200 px-8 py-4 shadow-sm">
            <p className="text-3xl font-bold text-gray-900 mb-1">150+</p>
            <p className="text-sm text-gray-600">artisans utilisent déjà ArtisanOS</p>
          </div>
        </div>
      </div>
    </section>
  )
}
