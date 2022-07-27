import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../constants';
import Main from 'layouts/Main';
import type { NextPage } from 'next';
import InstallationView from 'views/InstallationsView';
import getNavbarItems from '../../components/system/_getNavbarItems';
import { Categories } from '../../gql/__generated__/categories';
import { Pages } from '../../gql/__generated__/pages';
import { GET_INSTALLATIONS } from '../../gql/get-installations';
import { client } from '../_app';
import { Installations } from '../../gql/__generated__/installations';

const Realisations: NextPage<{
  installations: Installations;
  categories: Categories;
  pages: Pages;
}> = ({ installations, categories, pages }) => {
  return (
    <Main colorInvert={true} categories={categories} pages={pages}>
      <InstallationView installations={installations} />
    </Main>
  );
};

export const getStaticProps = async ({ locale }) => {
  const { categories, pages } = await getNavbarItems();

  const { data: installations } = await client.query<Installations>({
    query: GET_INSTALLATIONS,
  });

  return {
    props: {
      installations,
      categories,
      pages,
      ...(await serverSideTranslations(
        locale,
        ['common', 'installations'],
        i18nConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Realisations;
