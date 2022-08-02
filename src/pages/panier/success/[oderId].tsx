import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../../appConstants';
import type { NextPage } from 'next';
import { Shops } from '../../../gql/__generated__/shops';
import { Categories } from '../../../gql/__generated__/categories';
import { Pages } from '../../../gql/__generated__/pages';
import Main from 'layouts/Main';
import getNavbarItems from '../../../components/system/_getNavbarItems';
import dynamic from 'next/dynamic';
import LoadingScreen from '../../../components/system/LoadingScreen';

const CheckoutView = dynamic(() => import('../../../views/CheckoutView'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

const Contact: NextPage<{
  shops: Shops;
  categories: Categories;
  pages: Pages;
}> = ({ categories, pages }) => {
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
