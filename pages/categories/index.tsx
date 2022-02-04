import type { NextPage } from 'next';
import LoadingScreen from 'components/system/LoadingScreen';
import { Categories } from '../../gql/__generated__/categories';
import { client } from '../_app';
import { GET_CATEGORIES } from '../../gql/get-categories';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../src/constants';
import getNavbarItems from '../../src/components/system/_getNavbarItems';
import { Pages } from '../../gql/__generated__/pages';
import { Shops } from '../../gql/__generated__/shops';
import Main from 'layouts/Main';

const Categories: NextPage<{
  shops: Shops;
  categories: Categories;
  pages: Pages;
}> = ({ shops, categories, pages }) => {
  return (
    <Main categories={categories} pages={pages}>
      <LoadingScreen />
    </Main>
  );
};

export const getStaticProps = async () => {
  const { data: shops } = await client.query<Categories>({
    query: GET_CATEGORIES,
  });

  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      shops,
      categories,
      pages,
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Categories;
