import React from 'react';
import Box from '@mui/material/Box';

import Container from '../../components/system/Container';
import ProductDetails from '../../components/core/Product/ProductDetails';
import { Product } from '../../gql/__generated__/product';
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
            {process.env.NEXT_PUBLIC_MERCHANT_NAME}
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
      <ProductDetails product={product} />
    </Container>
  );
};

export default ProductView;
