import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: { slug: string };
};

export const getProducts = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)');
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

  return (
    data?.products.map((product) => {
      return {
        ...product,
        categories: { slug: categorySlug },
      };
    }) || []
  );
};

export const getProductBySlugAndCategorySlug = async ({
  productSlug,
  categorySlug,
  cookieStore,
}: {
  productSlug: string;
  categorySlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)')
    .eq('slug', productSlug)
    .eq('categories.slug', categorySlug)
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

export const getNewProducts = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('categories')
    .select(`slug, products(*)`)
    .not('slug', 'in', '(occasion)');

  return (data || []).flatMap((category) => category.products);
};

export const getFeaturedProducts = async ({
  cookieStore,
}: {
  cookieStore: ReturnType<typeof cookies>;
}) => {
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)')
    .eq('onHomepage', true);

  return data || [];
};
