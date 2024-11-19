import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type Store = Database['public']['Tables']['shops']['Row'];

export const getStores = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from('shops').select('*');
  return data || [];
};

export const getStoreById = async ({ storeId }: { storeId: string }) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('shops')
    .select('*')
    .eq('id', storeId)
    .single();
  return data;
};
