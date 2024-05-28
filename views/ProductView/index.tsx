import React, { useMemo } from 'react';
import Box from '@mui/material/Box';

import Container from '@/components/system/Container';
import ProductDetails from '@/components/core/Product/ProductDetails';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { merchantName } from '@/appConstants';
import { Product } from '@/lib/supabase/products';
import { useRouter } from 'next/router';
import { useSiteData } from '@/contexts/data';

interface Props {
  product: Product;
}
const ProductView: React.FC<Props> = ({ product }) => {
  const { categories } = useSiteData();
  const router = useRouter();
  const categorySlug = router.query.category as string;
  const { name, slug } = product;
  const category = useMemo(() => {
    if (!categories) {
      return null;
    }
    return categories.find((category) => category.slug === categorySlug);
  }, [categories, categorySlug]);

  return (
    <Container>
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            {merchantName}
          </Link>
          <Link underline="hover" color="inherit" href={`/${categorySlug}`}>
            {category?.name}
          </Link>
          <Link
            underline="hover"
            color="text.primary"
            href={`/${categorySlug}/${slug}`}
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
