import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export const getInstallations = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from('installations').select('*');
  return data || [];
};

export const getInstallationById = async ({
  installationId,
}: {
  installationId: string;
}) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('installations')
    .select('*')
    .eq('id', installationId)
    .single();
  return data;
};

export type Installation = Database['public']['Tables']['installations']['Row'];
