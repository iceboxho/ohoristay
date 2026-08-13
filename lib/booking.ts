import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type BookingRequest = {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  phone: string;
  email: string;
  lineId?: string;
  notes?: string;
};

/**
 * Insert a public booking request. RLS allows the anonymous client to insert
 * only; status is intentionally omitted so PostgreSQL applies `pending`.
 */
export async function submitBookingRequest(request: BookingRequest) {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from("bookings").insert({
    room_id: request.roomId,
    check_in_date: request.checkIn,
    check_out_date: request.checkOut,
    guests: request.guests,
    customer_name: request.name,
    customer_phone: request.phone,
    customer_email: request.email || null,
    line_id: request.lineId || null,
    note: request.notes || null,
  });

  if (error) {
    throw error;
  }

  return { ok: true as const };
}
