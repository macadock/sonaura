/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import { Link } from '@mui/material';

const Welcome: React.FC = () => {
  const { t } = useTranslation('pro');
  const GridItemHeadlineBlock = () => (
    <Box>
      <Typography
        variant="h3"
        align={'center'}
        gutterBottom
        sx={{
          fontWeight: 900,
        }}
      >
        {t('title')}
      </Typography>
      <Typography
        variant="h6"
        component="p"
        color="text.secondary"
        align={'center'}
        sx={{
          fontWeight: 400,
          whiteSpace: { md: 'pre' },
        }}
      >
        {t('subtitle')}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent={'center'}
          >
            <GridItemHeadlineBlock />
          </Box>
          <Box
            marginBottom={2}
            sx={{
              textAlign: 'center',
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
            }}
          >
            <Typography color="text.secondary">{t('contact.name')}</Typography>
            <Link
              href={`tel:+33${t('contact.phone')
                .replace(/\s/g, '')
                .substring(1)}`}
            >
              {t('contact.phone')}
            </Link>
            <Link href={`mailto:${t('contact.email')}`}>
              {t('contact.email')}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
