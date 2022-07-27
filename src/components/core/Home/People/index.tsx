/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

const People: React.FC = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'people' });
  return (
    <Box bgcolor={'primary.main'} borderRadius={2} overflow={'hidden'}>
      <Grid container data-aos="fade-up" justifyContent={'space-between'}>
        <Grid xs={12} md={4} height={{ xs: '40vh', md: 'auto' }}>
          <Box position={'relative'} width={'100%'} height={'100%'}>
            <Image
              src={'https://media.graphassets.com/CGglaVGhTJCqbPy0ftfx'}
              height={'100%'}
              width={'100%'}
              layout={'fill'}
              objectFit={'cover'}
              alt={'Gérant du magasin de Lyon'}
            />
          </Box>
        </Grid>
        <Grid
          container
          alignItems="center"
          xs={12}
          md={4}
          sx={{
            marginY: { xs: 4, md: 2 },
            paddingX: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="text.primary"
              align={'center'}
              sx={{ fontWeight: 700, color: 'common.white' }}
            >
              {t('title')}
            </Typography>
            <Typography align={'center'} sx={{ color: 'common.white' }}>
              {t('text')}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={4} height={{ xs: '40vh', md: 'auto' }}>
          <Box position={'relative'} width={'100%'} height={'100%'}>
            <Typography>Hello</Typography>
            <Image
              src={'https://media.graphassets.com/tiVZCCX5QYy3Y6SHD80r'}
              height={'100%'}
              width={'100%'}
              layout={'fill'}
              objectFit={'cover'}
              alt={'Gérant du magasin de Grenoble'}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default People;
