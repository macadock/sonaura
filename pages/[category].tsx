import TIME_TO_INVALIDATE_CACHE_SEC from '../src/constants';
import type { NextPage } from 'next';
import CategoryView from 'views/CategoryView';
import { GET_CATEGORIES, GET_CATEGORY } from '../gql/get-categories';
import { Category } from '../gql/__generated__/category';
import { client } from './_app';
import { Categories } from '../gql/__generated__/categories';
import getNavbarItems from '../src/components/system/_getNavbarItems';
import Main from 'layouts/Main';
import { Pages } from '../gql/__generated__/pages';

const Category: NextPage<{
  category: Category;
  categories: Categories;
  pages: Pages;
}> = ({ category, categories, pages }) => {
  return (
    <Main categories={categories} pages={pages}>
      <CategoryView category={category} />
    </Main>
  );
};

export const getStaticProps = async (context) => {
  const slug = context.params.category;

  const { categories, pages } = await getNavbarItems();

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
      categories,
      pages,
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
  return { paths, fallback: 'blocking' };
};

export default Category;
