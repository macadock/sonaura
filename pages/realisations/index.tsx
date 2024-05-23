import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import InstallationView from 'views/InstallationsView';
import { getInstallations, Installation } from 'lib/supabase/installations';
import { UserConfig } from 'next-i18next';

const Realisations: NextPage<{
  installations: Installation[];
}> = ({ installations }) => {
  return <InstallationView installations={installations} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data } = await getInstallations();

  return {
    props: {
      installations: data,
      ...(await serverSideTranslations(
        locale,
        ['common', 'installations'],
        i18nConfig as unknown as UserConfig,
      )),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default Realisations;
