'use client'

export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const footerLinks = {
    product: [
      { label: 'Fonctionnalités', id: 'features' },
      { label: 'Comment ça marche', id: 'how-it-works' },
      { label: 'Tarifs', id: 'pricing' },
      { label: 'Démo', id: 'dashboard-preview' },
    ],
    resources: [
      { label: 'FAQ', href: '#' },
      { label: 'Aide & Support', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Témoignages', id: 'testimonials' },
    ],
    legal: [
      { label: 'Conditions générales', href: '#' },
      { label: 'Politique de confidentialité', href: '#' },
      { label: 'Mentions légales', href: '#' },
    ],
  }

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-3">ArtisanOS</div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Conçu en Suisse pour les artisans suisses qui préfèrent le terrain à l\'administratif.
            </p>
          </div>

          {/* Produit */}
          <div>
            <h4 className="font-semibold text-white mb-3">Produit</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, i) => (
                <li key={i}>
                  <button
                    onClick={() => link.id && scrollToSection(link.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h4 className="font-semibold text-white mb-3">Ressources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, i) => (
                <li key={i}>
                  {link.id ? (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="font-semibold text-white mb-3">Légal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 ArtisanOS. Tous droits réservés.
            </p>
            <p className="text-sm text-gray-500">
              Photo hero : wirestock – Freepik
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
