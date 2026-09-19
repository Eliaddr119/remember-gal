-- Manual ordering of stories inside each category.
-- Run once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run.

alter table public.stories
  add column if not exists sort_order integer not null default 0;

-- Existing rows keep the order they already had on the site (by id).
update public.stories set sort_order = id where sort_order = 0;

create index if not exists stories_sort_order_idx
  on public.stories (sort_order, id);
