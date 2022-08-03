import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import InstallationView from 'views/InstallationsView';
import { GET_INSTALLATIONS } from '../../gql/get-installations';
import { client } from '../_app';
import { Installations } from '../../gql/__generated__/installations';

const Realisations: NextPage<{
  installations: Installations;
}> = ({ installations }) => {
  return <InstallationView installations={installations} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data: installations } = await client.query<Installations>({
    query: GET_INSTALLATIONS,
  });

  return {
    props: {
      installations,
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
