-- Script SQL simplifié - Copiez tout et collez dans Supabase SQL Editor

-- Étape 1 : Créer l'entreprise et lier automatiquement au profil
DO $$
DECLARE
  v_company_id uuid;
  v_user_id uuid;
BEGIN
  -- Récupérer l'ID de l'utilisateur
  SELECT id INTO v_user_id
  FROM auth.users
  WHERE email = 'bne23yg@gmail.com'
  LIMIT 1;

  -- Créer l'entreprise
  INSERT INTO public.companies (
    name,
    address,
    postal_code,
    city,
    country,
    phone,
    email,
    vat_number
  ) VALUES (
    'Entreprise Test Artisan',
    'Rue du Test 123',
    '1000',
    'Lausanne',
    'CH',
    '+41 21 123 45 67',
    'bne23yg@gmail.com',
    'CHE-123.456.789'
  )
  RETURNING id INTO v_company_id;

  -- Mettre à jour ou créer le profil
  INSERT INTO public.profiles (
    id,
    company_id,
    full_name,
    role
  ) VALUES (
    v_user_id,
    v_company_id,
    'Utilisateur Test',
    'owner'
  )
  ON CONFLICT (id)
  DO UPDATE SET
    company_id = v_company_id,
    role = 'owner';

  -- Afficher le résultat
  RAISE NOTICE 'Entreprise créée avec succès! Company ID: %', v_company_id;
  RAISE NOTICE 'Profil mis à jour pour user ID: %', v_user_id;
END $$;

-- Vérification finale
SELECT
  u.email as user_email,
  p.full_name,
  p.role,
  c.name as company_name,
  c.city as company_city
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
JOIN public.companies c ON c.id = p.company_id
WHERE u.email = 'bne23yg@gmail.com';
