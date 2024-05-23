import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewShopView from 'views/Dashboard/Shops/DashboardNewShopView';
import { UserConfig } from 'next-i18next';

const DashboardNewShop: NextPage = () => {
  return <DashboardNewShopView />;
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

export default DashboardNewShop;
