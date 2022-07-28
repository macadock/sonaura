import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../constants';
import type { NextPage } from 'next';
import ContactView from 'views/ContactView';
import { GET_SHOPS } from '../../gql/get-shops';
import { Shops } from '../../gql/__generated__/shops';
import { client } from '../_app';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import Main from 'layouts/Main';
import getNavbarItems from '../../components/system/_getNavbarItems';

const Contact: NextPage<{
  shops: Shops;
  categories: Categories;
  pages: Pages;
}> = ({ shops, categories, pages }) => {
  return (
    <Main categories={categories} pages={pages}>
      <ContactView shops={shops} />
    </Main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const { data: shops } = await client.query<Shops>({
    query: GET_SHOPS,
  });

  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      shops,
      categories,
      pages,
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
