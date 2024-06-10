import supabase from '@/lib/supabase';
import { pick } from 'lodash';
import { Json } from '@/types/supabase';

export const getImageUrl = (image?: Json): string => {
  if (!image) {
    return '';
  }

  const { bucket, file } = pick(image, ['bucket', 'file']) as unknown as {
    bucket: string;
    file: string;
  };
  const { data } = supabase.storage.from(bucket).getPublicUrl(file);

  return data ? data.publicUrl : '';
};
