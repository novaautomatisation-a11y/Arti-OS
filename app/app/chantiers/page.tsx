'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
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
      planned: { bg: 'bg-primary/20', text: 'text-primary', label: 'Planifié' },
      en_cours: { bg: 'bg-warning/20', text: 'text-warning', label: 'En cours' },
      paused: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'En pause' },
      completed: { bg: 'bg-success/20', text: 'text-success', label: 'Terminé' },
      cancelled: { bg: 'bg-danger/20', text: 'text-danger', label: 'Annulé' },
    }
    const config = statusMap[status as keyof typeof statusMap]
    return config ? (
      <span className={`px-2 py-1 text-xs font-medium rounded ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    ) : (
      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-500/20 text-gray-400">{status}</span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-warning border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Chargement des chantiers...</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Chantiers</h1>
          <p className="text-gray-400">
            Sites en construction • {chantiers.length} chantier{chantiers.length !== 1 ? 's' : ''} au total
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
          Nouveau chantier
        </motion.button>
      </motion.div>

      {/* Chantiers List */}
      {chantiers.length === 0 ? (
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">
              Aucun chantier pour le moment
            </h3>
            <p className="text-gray-400 mb-6">
              Créez votre premier chantier pour suivre vos projets
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-warning text-dark font-semibold rounded-lg hover:bg-warning-light transition-colors"
            >
              Créer mon premier chantier
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {chantiers.map((c, idx) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 cursor-pointer hover:border-warning/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-white text-lg">
                      {c.titre}
                    </h3>
                    {getStatusBadge(c.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">
                    <span className="text-gray-500">Client :</span> {c.clients?.name ?? 'Client inconnu'}
                  </p>
                  {c.date_debut_prevue && (
                    <p className="text-sm text-gray-400">
                      <span className="text-gray-500">Début prévu :</span>{' '}
                      {new Date(c.date_debut_prevue).toLocaleDateString('fr-CH')}
                    </p>
                  )}
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
