import { Box, Typography } from '@mui/material';
import React from 'react';

const ProfessionalsView: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h1">Professionnels</Typography>
    </Box>
  );
};

export default ProfessionalsView;
