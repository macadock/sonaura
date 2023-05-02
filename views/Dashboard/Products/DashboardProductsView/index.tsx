import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProductTable from 'components/dashboard/Products/ProductTable';
import { useRouter } from 'next/router';

const DashboardProductsView: React.FC = () => {
  const router = useRouter();

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h1">{'Produits'}</Typography>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/dashboard/products/new');
            }}
          >
            {'Ajouter un produit'}
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
