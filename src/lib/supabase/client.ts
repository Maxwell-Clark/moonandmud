import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;
let supabaseAdminInstance: SupabaseClient | null = null;

function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || '';
}

function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
}

function getSupabaseServiceKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY || '';
}

// Client for public operations (uses anon key)
export function getSupabase(): SupabaseClient {
  if (!supabaseInstance) {
    const url = getSupabaseUrl();
    const key = getSupabaseAnonKey();
    if (!url || !key) {
      throw new Error('Supabase is not configured');
    }
    supabaseInstance = createClient(url, key);
  }
  return supabaseInstance;
}

// Admin client for server-side operations (uses service role key)
export function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdminInstance) {
    const url = getSupabaseUrl();
    const key = getSupabaseServiceKey();
    if (!url || !key) {
      throw new Error('Supabase is not configured');
    }
    supabaseAdminInstance = createClient(url, key);
  }
  return supabaseAdminInstance;
}

// For backwards compatibility - these will throw if not configured
export const supabase = {
  get from() { return getSupabase().from.bind(getSupabase()); },
  get storage() { return getSupabase().storage; },
};

export const supabaseAdmin = {
  get from() { return getSupabaseAdmin().from.bind(getSupabaseAdmin()); },
  get storage() { return getSupabaseAdmin().storage; },
};

export type DbProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  description: string;
  images: string[];
  featured: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
};
