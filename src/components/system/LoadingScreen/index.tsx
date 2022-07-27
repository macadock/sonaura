import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

interface Props {
  height?: string;
}

const LoadingScreen: React.FC<Props> = ({ height }) => {
  return (
    <Box
      width={'100%'}
      height={height || '75vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
