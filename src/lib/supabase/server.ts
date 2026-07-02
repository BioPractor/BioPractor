import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Cliente con la service role key: solo debe usarse en código de servidor
// (Server Components, Server Actions, Route Handlers), nunca en el navegador.
export function getSupabaseAdmin(): SupabaseClient {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      "Faltan las variables de entorno SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY. Revisa el README para configurarlas."
    );
  }

  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
