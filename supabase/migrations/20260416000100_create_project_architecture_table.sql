create table if not exists public.project_architecture (
  repo_name text primary key,
  source text not null default 'readme_auto' check (source in ('readme_auto', 'manual_override')),
  confidence text not null default 'low' check (confidence in ('high', 'medium', 'low')),
  problem text,
  architecture text,
  high_level text,
  visual_flow jsonb,
  mermaid_diagrams jsonb,
  flows text[],
  data_models text[],
  backend text,
  data_storage text,
  live_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.project_architecture drop constraint if exists project_architecture_pkey;
alter table public.project_architecture add primary key (repo_name, source);

create index if not exists idx_project_architecture_source
  on public.project_architecture(source);

create index if not exists idx_project_architecture_confidence
  on public.project_architecture(confidence);

alter table public.project_architecture enable row level security;

drop policy if exists "Allow public read access project_architecture" on public.project_architecture;
create policy "Allow public read access project_architecture"
  on public.project_architecture
  for select
  using (true);
