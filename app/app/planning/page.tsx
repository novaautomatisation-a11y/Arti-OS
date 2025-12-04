'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
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
          <div className="w-12 h-12 border-4 border-warning border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement du planning...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Planning</h1>
          <p className="text-gray-400">
            Interventions de la semaine • {interventions.length} intervention{interventions.length !== 1 ? 's' : ''} planifiée{interventions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2.5 bg-warning text-dark font-semibold rounded-lg hover:bg-warning-light transition-colors"
        >
          <svg
            className="w-5 h-5"
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
        </motion.button>
      </motion.div>

      {/* Planning List */}
      {interventions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-card border border-dark-border rounded-xl p-12"
        >
          <div className="text-center">
            <svg
              className="w-16 h-16 text-gray-500 mx-auto mb-4"
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
            <h3 className="text-lg font-semibold text-white mb-2">
              Aucune intervention planifiée
            </h3>
            <p className="text-gray-400 mb-6">
              Commencez par planifier vos premières interventions sur les chantiers
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-warning text-dark font-semibold rounded-lg hover:bg-warning-light transition-colors"
            >
              Planifier maintenant
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {interventions.map((intervention, idx) => (
            <motion.div
              key={intervention.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 cursor-pointer hover:border-warning/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 text-xs font-medium rounded bg-primary/20 text-primary">
                      {new Date(intervention.date).toLocaleDateString('fr-CH', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    {intervention.heure_debut && (
                      <span className="text-sm font-semibold text-white">
                        {intervention.heure_debut}
                      </span>
                    )}
                    {intervention.duree_minutes && (
                      <span className="text-xs text-gray-500">
                        ({intervention.duree_minutes} min)
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-white mb-1">
                    {intervention.chantiers?.titre ?? 'Chantier inconnu'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    <span className="text-gray-500">Intervenant :</span> {intervention.profiles?.full_name ?? 'Intervenant inconnu'}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-gray-500"
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
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
