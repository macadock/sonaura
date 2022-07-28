/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import { useTranslation } from 'next-i18next';

const Contact: React.FC = () => {
  const { t } = useTranslation('pro', { keyPrefix: 'contact' });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid
          item
          data-aos={isMd ? 'fade-right' : 'fade-up'}
          sx={{ width: '100%' }}
        >
          <Box
            marginBottom={2}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
              {t('title')}
            </Typography>
            <Typography color="text.secondary">Frank VILIN</Typography>
            <Link href={`tel:+33${t('phone').replace(/\s/g, '').substring(1)}`}>
              {t('phone')}
            </Link>
            <Link href={`mailto:${t('email')}`}>{t('email')}</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
