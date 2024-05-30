import { Database } from '@/types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { type cookies } from 'next/headers';

export function createClient(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
}

export const getUser = async (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  return data;
};

export const getUserRole = async (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();

  if (!data || !data.user) {
    return undefined;
  }

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', data.user.id)
    .limit(1)
    .single();
  return user?.role;
};

export type Roles = Database['public']['Enums']['user_role'];
