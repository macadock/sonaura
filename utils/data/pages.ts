import { Database } from '@/types/supabase';
import { createClient } from '@/lib/supabase/server';
import type { cookies } from 'next/headers';

export type Page = Database['public']['Tables']['pages']['Row'];

export const getPage = async ({
  url,
  cookieStore,
}: {
  url: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);

  return supabase.from('pages').select('*').eq('slug', url).limit(1).single();
};

export const getPageById = async ({
  id,
  cookieStore,
}: {
  id: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);

  return supabase.from('pages').select('*').eq('id', id).limit(1).single();
};

export const getPages = ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
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
