// Since we're using Drizzle directly with the DATABASE_URL from Supabase,
// we don't need the Supabase client. All database operations go through
// our API routes which use the storage interface.

// This file exists for potential future Supabase-specific functionality
// like file storage, auth, or real-time subscriptions.

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// For now, we'll use our API routes for all data operations
export const apiBaseUrl = "/api";
