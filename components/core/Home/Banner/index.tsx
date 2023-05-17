/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const Banner: React.FC = () => {
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
            width={'100%'}
            height={'100%'}
            alt=""
            layout={'fill'}
            objectFit="contain"
          />
        </Box>
      </Box>
      {/* <Box
        component={'img'}
        // src={
        //   'https://images.ctfassets.net/8cd2csgvqd3m/5prVp155k2D9mTTeNayQC1/ba075fd5e50c90514ec70d60c7390390/Hamorny_Fabric_65_open_cms.png?q=90&fm=webp&w=1200&h=1200&fit=fill'
        // }
        sx={{
          maxWidth: 500,
          height: 'auto',
          position: 'absolute',
          bottom: '-190px',
          right: 0,
          display: { xs: 'none', sm: 'block' },
        }}
      /> */}
    </Box>
  );
};

export default Banner;
