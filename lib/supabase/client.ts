import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/database.types";

let browserClient: SupabaseClient<Database> | null = null;
let browserClientPromise: Promise<SupabaseClient<Database>> | null = null;

export class SupabaseConfigurationError extends Error {
  constructor() {
    super("Supabase environment variables are not configured.");
    this.name = "SupabaseConfigurationError";
  }
}

type PublicSupabaseConfig = {
  url?: string;
  anonKey?: string;
};

async function createBrowserClient() {
  const response = await fetch("/api/supabase-config", {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new SupabaseConfigurationError();

  const config = (await response.json()) as PublicSupabaseConfig;
  if (!config.url || !config.anonKey) throw new SupabaseConfigurationError();

  browserClient = createClient<Database>(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
    },
  });

  return browserClient;
}

export async function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  if (!browserClientPromise) {
    browserClientPromise = createBrowserClient().catch((error) => {
      browserClientPromise = null;
      throw error;
    });
  }

  return browserClientPromise;
}
