'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Database } from '@/types/database'

type Intervention = Database['public']['Tables']['interventions']['Row'] & {
  chantiers?: { titre: string }
  profiles?: { full_name: string }
}

export default function PlanningPage() {
  const { company } = useAuth()
  const [interventions, setInterventions] = useState<Intervention[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadPlanning()
    }
  }, [company?.id])

  const loadPlanning = async () => {
    if (!company?.id) return

    const supabase = createClient()

    try {
      // Charger les interventions de cette semaine
      const today = new Date()
      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
      const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))

      const { data, error } = await supabase
        .from('interventions')
        .select('*, chantiers(titre), profiles(full_name)')
        .eq('company_id', company.id)
        .gte('date', weekStart.toISOString().split('T')[0])
        .lte('date', weekEnd.toISOString().split('T')[0])
        .order('date', { ascending: true })
        .order('heure_debut', { ascending: true })

      if (error) {
        console.error('Error loading planning:', error)
      } else {
        setInterventions((data as Intervention[]) || [])
      }

      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du planning...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Planning</h1>
          <p className="text-gray-600">
            {interventions.length} intervention(s) cette semaine
          </p>
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
          Planifier une intervention
        </Button>
      </div>

      {interventions.length === 0 ? (
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune intervention planifiée
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par planifier votre première intervention
            </p>
            <Button variant="primary">Planifier maintenant</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {interventions.map((intervention) => (
            <Card
              key={intervention.id}
              padding="md"
              hover
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="info">
                      {new Date(intervention.date).toLocaleDateString('fr-CH', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </Badge>
                    {intervention.heure_debut && (
                      <span className="text-sm font-semibold text-gray-900">
                        {intervention.heure_debut}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {intervention.chantiers?.titre ?? 'Chantier inconnu'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {intervention.profiles?.full_name ?? 'Intervenant inconnu'}
                  </p>
                  {intervention.duree_minutes && (
                    <p className="text-sm text-gray-500">
                      Durée : {intervention.duree_minutes} min
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
