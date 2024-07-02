import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export type Category = Database['public']['Tables']['categories']['Row'];

export const getCategories = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('categories').select('*');
  return data || [];
};

export const getCategoryBySlug = async ({
  categorySlug,
  cookieStore,
}: {
  categorySlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();
  return data;
};

export const getCategoryById = async ({
  categoryId,
  cookieStore,
}: {
  categoryId: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();
  return data;
};
