import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewShopView from 'views/Dashboard/Shops/DashboardNewShopView';

const DashboardNewShop: NextPage = () => {
  return <DashboardNewShopView />;
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

export default DashboardNewShop;
