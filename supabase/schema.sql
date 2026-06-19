-- TopDoerr buyer portal — Supabase schema
-- Run in the Supabase SQL editor. Safe to re-run.
-- Auth is handled by Supabase Auth (auth.users). These tables hold buyer data
-- with row-level security so buyers only ever see their own records.

-- ---------------------------------------------------------------- profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'buyer' check (role in ('buyer', 'admin', 'internal')),
  created_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  website text,
  industry text,
  size text,
  location text,
  tools text[] default '{}',
  goals text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  company_id uuid references public.companies (id) on delete set null,
  title text not null,
  category text,
  package_name text,
  status text not null default 'Submitted',
  description text,
  budget_range text,
  timeline text,
  assigned_pod jsonb default '[]',
  progress int not null default 0,
  current_milestone text,
  start_date text,
  due_date text,
  milestones jsonb default '[]',
  deliverables jsonb default '[]',
  client_actions jsonb default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.briefs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete cascade,
  project_type text,
  title text,
  problem text,
  desired_outcome text,
  audience text,
  current_process text,
  tools text[] default '{}',
  files text[] default '{}',
  budget_range text,
  timeline text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  sender_type text not null check (sender_type in ('buyer', 'topdoerr')),
  sender_name text,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  type text,
  size text,
  uploaded_by text not null default 'buyer',
  url text,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  package_name text,
  amount numeric not null default 0,
  status text not null default 'draft' check (status in ('draft','sent','paid','overdue')),
  due_date text,
  paid_at timestamptz
);

-- ------------------------------------------------------------- RLS policies
alter table public.profiles  enable row level security;
alter table public.companies enable row level security;
alter table public.projects  enable row level security;
alter table public.briefs     enable row level security;
alter table public.messages  enable row level security;
alter table public.files      enable row level security;
alter table public.invoices  enable row level security;

-- Profiles: a user can read/update only their own profile.
drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Generic owner policy for the rest (buyers only see their own rows).
do $$
declare t text;
begin
  foreach t in array array['companies','projects','briefs','messages','files','invoices']
  loop
    execute format('drop policy if exists "owner access" on public.%I;', t);
    execute format(
      'create policy "owner access" on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id);',
      t
    );
  end loop;
end $$;

-- ------------------------------------------ auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, phone, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'phone', ''),
    'buyer'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
