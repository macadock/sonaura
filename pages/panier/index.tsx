import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import LoadingScreen from 'components/system/LoadingScreen';
import { UserConfig } from 'next-i18next';

const CartView = dynamic(() => import('views/CartView'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const Contact: NextPage = () => {
  return <CartView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'checkout'],
        i18nConfig as unknown as UserConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Contact;
