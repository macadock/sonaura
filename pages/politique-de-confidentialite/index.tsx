import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from 'next-i18next.config';
import TIME_TO_INVALIDATE_CACHE_SEC from '../../appConstants';
import type { NextPage } from 'next';
import PrivacyPolicyView from 'views/PrivacyPolicyView';
import { GET_LEGALS } from 'gql/get_legal';
import { client } from 'pages/_app';
import { Legal } from 'gql/__generated__/legal';

const PrivacyPolicy: NextPage<{
  legals: Legal;
}> = ({ legals }) => {
  return <PrivacyPolicyView legals={legals} />;
};

export const getStaticProps = async ({ locale }) => {
  const { data: legals } = await client.query<Legal>({
    query: GET_LEGALS,
  });

  return {
    props: {
      legals,
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: TIME_TO_INVALIDATE_CACHE_SEC,
  };
};

export default PrivacyPolicy;
