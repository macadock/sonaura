/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';

const People: React.FC = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'people' });
  return (
    <Box bgcolor={'primary.main'} borderRadius={2}>
      <Grid container data-aos="fade-up">
        <Grid item container alignItems="flex-start" xs={12} md={4}>
          <Box
            component={'img'}
            src={
              'https://home-cinema-alpes.fr/wp-content/uploads/2020/09/Capture-decran-2020-09-23-a-12.35.53.png'
            }
            borderRadius={2}
            alt="..."
            sx={{
              objectFit: 'cover',
              width: { xs: '100%', md: '90%' },
              height: '100%',
            }}
          />
        </Grid>
        <Grid
          item
          container
          alignItems="center"
          xs={12}
          md={4}
          sx={{
            marginY: 2,
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
        <Grid item container justifyContent="flex-end" xs={12} md={4}>
          <Box
            component={'img'}
            src={
              'https://home-cinema-alpes.fr/wp-content/uploads/2020/09/DSC5555.jpg'
            }
            borderRadius={2}
            alt="..."
            sx={{
              objectFit: 'cover',
              width: { xs: '100%', md: '90%' },
              height: '100%',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default People;
