export type BookingRequest = {
  roomType: string;
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
 * First-version booking adapter. Replace this mock implementation with a
 * server action or route handler backed by Supabase without changing the form.
 */
export async function submitBookingRequest(request: BookingRequest) {
  void request;
  await new Promise((resolve) => setTimeout(resolve, 650));
  return { ok: true as const };
}
