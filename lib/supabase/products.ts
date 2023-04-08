import supabase from 'lib/supabase';
import { getCategoryBySlug } from 'lib/supabase/categories';
import { Database } from 'types/supabase';

export type Product = Database['public']['Tables']['products']['Row'];

export async function getProductById(id: string) {
  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .eq('id', id);
}

export async function getProductsByIds(ids: string[]) {
  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .in('id', ids);
}

export async function getProducts() {
  return supabase.from('products').select(`*, categories ( slug )`);
}

export async function getPreOwnedProducts() {
  const { data } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', 'occasion');

  return supabase
    .from('products')
    .select(`*, categories ( slug )`)
    .eq('categoryId', data[0].id);
}

export async function getProductsByCategory(categoryId: string) {
  return supabase.from('products').select('*').eq('categoryId', categoryId);
}

export async function getProductsBySlugAndCategory(slug, categorySlug: string) {
  const { data } = await getCategoryBySlug(categorySlug);
  return supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('categoryId', data[0].id);
}
