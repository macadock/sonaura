import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardCategoryView from 'views/Dashboard/DashboardCategoryView';

const DashboardCategories: NextPage = () => {
  return <DashboardCategoryView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
};

export default DashboardCategories;
