import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import Container from 'components/system/Container';
import { ProductFragment } from '../../../gql/__generated__/categories';
import { useTranslation } from 'next-i18next';
import Price from '../../../utils/Price';

interface Props {
  products: ProductFragment[];
}

const ProductGrid: React.FC<Props> = ({ products }) => {
  const { t } = useTranslation('common', { keyPrefix: 'categories' });
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
        {products.map((product, i) => (
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
                <Link href={`/${product.category.slug}/${product.slug}`}>
                  <CardMedia
                    title={product.name}
                    image={product.mainAsset.url}
                    sx={{
                      position: 'relative',
                      height: 320,
                      overflow: 'hidden',
                      borderRadius: 2,
                    }}
                  ></CardMedia>
                </Link>
                <Box marginTop={2}>
                  <Link
                    href={`/${product.category.slug}/${product.slug}`}
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
                  <Typography fontWeight={700}>
                    <Price priceWithCents={product.price} />
                  </Typography>
                </Box>
                <Box marginTop={2}>
                  <Button
                    component={Link}
                    href={`/${product.category.slug}/${product.slug}`}
                    variant={'contained'}
                    color={'primary'}
                    size={'large'}
                    fullWidth
                    startIcon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        width={20}
                        height={20}
                      >
                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      </svg>
                    }
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
