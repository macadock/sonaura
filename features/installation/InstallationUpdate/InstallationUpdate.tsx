import {
  getInstallationById,
  getProductById,
  getProductBySlug,
} from '@/utils/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { InstallationForm } from '@/features/installation/InstallationCreation/Form/form';
import { createClient } from '@/lib/supabase/server';

export type InstallationUpdateProps = {
  id: string;
};

export const InstallationUpdate = async ({ id }: InstallationUpdateProps) => {
  if (!id) {
    redirect('/dashboard/installations');
  }

  console.log(id);

  const cookieStore = cookies();

  const installation = await getInstallationById({
    installationId: id,
    cookieStore,
  });

  if (!installation) {
    redirect('/dashboard/installations');
  }

  return <InstallationForm installation={installation} />;
};
