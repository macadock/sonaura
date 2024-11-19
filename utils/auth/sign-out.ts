'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const handleSignOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect('/login');
};
