import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

const LoadingScreen: React.FC = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export default LoadingScreen;
