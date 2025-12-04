-- =============================================================================
-- ArtisanOS Database Schema
-- Multi-tenant SaaS pour entreprises artisanales
-- =============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================================================
-- 1. MULTI-TENANT CORE TABLES
-- =============================================================================

-- Companies table
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  address_line1 text,
  address_line2 text,
  postal_code text,
  city text,
  country text default 'CH',
  phone text,
  email text,
  locale text default 'fr-CH',
  currency text default 'CHF',
  tva_rate numeric(5,2) default 7.7,
  created_at timestamptz default now()
);

-- Profiles table (links auth.users to companies)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company_id uuid not null references public.companies(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  role text not null default 'member' check (role in ('owner', 'admin', 'member', 'worker')),
  avatar_url text,
  created_at timestamptz default now()
);

-- =============================================================================
-- 2. CLIENTS & SITES
-- =============================================================================

-- Clients table
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  first_name text,
  last_name text,
  company_name text,
  email text,
  phone text,
  notes text,
  created_at timestamptz default now()
);

-- Sites table (work locations)
create table public.sites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  label text,
  address_line1 text not null,
  address_line2 text,
  postal_code text,
  city text,
  created_at timestamptz default now()
);

-- =============================================================================
-- 3. DEVIS (QUOTES)
-- =============================================================================

-- Devis table
create table public.devis (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  site_id uuid references public.sites(id),
  number text unique,
  title text,
  description text,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'refused')),
  source text check (source in ('phone', 'web', 'recommendation', 'other')),
  subtotal numeric(12,2) default 0,
  tva_amount numeric(12,2) default 0,
  total numeric(12,2) default 0,
  currency text default 'CHF',
  valid_until date,
  sent_at timestamptz,
  accepted_at timestamptz,
  refused_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Devis items table
create table public.devis_items (
  id uuid primary key default gen_random_uuid(),
  devis_id uuid not null references public.devis(id) on delete cascade,
  description text not null,
  quantity numeric(12,3) default 1,
  unit text,
  unit_price numeric(12,2) default 0,
  tva_rate numeric(5,2) default 7.7,
  sort_order int default 0
);

-- =============================================================================
-- 4. CHANTIERS (PROJECTS) & PHASES
-- =============================================================================

-- Checklist templates (needed before chantiers due to FK)
create table public.checklist_templates (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  description text,
  type_travaux text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Chantiers table
create table public.chantiers (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  site_id uuid references public.sites(id),
  devis_id uuid references public.devis(id),
  code text,
  title text not null,
  description text,
  type_travaux text,
  status text not null default 'a_planifier' check (status in ('a_planifier', 'en_cours', 'en_pause', 'termine', 'annule')),
  montant_prevu_ht numeric(12,2),
  montant_prevu_ttc numeric(12,2),
  currency text default 'CHF',
  date_debut_prevue date,
  date_fin_prevue date,
  date_debut_reelle date,
  date_fin_reelle date,
  checklist_template_id uuid references public.checklist_templates(id),
  created_by uuid references public.profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Chantier phases table
create table public.chantier_phases (
  id uuid primary key default gen_random_uuid(),
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  name text not null,
  sort_order int default 0,
  start_planned date,
  end_planned date,
  status text default 'a_faire' check (status in ('a_faire', 'en_cours', 'termine'))
);

-- =============================================================================
-- 5. INTERVENTIONS (PLANNING)
-- =============================================================================

-- Interventions table
create table public.interventions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  assigned_to uuid references public.profiles(id),
  title text not null,
  description text,
  type text check (type in ('prepa', 'pose', 'finitions', 'sav', 'devis')),
  status text not null default 'planifie' check (status in ('planifie', 'en_cours', 'termine', 'annule')),
  start_at timestamptz not null,
  end_at timestamptz not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================================================
-- 6. CHECKLISTS & TEMPLATES
-- =============================================================================

-- Checklist template items
create table public.checklist_template_items (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.checklist_templates(id) on delete cascade,
  label text not null,
  sort_order int default 0,
  is_required boolean default true
);

-- Chantier checklists (instances)
create table public.chantier_checklists (
  id uuid primary key default gen_random_uuid(),
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  name text not null,
  created_at timestamptz default now()
);

-- Chantier checklist items
create table public.chantier_checklist_items (
  id uuid primary key default gen_random_uuid(),
  chantier_checklist_id uuid not null references public.chantier_checklists(id) on delete cascade,
  template_item_id uuid references public.checklist_template_items(id),
  label text not null,
  sort_order int default 0,
  done boolean default false,
  done_by uuid references public.profiles(id),
  done_at timestamptz
);

-- =============================================================================
-- 7. WORK EVENTS (TIME TRACKING) & INCIDENTS
-- =============================================================================

-- Work events table
create table public.work_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  intervention_id uuid references public.interventions(id),
  user_id uuid not null references public.profiles(id),
  event_type text not null check (event_type in ('start', 'pause', 'resume', 'stop')),
  at timestamptz not null default now(),
  note text
);

-- Incidents table
create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  intervention_id uuid references public.interventions(id),
  reported_by uuid references public.profiles(id),
  type text check (type in ('fuite', 'casse', 'client_absent', 'autre')),
  description text,
  severity text default 'medium' check (severity in ('low', 'medium', 'high')),
  status text default 'open' check (status in ('open', 'in_progress', 'resolved')),
  created_at timestamptz default now(),
  resolved_at timestamptz
);

