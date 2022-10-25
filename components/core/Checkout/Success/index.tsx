import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { uniqueName } from '..';
import LoadingScreen from 'components/system/LoadingScreen';

const Success: React.FC = () => {
  const router = useRouter();
  const orderId = router.query.orderId;
  const { ready } = useTranslation('common');

  useEffect(() => {
    if (sessionStorage) {
      sessionStorage.removeItem(uniqueName);
    }
  }, []);

  if (!ready) {
    return <LoadingScreen />;
  }

  return <Box>{`Success for order ${orderId}`}</Box>;
};

export default Success;
