import { NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import DashboardEditProductView from 'views/Dashboard/Products/DashboardEditProductView';
import { getProducts } from 'lib/supabase/products';

const DashboardEditProduct: NextPage = () => {
  return <DashboardEditProductView />;
};

export async function getStaticPaths() {
  const { data } = await getProducts();
  return {
    paths: data.map((product) => ({
      params: {
        id: product.id,
      },
    })),
    fallback: true,
  };
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
};

export default DashboardEditProduct;
