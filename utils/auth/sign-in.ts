'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { websiteUrl } from '@/appConstants';
import { redirect, RedirectType } from 'next/navigation';

export const handleSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${websiteUrl}/auth/callback`,
    },
  });

  // if (error) {
  //   console.error(`Error at login for ${email},`, error);
  //   redirect('/login?message=Erreur de connexion, merci de réessayer');
  // }
  //
  // redirect('/login?message=Email envoyé&email_sent=true');
};
