import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Container from '../../components/system/Container';
import ProductImage from '../../components/core/Product/ProductImage';
import ProductDetails from '../../components/core/Product/ProductDetails';
import { Product } from '../../../gql/__generated__/product';

interface Props {
  product: Product;
}
const ProductView: React.FC<Props> = ({ product }) => {
  return (
    <Container>
      <Box>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} md={7}>
            <ProductImage product={product} />
          </Grid>
          <Grid item xs={12} md={5}>
            <ProductDetails product={product} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductView;
