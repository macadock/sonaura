import supabase from 'lib/supabase';
import { Database } from 'types/supabase';

export type Shop = Database['public']['Tables']['shops']['Row'];
export type CreateShopInput = Database['public']['Tables']['shops']['Insert'];
export type UpdateShopInput = Database['public']['Tables']['shops']['Update'];

export interface ShopHours {
  friday: Day;
  monday: Day;
  sunday: Day;
  tuesday: Day;
  saturday: Day;
  thursday: Day;
  wednesday: Day;
}

export interface Day {
  morning: OpenClose;
  afternoon: OpenClose;
}

interface OpenClose {
  open: string;
  close: string;
}

export async function getShops() {
  return supabase.from('shops').select('*');
}

export async function createShop(shop: CreateShopInput) {
  return supabase.from('shops').insert([shop]);
}

export async function updateShop(shop: UpdateShopInput) {
  return supabase
    .from('shops')
    .update({
      ...shop,
    })
    .eq('id', shop.id);
}

export async function removeShop(id: string) {
  return supabase.from('shops').delete().eq('id', id);
}
