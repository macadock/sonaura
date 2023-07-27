import { GetServerSideProps, NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardEditInstallationView from 'views/Dashboard/Installations/DashboardEditInstallationView';

const DashboardEditInstallation: NextPage = () => {
  return <DashboardEditInstallationView />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['common', 'dashboard'],
    i18nConfig,
  );

  return {
    props: {
      ...translations,
    },
  };
};

export default DashboardEditInstallation;
