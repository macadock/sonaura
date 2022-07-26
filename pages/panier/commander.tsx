import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../src/constants';
import type { NextPage } from 'next';
import { Shops } from '../../gql/__generated__/shops';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import Main from 'layouts/Main';
import getNavbarItems from '../../src/components/system/_getNavbarItems';
import dynamic from 'next/dynamic';

const CheckoutView = dynamic(() => import('../../src/views/CheckoutView'), {
  ssr: false,
});

const Contact: NextPage<{
  shops: Shops;
  categories: Categories;
  pages: Pages;
}> = ({ shops, categories, pages }) => {
  return (
    <Main categories={categories} pages={pages}>
      <CheckoutView />
    </Main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      categories,
      pages,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Contact;
