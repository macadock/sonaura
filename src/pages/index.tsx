import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../appConstants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import HomeView from 'views/HomeView';
import { Categories } from '../gql/__generated__/categories';
import { Pages } from '../gql/__generated__/pages';
import getNavbarItems from '../components/system/_getNavbarItems';

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

export const getStaticProps = async ({ locale }) => {
  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      categories,
      pages,
      ...(await serverSideTranslations(
        locale,
        ['homepage', 'common'],
        i18nConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Home;
