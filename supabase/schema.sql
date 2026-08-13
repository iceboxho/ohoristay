-- Ohori Stay Supabase schema
-- Run this file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  capacity integer not null check (capacity > 0),
  weekday_price integer check (weekday_price is null or weekday_price >= 0),
  holiday_price integer check (holiday_price is null or holiday_price >= 0),
  extra_person_price integer check (extra_person_price is null or extra_person_price >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  room_id uuid references public.rooms(id),
  check_in_date date not null,
  check_out_date date not null,
  guests integer not null check (guests > 0),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  line_id text,
  note text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bookings_valid_date_range check (check_out_date > check_in_date)
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  site_name text,
  phone text,
  email text,
  line_url text,
  facebook_url text,
  instagram_url text,
  address text,
  google_map_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Keep updated_at in sync whenever a row is updated.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists rooms_set_updated_at on public.rooms;
create trigger rooms_set_updated_at
before update on public.rooms
for each row execute function public.set_updated_at();

drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at
before update on public.bookings
for each row execute function public.set_updated_at();

drop trigger if exists news_set_updated_at on public.news;
create trigger news_set_updated_at
before update on public.news
for each row execute function public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

-- Helpful indexes for future room, booking, and news queries.
create index if not exists bookings_room_id_idx on public.bookings(room_id);
create index if not exists bookings_check_in_date_idx on public.bookings(check_in_date);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists news_published_at_idx on public.news(published_at desc);

-- Enable Row Level Security on every public table.
alter table public.rooms enable row level security;
alter table public.bookings enable row level security;
alter table public.news enable row level security;
alter table public.site_settings enable row level security;

-- Recreate policies so the script can be safely run again.
drop policy if exists "Public can view active rooms" on public.rooms;
create policy "Public can view active rooms"
on public.rooms
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can view published news" on public.news;
create policy "Public can view published news"
on public.news
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Public can create pending bookings" on public.bookings;
create policy "Public can create pending bookings"
on public.bookings
for insert
to anon, authenticated
with check (status = 'pending');

-- Apply minimum API privileges. There is deliberately no public SELECT grant
-- or SELECT policy for bookings, and no public policy for site_settings.
revoke all on table public.rooms from anon, authenticated;
revoke all on table public.bookings from anon, authenticated;
revoke all on table public.news from anon, authenticated;
revoke all on table public.site_settings from anon, authenticated;

grant select on table public.rooms to anon, authenticated;
grant select on table public.news to anon, authenticated;
grant insert (
  room_id,
  check_in_date,
  check_out_date,
  guests,
  customer_name,
  customer_phone,
  customer_email,
  line_id,
  note
) on table public.bookings to anon, authenticated;

-- Ohori Stay sample room data. Existing rows with the same slug are updated.
insert into public.rooms (
  name,
  slug,
  description,
  capacity,
  weekday_price,
  holiday_price,
  extra_person_price,
  image_url,
  is_active
)
values
  (
    'KINARI Studio',
    'kinari-studio',
    '留白剛好的兩人小宅，適合情侶或個人旅居。',
    2,
    12800,
    15800,
    2000,
    null,
    true
  ),
  (
    'NAGI Family',
    'nagi-family',
    '讓家人也能慢慢住下來的寬敞房型，最多入住四人。',
    4,
    18600,
    22800,
    2500,
    null,
    true
  ),
  (
    'TSUKI Corner',
    'tsuki-corner',
    '擁有轉角採光與閱讀沙發，適合一至三人入住。',
    3,
    15200,
    18800,
    2000,
    null,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  capacity = excluded.capacity,
  weekday_price = excluded.weekday_price,
  holiday_price = excluded.holiday_price,
  extra_person_price = excluded.extra_person_price,
  image_url = excluded.image_url,
  is_active = excluded.is_active;
