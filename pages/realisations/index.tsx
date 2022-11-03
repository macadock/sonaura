import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import InstallationView from 'views/InstallationsView';
import prisma from 'lib/prisma';

const Realisations: NextPage<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  installations: any;
}> = ({ installations }) => {
  return <InstallationView installations={installations} />;
};

export const getStaticProps = async ({ locale }) => {
  const installations = await prisma.installation.findMany();

  return {
    props: {
      installations: JSON.parse(JSON.stringify(installations)),
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
