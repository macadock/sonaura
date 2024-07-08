import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type Store = Database['public']['Tables']['shops']['Row'];

export const getStores = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('shops').select('*');
  return data || [];
};

export const getStoreById = async ({
  cookieStore,
  storeId,
}: {
  cookieStore: ReturnType<typeof cookies>;
  storeId: string;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('shops')
    .select('*')
    .eq('id', storeId)
    .single();
  return data;
};
