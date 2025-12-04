import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'
import { validateSupabaseEnv } from './env'

/**
 * Crée un client Supabase pour les composants server (server components, route handlers)
 *
 * Utilise la configuration validée depuis lib/supabase/env.ts
 * Lance une erreur claire si les variables d'environnement sont manquantes
 */
export function createClient() {
  const cookieStore = cookies()
  const { url, anonKey } = validateSupabaseEnv()

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options })
        } catch (error) {
          // The `set` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: '', ...options })
        } catch (error) {
          // The `delete` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
