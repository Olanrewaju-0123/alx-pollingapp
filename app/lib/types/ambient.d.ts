declare module "@supabase/supabase-js" {
  export function createClient<T = any>(
    supabaseUrl: string,
    supabaseKey: string,
    options?: any
  ): T;
}
