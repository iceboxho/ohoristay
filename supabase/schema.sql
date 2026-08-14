-- Ohori Stay Supabase schema
-- Run this file in Supabase Dashboard > SQL Editor.

create extension if not exists pgcrypto;
create extension if not exists btree_gist;

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

-- Ohori Stay is one whole 2LDK that accepts 1 to 6 guests per booking.
-- The named constraint is recreated so existing projects can safely adopt it.
alter table public.bookings drop constraint if exists bookings_guests_limit;
alter table public.bookings
  add constraint bookings_guests_limit check (guests between 1 and 6);

-- A confirmed stay may never overlap another confirmed stay for the same unit.
-- Pending requests may overlap until an administrator confirms one of them.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'bookings_no_confirmed_overlap'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_no_confirmed_overlap
      exclude using gist (
        room_id with =,
        daterange(check_in_date, check_out_date, '[)') with &&
      )
      where (status = 'confirmed');
  end if;
end;
$$;

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

-- Only Supabase Auth users listed here can use the booking admin page.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
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
alter table public.admin_users enable row level security;

-- Security-definer helper keeps the admin allowlist private while allowing
-- authenticated RLS policies to verify the current Supabase Auth user.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select auth.uid() is not null
    and exists (
      select 1
      from public.admin_users
      where user_id = auth.uid()
    );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Public availability API. It returns dates and public-facing status only;
-- it never exposes guest names, contact details, notes, or booking IDs.
drop function if exists public.get_public_unavailable_dates(date, date);
create or replace function public.get_public_unavailable_dates(
  p_start_date date,
  p_end_date date
)
returns table (
  check_in_date date,
  check_out_date date,
  booking_status text
)
language sql
stable
security definer
set search_path = ''
as $$
  select b.check_in_date, b.check_out_date, b.status as booking_status
  from public.bookings as b
  join public.rooms as r on r.id = b.room_id
  where r.is_active = true
    and b.status in ('pending', 'confirmed')
    and b.check_in_date < p_end_date
    and b.check_out_date > p_start_date
  order by b.check_in_date, b.status;
$$;

create or replace function public.is_booking_date_available(
  p_room_id uuid,
  p_check_in_date date,
  p_check_out_date date
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select p_check_out_date > p_check_in_date
    and not exists (
      select 1
      from public.bookings as b
      where b.room_id = p_room_id
        and b.status in ('pending', 'confirmed')
        and daterange(b.check_in_date, b.check_out_date, '[)')
          && daterange(p_check_in_date, p_check_out_date, '[)')
    );
$$;

revoke all on function public.get_public_unavailable_dates(date, date) from public;
revoke all on function public.is_booking_date_available(uuid, date, date) from public;
grant execute on function public.get_public_unavailable_dates(date, date) to anon, authenticated;
grant execute on function public.is_booking_date_available(uuid, date, date) to anon, authenticated;

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

drop policy if exists "Admins can view all rooms" on public.rooms;
create policy "Admins can view all rooms"
on public.rooms
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can view bookings" on public.bookings;
create policy "Admins can view bookings"
on public.bookings
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can update booking status" on public.bookings;
create policy "Admins can update booking status"
on public.bookings
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Apply minimum API privileges. There is deliberately no public SELECT grant
-- or SELECT policy for bookings, and no public policy for site_settings.
revoke all on table public.rooms from anon, authenticated;
revoke all on table public.bookings from anon, authenticated;
revoke all on table public.news from anon, authenticated;
revoke all on table public.site_settings from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;

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
grant select on table public.bookings to authenticated;
grant update (status) on table public.bookings to authenticated;

-- Ohori Stay is sold as one whole 2LDK, never as separate room inventory.
-- Existing demo room rows are kept for booking history but deactivated.
update public.rooms
set is_active = false
where slug in ('kinari-studio', 'nagi-family', 'tsuki-corner');

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
    'Ohori Stay 2LDK',
    'ohori-stay-2ldk',
    '福岡大濠一帶的整套 2LDK，一次只接待一組旅客，最多入住六人。',
    6,
    null,
    null,
    null,
    '/ohori-living-dining.png',
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