-- =============================================================================
-- 8. FILES / PHOTOS
-- =============================================================================

-- Files table
create table public.files (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid references public.chantiers(id),
  intervention_id uuid references public.interventions(id),
  uploaded_by uuid references public.profiles(id),
  url text not null,
  file_type text not null check (file_type in ('before', 'during', 'after', 'incident', 'document')),
  mime_type text,
  size_bytes bigint,
  description text,
  created_at timestamptz default now()
);

-- =============================================================================
-- 9. MATÉRIAUX (MATERIALS) & COSTS
-- =============================================================================

-- Material catalog table
create table public.material_catalog (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  name text not null,
  reference text,
  unit text,
  default_unit_price numeric(12,2),
  tva_rate numeric(5,2) default 7.7,
  created_at timestamptz default now()
);

-- Material usages table
create table public.material_usages (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid not null references public.chantiers(id) on delete cascade,
  intervention_id uuid references public.interventions(id),
  material_id uuid references public.material_catalog(id),
  description text,
  quantity numeric(12,3) default 1,
  unit text,
  unit_cost numeric(12,2),
  created_at timestamptz default now()
);

-- =============================================================================
-- 10. FACTURATION (INVOICING) & PAYMENTS
-- =============================================================================

-- Factures table
create table public.factures (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  chantier_id uuid references public.chantiers(id),
  client_id uuid not null references public.clients(id),
  site_id uuid references public.sites(id),
  devis_id uuid references public.devis(id),
  number text unique,
  status text not null default 'draft' check (status in ('draft', 'pending', 'sent', 'paid', 'overdue', 'cancelled')),
  issue_date date not null default current_date,
  due_date date,
  subtotal numeric(12,2) default 0,
  tva_amount numeric(12,2) default 0,
  total numeric(12,2) default 0,
  currency text default 'CHF',
  paid_at timestamptz,
  payment_method text check (payment_method in ('virement', 'cash', 'carte', 'autre')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Facture items table
create table public.facture_items (
  id uuid primary key default gen_random_uuid(),
  facture_id uuid not null references public.factures(id) on delete cascade,
  description text not null,
  quantity numeric(12,3) default 1,
  unit text,
  unit_price numeric(12,2) default 0,
  tva_rate numeric(5,2) default 7.7,
  sort_order int default 0
);

-- Payments table
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  facture_id uuid not null references public.factures(id) on delete cascade,
  amount numeric(12,2) not null,
  currency text default 'CHF',
  paid_at timestamptz not null,
  method text check (method in ('virement', 'cash', 'carte', 'autre')),
  reference text,
  notes text,
  created_at timestamptz default now()
);

-- =============================================================================
-- 11. ACTIVITY LOG
-- =============================================================================

-- Activity log table
create table public.activity_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  profile_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid not null,
  action text not null check (action in ('created', 'updated', 'status_changed', 'deleted')),
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- =============================================================================
-- 12. INDEXES FOR PERFORMANCE
-- =============================================================================

-- Companies indexes
create index idx_companies_slug on public.companies(slug);

-- Profiles indexes
create index idx_profiles_company_id on public.profiles(company_id);

-- Clients indexes
create index idx_clients_company_id on public.clients(company_id);

-- Sites indexes
create index idx_sites_company_id_client_id on public.sites(company_id, client_id);

-- Devis indexes
create index idx_devis_company_id_client_id_status on public.devis(company_id, client_id, status);
create index idx_devis_items_devis_id on public.devis_items(devis_id);

-- Chantiers indexes
create index idx_chantiers_company_id_client_id_status on public.chantiers(company_id, client_id, status);
create index idx_chantier_phases_chantier_id on public.chantier_phases(chantier_id);

-- Interventions indexes
create index idx_interventions_company_id_assigned_to_start_at on public.interventions(company_id, assigned_to, start_at);
create index idx_interventions_chantier_id on public.interventions(chantier_id);

-- Checklist indexes
create index idx_checklist_templates_company_id on public.checklist_templates(company_id);
create index idx_checklist_template_items_template_id on public.checklist_template_items(template_id);
create index idx_chantier_checklists_chantier_id on public.chantier_checklists(chantier_id);
create index idx_chantier_checklist_items_checklist_id on public.chantier_checklist_items(chantier_checklist_id);

-- Work events indexes
create index idx_work_events_company_id_user_id_at on public.work_events(company_id, user_id, at);

-- Incidents indexes
create index idx_incidents_company_id_chantier_id_status on public.incidents(company_id, chantier_id, status);

-- Files indexes
create index idx_files_company_id_chantier_id on public.files(company_id, chantier_id);
create index idx_files_company_id_file_type on public.files(company_id, file_type);

-- Material catalog indexes
create index idx_material_catalog_company_id on public.material_catalog(company_id);

-- Material usages indexes
create index idx_material_usages_company_id_chantier_id on public.material_usages(company_id, chantier_id);

-- Factures indexes
create index idx_factures_company_id_client_id_status on public.factures(company_id, client_id, status);
create index idx_facture_items_facture_id on public.facture_items(facture_id);

-- Payments indexes
create index idx_payments_company_id_facture_id_paid_at on public.payments(company_id, facture_id, paid_at);

-- Activity log indexes
create index idx_activity_log_company_id_entity_type_entity_id on public.activity_log(company_id, entity_type, entity_id);

-- =============================================================================
-- 13. ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
alter table public.companies enable row level security;
alter table public.profiles enable row level security;
alter table public.clients enable row level security;
alter table public.sites enable row level security;
alter table public.devis enable row level security;
alter table public.devis_items enable row level security;
alter table public.chantiers enable row level security;
alter table public.chantier_phases enable row level security;
alter table public.interventions enable row level security;
alter table public.checklist_templates enable row level security;
alter table public.checklist_template_items enable row level security;
alter table public.chantier_checklists enable row level security;
alter table public.chantier_checklist_items enable row level security;
alter table public.work_events enable row level security;
alter table public.incidents enable row level security;
alter table public.files enable row level security;
alter table public.material_catalog enable row level security;
alter table public.material_usages enable row level security;
alter table public.factures enable row level security;
alter table public.facture_items enable row level security;
alter table public.payments enable row level security;
alter table public.activity_log enable row level security;

-- =============================================================================
-- RLS POLICIES FOR COMPANIES
-- =============================================================================

-- Companies: users can see their own company
create policy "tenant_select_companies"
  on public.companies for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = companies.id
    )
  );

