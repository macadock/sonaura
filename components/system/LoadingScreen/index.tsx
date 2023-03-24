import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'next-i18next';

interface Props {
  height?: string;
  loadingText?: string;
}

const LoadingScreen: React.FC<Props> = ({ height, loadingText }) => {
  const { t, ready } = useTranslation('common');
  return (
    <Box
      width={'100%'}
      height={height || '75vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {ready ? (
        <Typography variant={'body1'} sx={{ marginBottom: '2rem' }}>
          {loadingText || t('loading')}
        </Typography>
      ) : null}
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
