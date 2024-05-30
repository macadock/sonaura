'use server';

import { redirectUserToPage } from '@/utils/auth/redirect-homepage';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleSignIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/login?message=Identifiants invalides');
  }

  await redirectUserToPage();
};