create policy "tenant_insert_companies"
  on public.companies for insert
  with check (true);  -- Allow initial company creation

create policy "tenant_update_companies"
  on public.companies for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = companies.id
      and p.role in ('owner', 'admin')
    )
  );

create policy "tenant_delete_companies"
  on public.companies for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = companies.id
      and p.role = 'owner'
    )
  );

-- =============================================================================
-- RLS POLICIES FOR PROFILES
-- =============================================================================

create policy "tenant_select_profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = profiles.company_id
    )
  );

create policy "tenant_insert_profiles"
  on public.profiles for insert
  with check (
    auth.uid() = id  -- Users can create their own profile
  );

create policy "tenant_update_profiles"
  on public.profiles for update
  using (
    auth.uid() = id  -- Users can update their own profile
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = profiles.company_id
      and p.role in ('owner', 'admin')
    )
  );

create policy "tenant_delete_profiles"
  on public.profiles for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = profiles.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CLIENTS
-- =============================================================================

create policy "tenant_select_clients"
  on public.clients for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = clients.company_id
    )
  );

create policy "tenant_insert_clients"
  on public.clients for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = clients.company_id
    )
  );

create policy "tenant_update_clients"
  on public.clients for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = clients.company_id
    )
  );

create policy "tenant_delete_clients"
  on public.clients for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = clients.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR SITES
