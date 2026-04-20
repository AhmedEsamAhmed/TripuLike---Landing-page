create extension if not exists pgcrypto;

-- Keep demo data table, but do not use it for landing logic.
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  is_done boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.hero_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  wants_advance_booking boolean not null,
  importance_rating int not null check (importance_rating between 1 and 10),
  created_at timestamptz not null default now()
);

create table if not exists public.waitlist_submissions (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists public.feedback_responses (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  would_use_platform text not null,
  likes_about_idea text,
  value_seen_in_platform text,
  trust_improvement text,
  concerns text,
  created_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  event_name text not null,
  event_value text,
  page text,
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_submissions_email_key on public.waitlist_submissions (email);
create index if not exists idx_todos_created_at on public.todos (created_at desc);
create index if not exists idx_hero_responses_created_at on public.hero_responses (created_at desc);
create index if not exists idx_waitlist_submissions_created_at on public.waitlist_submissions (created_at desc);
create index if not exists idx_feedback_responses_created_at on public.feedback_responses (created_at desc);
create index if not exists idx_analytics_events_created_at on public.analytics_events (created_at desc);
create index if not exists idx_analytics_events_session_id on public.analytics_events (session_id);

alter table public.todos enable row level security;
alter table public.hero_responses enable row level security;
alter table public.waitlist_submissions enable row level security;
alter table public.feedback_responses enable row level security;
alter table public.analytics_events enable row level security;

-- todos policies
drop policy if exists "Public can read todos" on public.todos;
create policy "Public can read todos"
on public.todos
for select
to anon, authenticated
using (true);

-- hero responses policies
drop policy if exists "Public can insert hero responses" on public.hero_responses;
create policy "Public can insert hero responses"
on public.hero_responses
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read hero responses" on public.hero_responses;
create policy "Authenticated can read hero responses"
on public.hero_responses
for select
to authenticated
using (true);

-- waitlist policies
drop policy if exists "Public can join waitlist" on public.waitlist_submissions;
create policy "Public can join waitlist"
on public.waitlist_submissions
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read waitlist submissions" on public.waitlist_submissions;
create policy "Authenticated can read waitlist submissions"
on public.waitlist_submissions
for select
to authenticated
using (true);

-- feedback policies
drop policy if exists "Public can insert feedback responses" on public.feedback_responses;
create policy "Public can insert feedback responses"
on public.feedback_responses
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read feedback responses" on public.feedback_responses;
create policy "Authenticated can read feedback responses"
on public.feedback_responses
for select
to authenticated
using (true);

-- analytics policies
drop policy if exists "Public can insert analytics events" on public.analytics_events;
create policy "Public can insert analytics events"
on public.analytics_events
for insert
to anon, authenticated
with check (true);

drop policy if exists "Authenticated can read analytics events" on public.analytics_events;
create policy "Authenticated can read analytics events"
on public.analytics_events
for select
to authenticated
using (true);
