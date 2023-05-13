import supabase from 'lib/supabase';
import { Database } from 'types/supabase';

export type Category = Database['public']['Tables']['categories']['Row'];
export type CreateCategoryInput =
  Database['public']['Tables']['categories']['Insert'];
export type UpdateCategoryInput =
  Database['public']['Tables']['categories']['Update'];

export async function getCategoryBySlug(slug: string) {
  return supabase.from('categories').select('*').eq('slug', slug);
}

export async function getCategories() {
  return supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });
}

export async function createCategory(category: CreateCategoryInput) {
  return supabase.from('categories').insert([category]);
}

export async function updateCategory(category: UpdateCategoryInput) {
  return supabase
    .from('categories')
    .update({
      ...category,
    })
    .eq('id', category.id);
}

export async function removeCategory(id: string) {
  return supabase.from('categories').delete().eq('id', id);
}
