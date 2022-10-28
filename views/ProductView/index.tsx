import React from 'react';
import Box from '@mui/material/Box';

import Container from 'components/system/Container';
import ProductDetails from 'components/core/Product/ProductDetails';
import { Breadcrumbs, Link } from '@mui/material';
import { merchantName } from 'appConstants';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}
const ProductView: React.FC<Props> = ({ product }) => {
  const { category, name, slug } = product;

  return (
    <Container>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            {merchantName}
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
