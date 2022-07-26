import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import Orders from './components/Orders';
import Shipping from './components/Shipping';

const Checkout: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });
  const router = useRouter();

  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      router.replace('/');
    }
  }, [isEmpty]);

  return (
    <Container>
      <Box marginY={'2rem'}>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          {isEmpty && (
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      height: '65vh',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} marginBottom={4}>
                      {t('redirectingToShop')}
                    </Typography>
                    <CircularProgress />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isEmpty && (
            <Grid item xs={12} md={7}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={700} marginBottom={4}>
                    {t('shippingAddress')}
                  </Typography>
                  <Shipping />
                </Grid>
              </Grid>
            </Grid>
          )}
          {!isEmpty && (
            <Grid item xs={12} md={5}>
              <Typography variant="h6" fontWeight={700} marginBottom={4}>
                {t('orderSummary')}
              </Typography>
              <Card
                variant={'outlined'}
                sx={{
                  padding: { xs: 2, sm: 4 },
                }}
              >
                <Orders />
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Checkout;
