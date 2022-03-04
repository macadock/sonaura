import { GetStaticPropsContext, NextPage } from 'next';
import { GET_CATEGORIES } from '../../gql/get-categories';
import { GET_PRODUCT } from '../../gql/get-products';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import { Product } from '../../gql/__generated__/product';
import getNavbarItems from '../../src/components/system/_getNavbarItems';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../src/constants';
import Main from '../../src/layouts/Main';
import ProductView from '../../src/views/ProductView';
import { client } from '../_app';

const ProductPage: NextPage<{
  product: Product;
  categories: Categories;
  pages: Pages;
}> = ({ product, categories, pages }) => {
  return (
    <Main categories={categories} pages={pages}>
      <ProductView product={product} />
    </Main>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.product;

  const { categories, pages } = await getNavbarItems();

  const { data: product } = await client.query<Product>({
    query: GET_PRODUCT,
    variables: {
      slug: slug,
    },
  });

  if (product.product.id === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
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

  let paths = [];
  categories.map((category) =>
    category.products.map(
      (product) =>
        (paths = [
          ...paths,
          {
            params: {
              category: category.slug,
              product: product.slug,
            },
          },
        ]),
    ),
  );

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' };
};

export default ProductPage;
