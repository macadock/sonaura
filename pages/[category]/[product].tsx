import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '@/next-i18next.config';
import { GetStaticPropsContext, NextPage } from 'next';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import ProductView from '@/views/ProductView';
import Head from 'next/head';
import {
  getProducts,
  getProductsBySlugAndCategory,
  Product,
} from '@/lib/supabase/products';
import { getCategories } from '@/lib/supabase/categories';
import { UserConfig } from 'next-i18next';

const ProductPage: NextPage<{
  product: Product;
}> = ({ product }) => {
  const { name, description } = product;

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
      <ProductView product={product} />
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const productSlug = context.params.product as string;
  const categorySlug = context.params.category as string;

  const { data: product } = await getProductsBySlugAndCategory(
    productSlug,
    categorySlug,
  );

  if (product[0] === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: product[0],
      ...(await serverSideTranslations(
        context.locale,
        ['common', 'product'],
        i18nConfig as unknown as UserConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export const getStaticPaths = async () => {
  const { data: categories } = await getCategories();
  const { data: products } = await getProducts();

  // Get the paths we want to pre-render based on posts

  let paths = [];
  categories.map((category) => {
    const productsForCategory = products.filter(
      (product) => product.categoryId === category.id,
    );

    return productsForCategory.map(
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
    );
  });

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: false };
};

export default ProductPage;
