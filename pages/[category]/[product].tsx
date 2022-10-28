import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import { GetStaticPropsContext, NextPage } from 'next';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import ProductView from 'views/ProductView';
import Head from 'next/head';
import { client } from 'lib/apollo';
import { GET_PRODUCT_BY_SLUG } from '../../gql/product';
import { GET_CATEGORIES } from '../../gql/category';

const ProductPage: NextPage<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}> = ({ product }) => {
  const {
    productBySlug: { name, description },
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
      <ProductView product={product.productBySlug} />
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = context.params.product;

  const { data: product } = await client.query({
    query: GET_PRODUCT_BY_SLUG,
    variables: {
      slug,
    },
  });

  if (product.productBySlug.id === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
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
  const { data } = await client.query({
    query: GET_CATEGORIES,
  });

  const categories = data.categories;

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
  return { paths, fallback: false };
};

export default ProductPage;