-- =============================================================================

create policy "tenant_select_sites"
  on public.sites for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = sites.company_id
    )
  );

create policy "tenant_insert_sites"
  on public.sites for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = sites.company_id
    )
  );

create policy "tenant_update_sites"
  on public.sites for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = sites.company_id
    )
  );

create policy "tenant_delete_sites"
  on public.sites for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = sites.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR DEVIS
-- =============================================================================

create policy "tenant_select_devis"
  on public.devis for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = devis.company_id
    )
  );

create policy "tenant_insert_devis"
  on public.devis for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = devis.company_id
    )
  );

create policy "tenant_update_devis"
  on public.devis for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = devis.company_id
    )
  );

create policy "tenant_delete_devis"
  on public.devis for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = devis.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR DEVIS_ITEMS
-- =============================================================================

create policy "tenant_select_devis_items"
  on public.devis_items for select
  using (
    exists (
      select 1 from public.devis d
      join public.profiles p on p.company_id = d.company_id
      where d.id = devis_items.devis_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_devis_items"
  on public.devis_items for insert
  with check (
    exists (
      select 1 from public.devis d
      join public.profiles p on p.company_id = d.company_id
      where d.id = devis_items.devis_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_devis_items"
  on public.devis_items for update
  using (
    exists (
      select 1 from public.devis d
      join public.profiles p on p.company_id = d.company_id
      where d.id = devis_items.devis_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_devis_items"
  on public.devis_items for delete
  using (
    exists (
      select 1 from public.devis d
      join public.profiles p on p.company_id = d.company_id
      where d.id = devis_items.devis_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHANTIERS
-- =============================================================================

create policy "tenant_select_chantiers"
  on public.chantiers for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = chantiers.company_id
    )
  );

create policy "tenant_insert_chantiers"
  on public.chantiers for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = chantiers.company_id
    )
  );

create policy "tenant_update_chantiers"
  on public.chantiers for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = chantiers.company_id
    )
  );

create policy "tenant_delete_chantiers"
  on public.chantiers for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = chantiers.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHANTIER_PHASES
-- =============================================================================

create policy "tenant_select_chantier_phases"
  on public.chantier_phases for select
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_phases.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_chantier_phases"
  on public.chantier_phases for insert
  with check (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_phases.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_chantier_phases"
  on public.chantier_phases for update
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_phases.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_chantier_phases"
  on public.chantier_phases for delete
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_phases.chantier_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR INTERVENTIONS
-- =============================================================================

create policy "tenant_select_interventions"
  on public.interventions for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = interventions.company_id
    )
  );

create policy "tenant_insert_interventions"
  on public.interventions for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = interventions.company_id
    )
  );

create policy "tenant_update_interventions"
  on public.interventions for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = interventions.company_id
    )
  );

create policy "tenant_delete_interventions"
  on public.interventions for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = interventions.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHECKLIST_TEMPLATES
-- =============================================================================

