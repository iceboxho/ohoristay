-- 大濠・捌零壹: show pending booking dates on the public availability calendar.
-- Safe to run in Supabase SQL Editor after the base supabase/schema.sql.

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
