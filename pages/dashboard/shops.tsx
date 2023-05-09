import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import DashboardShopView from '../../views/Dashboard/DashboardShopView';

const DashboardShops: NextPage = () => {
  return <DashboardShopView />;
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

export default DashboardShops;
