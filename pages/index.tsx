import TIME_TO_INVALIDATE_CACHE_SEC from '../src/constants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import HomeView from 'views/HomeView';
import { Categories } from '../gql/__generated__/categories';
import { Pages } from '../gql/__generated__/pages';
import getNavbarItems from '../src/components/system/_getNavbarItems';

const Home: NextPage<{ categories: Categories; pages: Pages }> = ({
  categories,
  pages,
}) => {
  return (
    <Main categories={categories} pages={pages}>
      <HomeView categories={categories} />
    </Main>
  );
};

export const getStaticProps = async () => {
  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      categories,
      pages,
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Home;
