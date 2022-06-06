import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Container from '../../components/system/Container';
import ProductImage from '../../components/core/Product/ProductImage';
import ProductDetails from '../../components/core/Product/ProductDetails';
import { Product } from '../../../gql/__generated__/product';
import { Breadcrumbs, Link } from '@mui/material';

interface Props {
  product: Product;
}
const ProductView: React.FC<Props> = ({ product }) => {
  const { category, name, slug } = product.product;

  return (
    <Container>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Sonaura
          </Link>
          <Link underline="hover" color="inherit" href={`/${category.slug}`}>
            {category.name}
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href={`/${category.slug}/${slug}`}
            aria-current="page"
          >
            {name}
          </Link>
        </Breadcrumbs>
      </Box>
      <Box sx={{ marginTop: '2rem' }}>
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
