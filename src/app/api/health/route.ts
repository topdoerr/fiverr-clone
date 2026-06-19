import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    ok: true,
    auth: isSupabaseConfigured ? "supabase" : "local-fallback",
    supabaseConfigured: isSupabaseConfigured,
  });
}
