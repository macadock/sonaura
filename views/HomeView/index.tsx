import Box from '@mui/material/Box';
import Categories from 'components/core/Home/Categories';
import Banner from 'components/core/Home/Banner';
import Hero from 'components/core/Home/Hero';
import Newsletter from 'components/core/Home/Newsletter';
import People from 'components/core/Home/People';
import Products from 'components/core/Home/Products';
import Container from 'components/system/Container';
import React from 'react';
import PreOwnedProducts from 'components/core/Home/PreOwnedProducts';
import Image from 'next/image';
import { Grid, Link, Typography } from '@mui/material';

const HomeView: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Hero />
      </Container>
      <Container>
        <Box borderRadius={2} bgcolor={'secondary.main'}>
          <Grid container data-aos="fade-up" justifyContent={'space-between'}>
            <Grid item xs={12} md={6} height={{ xs: '40vh' }}>
              <Box
                position={'relative'}
                width={'100%'}
                height={'100%'}
                borderRadius={2}
                overflow={'hidden'}
              >
                <Image
                  src={
                    'https://omzwibopitojmqdieuml.supabase.co/storage/v1/object/public/marketing/harmony-beoloab-50.jpg'
                  }
                  alt={"Produits d'exposition"}
                  layout={'fill'}
                  objectFit={'cover'}
                />
              </Box>
            </Grid>
            <Grid
              item
              alignItems="center"
              xs={12}
              md={6}
              sx={{
                marginY: { xs: 4, md: 2 },
                paddingX: 2,
              }}
            >
              <Box
                width={'100%'}
                height={'100%'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: '2rem',
                }}
              >
                <Box>
                  <Typography
                    variant="h4"
                    color="text.primary"
                    align={'left'}
                    sx={{ fontWeight: 700 }}
                  >
                    {'Offre exceptionnelle'}
                  </Typography>
                  <Typography variant="h5" color="text.primary" align={'left'}>
                    {'sur nos produits d’exposition à saisir jusqu’au 5 avril'}
                  </Typography>
                </Box>
                <Typography align={'left'}>
                  {
                    'Le téléviseur Beovision Harmony accompagné d’une paire de Beolab 50 pour un système cinéma complet. Plus de détails auprès de votre boutique de Grenoble'
                  }
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Link href="mailto:contactgrenoble@sonaura.fr">
                    {'contactgrenoble@sonaura.fr'}
                  </Link>

                  <Link href="tel:+33476474993">{'+33 4 76 47 49 93'}</Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container paddingY={0}>
        <People />
      </Container>
      <Container>
        <Categories />
      </Container>
      <Box bgcolor={'secondary.main'}>
        <Container>
          <Banner />
        </Container>
      </Box>
      <Container>
        <Products />
      </Container>
      <Container>
        <PreOwnedProducts />
      </Container>
      <Container>
        <Newsletter />
      </Container>
    </React.Fragment>
  );
};

export default HomeView;
