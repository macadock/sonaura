import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from 'react-use-cart';
import Container from 'components/system/Container';
import Orders from './components/Orders';
import SummaryBox from './components/SummaryBox';
import { getProductsByIds } from 'lib/supabase/products';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';

const CartPage: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const [products, setProducts] = useState(null);

  const { totalItems, isEmpty, cartTotal, items } = useCart();

  const fetchProducts = async () => {
    if (!items) return;

    const ids = items.map((item) => item.id);

    const { data } = await getProductsByIds(ids);

    if (!data) return;

    const products = items.map((item) => {
      const product = data.find((product) => product.id === item.id);

      return {
        ...item,
        ...product,
      };
    });

    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, [items]);

  const productsInCart = useMemo(() => {
    if (!items) return null;

    return items.map((item) => {
      if (!products) return {};
      const product = products.find((product) => product.id === item.id);

      return {
        ...item,
        ...product,
      };
    });
  }, [products]);

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
              <Orders products={productsInCart} />
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
                <SummaryBox cartTotal={cartTotal} />
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CartPage;
