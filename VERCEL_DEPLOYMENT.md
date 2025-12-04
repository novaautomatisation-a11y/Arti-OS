# Guide de déploiement Vercel - ArtisanOS

## Problème résolu

Le déploiement sur Vercel échouait avec l'erreur suivante :
```
Error: Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.
Error occurred prerendering page "/app/clients"
```

Cette erreur se produisait lors du prerendering des pages `/app/*` et `/login` car les variables d'environnement Supabase n'étaient pas correctement validées et utilisées.

## Solution implémentée

### 1. Configuration centralisée (`lib/supabase/env.ts`)

Nous avons créé un fichier centralisé qui :
- Lit les variables d'environnement avec fallback
- Valide que les valeurs sont présentes et correctes
- Fournit des messages d'erreur clairs en cas de problème

### 2. Clients Supabase mis à jour

Les fichiers `lib/supabase/client.ts` et `lib/supabase/server.ts` utilisent maintenant la validation centralisée au lieu d'accéder directement à `process.env`.

### 3. AuthContext corrigé

Le client Supabase n'est plus créé au niveau module dans `contexts/AuthContext.tsx`, évitant ainsi les problèmes de prerendering.

## Configuration requise sur Vercel

### Étape 1 : Accéder aux variables d'environnement

1. Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionner votre projet **Arti-OS**
3. Aller dans **Settings** → **Environment Variables**

### Étape 2 : Ajouter les variables Supabase

Ajouter les deux variables suivantes :

#### Variable 1 : NEXT_PUBLIC_SUPABASE_URL

- **Nom** : `NEXT_PUBLIC_SUPABASE_URL`
- **Valeur** : Votre URL Supabase (ex: `https://abcdefgh.supabase.co`)
- **Environnements** : Cocher `Production`, `Preview`, et `Development`

#### Variable 2 : NEXT_PUBLIC_SUPABASE_ANON_KEY

- **Nom** : `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Valeur** : Votre clé anonyme Supabase (commence par `eyJhbGciOi...`)
- **Environnements** : Cocher `Production`, `Preview`, et `Development`

### Étape 3 : Obtenir vos valeurs Supabase

1. Aller sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet
3. Aller dans **Settings** → **API**
4. Copier :
   - **Project URL** → pour `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → pour `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Étape 4 : Redéployer

Après avoir ajouté les variables d'environnement :

1. Aller dans l'onglet **Deployments**
2. Cliquer sur le bouton **Redeploy** sur le dernier déploiement
3. Cocher **Use existing Build Cache** (optionnel, pour un déploiement plus rapide)
4. Cliquer sur **Redeploy**

## Configuration locale

Pour tester en local, créer un fichier `.env.local` à la racine du projet :

```bash
cp .env.local.example .env.local
```

Puis éditer `.env.local` et remplacer les valeurs par défaut par vos vraies valeurs Supabase.

## Vérification

Après le déploiement, vous devriez voir :

- ✅ Build réussi sans erreurs de prerendering
- ✅ Toutes les pages `/app/*` et `/login` fonctionnent correctement
- ✅ Les messages d'erreur sont clairs si les variables sont manquantes

## Messages d'erreur améliorés

Si les variables sont mal configurées, vous verrez maintenant des messages clairs :

```
❌ Variable d'environnement SUPABASE_URL manquante.

Configuration requise :
- Sur Vercel : Project Settings → Environment Variables → NEXT_PUBLIC_SUPABASE_URL
- En local : Ajouter NEXT_PUBLIC_SUPABASE_URL dans .env.local

Exemple : NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
```

## Support

Si vous rencontrez des problèmes :

1. Vérifier que les deux variables sont bien configurées sur Vercel
2. Vérifier que les valeurs commencent bien par `https://` pour l'URL
3. Vérifier que la clé anonyme est complète (elle est très longue)
4. Redéployer après avoir modifié les variables

## Fichiers modifiés

- `lib/supabase/env.ts` (nouveau) - Validation centralisée
- `lib/supabase/client.ts` - Utilise la validation centralisée
- `lib/supabase/server.ts` - Utilise la validation centralisée
- `contexts/AuthContext.tsx` - Client créé dans useEffect
- `.env.local.example` - Documentation améliorée
