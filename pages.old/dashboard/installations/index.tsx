import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@/next-i18next.config';
import DashboardInstallationView from '@/views/Dashboard/Installations/DashboardInstallationView';
import { UserConfig } from 'next-i18next';

const DashboardInstallations: NextPage = () => {
  return <DashboardInstallationView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'dashboard'],
        i18nConfig as unknown as UserConfig,
      )),
    },
  };
};

export default DashboardInstallations;
