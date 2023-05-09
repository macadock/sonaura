import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardProductsView from 'views/Dashboard/Products/DashboardProductsView';

const DashboardProducts: NextPage = () => {
  return <DashboardProductsView />;
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

export default DashboardProducts;
