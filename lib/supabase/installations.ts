import supabase from '@/lib/supabase';
import { Database } from '@/types/supabase';

export type Installation = Database['public']['Tables']['installations']['Row'];
export type CreateInstallationInput =
  Database['public']['Tables']['installations']['Insert'];
export type UpdateInstallationInput =
  Database['public']['Tables']['installations']['Update'];

export async function getInstallations() {
  return supabase
    .from('installations')
    .select('*')
    .order('created_at', { ascending: false });
}

export async function getInstallationById(id: string) {
  return supabase.from('installations').select('*').eq('id', id).single();
}

export async function createInstallation(
  installation: CreateInstallationInput,
) {
  return supabase.from('installations').insert([installation]);
}

export async function updateInstallation(
  installation: UpdateInstallationInput,
) {
  return supabase
    .from('installations')
    .update({
      ...installation,
    })
    .eq('id', installation.id);
}

export async function removeInstallation(id: string) {
  return supabase.from('installations').delete().eq('id', id);
}
