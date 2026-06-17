import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase env vars are present. When false, the app falls back
 *  to the local placeholder auth so previews keep working. */
export const isSupabaseConfigured = Boolean(url && anonKey);

let browserClient: SupabaseClient | null = null;

/** Returns a singleton browser Supabase client, or null if not configured. */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(url as string, anonKey as string);
  }
  return browserClient;
}
