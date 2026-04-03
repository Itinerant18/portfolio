-- Create projects table
create table if not exists public.projects (
  id text primary key,
  name text not null,
  short_description text,
  why text,
  problem text,
  type text,
  primary_tech text,
  tech_stack text[],
  tech_groups jsonb,
  features text[],
  architecture text,
  high_level text,
  flows text[],
  data_models text[],
  backend text,
  data_storage text,
  changelog jsonb,
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

-- Create policy to allow anon upserts (for background sync)
-- Note: In a production app, you should use a Service Role key instead.
create policy "Allow anon upserts"
  on public.projects
  for all
  using (true)
  with check (true);
