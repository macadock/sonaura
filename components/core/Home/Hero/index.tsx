import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import supabase from '@/lib/supabase';

const Hero: React.FC = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'hero' });
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const { data } = supabase.storage
    .from('marketing')
    .getPublicUrl('home_video');

  return (
    <Box position={'relative'}>
      <video
        autoPlay
        loop
        muted
        playsInline
        width={'100%'}
        style={{
          objectFit: 'cover',
          height: 'max-content',
          maxHeight: '60vh',
          borderRadius: '1rem',
        }}
      >
        <source src={data.publicUrl} type="video/mp4" />
      </video>
      <Box
        data-aos={isMd ? 'fade-left' : 'fade-up'}
        sx={{
          position: { md: 'absolute' },
          top: { md: 0 },
          bottom: { md: 0 },
          right: { md: 0 },
          margin: { md: 2, lg: 3 },
          padding: { md: '0 1rem', lg: 3 },
          textAlign: { md: 'right' },
          width: { md: '45%', lg: '35%' },
          backgroundColor: { md: alpha('#fff', 0.7) },
          borderRadius: { md: 5 },
        }}
      >
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
    </Box>
  );
};

export default Hero;
