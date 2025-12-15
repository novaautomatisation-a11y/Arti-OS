-- ============================================
-- Script SQL pour créer une entreprise test
-- et la lier à l'utilisateur bne23yg@gmail.com
-- ============================================

-- 1. Créer une entreprise test
INSERT INTO public.companies (
  id,
  name,
  address,
  postal_code,
  city,
  country,
  phone,
  email,
  vat_number,
  created_at
) VALUES (
  gen_random_uuid(),
  'Entreprise Test Artisan',
  'Rue du Test 123',
  '1000',
  'Lausanne',
  'CH',
  '+41 21 123 45 67',
  'bne23yg@gmail.com',
  'CHE-123.456.789',
  NOW()
)
RETURNING id;

-- 2. Mettre à jour le profil de l'utilisateur pour le lier à cette entreprise
-- (Copiez l'ID généré ci-dessus et remplacez 'COMPANY_ID_HERE')

-- Option A : Si le profil existe déjà, le mettre à jour
UPDATE public.profiles
SET
  company_id = (SELECT id FROM public.companies WHERE email = 'bne23yg@gmail.com' ORDER BY created_at DESC LIMIT 1),
  role = 'owner',
  full_name = COALESCE(full_name, 'Utilisateur Test')
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'bne23yg@gmail.com' LIMIT 1
);

-- Option B : Si le profil n'existe pas, le créer
-- (Décommentez si nécessaire)
/*
INSERT INTO public.profiles (
  id,
  company_id,
  full_name,
  role,
  created_at
)
SELECT
  u.id,
  (SELECT id FROM public.companies WHERE email = 'bne23yg@gmail.com' ORDER BY created_at DESC LIMIT 1),
  'Utilisateur Test',
  'owner',
  NOW()
FROM auth.users u
WHERE u.email = 'bne23yg@gmail.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.profiles p WHERE p.id = u.id
  );
*/

-- 3. Vérifier que tout est correct
SELECT
  p.id as profile_id,
  p.full_name,
  p.role,
  c.id as company_id,
  c.name as company_name,
  c.email as company_email
FROM public.profiles p
JOIN public.companies c ON p.company_id = c.id
WHERE p.id = (SELECT id FROM auth.users WHERE email = 'bne23yg@gmail.com' LIMIT 1);
