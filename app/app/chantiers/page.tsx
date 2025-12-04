'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database } from '@/types/database'

type Chantier = Database['public']['Tables']['chantiers']['Row'] & {
  clients?: { name: string }
}

export default function ChantiersPage() {
  const { company } = useAuth()
  const [chantiers, setChantiers] = useState<Chantier[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadChantiers()
    }
  }, [company?.id])

  const loadChantiers = async () => {
    if (!company?.id) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('chantiers')
        .select('*, clients(name)')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading chantiers:', error)
      } else {
        setChantiers((data as Chantier[]) || [])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      planned: { variant: 'info' as const, label: 'Planifié' },
      en_cours: { variant: 'success' as const, label: 'En cours' },
      paused: { variant: 'warning' as const, label: 'En pause' },
      completed: { variant: 'neutral' as const, label: 'Terminé' },
      cancelled: { variant: 'danger' as const, label: 'Annulé' },
    }
    const config = statusMap[status as keyof typeof statusMap]
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
          <p className="text-gray-600">Chargement des chantiers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chantiers</h1>
          <p className="text-gray-600">{chantiers.length} chantier(s) au total</p>
        </div>
        <Button variant="primary">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Nouveau chantier
        </Button>
      </div>

      {chantiers.length === 0 ? (
        <Card padding="lg">
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun chantier pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre premier chantier pour commencer
            </p>
            <Button variant="primary">Créer mon premier chantier</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {chantiers.map((c) => (
            <Card key={c.id} padding="md" hover className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {c.titre}
                    </h3>
                    {getStatusBadge(c.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Client : {c.clients?.name ?? 'Client inconnu'}
                  </p>
                  {c.date_debut_prevue && (
                    <p className="text-sm text-gray-600">
                      Début prévu :{' '}
                      {new Date(c.date_debut_prevue).toLocaleDateString('fr-CH')}
                    </p>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
