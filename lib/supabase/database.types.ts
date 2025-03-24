import { MergeDeep } from 'type-fest';
import { Database as DatabaseGenerated } from '@/types/supabase';

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        products: {
          Row: {
            mainImage: {
              bucket: string;
              file: string;
            };
            variants: Array<{
              id?: string;
              name: string;
              values: Array<string>;
            }> | null;
            variantsImages: Array<{
              image: {
                bucket: string;
                file: string;
              };
              price?: string;
              variants: Array<{
                name: string;
                value: string;
              }>;
            }> | null;
          };
        };
        installations: {
          Row: {
            images: {
              bucket: string;
              file: string;
            };
          };
        };
      };
    };
  }
>;
