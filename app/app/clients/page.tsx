'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des clients...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients</h1>
          <p className="text-gray-600">{clients.length} client(s) au total</p>
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
          Nouveau client
        </Button>
      </div>

      {/* Client List */}
      {clients.length === 0 ? (
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun client pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par ajouter votre premier client
            </p>
            <Button variant="primary">Créer mon premier client</Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {clients.map((client) => (
            <Card
              key={client.id}
              padding="md"
              hover
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {client.name}
                  </h3>
                  <div className="mt-1 space-y-1">
                    {client.contact_person && (
                      <p className="text-sm text-gray-600">
                        Contact : {client.contact_person}
                      </p>
                    )}
                    {client.email && (
                      <p className="text-sm text-gray-600">
                        Email : {client.email}
                      </p>
                    )}
                    {client.phone && (
                      <p className="text-sm text-gray-600">
                        Tél : {client.phone}
                      </p>
                    )}
                    {client.city && (
                      <p className="text-sm text-gray-600">
                        Ville : {client.city}
                      </p>
                    )}
                  </div>
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
