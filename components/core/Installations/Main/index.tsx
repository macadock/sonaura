import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Column from './Column';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  installations: any;
}

const Main: React.FC<Props> = ({ installations }) => {
  const instArray = [[], [], []];

  let counter = 0;

  installations.map((installation) => {
    counter > 2 ? (counter = 0) : null;
    instArray[counter] = [...instArray[counter], installation];

    return counter++;
  });

  return (
    <Box sx={{ marginBottom: '2rem', marginTop: '2rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Column installations={instArray[0]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Column installations={instArray[1]} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Column installations={instArray[2]} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
