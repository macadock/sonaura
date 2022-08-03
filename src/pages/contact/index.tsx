import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import ContactView from 'views/ContactView';
import { GET_SHOPS } from '../../gql/get-shops';
import { Shops } from '../../gql/__generated__/shops';
import { client } from '../_app';

const Contact: NextPage<{
  shops: Shops;
}> = ({ shops }) => {
  return <ContactView shops={shops} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data: shops } = await client.query<Shops>({
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