create policy "tenant_select_checklist_templates"
  on public.checklist_templates for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = checklist_templates.company_id
    )
  );

create policy "tenant_insert_checklist_templates"
  on public.checklist_templates for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = checklist_templates.company_id
    )
  );

create policy "tenant_update_checklist_templates"
  on public.checklist_templates for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = checklist_templates.company_id
    )
  );

create policy "tenant_delete_checklist_templates"
  on public.checklist_templates for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = checklist_templates.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHECKLIST_TEMPLATE_ITEMS
-- =============================================================================

create policy "tenant_select_checklist_template_items"
  on public.checklist_template_items for select
  using (
    exists (
      select 1 from public.checklist_templates t
      join public.profiles p on p.company_id = t.company_id
      where t.id = checklist_template_items.template_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_checklist_template_items"
  on public.checklist_template_items for insert
  with check (
    exists (
      select 1 from public.checklist_templates t
      join public.profiles p on p.company_id = t.company_id
      where t.id = checklist_template_items.template_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_checklist_template_items"
  on public.checklist_template_items for update
  using (
    exists (
      select 1 from public.checklist_templates t
      join public.profiles p on p.company_id = t.company_id
      where t.id = checklist_template_items.template_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_checklist_template_items"
  on public.checklist_template_items for delete
  using (
    exists (
      select 1 from public.checklist_templates t
      join public.profiles p on p.company_id = t.company_id
      where t.id = checklist_template_items.template_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHANTIER_CHECKLISTS
-- =============================================================================

create policy "tenant_select_chantier_checklists"
  on public.chantier_checklists for select
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_checklists.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_chantier_checklists"
  on public.chantier_checklists for insert
  with check (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_checklists.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_chantier_checklists"
  on public.chantier_checklists for update
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_checklists.chantier_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_chantier_checklists"
  on public.chantier_checklists for delete
  using (
    exists (
      select 1 from public.chantiers c
      join public.profiles p on p.company_id = c.company_id
      where c.id = chantier_checklists.chantier_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR CHANTIER_CHECKLIST_ITEMS
-- =============================================================================

create policy "tenant_select_chantier_checklist_items"
  on public.chantier_checklist_items for select
  using (
    exists (
      select 1 from public.chantier_checklists cc
      join public.chantiers c on c.id = cc.chantier_id
      join public.profiles p on p.company_id = c.company_id
      where cc.id = chantier_checklist_items.chantier_checklist_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_chantier_checklist_items"
  on public.chantier_checklist_items for insert
  with check (
    exists (
      select 1 from public.chantier_checklists cc
      join public.chantiers c on c.id = cc.chantier_id
      join public.profiles p on p.company_id = c.company_id
      where cc.id = chantier_checklist_items.chantier_checklist_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_chantier_checklist_items"
  on public.chantier_checklist_items for update
  using (
    exists (
      select 1 from public.chantier_checklists cc
      join public.chantiers c on c.id = cc.chantier_id
      join public.profiles p on p.company_id = c.company_id
      where cc.id = chantier_checklist_items.chantier_checklist_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_chantier_checklist_items"
  on public.chantier_checklist_items for delete
  using (
    exists (
      select 1 from public.chantier_checklists cc
      join public.chantiers c on c.id = cc.chantier_id
      join public.profiles p on p.company_id = c.company_id
      where cc.id = chantier_checklist_items.chantier_checklist_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR WORK_EVENTS
-- =============================================================================

create policy "tenant_select_work_events"
  on public.work_events for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = work_events.company_id
    )
  );

create policy "tenant_insert_work_events"
  on public.work_events for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = work_events.company_id
    )
  );

create policy "tenant_update_work_events"
  on public.work_events for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = work_events.company_id
    )
  );

create policy "tenant_delete_work_events"
  on public.work_events for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = work_events.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR INCIDENTS
-- =============================================================================

create policy "tenant_select_incidents"
  on public.incidents for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = incidents.company_id
    )
  );

create policy "tenant_insert_incidents"
  on public.incidents for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = incidents.company_id
    )
  );

create policy "tenant_update_incidents"
  on public.incidents for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = incidents.company_id
    )
  );

create policy "tenant_delete_incidents"
  on public.incidents for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = incidents.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR FILES
-- =============================================================================

create policy "tenant_select_files"
  on public.files for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = files.company_id
    )
  );

create policy "tenant_insert_files"
  on public.files for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = files.company_id
    )
  );

create policy "tenant_update_files"
  on public.files for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = files.company_id
    )
  );

create policy "tenant_delete_files"
  on public.files for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = files.company_id
    )
  );

