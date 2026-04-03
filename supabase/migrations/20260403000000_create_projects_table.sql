-- Create projects table
create table if not exists public.projects (
  id text primary key,
  name text not null,
  short_description text,
  problem text,
  type text,
  primary_tech text,
  tech_stack text[],
  features text[],
  architecture text,
  high_level text,
  flows text[],
  data_models text[],
  backend text,
  data_storage text,
  changelog text[],
  links jsonb not null,
  updated_at timestamptz not null default now(),
  is_fork boolean not null default false,
  topics text[]
);

-- Enable Row Level Security (optional but recommended)
alter table public.projects enable row level security;

-- Create policy to allow public read access
create policy "Allow public read access"
  on public.projects
  for select
  using (true);

-- Create policy to allow authenticated upserts (or service role)
-- Note: In a production app, you'd want more restrictive policies.
create policy "Allow all access for authenticated users"
  on public.projects
  for all
  using (auth.role() = 'authenticated');
