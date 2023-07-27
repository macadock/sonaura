import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewInstallationView from 'views/Dashboard/Installations/DashboardNewInstallationView';

const DashboardNewInstallation: NextPage = () => {
  return <DashboardNewInstallationView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'dashboard'],
        i18nConfig,
      )),
    },
  };
};

export default DashboardNewInstallation;
