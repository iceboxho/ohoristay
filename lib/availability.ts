import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type UnavailableDateRange = {
  checkInDate: string;
  checkOutDate: string;
  bookingStatus: "pending" | "confirmed";
};

type UnavailableDateRow = {
  check_in_date: string;
  check_out_date: string;
  booking_status?: string;
};

export async function fetchUnavailableDateRanges(startDate: string, endDate: string) {
  const supabase = await getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("get_public_unavailable_dates", {
    p_start_date: startDate,
    p_end_date: endDate,
  });

  if (error) throw error;

  return ((data ?? []) as UnavailableDateRow[]).map((range) => ({
    checkInDate: range.check_in_date,
    checkOutDate: range.check_out_date,
    bookingStatus: range.booking_status === "pending" ? "pending" : "confirmed",
  }));
}

export async function checkBookingAvailability(roomId: string, checkInDate: string, checkOutDate: string) {
  const supabase = await getSupabaseBrowserClient();
  const { data, error } = await supabase.rpc("is_booking_date_available", {
    p_room_id: roomId,
    p_check_in_date: checkInDate,
    p_check_out_date: checkOutDate,
  });

  if (error) throw error;
  return data === true;
}
