import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type Shop = Database['public']['Tables']['shops']['Row'];

export const getShops = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('installations').select('*');
  return data || [];
};
