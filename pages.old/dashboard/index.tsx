import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import DashboardOrderView from '@/views/Dashboard/Orders/DashboardOrderView';
import i18nConfig from '../../next-i18next.config';
import { UserConfig } from 'next-i18next';

const DashboardHome = () => {
  return <DashboardOrderView />;
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

export default DashboardHome;
