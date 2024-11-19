import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/supabase';

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: { slug: string };
};

export const getProducts = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)');
  return data || [];
};

export const getProductsByCategory = async ({
  categorySlug,
}: {
  categorySlug: string;
}) => {
  const supabase = await createClient();

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
}: {
  productSlug: string;
  categorySlug: string;
}) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)')
    .match({
      slug: productSlug,
      'categories.slug': categorySlug,
    })
    .limit(1)
    .single();

  return data;
};

export const getProductById = async ({ productId }: { productId: string }) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId);
  return data;
};

export const getPreOwnedProducts = () => {
  return getProductsByCategory({
    categorySlug: 'occasion',
  });
};

export const getNewProducts = async () => {
  const supabase = await createClient();

  const { data } = await supabase
    .from('categories')
    .select(`slug, products(*)`)
    .not('slug', 'in', '(occasion)');

  return (data || []).flatMap((category) => category.products);
};

export const getFeaturedProducts = async () => {
  const supabase = await createClient();
  const { data } = await supabase
    .from('products')
    .select('*, categories(slug)')
    .eq('onHomepage', true);

  return data || [];
};
