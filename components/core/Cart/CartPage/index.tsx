import { useQuery } from '@apollo/client';
import { Box, Card, Grid, Link, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo } from 'react';
import { useCart } from 'react-use-cart';
import Container from 'components/system/Container';
import Orders from './components/Orders';
import SummeryBox from './components/SummeryBox';
import { GET_PRODUCT_BY_IDS } from '../../../../gql/product';

const CartPage: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const { totalItems, isEmpty, cartTotal, items } = useCart();

  const ids = items.map((item) => item.id);

  const { data, refetch } = useQuery(GET_PRODUCT_BY_IDS, {
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
      if (data?.productByIds === null) return null;
      const product = data.productByIds.find(
        (product) => product.id === item.id,
      );

      return {
        ...item,
        ...product,
      };
    });
  }, [data?.productByIds]);

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
            {isEmpty ? (
              <Box marginY={'1.5rem'}>
                <Typography>{t('empty')}</Typography>
                <Link href={'/occasion'}>{t('discoverPreOwnedProducts')}</Link>
              </Box>
            ) : (
              <Orders products={products} />
            )}
            <Box marginTop={'3rem'} display={'flex'} flexDirection={'column'}>
              <Typography variant={'body2'} fontWeight={'bold'}>
                {t('noDelivery')}
              </Typography>
              <Typography variant={'body2'}>
                {t('contactUsToCollect')}
              </Typography>
              <Typography variant={'body2'}>
                <Link href={'/contact'} target={'_blank'}>
                  {t('ourShops')}
                </Link>
              </Typography>
            </Box>
          </Grid>
          {isEmpty ? null : (
            <Grid item xs={12} md={4}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: 'alternate.main',
                  padding: { xs: 2, sm: 4 },
                }}
              >
                <SummeryBox cartTotal={cartTotal} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CartPage;
