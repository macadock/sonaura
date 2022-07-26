import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useCart } from 'react-use-cart';
import Container from '../../../system/Container';
import Orders from './components/Orders';
import SummeryBox from './components/SummeryBox';

const CartPage: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const { totalItems, isEmpty } = useCart();

  return (
    <Container>
      <Box>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight={700} marginBottom={4}>
              {isEmpty
                ? t('title')
                : `${t('title')} (${t('product', { count: totalItems })})`}
            </Typography>
            <Orders />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'alternate.main',
                padding: { xs: 2, sm: 4 },
              }}
            >
              <Typography variant="h6" fontWeight={700} marginBottom={4}>
                {t('summary')}
              </Typography>
              <SummeryBox />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CartPage;
