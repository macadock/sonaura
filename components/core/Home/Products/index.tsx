import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'next-i18next';
import { getProducts, Product } from '@/lib/supabase/products';
import ProductItem from '@/components/core/Home/ProductItem';

const Products: React.FC<{ productNumberMax?: number }> = ({
  productNumberMax = 3,
}) => {
  const { t } = useTranslation('homepage', { keyPrefix: 'products' });
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const { data } = await getProducts();
    if (data) {
      setProducts(data as Product[]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Box id="products">
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          {t('subtitle')}
        </Typography>
        <Typography
          variant="h4"
          align={'center'}
          data-aos={'fade-up'}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
        >
          {t('title')}
        </Typography>
        <Typography
          variant="h6"
          align={'center'}
          color={'text.secondary'}
          data-aos={'fade-up'}
        >
          {t('description')}
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {products
          ? products
              .filter((product) => product.onHomepage === true)
              .map((product, i) => (
                <React.Fragment key={product.id}>
                  {i < productNumberMax ? (
                    <ProductItem product={product} index={i} />
                  ) : (
                    false
                  )}
                </React.Fragment>
              ))
          : null}
      </Grid>
    </Box>
  );
};

export default Products;
