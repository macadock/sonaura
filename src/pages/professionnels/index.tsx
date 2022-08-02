import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import ProfessionalsView from 'views/ProfessionalsView';
import getNavbarItems from '../../components/system/_getNavbarItems';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';

const Professionnels: NextPage<{ categories: Categories; pages: Pages }> = ({
  pages,
  categories,
}) => {
  return (
    <Main categories={categories} pages={pages}>
      <ProfessionalsView />
    </Main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const { categories, pages } = await getNavbarItems();

  return {
    props: {
      categories,
      pages,
      ...(await serverSideTranslations(locale, ['common', 'pro'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Professionnels;
