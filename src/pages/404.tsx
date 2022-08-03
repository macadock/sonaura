import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../../next-i18next.config';
import { Container, Typography } from '@mui/material';

const Custom404: NextPage = () => {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography variant={'h2'}>{'Erreur 404'}</Typography>
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

export default Custom404;
