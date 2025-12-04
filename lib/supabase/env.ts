/**
 * Configuration centralisée des variables d'environnement Supabase
 *
 * IMPORTANT - Configuration requise sur Vercel :
 * =============================================
 * Dans Project Settings → Environment Variables, définir :
 * - NEXT_PUBLIC_SUPABASE_URL = https://votre-projet.supabase.co
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY = votre_clé_anonyme
 *
 * En local, dans .env.local, définir les mêmes variables.
 *
 * Ce fichier garantit que les variables sont validées au démarrage
 * et fournit des messages d'erreur clairs si elles sont manquantes.
 */

// Lecture des variables d'environnement avec fallback
export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.SUPABASE_URL ??
  ''

export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.SUPABASE_ANON_KEY ??
  ''

/**
 * Valide que les variables d'environnement Supabase sont correctement configurées
 * Lance une erreur explicite si la configuration est invalide
 */
export function validateSupabaseEnv(): { url: string; anonKey: string } {
  // Validation de l'URL
  if (!SUPABASE_URL) {
    throw new Error(
      '❌ Variable d\'environnement SUPABASE_URL manquante.\n\n' +
      'Configuration requise :\n' +
      '- Sur Vercel : Project Settings → Environment Variables → NEXT_PUBLIC_SUPABASE_URL\n' +
      '- En local : Ajouter NEXT_PUBLIC_SUPABASE_URL dans .env.local\n\n' +
      'Exemple : NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co'
    )
  }

  if (!SUPABASE_URL.startsWith('http://') && !SUPABASE_URL.startsWith('https://')) {
    throw new Error(
      `❌ SUPABASE_URL invalide : "${SUPABASE_URL}"\n\n` +
      'L\'URL doit commencer par http:// ou https://\n' +
      'Exemple correct : https://votre-projet.supabase.co'
    )
  }

  // Validation de la clé anonyme
  if (!SUPABASE_ANON_KEY) {
    throw new Error(
      '❌ Variable d\'environnement SUPABASE_ANON_KEY manquante.\n\n' +
      'Configuration requise :\n' +
      '- Sur Vercel : Project Settings → Environment Variables → NEXT_PUBLIC_SUPABASE_ANON_KEY\n' +
      '- En local : Ajouter NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local\n\n' +
      'Trouvez votre clé sur : https://supabase.com/dashboard/project/_/settings/api'
    )
  }

  if (SUPABASE_ANON_KEY.length < 20) {
    throw new Error(
      `❌ SUPABASE_ANON_KEY semble invalide (trop courte)\n\n` +
      'Vérifiez que vous avez copié la clé complète depuis votre dashboard Supabase.'
    )
  }

  return {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
  }
}
