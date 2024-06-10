import { InstallationUpdate } from '@/features/installation';

export type InstallationUpdatePageProps = {
  params: { id: string };
};

const InstallationUpdatePage = async ({
  params,
}: InstallationUpdatePageProps) => {
  return <InstallationUpdate id={params.id} />;
};

export default InstallationUpdatePage;
