import { Card } from '../ui/Card'

export function ResourcesSection() {
  const resources = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Questions fréquentes',
      description: 'Tout ce que tu dois savoir sur ArtisanOS',
      cta: 'Voir la FAQ',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Guides pratiques',
      description: 'Comment bien démarrer avec ArtisanOS',
      cta: 'Lire les guides',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Support',
      description: 'Besoin d\'aide ? Notre équipe est là',
      cta: 'Contacter le support',
    },
  ]

  return (
    <section id="resources" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ressources utiles
          </h2>
          <p className="text-xl text-gray-600">
            Tout pour bien démarrer et tirer le maximum d\'ArtisanOS
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Card key={index} hover padding="lg" className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mx-auto mb-4">
                {resource.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                {resource.cta} →
              </button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
