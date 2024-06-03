import { GetServerSideProps, NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@/next-i18next.config';
import DashboardEditProductView from '@/views/Dashboard/Products/DashboardEditProductView';
import { UserConfig } from 'next-i18next';

const DashboardEditProduct: NextPage = () => {
  return <DashboardEditProductView />;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(
    locale,
    ['common', 'dashboard'],
    i18nConfig as unknown as UserConfig,
  );

  return {
    props: {
      ...translations,
    },
  };
};

export default DashboardEditProduct;
