import { categories } from '@/app/(marketing)/mocks';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const getCategories = async (
  cookieStore: ReturnType<typeof cookies>,
) => {
  // const supabase = createClient(cookieStore);
  // const { data } = await supabase.from('categories').select('*');
  // return data;
  return categories;
};

export const getCategoryBySlug = async ({
  categorySlug,
  cookieStore,
}: {
  categorySlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  // const supabase = createClient(cookieStore);
  // const { data } = await supabase
  //   .from('categories')
  //   .select('*')
  //   .eq('id', categoryId);
  // return data;
  return categories.find((category) => category.slug === categorySlug);
};
