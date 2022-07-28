import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import { GetStaticPropsContext, NextPage } from 'next';
import { GET_CATEGORIES } from '../../gql/get-categories';
import { GET_PRODUCT } from '../../gql/get-products';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import { Product } from '../../gql/__generated__/product';
import getNavbarItems from '../../components/system/_getNavbarItems';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../constants';
import Main from '../../layouts/Main';
import ProductView from '../../views/ProductView';
import { client } from '../_app';
import Head from 'next/head';

const ProductPage: NextPage<{
  product: Product;
  categories: Categories;
  pages: Pages;
}> = ({ product, categories, pages }) => {
  const {
    product: { name, description },
  } = product;

  const pageTitle = `${name} - Sonaura, Distributeur Bang & Olufsen`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} key="title" />
        <meta name="description" content={description} key={'description'} />
        <meta
          property="og:description"
          content={description}
          key={'og-description'}
        />
      </Head>
      <Main categories={categories} pages={pages}>
        <ProductView product={product} />
      </Main>
    </>
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
      ...(await serverSideTranslations(
        context.locale,
        ['common', 'product'],
        i18nConfig,
      )),
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
