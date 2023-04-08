import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { i18n } from '../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../appConstants';
import type { NextPage } from 'next';
import HomeView from 'views/HomeView';
import { getCategories } from 'lib/supabase/categories';

const Home: NextPage<{ categories: any }> = ({ categories }) => {
  return <HomeView categories={categories} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data: categories } = await getCategories();

  return {
    props: {
      categories,
      ...(await serverSideTranslations(locale, ['homepage', 'common'], {
        i18n: {
          locales: i18n.locales,
          defaultLocale: i18n.defaultLocale,
        },
      })),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Home;
