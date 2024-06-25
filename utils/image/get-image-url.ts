import supabase from '@/lib/supabase';
import { pick } from 'lodash';
import { Json } from '@/types/supabase';

export type GetImageUrlOptions = {
  quality?: number;
  width?: number;
  height?: number;
};

export const getImageUrl = (
  image: Json | undefined | null,
  options?: GetImageUrlOptions,
): string => {
  if (!image) {
    return '';
  }

  const { bucket, file } = pick(image, ['bucket', 'file']) as unknown as {
    bucket: string;
    file: string;
  };
  const { data } = supabase.storage.from(bucket).getPublicUrl(file, {
    transform: {
      quality: 75,
      width: 1920,
      ...options,
    },
  });

  return data ? data.publicUrl : '';
};
