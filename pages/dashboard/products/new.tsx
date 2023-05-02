import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewProductView from 'views/Dashboard/Products/DashboardNewProductView';

const DashboardNewProduct: NextPage = () => {
  return <DashboardNewProductView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
};

export default DashboardNewProduct;
