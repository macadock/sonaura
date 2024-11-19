import { InstallationForm } from '@/components/dashboard/Installations/InstallationForm';
import { getInstallationById } from '@/utils/data';

export type EditInstallationPageProps = {
  params: Promise<{ id: string }>;
};

const EditInstallationPage = async ({ params }: EditInstallationPageProps) => {
  const { id } = await params;

  const installation = await getInstallationById({
    installationId: id,
  });

  return <InstallationForm installation={installation} />;
};

export default EditInstallationPage;
