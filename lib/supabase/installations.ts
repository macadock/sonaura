import supabase from 'lib/supabase';
import { Database } from 'types/supabase';

export type Installation = Database['public']['Tables']['installations']['Row'];

export async function getInstallations() {
  return supabase.from('installations').select('*');
}
