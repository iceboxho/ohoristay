import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type UnavailableDateRange = {
  checkInDate: string;
  checkOutDate: string;
};

type UnavailableDateRow = {
  check_in_date: string;
  check_out_date: string;
};

export async function fetchUnavailableDateRanges(startDate: string, endDate: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("get_public_unavailable_dates", {
    p_start_date: startDate,
    p_end_date: endDate,
  });

  if (error) throw error;

  return ((data ?? []) as UnavailableDateRow[]).map((range) => ({
    checkInDate: range.check_in_date,
    checkOutDate: range.check_out_date,
  }));
}

export async function checkBookingAvailability(roomId: string, checkInDate: string, checkOutDate: string) {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("is_booking_date_available", {
    p_room_id: roomId,
    p_check_in_date: checkInDate,
    p_check_out_date: checkOutDate,
  });

  if (error) throw error;
  return data === true;
}
