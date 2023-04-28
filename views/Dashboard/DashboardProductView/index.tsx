import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingScreen from 'components/system/LoadingScreen';
import { getProducts, Product } from 'lib/supabase/products';
import ProductTable from 'components/dashboard/Products/ProductTable';
import ProductForm from 'components/dashboard/Products/ProductForm';

const DashboardProductView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productId, setProductId] = useState<string>(null);
  const [products, setProducts] = useState<Product[]>(null);

  const fetchCategories = async () => {
    const { data } = await getProducts();
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <LoadingScreen />;

  const handleCategorySelection = (categoryId: string) => {
    setProductId(categoryId);
  };

  const onCompletedOrUpdated = () => {
    fetchCategories();
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
            data={products}
            onSelectionModelChange={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProductForm
            products={products}
            productId={productId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardProductView;
