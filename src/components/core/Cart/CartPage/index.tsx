import { useQuery } from '@apollo/client';
import { Box, Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { useCart } from 'react-use-cart';
import { GET_PRODUCTS_BY_IDS } from '../../../../gql/get-products';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../../gql/__generated__/get-products-by-ids';
import Container from '../../../system/Container';
import Orders from './components/Orders';
import SummeryBox from './components/SummeryBox';

const CartPage: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const { totalItems, isEmpty, cartTotal, items } = useCart();

  const ids = items.map((item) => item.id);

  const { data, refetch } = useQuery<
    GetProductsByIds,
    GetProductsByIdsVariables
  >(GET_PRODUCTS_BY_IDS, {
    variables: {
      ids,
    },
    skip: !ids,
  });

  useEffect(() => {
    refetch();
  }, [items]);

  const products = useMemo(() => {
    if (!items || !data) return null;

    return items.map((item) => {
      const product = data.products.find((product) => product.id === item.id);

      return {
        ...item,
        ...product,
      };
    });
  }, [data?.products]);

  return (
    <Container>
      <Box>
        <Grid container spacing={{ xs: 4, md: 8 }}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight={700} marginBottom={4}>
              {isEmpty
                ? t('title')
                : `${t('title')} (${t('product', { count: totalItems })})`}
            </Typography>
            <Orders isEmpty={isEmpty} products={products} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              elevation={0}
              sx={{
                bgcolor: 'alternate.main',
                padding: { xs: 2, sm: 4 },
              }}
            >
              <Typography variant="h6" fontWeight={700} marginBottom={4}>
                {t('summary')}
              </Typography>
              <SummeryBox isEmpty={isEmpty} cartTotal={cartTotal} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CartPage;
