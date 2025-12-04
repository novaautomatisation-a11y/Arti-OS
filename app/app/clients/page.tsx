'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Database } from '@/types/database'

type Client = Database['public']['Tables']['clients']['Row']

export default function ClientsPage() {
  const { company } = useAuth()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (company?.id) {
      loadClients()
    }
  }, [company?.id])

  const loadClients = async () => {
    if (!company?.id) return

    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('company_id', company.id)
        .order('name', { ascending: true })

      if (error) {
        console.error('Error loading clients:', error)
      } else {
        setClients(data || [])
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
          <p className="text-gray-400">Chargement des clients...</p>
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
          <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
          <p className="text-gray-400">
            Gérez vos donneurs d'ordre • {clients.length} client{clients.length !== 1 ? 's' : ''} au total
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
          Nouveau client
        </motion.button>
      </motion.div>

      {/* Client List */}
      {clients.length === 0 ? (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-white mb-2">
              Aucun client pour le moment
            </h3>
            <p className="text-gray-400 mb-6">
              Commencez par ajouter vos donneurs d'ordre et maîtres d'ouvrage
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-warning text-dark font-semibold rounded-lg hover:bg-warning-light transition-colors"
            >
              Créer mon premier client
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <div className="grid gap-4">
          {clients.map((client, idx) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="bg-dark-card border border-dark-border rounded-xl p-6 cursor-pointer hover:border-warning/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-2">
                    {client.name}
                  </h3>
                  <div className="space-y-1">
                    {client.contact_person && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Contact :</span> {client.contact_person}
                      </p>
                    )}
                    {client.email && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Email :</span> {client.email}
                      </p>
                    )}
                    {client.phone && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Tél :</span> {client.phone}
                      </p>
                    )}
                    {client.city && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Ville :</span> {client.city}
                      </p>
                    )}
                  </div>
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
