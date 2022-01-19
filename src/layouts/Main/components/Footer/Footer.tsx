import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer: React.FC = () => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          width={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            display={'flex'}
            component="a"
            href="/"
            title="theFront"
            width={80}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color:
                    mode === 'light'
                      ? theme.palette.primary.main
                      : theme.palette.common.white,
                }}
              >
                Sonaura
              </Typography>
            </Box>
            {/* <Box
              component={'img'}
              src={
                mode === 'light'
                  ? 'https://assets.maccarianagency.com/the-front/logos/logo.svg'
                  : 'https://assets.maccarianagency.com/the-front/logos/logo-negative.svg'
              }
              height={1}
              width={1}
            /> */}
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="#"
                color="text.primary"
                variant={'subtitle2'}
              >
                Mentions Légales
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="#"
                color="text.primary"
                variant={'subtitle2'}
              >
                Politique de confidentialité
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={'center'}
          variant={'subtitle2'}
          color="text.secondary"
          gutterBottom
        >
          &copy; Sonaura. 2022, Tous droits réservés
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          Lorsque vous visitez ou interagissez avec nos sites, services ou
          outils, nous ou nos prestataires de services agréés peuvent utiliser
          des cookies pour stocker stocker des informations afin de vous offrir
          une expérience plus rapide et plus et à des fins de marketing.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
