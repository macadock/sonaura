import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../appConstants';
import type { NextPage } from 'next';
import HomeView from 'views/HomeView';
import { Categories } from '../gql/__generated__/categories';
import { client } from './_app';
import { GET_CATEGORIES } from '../gql/get-categories';

const Home: NextPage<{ categories: Categories }> = ({ categories }) => {
  return <HomeView categories={categories} />;
};

export const getStaticProps = async ({ locale }) => {
  const categories = await client.query<Categories>({ query: GET_CATEGORIES });

  return {
    props: {
      categories,
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