-- =============================================================================
-- RLS POLICIES FOR MATERIAL_CATALOG
-- =============================================================================

create policy "tenant_select_material_catalog"
  on public.material_catalog for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_catalog.company_id
    )
  );

create policy "tenant_insert_material_catalog"
  on public.material_catalog for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_catalog.company_id
    )
  );

create policy "tenant_update_material_catalog"
  on public.material_catalog for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_catalog.company_id
    )
  );

create policy "tenant_delete_material_catalog"
  on public.material_catalog for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_catalog.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR MATERIAL_USAGES
-- =============================================================================

create policy "tenant_select_material_usages"
  on public.material_usages for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_usages.company_id
    )
  );

create policy "tenant_insert_material_usages"
  on public.material_usages for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_usages.company_id
    )
  );

create policy "tenant_update_material_usages"
  on public.material_usages for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_usages.company_id
    )
  );

create policy "tenant_delete_material_usages"
  on public.material_usages for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = material_usages.company_id
    )
  );

-- =============================================================================
-- RLS POLICIES FOR FACTURES
-- =============================================================================

create policy "tenant_select_factures"
  on public.factures for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = factures.company_id
    )
  );

create policy "tenant_insert_factures"
  on public.factures for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = factures.company_id
    )
  );

create policy "tenant_update_factures"
  on public.factures for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = factures.company_id
    )
  );

create policy "tenant_delete_factures"
  on public.factures for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = factures.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR FACTURE_ITEMS
-- =============================================================================

create policy "tenant_select_facture_items"
  on public.facture_items for select
  using (
    exists (
      select 1 from public.factures f
      join public.profiles p on p.company_id = f.company_id
      where f.id = facture_items.facture_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_insert_facture_items"
  on public.facture_items for insert
  with check (
    exists (
      select 1 from public.factures f
      join public.profiles p on p.company_id = f.company_id
      where f.id = facture_items.facture_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_update_facture_items"
  on public.facture_items for update
  using (
    exists (
      select 1 from public.factures f
      join public.profiles p on p.company_id = f.company_id
      where f.id = facture_items.facture_id
      and p.id = auth.uid()
    )
  );

create policy "tenant_delete_facture_items"
  on public.facture_items for delete
  using (
    exists (
      select 1 from public.factures f
      join public.profiles p on p.company_id = f.company_id
      where f.id = facture_items.facture_id
      and p.id = auth.uid()
    )
  );

-- =============================================================================
-- RLS POLICIES FOR PAYMENTS
-- =============================================================================

create policy "tenant_select_payments"
  on public.payments for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = payments.company_id
    )
  );

create policy "tenant_insert_payments"
  on public.payments for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = payments.company_id
    )
  );

create policy "tenant_update_payments"
  on public.payments for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = payments.company_id
    )
  );

create policy "tenant_delete_payments"
  on public.payments for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = payments.company_id
      and p.role in ('owner', 'admin')
    )
  );

-- =============================================================================
-- RLS POLICIES FOR ACTIVITY_LOG
-- =============================================================================

create policy "tenant_select_activity_log"
  on public.activity_log for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = activity_log.company_id
    )
  );

create policy "tenant_insert_activity_log"
  on public.activity_log for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = activity_log.company_id
    )
  );

create policy "tenant_update_activity_log"
  on public.activity_log for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = activity_log.company_id
      and p.role in ('owner', 'admin')
    )
  );

create policy "tenant_delete_activity_log"
  on public.activity_log for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
      and p.company_id = activity_log.company_id
      and p.role = 'owner'
    )
  );

-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
