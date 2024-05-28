import supabase from '@/lib/supabase';
import { pick } from 'lodash';
import { Product } from '@/lib/supabase/products';

export const getProductMainImage = (image: Product['mainImage']): string => {
  const bucket = pick(image, 'bucket');
  const file = pick(image, 'file');

  const { data } = supabase.storage.from(`${bucket}`).getPublicUrl(`${file}`);
  return data.publicUrl;
};
