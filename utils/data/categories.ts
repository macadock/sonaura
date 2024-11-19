import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export type Category = Database['public']['Tables']['categories']['Row'];

export const getCategories = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from('categories').select('*');
  return data || [];
};

export const getCategoryBySlug = async ({
  categorySlug,
}: {
  categorySlug: string;
}) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', categorySlug)
    .single();
  return data;
};

export const getCategoryById = async ({
  categoryId,
}: {
  categoryId: string;
}) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('id', categoryId)
    .single();
  return data;
};
