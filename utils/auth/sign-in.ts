'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { websiteUrl } from '@/appConstants';
import { redirect } from 'next/navigation';

export const handleSignIn = async (formData: FormData) => {
  'use server';

  const email = formData.get('email') as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${websiteUrl}/login`,
    },
  });

  if (error) {
    redirect('/login?message=Erreur de connexion, merci de réessayer');
    console.error(`Error at login for ${email},`, error);
  }

  redirect('/login?message=Email envoyé&email_sent=true');
};
