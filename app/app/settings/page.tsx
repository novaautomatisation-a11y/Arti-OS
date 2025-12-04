'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const { profile, company } = useAuth()

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">
          Gérez les paramètres de votre compte et de votre entreprise
        </p>
      </div>

      {/* Profil utilisateur */}
      <Card padding="lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Mon profil
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                defaultValue={profile?.full_name ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Rôle
              </label>
              <input
                type="text"
                defaultValue={profile?.role ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              defaultValue={profile?.phone ?? ''}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+41 79 123 45 67"
              disabled
            />
          </div>
          <div className="pt-4">
            <Button variant="primary" disabled>
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </Card>

      {/* Informations entreprise */}
      <Card padding="lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Informations de l\'entreprise
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Nom de l\'entreprise
            </label>
            <input
              type="text"
              defaultValue={company?.name ?? ''}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue={company?.email ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="contact@exemple.ch"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                defaultValue={company?.phone ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+41 21 123 45 67"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Adresse
            </label>
            <input
              type="text"
              defaultValue={company?.address ?? ''}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Code postal
              </label>
              <input
                type="text"
                defaultValue={company?.postal_code ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Ville
              </label>
              <input
                type="text"
                defaultValue={company?.city ?? ''}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Numéro TVA
            </label>
            <input
              type="text"
              defaultValue={company?.vat_number ?? ''}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="CHE-123.456.789"
              disabled
            />
          </div>
          <div className="pt-4">
            <Button variant="primary" disabled>
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </Card>

      {/* Zone de danger */}
      <Card padding="lg" className="border-red-200 bg-red-50">
        <h2 className="text-xl font-bold text-red-900 mb-2">Zone de danger</h2>
        <p className="text-sm text-red-700 mb-4">
          Les actions suivantes sont irréversibles. Procédez avec prudence.
        </p>
        <Button variant="secondary" className="border-red-300 text-red-700 hover:bg-red-100" disabled>
          Supprimer mon compte
        </Button>
      </Card>
    </div>
  )
}
