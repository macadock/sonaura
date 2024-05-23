import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import ContactView from 'views/ContactView';
import { UserConfig } from 'next-i18next';

const Contact: NextPage = () => {
  return <ContactView />;
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'contact'],
        i18nConfig as unknown as UserConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Contact;
