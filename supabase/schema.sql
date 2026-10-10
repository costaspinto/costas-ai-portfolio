create extension if not exists pgcrypto;

create table if not exists public.profile (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null default 'costas',
  full_name text not null default 'Costas Pinto',
  headline text not null default '',
  summary text not null default '',
  location text not null default '',
  email text,
  linkedin_url text,
  github_url text,
  resume_path text,
  is_published boolean not null default true,
  source text not null default 'manual',
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null default 'AI/ML',
  description text not null default '',
  technologies text[] not null default '{}',
  repository_url text,
  demo_url text,
  image_path text,
  featured boolean not null default false,
  is_published boolean not null default false,
  source text not null default 'manual',
  source_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  organization text not null,
  role text not null,
  description text not null default '',
  start_date date,
  end_date date,
  is_current boolean not null default false,
  is_published boolean not null default false,
  source text not null default 'manual',
  source_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  qualification text not null,
  field_of_study text,
  start_date date,
  end_date date,
  description text,
  is_published boolean not null default true,
  source text not null default 'manual',
  source_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  category text not null default 'Technical',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  source text not null default 'manual',
  updated_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null default '',
  credential_url text,
  issued_at date,
  expires_at date,
  is_published boolean not null default false,
  source text not null default 'manual',
  source_id text,
  updated_at timestamptz not null default now()
);

create table if not exists public.social_posts (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_post_id text not null,
  post_url text,
  content text not null default '',
  published_at timestamptz,
  is_published boolean not null default false,
  imported_at timestamptz not null default now(),
  unique(provider, provider_post_id)
);

create table if not exists public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  status text not null,
  records_seen integer not null default 0,
  records_changed integer not null default 0,
  message text,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create table if not exists public.chat_feedback (
  id uuid primary key default gen_random_uuid(),
  session_hash text,
  rating smallint check (rating between 1 and 5),
  feedback text,
  created_at timestamptz not null default now()
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.experiences enable row level security;
alter table public.education enable row level security;
alter table public.skills enable row level security;
alter table public.certifications enable row level security;
alter table public.social_posts enable row level security;
alter table public.sync_runs enable row level security;
alter table public.chat_feedback enable row level security;

-- Public users can only read published portfolio content.
create policy "public read published profile" on public.profile for select using (is_published = true);
create policy "public read published projects" on public.projects for select using (is_published = true);
create policy "public read published experiences" on public.experiences for select using (is_published = true);
create policy "public read published education" on public.education for select using (is_published = true);
create policy "public read published skills" on public.skills for select using (is_published = true);
create policy "public read published certifications" on public.certifications for select using (is_published = true);
create policy "public read published posts" on public.social_posts for select using (is_published = true);

-- Admin write access must be implemented with a server-side authorization check and
-- an explicit admin-only database policy before adding any CRUD operations.
-- Do not grant public insert/update/delete access. Service-role keys stay server-only.
