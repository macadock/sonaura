import { Box, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const ProfessionalsView: React.FC = () => {
  return (
    <React.Fragment>
      <Container>
        <Typography variant="h1">Professionnels</Typography>
      </Container>
    </React.Fragment>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export default ProfessionalsView;
