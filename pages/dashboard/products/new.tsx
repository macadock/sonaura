import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewProductView from 'views/Dashboard/Products/DashboardNewProductView';
import { UserConfig } from 'next-i18next';

const DashboardNewProduct: NextPage = () => {
  return <DashboardNewProductView />;
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

export default DashboardNewProduct;
