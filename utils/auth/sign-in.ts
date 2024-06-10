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

  const urlSearchParams = new URLSearchParams();

  if (error) {
    console.error(`Error at login for ${email},`, error);
    urlSearchParams.append(
      'message',
      'Erreur de connexion, merci de réessayer',
    );
  } else {
    urlSearchParams.append('message', 'Email envoyé');
    urlSearchParams.append('email_sent', 'true');
  }

  redirect(`/login?${urlSearchParams.toString()}`);
};
