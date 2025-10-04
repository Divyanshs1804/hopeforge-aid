-- Enable pgvector extension for semantic search
create extension if not exists vector;

-- Children table
create table public.children (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  gender text,
  blood_group text,
  allergies text[],
  chronic_conditions text[],
  height_cm decimal,
  weight_kg decimal,
  vaccine_status text,
  vaccines_due text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Health reports table
create table public.health_reports (
  id uuid primary key default gen_random_uuid(),
  child_id uuid references public.children(id) on delete cascade not null,
  file_url text,
  file_name text,
  report_type text,
  report_date date,
  processed boolean default false,
  created_at timestamptz default now()
);

-- Document chunks table
create table public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  report_id uuid references public.health_reports(id) on delete cascade,
  child_id uuid references public.children(id) on delete cascade,
  chunk_text text not null,
  chunk_index integer,
  metadata jsonb,
  created_at timestamptz default now()
);

-- Health embeddings table with vector
create table public.health_embeddings (
  id uuid primary key default gen_random_uuid(),
  chunk_id uuid references public.document_chunks(id) on delete cascade not null,
  embedding vector(1536),
  metadata jsonb,
  created_at timestamptz default now()
);

-- Queries log table for conversation history
create table public.queries_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  child_id uuid references public.children(id),
  query_text text not null,
  response_text text,
  context_chunks jsonb,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.children enable row level security;
alter table public.health_reports enable row level security;
alter table public.document_chunks enable row level security;
alter table public.health_embeddings enable row level security;
alter table public.queries_log enable row level security;

-- RLS Policies (public access for demo, can be restricted with auth later)
create policy "Allow all access to children" on public.children for all using (true);
create policy "Allow all access to health_reports" on public.health_reports for all using (true);
create policy "Allow all access to document_chunks" on public.document_chunks for all using (true);
create policy "Allow all access to health_embeddings" on public.health_embeddings for all using (true);
create policy "Allow all access to queries_log" on public.queries_log for all using (true);

-- Create indexes for performance
create index idx_health_reports_child_id on public.health_reports(child_id);
create index idx_document_chunks_report_id on public.document_chunks(report_id);
create index idx_document_chunks_child_id on public.document_chunks(child_id);
create index idx_health_embeddings_chunk_id on public.health_embeddings(chunk_id);
create index idx_queries_log_child_id on public.queries_log(child_id);

-- Vector similarity search index (IVFFlat for fast approximate search)
create index on public.health_embeddings using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Trigger for updated_at
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_children_updated_at
before update on public.children
for each row execute function public.update_updated_at_column();