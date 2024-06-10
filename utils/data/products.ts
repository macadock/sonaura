import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];

export const getProducts = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from('products').select('*');
  return data || [];
};

export const getProductsByCategory = async ({
  categorySlug,
  cookieStore,
}: {
  categorySlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('categories')
    .select(`slug, products(*)`)
    .eq('slug', categorySlug)
    .single();

  return data?.products || [];
};

export const getProductBySlug = async ({
  productSlug,
  cookieStore,
}: {
  productSlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('slug', productSlug)
    .single();

  return data;
};

export const getProductById = async ({
  productId,
  cookieStore,
}: {
  productId: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId);
  return data;
};

export const getPreOwnedProducts = ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  return getProductsByCategory({
    categorySlug: 'occasion',
    cookieStore,
  });
};
