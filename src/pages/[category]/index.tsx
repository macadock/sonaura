import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { GetStaticPropsContext, NextPage } from 'next';
import CategoryView from 'views/CategoryView';
import { GET_CATEGORIES, GET_CATEGORY } from '../../gql/get-categories';
import { Category } from '../../gql/__generated__/category';
import { client } from '../_app';
import { Categories } from '../../gql/__generated__/categories';

const Category: NextPage<{
  category: Category;
}> = ({ category }) => {
  return <CategoryView category={category} />;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.category;

  const { data: category } = await client.query<Category>({
    query: GET_CATEGORY,
    variables: {
      slug: slug,
    },
  });

  if (category.category === null) {
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
  const { data } = await client.query<Categories>({
    query: GET_CATEGORIES,
  });

  const categories = data.categories;

  // Get the paths we want to pre-render based on posts
  const paths = categories.map((category) => ({
    params: { category: category.slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: true };
};

export default Category;
