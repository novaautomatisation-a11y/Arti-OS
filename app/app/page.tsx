'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface DashboardStats {
  chantiersEnCours: number
  devisEnAttente: number
  facturesEnRetard: number
  interventionsAujourdhui: number
}

interface RecentChantier {
  id: string
  titre: string
  client_name: string
  status: string
}

interface RecentFacture {
  id: string
  numero: string
  client_name: string
  status: string
  total_ttc: number
}

export default function DashboardPage() {
  const { company, profile } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    chantiersEnCours: 0,
    devisEnAttente: 0,
    facturesEnRetard: 0,
    interventionsAujourdhui: 0,
  })
  const [recentChantiers, setRecentChantiers] = useState<RecentChantier[]>([])
  const [recentFactures, setRecentFactures] = useState<RecentFacture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadDashboardData()
    }
  }, [company?.id])

  const loadDashboardData = async () => {
    if (!company?.id) return

    const supabase = createClient()
    const today = new Date().toISOString().split('T')[0]

    try {
      // Statistiques
      const [
        { count: chantiersCount },
        { count: devisCount },
        { count: facturesCount },
        { count: interventionsCount },
      ] = await Promise.all([
        supabase
          .from('chantiers')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id)
          .eq('status', 'en_cours'),
        supabase
          .from('devis')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id)
          .eq('status', 'sent'),
        supabase
          .from('factures')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id)
          .eq('status', 'overdue'),
        supabase
          .from('interventions')
          .select('*', { count: 'exact', head: true })
          .eq('company_id', company.id)
          .eq('date', today),
      ])

      setStats({
        chantiersEnCours: chantiersCount ?? 0,
        devisEnAttente: devisCount ?? 0,
        facturesEnRetard: facturesCount ?? 0,
        interventionsAujourdhui: interventionsCount ?? 0,
      })

      // Derniers chantiers
      const { data: chantiersData } = await supabase
        .from('chantiers')
        .select(
          `
          id,
          titre,
          status,
          clients (name)
        `
        )
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (chantiersData) {
        setRecentChantiers(
          chantiersData.map((c: any) => ({
            id: c.id,
            titre: c.titre,
            client_name: c.clients?.name ?? 'Client inconnu',
            status: c.status,
          }))
        )
      }

      // Dernières factures
      const { data: facturesData } = await supabase
        .from('factures')
        .select(
          `
          id,
          numero,
          status,
          total_ttc,
          clients (name)
        `
        )
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (facturesData) {
        setRecentFactures(
          facturesData.map((f: any) => ({
            id: f.id,
            numero: f.numero,
            client_name: f.clients?.name ?? 'Client inconnu',
            status: f.status,
            total_ttc: f.total_ttc,
          }))
        )
      }

      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard:', error)
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string, type: 'chantier' | 'facture') => {
    const statusMap = {
      chantier: {
        planned: { variant: 'info' as const, label: 'Planifié' },
        en_cours: { variant: 'success' as const, label: 'En cours' },
        paused: { variant: 'warning' as const, label: 'En pause' },
        completed: { variant: 'neutral' as const, label: 'Terminé' },
        cancelled: { variant: 'danger' as const, label: 'Annulé' },
      },
      facture: {
        draft: { variant: 'neutral' as const, label: 'Brouillon' },
        sent: { variant: 'info' as const, label: 'Envoyée' },
        paid: { variant: 'success' as const, label: 'Payée' },
        overdue: { variant: 'danger' as const, label: 'En retard' },
        cancelled: { variant: 'neutral' as const, label: 'Annulée' },
      },
    }

    const config =
      statusMap[type][status as keyof (typeof statusMap)[typeof type]]
    return config ? (
      <Badge variant={config.variant}>{config.label}</Badge>
    ) : (
      <Badge variant="neutral">{status}</Badge>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Bienvenue {profile?.full_name} · {company?.name}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-1">
                Chantiers en cours
              </p>
              <p className="text-3xl font-bold text-blue-900">
                {stats.chantiersEnCours}
              </p>
            </div>
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-1">
                Devis en attente
              </p>
              <p className="text-3xl font-bold text-orange-900">
                {stats.devisEnAttente}
              </p>
            </div>
            <svg
              className="w-8 h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-red-700 mb-1">
                Factures en retard
              </p>
              <p className="text-3xl font-bold text-red-900">
                {stats.facturesEnRetard}
              </p>
            </div>
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </Card>

        <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">
                Interventions aujourd\'hui
              </p>
              <p className="text-3xl font-bold text-green-900">
                {stats.interventionsAujourdhui}
              </p>
            </div>
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </Card>
      </div>

      {/* Recent Data */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chantiers Récents */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Derniers chantiers
          </h2>
          {recentChantiers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucun chantier pour le moment
            </p>
          ) : (
            <div className="space-y-3">
              {recentChantiers.map((chantier) => (
                <div
                  key={chantier.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {chantier.titre}
                    </p>
                    <p className="text-sm text-gray-500">{chantier.client_name}</p>
                  </div>
                  {getStatusBadge(chantier.status, 'chantier')}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Factures Récentes */}
        <Card padding="lg">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Dernières factures
          </h2>
          {recentFactures.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Aucune facture pour le moment
            </p>
          ) : (
            <div className="space-y-3">
              {recentFactures.map((facture) => (
                <div
                  key={facture.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{facture.numero}</p>
                    <p className="text-sm text-gray-500">{facture.client_name}</p>
                  </div>
                  <div className="text-right mr-3">
                    <p className="font-semibold text-gray-900">
                      CHF {facture.total_ttc.toLocaleString('fr-CH')}
                    </p>
                  </div>
                  {getStatusBadge(facture.status, 'facture')}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
