import { categories, products } from '@/app/(marketing)/mocks';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const getProducts = async (cookieStore: ReturnType<typeof cookies>) => {
  // const supabase = createClient(cookiesStore);
  // const { data } = await supabase.from('products').select('*');
  // return data;
  return products;
};

export const getProductsByCategory = async ({
  categorySlug,
  cookieStore,
}: {
  categorySlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  // const supabase = createClient(cookiesStore);
  // const { data } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('category', category);
  // return data;
  const category = categories.find(
    (category) => category.slug === categorySlug,
  );
  return products.filter((product) => product.categoryId === category?.id);
};

export const getProductBySlug = async ({
  productSlug,
  cookieStore,
}: {
  productSlug: string;
  cookieStore: ReturnType<typeof cookies>;
}) => {
  // const supabase = createClient(cookiesStore);
  // const { data } = await supabase
  //   .from('products')
  //   .select('*')
  //   .eq('slug', productSlug);
  // return data;
  return products.find((product) => product.slug === productSlug);
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

export const getPreOwnedProducts = async (
  cookieStore: ReturnType<typeof cookies>,
) => {
  const category = categories.find((category) => category.slug === 'occasions');
  return (
    products.filter((product) => product.categoryId === category?.id) || []
  );
};
