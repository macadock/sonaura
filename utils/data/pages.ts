import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';

export type Page = Database['public']['Tables']['pages']['Row'];

export const getPage = async ({ url }: { url: string }) => {
  const supabase = await createClient();

  return supabase.from('pages').select('*').eq('slug', url).limit(1).single();
};

export const getPageById = async ({ id }: { id: string }) => {
  const supabase = await createClient();

  return supabase.from('pages').select('*').eq('id', id).limit(1).single();
};

export const getPages = async () => {
  const supabase = await createClient();
  return supabase.from('pages').select('*');
};
export type Image = {
  url: string;
  alt: string;
};

export type Button = {
  label: string;
  href: string;
};

export type Video = {
  url: string;
  poster: string;
};
