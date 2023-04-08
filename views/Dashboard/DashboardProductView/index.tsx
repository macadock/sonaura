import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Product } from '@prisma/client';
import { useQuery } from '@apollo/client';
import ProductTable from 'components/dashboard/Products/ProductTable';
import ProductForm from 'components/dashboard/Products/ProductForm';
import { GET_PRODUCTS } from '../../../gql/product';

const DashboardProductView: React.FC = () => {
  const [productId, setProductId] = useState<string>(null);

  type Products = {
    products: Product[];
  };

  const { data, loading, error, refetch } = useQuery<Products>(GET_PRODUCTS);

  if (loading || error) return null;

  const handleCategorySelection = (productId: string) => {
    setProductId(productId);
  };

  const onCompletedOrUpdated = () => {
    refetch();
    setProductId(null);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1">{'Produits'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} height={'50vh'}>
          <ProductTable
            data={data.products}
            onSelectionModelChange={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductForm
            products={data.products}
            productId={productId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardProductView;
