import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {
  InstallationFragment,
  Installations,
} from '../../../../gql/__generated__/installations';
import Column from './Column';

interface Props {
  installations: Installations;
}

const Main: React.FC<Props> = ({ installations }) => {
  const instArray: [
    InstallationFragment[],
    InstallationFragment[],
    InstallationFragment[],
  ] = [[], [], []];

  let counter = 0;

  installations.installations.map((installation) => {
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
