import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase credentials missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variables.",
  );
}

// Client-side client (uses anon key, subject to RLS)
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || "",
);

/**
 * Server-side client (uses service role key if available, bypasses RLS)
 * Use this only in API routes or Server Actions.
 */
export function getSupabaseServerClient() {
  return createClient(
    supabaseUrl || "",
    supabaseServiceKey || supabaseAnonKey || "",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
