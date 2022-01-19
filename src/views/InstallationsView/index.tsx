import { Box, Typography } from '@mui/material';
import { Main } from 'layouts';
import styled from 'styled-components';

const InstallationView: React.FC = () => {
  return (
    <Main>
      <Container>
        <Typography variant="h1">Réalisations</Typography>
      </Container>
    </Main>
  );
};

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

export default InstallationView;
