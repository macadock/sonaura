/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';

const Contact: React.FC = () => {
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
          <Box
            marginBottom={2}
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant={'h4'} sx={{ fontWeight: 700 }} gutterBottom>
              Contactez-nous
            </Typography>
            <Typography color="text.secondary">Frank VILIN</Typography>
            <Link href="tel:+33689210978">06 89 21 09 78</Link>
            <Link href="mailto:frank@beostore.fr">frank@beostore.fr</Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contact;
