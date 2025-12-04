'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

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

      const { data: chantiersData } = await supabase
        .from('chantiers')
        .select('id, titre, status, clients(name)')
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

      const { data: facturesData } = await supabase
        .from('factures')
        .select('id, numero, status, total_ttc, clients(name)')
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

  // Mock data for charts
  const monthlyData = [
    { month: 'Juil', devis: 45000, factures: 38000 },
    { month: 'Août', devis: 52000, factures: 41000 },
    { month: 'Sept', devis: 48000, factures: 47000 },
    { month: 'Oct', devis: 61000, factures: 53000 },
    { month: 'Nov', devis: 55000, factures: 49000 },
    { month: 'Déc', devis: 67000, factures: 58000 },
  ]

  const statusData = [
    { name: 'En cours', value: stats.chantiersEnCours || 7, color: '#fbbf24' },
    { name: 'Planifiés', value: 3, color: '#3b82f6' },
    { name: 'Terminés', value: 12, color: '#10b981' },
  ]

  const getStatusBadge = (status: string, type: 'chantier' | 'facture') => {
    const statusMap = {
      chantier: {
        planned: { bg: 'bg-primary/20', text: 'text-primary', label: 'Planifié' },
        en_cours: { bg: 'bg-warning/20', text: 'text-warning', label: 'En cours' },
        paused: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Pause' },
        completed: { bg: 'bg-success/20', text: 'text-success', label: 'Terminé' },
        cancelled: { bg: 'bg-danger/20', text: 'text-danger', label: 'Annulé' },
      },
      facture: {
        draft: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Brouillon' },
        sent: { bg: 'bg-primary/20', text: 'text-primary', label: 'Envoyée' },
        paid: { bg: 'bg-success/20', text: 'text-success', label: 'Payée' },
        overdue: { bg: 'bg-danger/20', text: 'text-danger', label: 'En retard' },
        cancelled: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: 'Annulée' },
      },
    }

    const config = statusMap[type][status as keyof typeof statusMap[typeof type]]
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
          <p className="text-gray-400">Chargement du dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero Section with Construction Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-80 rounded-2xl overflow-hidden group"
      >
        {/* Background gradient (simulate chantier) */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-gray-900 to-blue-900" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent"
          whileHover={{ backdropFilter: 'blur(2px)' }}
        />

        {/* Stats Overlay */}
        <div className="relative z-10 h-full flex items-end p-8">
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-6"
            >
              Bienvenue, {profile?.full_name?.split(' ')[0]}
            </motion.h1>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Chantiers en cours', value: stats.chantiersEnCours, color: 'from-warning to-warning-dark', delay: 0.3 },
                { label: 'Devis en attente', value: stats.devisEnAttente, color: 'from-primary to-primary-600', delay: 0.4 },
                { label: 'Factures en retard', value: stats.facturesEnRetard, color: 'from-danger to-red-700', delay: 0.5 },
                { label: 'Interventions aujourd\'hui', value: stats.interventionsAujourdhui, color: 'from-success to-green-700', delay: 0.6 },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: stat.delay }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`bg-gradient-to-br ${stat.color} p-4 rounded-lg cursor-pointer`}
                >
                  <p className="text-sm text-white/80 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-warning/50 transition-all"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Chiffre d\'affaires estimé</h3>
          <p className="text-3xl font-bold text-warning mb-1">CHF 328,450</p>
          <p className="text-sm text-gray-400">+12% vs mois dernier</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-success/50 transition-all"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Taux de conversion</h3>
          <p className="text-3xl font-bold text-success mb-1">68%</p>
          <p className="text-sm text-gray-400">Devis → Chantiers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-primary/50 transition-all"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Heures travaillées</h3>
          <p className="text-3xl font-bold text-primary mb-1">1,247h</p>
          <p className="text-sm text-gray-400">Ce mois</p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Évolution mensuelle</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="devis" fill="#3b82f6" name="Devis (CHF)" />
              <Bar dataKey="factures" fill="#fbbf24" name="Factures (CHF)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Répartition des chantiers</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Lists */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chantiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Chantiers récents</h3>
          {recentChantiers.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun chantier</p>
          ) : (
            <div className="space-y-3">
              {recentChantiers.map((chantier) => (
                <div
                  key={chantier.id}
                  className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg hover:bg-dark-lighter/70 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{chantier.titre}</p>
                    <p className="text-sm text-gray-400">{chantier.client_name}</p>
                  </div>
                  {getStatusBadge(chantier.status, 'chantier')}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Factures */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="bg-dark-card border border-dark-border rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Factures récentes</h3>
          {recentFactures.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune facture</p>
          ) : (
            <div className="space-y-3">
              {recentFactures.map((facture) => (
                <div
                  key={facture.id}
                  className="flex items-center justify-between p-3 bg-dark-lighter rounded-lg hover:bg-dark-lighter/70 transition-colors cursor-pointer"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{facture.numero}</p>
                    <p className="text-sm text-gray-400">{facture.client_name}</p>
                  </div>
                  <div className="text-right mr-3">
                    <p className="font-semibold text-white">
                      CHF {facture.total_ttc.toLocaleString('fr-CH')}
                    </p>
                  </div>
                  {getStatusBadge(facture.status, 'facture')}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
