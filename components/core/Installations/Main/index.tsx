import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Installation } from '@/lib/supabase/installations';
import Card from '@/components/core/Installations/Main/Card';

interface Props {
  installations: Installation[];
}

const Main: React.FC<Props> = ({ installations }) => {
  return (
    <Box sx={{ marginBottom: '2rem', marginTop: '2rem' }}>
      <Grid container spacing={4}>
        {installations.map((installation) => (
          <Grid key={installation.id} item xs={12} sm={6} lg={4}>
            <Card installation={installation} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Main;
