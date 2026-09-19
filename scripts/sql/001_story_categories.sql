-- Story categories: group stories into tabs ("הלוויה", "שנה", ...)
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run.

create table if not exists public.story_categories (
  id bigserial primary key,
  name text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Tabs are rendered in this order; ties fall back to id.
create index if not exists story_categories_sort_order_idx
  on public.story_categories (sort_order, id);

-- Deleting a category leaves its stories in place, uncategorised.
alter table public.stories
  add column if not exists category_id bigint
  references public.story_categories (id) on delete set null;

create index if not exists stories_category_id_idx
  on public.stories (category_id);

-- Public read, writes only through the service-role key (which bypasses RLS).
alter table public.story_categories enable row level security;

drop policy if exists "story_categories public read" on public.story_categories;
create policy "story_categories public read"
  on public.story_categories for select
  to anon, authenticated
  using (true);

-- Starter categories. Rename / reorder / delete them from /admin/stories/categories.
insert into public.story_categories (name, sort_order)
select v.name, v.sort_order
from (values ('הלוויה', 1), ('שנה', 2)) as v(name, sort_order)
where not exists (select 1 from public.story_categories);
