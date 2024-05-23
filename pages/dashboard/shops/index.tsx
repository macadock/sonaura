import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardShopView from 'views/Dashboard/Shops/DashboardShopView';
import { UserConfig } from 'next-i18next';

const DashboardCategories: NextPage = () => {
  return <DashboardShopView />;
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

export default DashboardCategories;
