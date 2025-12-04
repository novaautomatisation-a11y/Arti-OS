'use client'

import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const { profile, company } = useAuth()

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Paramètres</h1>
        <p className="text-gray-400">
          Configuration de votre compte et de votre entreprise
        </p>
      </motion.div>

      {/* Profil utilisateur */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-card border border-dark-border rounded-xl p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Mon profil
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                defaultValue={profile?.full_name ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Rôle
              </label>
              <input
                type="text"
                defaultValue={profile?.role ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-gray-500 rounded-lg"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              defaultValue={profile?.phone ?? ''}
              className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
              placeholder="+41 79 123 45 67"
              disabled
            />
          </div>
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              disabled
            >
              Enregistrer les modifications
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Informations entreprise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-card border border-dark-border rounded-xl p-8"
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Informations de l'entreprise
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              defaultValue={company?.name ?? ''}
              className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
              disabled
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={company?.email ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
                placeholder="contact@exemple.ch"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue={company?.phone ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
                placeholder="+41 21 123 45 67"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Adresse
            </label>
            <input
              type="text"
              defaultValue={company?.address ?? ''}
              className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
              disabled
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Code postal
              </label>
              <input
                type="text"
                defaultValue={company?.postal_code ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">
                Ville
              </label>
              <input
                type="text"
                defaultValue={company?.city ?? ''}
                className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Numéro TVA
            </label>
            <input
              type="text"
              defaultValue={company?.vat_number ?? ''}
              className="w-full px-4 py-2.5 bg-dark-lighter border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-warning focus:border-warning transition-all"
              placeholder="CHE-123.456.789"
              disabled
            />
          </div>
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gray-600 text-gray-400 font-semibold rounded-lg cursor-not-allowed"
              disabled
            >
              Enregistrer les modifications
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Zone de danger */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-danger/10 border border-danger/30 rounded-xl p-8"
      >
        <h2 className="text-xl font-bold text-danger mb-2">Zone de danger</h2>
        <p className="text-sm text-danger/80 mb-6">
          Les actions suivantes sont irréversibles. Procédez avec prudence.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-danger/20 border border-danger/30 text-danger font-semibold rounded-lg hover:bg-danger/30 transition-colors cursor-not-allowed"
          disabled
        >
          Supprimer mon compte
        </motion.button>
      </motion.div>
    </div>
  )
}
