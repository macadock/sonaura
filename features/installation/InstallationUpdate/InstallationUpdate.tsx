import {
  getInstallationById,
  getProductById,
  getProductBySlugAndCategorySlug,
} from '@/utils/data';
import { redirect } from 'next/navigation';
import { InstallationForm } from '@/features/installation/InstallationCreation/Form/form';
import { createClient } from '@/lib/supabase/server';

export type InstallationUpdateProps = {
  id: string;
};

export const InstallationUpdate = async ({ id }: InstallationUpdateProps) => {
  if (!id) {
    redirect('/dashboard/installations');
  }

  const installation = await getInstallationById({
    installationId: id,
  });

  if (!installation) {
    redirect('/dashboard/installations');
  }

  return <InstallationForm installation={installation} />;
};
