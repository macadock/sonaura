import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import ContactView from 'views/ContactView';
import { client } from 'lib/apollo';
import { GET_SHOPS } from '../../gql/shop';

const Contact: NextPage<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shops: any;
}> = ({ shops }) => {
  return <ContactView shops={shops} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data: shops } = await client.query({
    query: GET_SHOPS,
  });

  return {
    props: {
      shops,
      ...(await serverSideTranslations(
        locale,
        ['common', 'contact'],
        i18nConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Contact;
