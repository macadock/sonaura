'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { websiteUrl } from '@/appConstants';

export const handleSignIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${websiteUrl}/login`,
    },
  });
};
