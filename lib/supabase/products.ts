import supabase from '@/lib/supabase';
import { getCategoryBySlug } from '@/lib/supabase/categories';
import { Database } from '@/types/supabase';
import isEmpty from 'lodash/isEmpty';
import category from '@/components/core/Category';

export type Product = Database['public']['Tables']['products']['Row'] & {
  categories: {
    slug: string;
  };
};
export type CreateProductInput =
  Database['public']['Tables']['products']['Insert'];
export type UpdateProductInput =
  Database['public']['Tables']['products']['Update'] & { id: string };

export async function getProductById(id: string) {
  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .eq('id', id)
    .single();
}

export async function getProductsByIds(ids: string[]) {
  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .order('name', { ascending: true })
    .in('id', ids);
}

export async function getProducts() {
  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .order('name', { ascending: true });
}

export function getPreOwnedProducts() {
  return supabase
    .from('categories')
    .select(`* ( categories ( slug ))`)
    .eq(`( categories (slug) )`, 'occasion')
    .order('name', { ascending: true });
}

export async function getProductsByCategory(categoryId: string) {
  return supabase
    .from('products')
    .select('*')
    .order('price', { ascending: true })
    .eq('categoryId', categoryId);
}

export async function getProductsBySlugAndCategory(
  slug: string,
  categorySlug: string,
) {
  const { data } = await getCategoryBySlug(categorySlug);
  if (!data) return null;
  return supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('categoryId', data?.id)
    .order('name', { ascending: true });
}

export async function createProduct(product: CreateProductInput) {
  return supabase.from('products').insert([product]);
}

export async function updateProduct(
  product: UpdateProductInput & { id: string },
) {
  return supabase
    .from('products')
    .update({
      ...product,
    })
    .eq('id', product.id);
}

export async function removeProduct(id: string) {
  return supabase.from('products').delete().eq('id', id);
}

export async function updateProductVariants(
  productId: string,
  variants: Product['variants'],
) {
  return supabase
    .from('products')
    .update({ variants: variants })
    .eq('id', productId);
}

export async function updateProductVariantsImage(
  productId: string,
  variantsImages: Product['variantsImages'],
) {
  return supabase
    .from('products')
    .update({ variantsImages })
    .eq('id', productId);
}
