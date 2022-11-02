import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { GetStaticPropsContext, NextPage } from 'next';
import CategoryView from 'views/CategoryView';
import { client } from 'lib/apollo';
import { GET_CATEGORIES, GET_CATEGORY_BY_SLUG } from '../../gql/category';
import prisma from 'lib/prisma';

const Category: NextPage<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
}> = ({ category }) => {
  return <CategoryView category={category.categoryBySlug} />;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.category;

  const category = await prisma.category.findUnique({
    where: {
      slug: slug as string,
    },
  });

  if (category === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category,
      ...(await serverSideTranslations(context.locale, ['common'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export const getStaticPaths = async () => {
  const categories = await prisma.category.findMany();

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

export default Category;
