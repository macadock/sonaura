import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../appConstants';
import type { NextPage } from 'next';
import HomeView from 'views/HomeView';
import prisma from 'lib/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home: NextPage<{ categories: any }> = ({ categories }) => {
  return <HomeView categories={categories} />;
};

export const getStaticProps = async ({ locale }) => {
  const categories = await prisma.category.findMany();

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
