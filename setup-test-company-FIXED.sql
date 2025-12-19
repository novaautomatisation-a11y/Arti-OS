-- ============================================================
-- Script SQL CORRIGÉ pour créer une entreprise test
-- Basé sur le vrai schéma de la base de données
-- ============================================================

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

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Utilisateur avec email bne23yg@gmail.com non trouvé';
  END IF;

  -- Créer l'entreprise avec les bons noms de colonnes
  INSERT INTO public.companies (
    name,
    slug,
    address_line1,
    address_line2,
    postal_code,
    city,
    country,
    phone,
    email,
    locale,
    currency,
    tva_rate
  ) VALUES (
    'Entreprise Test Artisan',
    'entreprise-test-artisan-' || substr(md5(random()::text), 1, 8), -- slug unique
    'Rue du Test 123',
    'Bâtiment A',
    '1000',
    'Lausanne',
    'CH',
    '+41 21 123 45 67',
    'bne23yg@gmail.com',
    'fr-CH',
    'CHF',
    7.7
  )
  RETURNING id INTO v_company_id;

  -- Mettre à jour ou créer le profil
  INSERT INTO public.profiles (
    id,
    company_id,
    full_name,
    email,
    role
  ) VALUES (
    v_user_id,
    v_company_id,
    'Utilisateur Test',
    'bne23yg@gmail.com',
    'owner'
  )
  ON CONFLICT (id)
  DO UPDATE SET
    company_id = v_company_id,
    role = 'owner',
    email = 'bne23yg@gmail.com';

  -- Afficher le résultat
  RAISE NOTICE '✅ Entreprise créée avec succès!';
  RAISE NOTICE 'Company ID: %', v_company_id;
  RAISE NOTICE 'User ID: %', v_user_id;
  RAISE NOTICE 'Vous pouvez maintenant vous connecter!';
END $$;

-- Vérification finale
SELECT
  u.email as "📧 Email utilisateur",
  p.full_name as "👤 Nom",
  p.role as "🔑 Rôle",
  c.name as "🏢 Entreprise",
  c.city as "📍 Ville",
  c.slug as "🔗 Slug"
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
JOIN public.companies c ON c.id = p.company_id
WHERE u.email = 'bne23yg@gmail.com';
