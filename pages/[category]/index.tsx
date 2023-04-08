import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { GetStaticPropsContext, NextPage } from 'next';
import CategoryView from 'views/CategoryView';
import {
  Category,
  getCategories,
  getCategoryBySlug,
} from 'lib/supabase/categories';
import { getProductsByCategory, Product } from 'lib/supabase/products';

interface Props {
  category: Category;
  products: Product[];
}

const Category: NextPage<Props> = ({ category, products }) => {
  return <CategoryView category={category} products={products} />;
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.category;

  const { data: category } = await getCategoryBySlug(slug as string);

  if (category[0] === null) {
    return {
      notFound: true,
    };
  }

  const { data: products } = await getProductsByCategory(category[0].id);

  return {
    props: {
      category: category[0],
      products: products,
      ...(await serverSideTranslations(context.locale, ['common'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export const getStaticPaths = async () => {
  const { data: categories } = await getCategories();

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
