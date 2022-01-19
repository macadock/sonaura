import { Box, Typography } from '@mui/material';
import { Main } from 'layouts';
import styled from 'styled-components';

const ProfessionalsView: React.FC = () => {
  return (
    <Main>
      <Container>
        <Typography variant="h1">Professionnels</Typography>
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

export default ProfessionalsView;
