import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@/next-i18next.config';
import DashboardNewCategoryView from '@/views/Dashboard/Categories/DashboardNewCategoryView';
import { UserConfig } from 'next-i18next';

const DashboardNewCategory: NextPage = () => {
  return <DashboardNewCategoryView />;
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

export default DashboardNewCategory;
