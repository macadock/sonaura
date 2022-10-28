import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import Container from 'components/system/Container';
import { useTranslation } from 'next-i18next';
import { Button, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import LoadingScreen from '../../components/system/LoadingScreen';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
}

const DashboardMain: React.FC<Props> = ({ children }) => {
  const { t } = useTranslation('common');
  const { asPath } = useRouter();

  const { data, status } = useSession();

  const user = data?.user;

  const isAdmin = user?.role === UserRole.ADMIN;
  const isEditor = user?.role === UserRole.EDITOR;
  const isAuthorized = isAdmin || isEditor;

  if (!isAuthorized) {
    return (
      <Box>
        {status === 'loading' ? (
          <LoadingScreen />
        ) : (
          <>
            <Typography>{"Vous n'avez pas l'autorisation"}</Typography>
            <Button variant={'contained'} onClick={() => signOut()}>
              {'Se déconecter'}
            </Button>
          </>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position={'sticky'} color={'secondary'}>
        <Container paddingY={1}>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={1}
          >
            <Box
              display={'flex'}
              component="a"
              href="/dashboard"
              title={t('config.website')}
              width={{ xs: 130, md: 200 }}
              sx={{ marginY: '1rem' }}
            >
              <Box
                component={'img'}
                alt={t('config.website')}
                src={'/assets/logos/logo.svg'}
                height={1}
                width={1}
              />
            </Box>
            <Box>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/dashboard/products'}
                color={'text.primary'}
                fontWeight={asPath.includes('/dashboard/products') ? 700 : 400}
              >
                {'Produits'}
              </Link>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/dashboard/categories'}
                color={'text.primary'}
                fontWeight={
                  asPath.includes('/dashboard/categories') ? 700 : 400
                }
              >
                {'Catégories'}
              </Link>
              <Link
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                underline="none"
                component="a"
                href={'/dashboard/shops'}
                color={'text.primary'}
                fontWeight={asPath.includes('/dashboard/shops') ? 700 : 400}
              >
                {'Magasins'}
              </Link>
              <Button
                sx={{ paddingX: { md: 0.8, lg: 2 } }}
                onClick={() => signOut()}
              >
                {'Se déconnecter'}
              </Button>
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Box component={'main'} margin={'2rem'}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardMain;
