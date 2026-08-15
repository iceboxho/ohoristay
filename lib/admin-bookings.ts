import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { brand } from "@/lib/site-data";

export const bookingStatusOptions = [
  { value: "pending", label: "待確認" },
  { value: "confirmed", label: "已確認" },
  { value: "cancelled", label: "已取消" },
  { value: "completed", label: "已完成" },
] as const;

export type BookingStatus = (typeof bookingStatusOptions)[number]["value"];

export type AdminBooking = {
  id: string;
  createdAt: string;
  roomName: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  lineId: string | null;
  note: string | null;
  status: BookingStatus;
};

type BookingRow = {
  id: string;
  created_at: string;
  check_in_date: string;
  check_out_date: string;
  guests: number;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  line_id: string | null;
  note: string | null;
  status: BookingStatus;
  rooms: { name: string } | { name: string }[] | null;
};

function roomName(rooms: BookingRow["rooms"]) {
  const name = Array.isArray(rooms) ? rooms[0]?.name : rooms?.name;
  if (!name) return "房型已移除";
  return name === "Ohori Stay 2LDK" ? brand.roomName : name;
}

export async function fetchAdminBookings(): Promise<AdminBooking[]> {
  const supabase = await getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, created_at, check_in_date, check_out_date, guests, customer_name, customer_phone, customer_email, line_id, note, status, rooms(name)",
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return ((data ?? []) as BookingRow[]).map((booking) => ({
    id: booking.id,
    createdAt: booking.created_at,
    roomName: roomName(booking.rooms),
    checkInDate: booking.check_in_date,
    checkOutDate: booking.check_out_date,
    guests: booking.guests,
    customerName: booking.customer_name,
    customerPhone: booking.customer_phone,
    customerEmail: booking.customer_email,
    lineId: booking.line_id,
    note: booking.note,
    status: booking.status,
  }));
}

export async function updateAdminBookingStatus(id: string, status: BookingStatus) {
  const supabase = await getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select("id, status")
    .single();

  if (error) throw error;
  return data as { id: string; status: BookingStatus };
}
