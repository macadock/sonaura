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
          };
        };
      };
    };
  }
>;
