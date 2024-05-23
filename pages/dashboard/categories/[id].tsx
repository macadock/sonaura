import { GetServerSideProps, NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardEditCategoryView from 'views/Dashboard/Categories/DashboardEditCategoryView';
import { UserConfig } from 'next-i18next';

const DashboardEditCategory: NextPage = () => {
  return <DashboardEditCategoryView />;
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

export default DashboardEditCategory;
