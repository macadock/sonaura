/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Hero: React.FC = () => {
  return (
    <Grid container justifyContent={'center'} spacing={4}>
      <Grid item container alignItems={'center'} xs={12} md={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
              {'Contactez-nous'}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ fontWeight: 400, textAlign: 'center' }}
            >
              {
                'Nos experts Bang & Olufsen répondent à vos questions et vous aident à gagner du temps.'
              }
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;
