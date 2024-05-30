import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';
import type { cookies } from 'next/headers';

export const getContacts = (cookieStore: ReturnType<typeof cookies>) => {
  const supabase = createClient(cookieStore);
  return supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
};

export type Contact = Database['public']['Tables']['contacts']['Row'];
