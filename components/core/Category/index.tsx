import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import Container from '@/components/system/Container';
import { useTranslation } from 'next-i18next';
import Price from '@/utils/Price';
import { Product } from '@/lib/supabase/products';
import { useRouter } from 'next/router';
import supabase from '@/lib/supabase';
import Image from 'next/legacy/image';

interface Props {
  products: Product[];
}

const getProductMainImage = (image: Product['mainImage']): string => {
  const bucket = image['bucket'];
  const file = image['file'];
  const { data } = supabase.storage.from(bucket).getPublicUrl(file);
  return data.publicUrl;
};

const ProductGrid: React.FC<Props> = ({ products }) => {
  const router = useRouter();
  const slug = router.query['category'] as string;
  const { t } = useTranslation('common', { keyPrefix: 'categories' });

  const sortedProducts = useMemo(() => {
    return products.sort((prev, product) => {
      const priceA = prev.price || prev.fromPrice;
      const priceB = product.price || product.fromPrice;

      if (priceA < priceB) return -1;
      if (priceA > priceB) return 1;

      return 0;
    });
  }, [products]);

  if (products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
        <Typography>{t('noProducts')}</Typography>
      </Box>
    );
  }

  return (
    <Container>
      <Grid
        container
        spacing={4}
        sx={{ display: 'flex', justifyContent: 'center' }}
      >
        {sortedProducts.map((product, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box display={'block'} width={1} height={1}>
              <Card
                sx={{
                  width: 1,
                  height: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'none',
                  bgcolor: 'transparent',
                  backgroundImage: 'none',
                }}
              >
                <Link href={`/${slug}/${product.slug}`}>
                  <CardMedia
                    sx={{
                      position: 'relative',
                      height: 320,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={getProductMainImage(product.mainImage)}
                      alt={product.name}
                      layout={'fill'}
                      objectFit={'contain'}
                    />
                  </CardMedia>
                </Link>
                <Box marginTop={2}>
                  <Link
                    href={`/${slug}/${product.slug}`}
                    underline="none"
                    color="inherit"
                  >
                    <Typography
                      fontWeight={700}
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography
                    variant={'subtitle2'}
                    color={'text.secondary'}
                    sx={{
                      'text-overflow': 'ellipsis',
                      overflow: 'hidden',
                      display: '-webkit-box !important',
                      '-webkit-line-clamp': '5',
                      '-webkit-box-orient': 'vertical',
                      'white-space': 'normal',
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>
                <Box
                  marginTop={2}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  {product.price ? (
                    <Typography fontWeight={700}>
                      <Price price={product.price} />
                    </Typography>
                  ) : (
                    false
                  )}

                  {product.fromPrice ? (
                    <Typography fontWeight={700}>
                      {t('fromPrice')}
                      <Price price={product.fromPrice} />
                    </Typography>
                  ) : (
                    false
                  )}
                </Box>
                <Box marginTop={2}>
                  <Button
                    component={Link}
                    href={`/${slug}/${product.slug}`}
                    variant={'contained'}
                    color={'primary'}
                    size={'large'}
                    fullWidth
                  >
                    {t('moreDetails')}
                  </Button>
                </Box>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductGrid;
