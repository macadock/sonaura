import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { colors } from '@mui/material';

const Hero: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
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
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Vivez une expérience audiovisuelle{' '}
              </Typography>
              comme jamais auparavant.
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Nous vous aidons à trouver la solution adaptée à vos besoins.
            </Typography>
            <Box
              component={Button}
              variant="contained"
              color="primary"
              size="large"
              height={54}
              marginTop={2}
            >
              Découvrez nos produits
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={
            'https://images.ctfassets.net/8cd2csgvqd3m/4L0ytjVAqCRJxknRjMxia8/071610f7f07d699a0b37ea06f1ecbd99/all_televisions_.png?q=90&fm=webp&w=1440&h=1000&fit=fill'
          }
          alt="..."
          effect="blur"
          maxWidth={600}
          sx={{
            borderRadius: 2,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
