'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database } from '@/types/database'

type Facture = Database['public']['Tables']['factures']['Row'] & {
  clients?: { name: string }
}

export default function FacturesPage() {
  const { company } = useAuth()
  const [factures, setFactures] = useState<Facture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadFactures()
    }
  }, [company?.id])

  const loadFactures = async () => {
    if (!company?.id) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('factures')
        .select('*, clients(name)')
        .eq('company_id', company.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading factures:', error)
      } else {
        setFactures((data as Facture[]) || [])
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
      sent: { variant: 'info' as const, label: 'Envoyée' },
      paid: { variant: 'success' as const, label: 'Payée' },
      overdue: { variant: 'danger' as const, label: 'En retard' },
      cancelled: { variant: 'neutral' as const, label: 'Annulée' },
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
          <p className="text-gray-600">Chargement des factures...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Factures</h1>
          <p className="text-gray-600">{factures.length} facture(s) au total</p>
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
          Nouvelle facture
        </Button>
      </div>

      {factures.length === 0 ? (
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
                d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune facture pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Créez votre première facture pour commencer
            </p>
            <Button variant="primary">Créer ma première facture</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {factures.map((f) => (
            <Card key={f.id} padding="md" hover className="cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {f.numero}
                    </h3>
                    {getStatusBadge(f.status)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Client : {f.clients?.name ?? 'Client inconnu'}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Total : CHF {f.total_ttc.toLocaleString('fr-CH')}
                  </p>
                  <p className="text-sm text-gray-600">
                    Échéance :{' '}
                    {new Date(f.date_echeance).toLocaleDateString('fr-CH')}
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
