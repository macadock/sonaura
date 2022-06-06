/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('contact');
  return (
    <Grid container justifyContent={'center'} spacing={4}>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'start', sm: 'center' },
          }}
        >
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              color="text.primary"
              sx={{
                fontWeight: 700,
              }}
            >
              {t('title')}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 400, textAlign: { xs: 'left', sm: 'center' } }}
            >
              {t('subtitle')}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
