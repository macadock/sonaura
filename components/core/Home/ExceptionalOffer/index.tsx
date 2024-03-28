import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Grid, Link } from '@mui/material';
import Image from 'next/image';

const ExceptionalOffer: React.FC = () => {
  return (
    <Box borderRadius={2} bgcolor={'secondary.main'}>
      <Grid container justifyContent={'space-between'}>
        <Grid item xs={12} md={6} height={{ xs: '60vh' }}>
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
              <Typography
                variant="h5"
                color="text.primary"
                align={'left'}
                fontStyle={'italic'}
              >
                <span>
                  {'sur nos produits d’exposition à saisir jusqu’au '}
                </span>
                <span
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {'13 avril 2024'}
                </span>
              </Typography>
            </Box>
            <Typography align={'left'} component={'div'}>
              <p>
                Le téléviseur{' '}
                <span style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                  Beovision Harmony
                </span>{' '}
                accompagné d’une paire de{' '}
                <span style={{ whiteSpace: 'nowrap', fontWeight: 'bold' }}>
                  Beolab 50
                </span>{' '}
                pour un système cinéma complet.
                <br />
                <span>
                  {'Plus de détails auprès de votre boutique de Grenoble.'}
                </span>
              </p>
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
  );
};

export default ExceptionalOffer;
