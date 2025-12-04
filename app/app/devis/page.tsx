'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database } from '@/types/database'

type Devis = Database['public']['Tables']['devis']['Row'] & {
  clients?: { name: string }
}

export default function DevisPage() {
  const { company } = useAuth()
  const [devis, setDevis] = useState<Devis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadDevis()
    }
  }, [company?.id])

  const loadDevis = async () => {
    if (!company?.id) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('devis')
        .select('*, clients(name)')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading devis:', error)
      } else {
        setDevis((data as Devis[]) || [])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { variant: 'neutral' as const, label: 'Brouillon' },
      sent: { variant: 'info' as const, label: 'Envoyé' },
      accepted: { variant: 'success' as const, label: 'Accepté' },
      refused: { variant: 'danger' as const, label: 'Refusé' },
      expired: { variant: 'neutral' as const, label: 'Expiré' },
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
          <p className="text-gray-600">Chargement des devis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Devis</h1>
          <p className="text-gray-600">{devis.length} devis au total</p>
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
          Nouveau devis
        </Button>
      </div>

      {devis.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun devis pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre premier devis pour commencer
            </p>
            <Button variant="primary">Créer mon premier devis</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {devis.map((d) => (
            <Card key={d.id} padding="md" hover className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {d.numero}
                    </h3>
                    {getStatusBadge(d.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Client : {d.clients?.name ?? 'Client inconnu'}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    Total : CHF {d.total_ttc.toLocaleString('fr-CH')}
                  </p>
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
