import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export function DashboardPreviewSection() {
  return (
    <section id="dashboard-preview" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Une vision claire de ton activité
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce qui compte pour piloter ton entreprise, sur un seul écran
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Stats Overview */}
          <Card className="lg:col-span-2" padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Vue d\'ensemble
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Devis en cours</p>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-xs text-green-600 mt-1">+3 cette semaine</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Chantiers actifs</p>
                <p className="text-3xl font-bold text-gray-900">8</p>
                <p className="text-xs text-blue-600 mt-1">6 en cours</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Facturation mois</p>
                <p className="text-3xl font-bold text-gray-900">CHF 47.2k</p>
                <p className="text-xs text-gray-500 mt-1">94% facturé</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Heures équipe</p>
                <p className="text-3xl font-bold text-gray-900">156h</p>
                <p className="text-xs text-gray-500 mt-1">Cette semaine</p>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Chantiers cette semaine
              </p>
              <div className="space-y-2">
                {[
                  { name: 'Rénovation salle de bain - Lausanne', progress: 85, color: 'bg-green-500' },
                  { name: 'Installation chauffage - Montreux', progress: 60, color: 'bg-blue-500' },
                  { name: 'Électricité villa - Vevey', progress: 40, color: 'bg-yellow-500' },
                ].map((project, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{project.name}</span>
                      <span className="text-gray-500">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`${project.color} h-1.5 rounded-full`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Planning Widget */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Planning aujourd\'hui
            </h3>
            <div className="space-y-3">
              {[
                { time: '08:00', team: 'Équipe A', location: 'Lausanne', status: 'En cours', variant: 'success' as const },
                { time: '09:30', team: 'Équipe B', location: 'Montreux', status: 'En cours', variant: 'success' as const },
                { time: '14:00', team: 'Équipe A', location: 'Vevey', status: 'Prévu', variant: 'warning' as const },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-500 w-12">
                    {item.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.team}
                    </p>
                    <p className="text-xs text-gray-500">{item.location}</p>
                  </div>
                  <Badge variant={item.variant}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Factures Widget */}
          <Card className="lg:col-span-2" padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Factures récentes
            </h3>
            <div className="space-y-3">
              {[
                { client: 'Dupont SA', amount: 'CHF 8\'450', status: 'Payée', variant: 'success' as const },
                { client: 'Martin & Fils', amount: 'CHF 12\'300', status: 'En attente', variant: 'warning' as const },
                { client: 'Régie Immobilière', amount: 'CHF 6\'200', status: 'Payée', variant: 'success' as const },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.client}</p>
                    <p className="text-sm text-gray-500">{invoice.amount}</p>
                  </div>
                  <Badge variant={invoice.variant}>{invoice.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Alerts Widget */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              À surveiller
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-1">
                  Chantier en retard
                </p>
                <p className="text-xs text-yellow-700">
                  Villa Montreux - 2 jours de dépassement
                </p>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-medium text-red-900 mb-1">
                  Facture impayée
                </p>
                <p className="text-xs text-red-700">
                  Client XYZ - 30 jours dépassés
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Devis à relancer
                </p>
                <p className="text-xs text-blue-700">
                  3 devis sans réponse depuis 7j
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
