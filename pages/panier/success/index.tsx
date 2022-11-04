import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import type { NextPage } from 'next';
import SuccessCheckoutView from 'views/SuccessCheckoutView';

const SuccessPage: NextPage = () => {
  return <SuccessCheckoutView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
};

export default SuccessPage;
