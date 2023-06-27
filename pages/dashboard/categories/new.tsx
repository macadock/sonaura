import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardNewCategoryView from 'views/Dashboard/Categories/DashboardNewCategoryView';

const DashboardNewCategory: NextPage = () => {
  return <DashboardNewCategoryView />;
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

export default DashboardNewCategory;
