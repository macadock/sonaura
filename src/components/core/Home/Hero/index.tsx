import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'hero' });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          width={'100%'}
          style={{
            objectFit: 'cover',
            height: 'max-content',
            maxHeight: '50vh',
            borderRadius: '1rem',
          }}
        >
          <source
            src="https://media.graphassets.com/67TVe7YRmaJV6Y1TO6i8"
            type="video/mp4"
          />
        </video>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              <Typography
                color={'primary'}
                component={'span'}
                variant={'inherit'}
                sx={{
                  background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  backgroundClip: 'text',
                }}
              >
                {t('titlePartOne')}{' '}
              </Typography>
              {t('titlePartTwo')}
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              {t('subtitle')}
            </Typography>
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              height={54}
              marginTop={'2rem'}
              href={'#products'}
            >
              {t('discoverOurProducts')}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
