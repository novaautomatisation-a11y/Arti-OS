# ArtisanOS - Guide d'installation et d'utilisation

## Architecture de l'application

L'application est divisée en deux zones principales :

### 1. Zone Publique (Landing Page)
- **Route** : `/`
- **Fichiers** : `app/page.tsx` + composants dans `components/sections/`
- **Description** : Page marketing avec sections Hero, Features, Pricing, Contact, etc.

### 2. Zone Authentifiée (Application)
- **Routes** : `/app/*`
- **Layout** : `app/app/layout.tsx` avec `AuthProvider` et `AppShell`
- **Protection** : Redirection automatique vers `/login` si non connecté
- **Pages disponibles** :
  - `/app` - Dashboard avec statistiques
  - `/app/clients` - Gestion des clients
  - `/app/devis` - Gestion des devis
  - `/app/chantiers` - Gestion des chantiers
  - `/app/planning` - Planning des interventions
  - `/app/factures` - Gestion des factures
  - `/app/settings` - Paramètres du compte

### 3. Authentification
- **Route** : `/login`
- **Fichier** : `app/login/page.tsx`
- **Méthode** : Email + Mot de passe via Supabase Auth

---

## Installation

### 1. Cloner et installer les dépendances

\`\`\`bash
npm install
\`\`\`

### 2. Configurer Supabase

#### a) Créer un projet Supabase

1. Aller sur https://supabase.com/dashboard
2. Créer un nouveau projet
3. Noter l'URL du projet et la clé API (anon public)

#### b) Appliquer le schéma de base de données

1. Aller dans l'éditeur SQL de Supabase
2. Copier le contenu de `supabase/migrations/20250101000000_initial_schema.sql`
3. Exécuter le script

Cela va créer :
- Les tables : `companies`, `profiles`, `clients`, `sites`, `devis`, `chantiers`, `interventions`, `factures`, etc.
- Les politiques RLS (Row Level Security) pour isoler les données par `company_id`
- Les indexes pour les performances

#### c) Configurer les variables d'environnement

1. Copier le fichier d'exemple :

\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. Éditer `.env.local` et remplacer les valeurs :

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_publique
\`\`\`

### 3. Créer un premier utilisateur de test

Dans Supabase :

1. **Créer une company** (dans la table `companies`) :

\`\`\`sql
INSERT INTO public.companies (name, city, country)
VALUES ('Mon Entreprise Test', 'Lausanne', 'CH')
RETURNING id;
\`\`\`

Copier l'`id` de la company créée.

2. **Créer un utilisateur** dans Authentication > Users :
   - Email : `test@exemple.ch`
   - Mot de passe : `TestPassword123!`
   - Confirmer l'email automatiquement

3. **Créer le profil** (dans la table `profiles`) :

\`\`\`sql
INSERT INTO public.profiles (id, company_id, full_name, role)
VALUES (
  'l-user-id-de-supabase-auth', -- remplacer par l'ID de l'user auth
  'l-id-de-la-company', -- remplacer par l'ID de la company
  'Jean Dupont',
  'owner'
);
\`\`\`

---

## Développement

### Lancer le serveur de développement

\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur http://localhost:3000

### Routes disponibles

- `http://localhost:3000/` - Landing page publique
- `http://localhost:3000/login` - Page de connexion
- `http://localhost:3000/app` - Dashboard (nécessite auth)

---

## Utilisation

### 1. Connexion

1. Aller sur `http://localhost:3000/login`
2. Entrer l'email et le mot de passe créés dans Supabase
3. Cliquer sur "Se connecter"
4. Vous êtes redirigé vers `/app` (Dashboard)

### 2. Navigation

Une fois connecté, vous avez accès à :

- **Dashboard** : Vue d'ensemble avec statistiques
  - Nombre de chantiers en cours
  - Devis en attente
  - Factures en retard
  - Interventions aujourd'hui
  - Listes des derniers chantiers et factures

- **Clients** : Liste de tous vos clients (filtré par `company_id`)

- **Devis** : Liste des devis avec statuts (brouillon, envoyé, accepté, refusé, expiré)

