'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const redirectUserToPage = async () => {
  'use server';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: user } = await supabase
    .from('users')
    .select('role')
    .limit(1)
    .single();

  if (!user) {
    return;
  }

  switch (user.role) {
    case 'ADMIN':
      redirect('/dashboard');
      break;

    default:
      redirect('/');
  }
};
