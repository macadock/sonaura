import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import getNavbarItems from '../../components/system/_getNavbarItems';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import PrivacyPolicyView from 'views/PrivacyPolicyView';
import { GET_LEGALS } from '../../gql/get_legal';
import { client } from '../_app';
import { Legal } from '../../gql/__generated__/legal';

const PrivacyPolicy: NextPage<{
  categories: Categories;
  pages: Pages;
  legals: Legal;
}> = ({ pages, categories, legals }) => {
  return (
    <Main categories={categories} pages={pages}>
      <PrivacyPolicyView legals={legals} />
    </Main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const { categories, pages } = await getNavbarItems();

  const { data: legals } = await client.query<Legal>({
    query: GET_LEGALS,
  });

  return {
    props: {
      categories,
      pages,
      legals,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default PrivacyPolicy;
