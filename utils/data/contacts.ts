import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';

export const getContacts = async () => {
  const supabase = await createClient();
  return supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false });
};

export type Contact = Database['public']['Tables']['contacts']['Row'];
