import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ShopsTable from '@/components/dashboard/Shops/ShopsTable';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Button from '@mui/material/Button';

const DashboardShopView = () => {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{t('shops.name')}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/dashboard/shops/new');
            }}
          >
            {t('shops.new')}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <ShopsTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardShopView;
