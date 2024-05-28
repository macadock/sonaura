import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductTable from '@/components/dashboard/Products/ProductTable';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const DashboardProductsView: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{t('products.name')}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/dashboard/products/new');
            }}
          >
            {t('products.new')}
          </Button>
        </Grid>
        <Grid item xs={12} height={'50vh'}>
          <ProductTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardProductsView;
