import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../../../next-i18next.config';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';

const Contact: NextPage = () => {
  const router = useRouter();
  const orderId = router.query.orderId;

  return (
    <Container>
      <Box>{`Success for order ${orderId}`}</Box>
    </Container>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default Contact;
