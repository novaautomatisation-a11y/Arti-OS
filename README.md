# ArtisanOS - Database Schema

Multi-tenant SaaS database schema for artisan businesses (plumbers, electricians, masons, etc.).

## Stack

- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Frontend**: Next.js
- **Deployment**: Vercel

## Database Structure

### Core Features

- ✅ Multi-tenant architecture with `company_id` isolation
- ✅ Row Level Security (RLS) on all tables
- ✅ Swiss business standards (CHF currency, 7.7% TVA)
- ✅ Complete audit trail with activity logging

### Tables Overview

#### 1. Multi-tenant Core
- `companies` - Company/tenant information
- `profiles` - User profiles linked to auth.users and companies

#### 2. Clients & Sites
- `clients` - Customer information
- `sites` - Work site addresses

#### 3. Quotes (Devis)
- `devis` - Quote headers
- `devis_items` - Quote line items

#### 4. Projects (Chantiers)
- `chantiers` - Project/worksite management
- `chantier_phases` - Project phases (preparation, installation, finishing)

#### 5. Interventions
- `interventions` - Scheduled work/appointments

#### 6. Checklists
- `checklist_templates` - Reusable checklist templates
- `checklist_template_items` - Template items
- `chantier_checklists` - Checklist instances per project
- `chantier_checklist_items` - Checklist item instances

#### 7. Time Tracking & Incidents
- `work_events` - Time tracking (start, pause, resume, stop)
- `incidents` - Issue/incident reporting

#### 8. Files & Photos
- `files` - Document and photo storage references

#### 9. Materials
- `material_catalog` - Company material catalog
- `material_usages` - Material usage per project

#### 10. Invoicing
- `factures` - Invoice headers
- `facture_items` - Invoice line items
- `payments` - Payment tracking

#### 11. Activity Log
- `activity_log` - Comprehensive audit trail

## How to Apply the Schema

### Option 1: Supabase Dashboard (Recommended for initial setup)

1. Log into your Supabase project
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations/20250101000000_initial_schema.sql`
4. Paste and run the SQL

### Option 2: Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Apply the migration
supabase db push
```

### Option 3: Manual Migration File

If you're using Supabase local development:

```bash
# Initialize Supabase (if not already done)
supabase init

# Copy the migration file to your local migrations folder
cp supabase/migrations/20250101000000_initial_schema.sql supabase/migrations/

# Apply migrations
supabase db reset
```

## Row Level Security (RLS)

All tables have RLS enabled with policies based on `profiles.company_id`. Users can only access data from their own company.

### Policy Pattern

Each table with `company_id` has four policies:

1. **SELECT**: Users can view records from their company
2. **INSERT**: Users can create records for their company
3. **UPDATE**: Users can modify records from their company
4. **DELETE**: Only owners/admins can delete (varies by table)

### Special Cases

- **Companies**: Users can only see their own company
- **Profiles**: Users can see all profiles in their company, but only edit their own (unless admin/owner)
- **Child tables** (items, phases, etc.): RLS is based on parent table's company_id via JOIN

## User Roles

The `profiles.role` field supports:

- `owner` - Full access, can delete company
- `admin` - Can manage most resources
- `member` - Standard user access
- `worker` - Field worker access

## Next Steps

1. **Apply the schema** using one of the methods above
2. **Set up Supabase Auth** in your Next.js application
3. **Create a trigger** to auto-create profiles when users sign up:

```sql
-- Trigger to create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

4. **Configure your Next.js app** with Supabase client
5. **Implement authentication** and company onboarding flow

## Indexes

Performance indexes are created on:

- Foreign keys (company_id, client_id, chantier_id, etc.)
- Frequently queried fields (status, dates)
- Composite indexes for common queries

## Data Types

- **Currency**: `numeric(12,2)` for monetary values
- **Rates**: `numeric(5,2)` for percentages (TVA)
- **Quantities**: `numeric(12,3)` for material quantities
- **IDs**: `uuid` with `gen_random_uuid()`
- **Timestamps**: `timestamptz` for all dates/times

## Swiss Business Standards

- Default country: `CH` (Switzerland)
- Default locale: `fr-CH` (French-Swiss)
- Default currency: `CHF` (Swiss Franc)
- Default TVA rate: `7.7%` (Swiss standard VAT)

## Support

For questions or issues, please open an issue in the repository.

## License

MIT
