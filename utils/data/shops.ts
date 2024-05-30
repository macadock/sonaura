import { cookies } from 'next/headers';
import { shops } from '@/app/(marketing)/mocks';

export const getShops = async (cookieStore: ReturnType<typeof cookies>) => {
  // const supabase = createClient(cookiesStore);
  // const { data } = await supabase.from('installations').select('*');
  // return data;
  return shops;
};