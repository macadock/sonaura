/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image';

const Banner = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'banner' });
  return (
    <Box position={'relative'}>
      <Grid container>
        <Grid item xs={12} md={6} data-aos={'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 700, color: '#222B45' }}
            >
              {t('title')}
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              variant="h6"
              component="p"
              color="text.primary"
              sx={{ color: '#222B45' }}
            >
              {t('text')}
            </Typography>
          </Box>
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            height={54}
            href="contact"
          >
            {t('button')}
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: 500,
          height: 500,
          position: 'absolute',
          bottom: '-190px',
          right: 0,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box position={'relative'} width="100%" height="100%">
          <Image
            src={
              'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/banner_image'
            }
            alt=""
            layout={'fill'}
            objectFit="contain"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
