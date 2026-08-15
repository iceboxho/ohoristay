import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return Response.json(
      { ok: false, message: "Supabase is not configured." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  const supabase = createClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });

  const { error } = await supabase
    .from("rooms")
    .select("id")
    .eq("is_active", true)
    .limit(1);

  if (error) {
    return Response.json(
      { ok: false, message: "Supabase health check failed." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(
    { ok: true, checkedAt: new Date().toISOString() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
