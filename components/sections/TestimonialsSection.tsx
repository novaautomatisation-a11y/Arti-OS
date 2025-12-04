import { Card } from '../ui/Card'

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marc Dubois',
      role: 'Plombier-chauffagiste',
      location: 'Lausanne, VD',
      avatar: 'MD',
      quote: 'Avant, j\'avais des devis dans tous les sens, entre Excel et des carnets papier. Maintenant tout est rangé par chantier. Je gagne facilement 3-4 heures par semaine.',
    },
    {
      name: 'Sophie Keller',
      role: 'Entreprise de rénovation',
      location: 'Fribourg, FR',
      avatar: 'SK',
      quote: 'Ce qui change tout, c\'est que mes équipes voient leur planning depuis leur téléphone. Plus de coups de fil le matin pour savoir qui va où. Et les photos sont enfin au bon endroit.',
    },
    {
      name: 'Thomas Müller',
      role: 'Électricien',
      location: 'Sion, VS',
      avatar: 'TM',
      quote: 'J\'oubliais toujours des heures ou du matériel en faisant mes factures. Maintenant ça remonte automatiquement. Ma marge a vraiment augmenté depuis que j\'utilise ArtisanOS.',
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent les artisans qui l\'utilisent
          </h2>
          <p className="text-xl text-gray-600">
            Des vraies personnes, avec de vrais chantiers
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
