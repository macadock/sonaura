import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';

export interface UseGetProductsProps {
  ids: string[];
}

export const useGetProductsByIds = ({ ids }: UseGetProductsProps) => {
  const supabaseClient = createClient();

  const getProducts = async () => {
    const { data, error } = await supabaseClient
      .from('products')
      .select('*, categories(slug)')
      .in('id', ids);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  return useQuery({
    queryFn: getProducts,
    queryKey: [],
  });
};
