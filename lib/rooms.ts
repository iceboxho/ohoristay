import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type RoomOption = {
  id: string;
  name: string;
  slug: string;
  capacity: number;
};

export async function fetchActiveRooms(): Promise<RoomOption[]> {
  const supabase = await getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, slug, capacity")
    .eq("is_active", true)
    .order("name");

  if (error) {
    throw error;
  }

  return (data ?? []) as RoomOption[];
}
