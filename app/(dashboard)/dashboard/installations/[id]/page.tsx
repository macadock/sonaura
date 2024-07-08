import { InstallationForm } from '@/components/dashboard/Installations/InstallationForm';
import { getInstallationById } from '@/utils/data';
import { cookies } from 'next/headers';

export type EditInstallationPageProps = {
  params: { id: string };
};

const EditInstallationPage = async ({ params }: EditInstallationPageProps) => {
  const cookieStore = cookies();

  const installation = await getInstallationById({
    cookieStore,
    installationId: params.id,
  });

  return <InstallationForm installation={installation} />;
};

export default EditInstallationPage;
