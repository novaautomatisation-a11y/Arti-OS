import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'
import { validateSupabaseEnv } from './env'

/**
 * Crée un client Supabase pour les composants browser (client components)
 *
 * Utilise la configuration validée depuis lib/supabase/env.ts
 * Lance une erreur claire si les variables d'environnement sont manquantes
 */
export function createClient() {
  const { url, anonKey } = validateSupabaseEnv()

  return createBrowserClient<Database>(url, anonKey)
}
