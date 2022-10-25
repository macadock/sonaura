import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'footer' });
  const theme = useTheme();
  const { mode } = theme.palette;
  const year = new Date().getFullYear().toString();

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
            title="Sonaura"
            width={130}
          >
            <Box
              component={'img'}
              src={
                mode === 'light'
                  ? '/assets/logos/logo.svg'
                  : '/assets/logos/logo-negative.svg'
              }
              height={1}
              width={1}
            />
          </Box>
          <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/mentions-legales"
                color="text.primary"
                variant={'subtitle2'}
              >
                {t('legalNotice')}
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline="none"
                component="a"
                href="/politique-de-confidentialite"
                color="text.primary"
                variant={'subtitle2'}
              >
                {t('privacyPolicy')}
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
          {`© ${t('copyright', { year })}`}
        </Typography>
        <Typography
          align={'center'}
          variant={'caption'}
          color="text.secondary"
          component={'p'}
        >
          {t('legalMessage')}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
