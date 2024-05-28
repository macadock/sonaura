import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import OrderTable from '@/components/dashboard/Orders/OrderTable';

const DashboardOrderView = () => {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{t('orders.name')}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/dashboard/orders/new');
            }}
          >
            {t('orders.new')}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <OrderTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOrderView;
