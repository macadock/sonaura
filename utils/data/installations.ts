import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export const getInstallations = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('installations').select('*');
  return data;
};

export const getInstallationById = async ({
  installationId,
  cookieStore,
}: {
  installationId: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('installations')
    .select('*')
    .eq('id', installationId)
    .single();
  return data;
};

export type Installation = Database['public']['Tables']['installations']['Row'];
