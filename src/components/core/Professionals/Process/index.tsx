/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Process: React.FC = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? 'row' : 'column-reverse'}>
        <Grid
          item
          data-aos={isMd ? 'fade-right' : 'fade-up'}
          sx={{ width: '100%' }}
        >
          <Box marginBottom={2} sx={{ textAlign: 'center' }}>
            <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
              Contactez-nous
            </Typography>
            <Typography color="text.secondary">
              Frank VILIN
              <br />
              06 89 21 09 78
              <br />
              frank@beostore.fr
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Process;