- **Chantiers** : Liste des chantiers avec statuts (planifié, en cours, pause, terminé, annulé)

- **Planning** : Interventions planifiées de la semaine

- **Factures** : Liste des factures avec statuts (brouillon, envoyée, payée, en retard, annulée)

- **Paramètres** : Informations du profil et de l'entreprise

### 3. Déconnexion

Cliquer sur le bouton "Déconnexion" dans la topbar (en haut à droite).

---

## Structure du code

\`\`\`
Arti-OS/
├── app/
│   ├── page.tsx                    # Landing page publique
│   ├── login/
│   │   └── page.tsx                # Page de connexion
│   └── app/                        # Zone authentifiée
│       ├── layout.tsx              # Layout avec AuthProvider + AppShell
│       ├── page.tsx                # Dashboard
│       ├── clients/page.tsx
│       ├── devis/page.tsx
│       ├── chantiers/page.tsx
│       ├── planning/page.tsx
│       ├── factures/page.tsx
│       └── settings/page.tsx
├── components/
│   ├── ui/                         # Composants UI réutilisables
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   ├── layout/
│   │   └── AppShell.tsx            # Sidebar + Topbar
│   └── sections/                   # Sections de la landing page
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── FeaturesSection.tsx
│       └── ...
├── contexts/
│   └── AuthContext.tsx             # Contexte global auth/profile/company
├── lib/
│   └── supabase/
│       ├── client.ts               # Client browser Supabase
│       └── server.ts               # Client server Supabase
├── types/
│   └── database.ts                 # Types TypeScript du schéma DB
└── supabase/
    └── migrations/
        └── 20250101000000_initial_schema.sql
\`\`\`

---

## Contexte d'authentification

Le contexte `AuthContext` est défini dans `contexts/AuthContext.tsx` et expose :

\`\`\`typescript
interface AuthContextType {
  user: User | null                // Utilisateur Supabase Auth
  profile: Profile | null          // Profil de l'utilisateur
  company: Company | null          // Entreprise liée
  loading: boolean                 // État de chargement
  signOut: () => Promise<void>     // Fonction de déconnexion
}
\`\`\`

### Utilisation dans un composant

\`\`\`typescript
import { useAuth } from '@/contexts/AuthContext'

export default function MyPage() {
  const { user, profile, company, loading } = useAuth()

  if (loading) return <div>Chargement...</div>

  return (
    <div>
      <h1>Bienvenue {profile?.full_name}</h1>
      <p>Entreprise : {company?.name}</p>
    </div>
  )
}
\`\`\`

---

## Filtrage des données par company_id

Toutes les requêtes Supabase dans les pages de l'app filtrent automatiquement par `company_id` :

\`\`\`typescript
const { data } = await supabase
  .from('clients')
  .select('*')
  .eq('company_id', company.id)  // ← Isolation des données
\`\`\`

Les politiques RLS dans Supabase garantissent qu'un utilisateur ne peut voir que les données de son entreprise.

---

## Prochaines étapes

### Fonctionnalités à implémenter :

1. **Formulaires CRUD** pour créer/modifier :
   - Clients
   - Devis
   - Chantiers
   - Factures

2. **Modales de détail** pour afficher les infos complètes

3. **Gestion des rôles** :
   - Owner : tous les droits
   - Admin : gestion complète sauf paramètres entreprise
   - Member : lecture/écriture limitée
   - Worker : vue planning + pointage heures

4. **Automatisations** :
   - Devis accepté → Création auto du chantier
   - Chantier terminé → Génération facture
   - Facture en retard → Notifications

5. **Recherche et filtres** sur toutes les listes

6. **Export PDF** pour devis et factures

7. **Upload de photos** pour les chantiers

8. **Planning visuel** (calendrier/timeline)

---

## Support

Pour toute question, consulter :
- Documentation Supabase : https://supabase.com/docs
- Documentation Next.js : https://nextjs.org/docs
- Documentation Tailwind CSS : https://tailwindcss.com/docs

---

## Licence

Propriétaire - ArtisanOS © 2024
