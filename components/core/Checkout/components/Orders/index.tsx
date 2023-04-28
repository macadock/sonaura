import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useCart } from 'react-use-cart';
import { useTranslation } from 'next-i18next';
import Price from 'utils/Price';
import { useFormikContext } from 'formik';
import { getProductsByIds } from 'lib/supabase/products';

const Orders = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('checkout');
  const { handleSubmit, isValid, dirty } = useFormikContext();
  const [products, setProducts] = useState(null);

  const { isEmpty, items, cartTotal } = useCart();

  const disabledCheckoutButton = isEmpty || !isValid || !dirty;

  const vat = cartTotal * 0.2;

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

  return (
    <>
      {isEmpty ? null : (
        <Box>
          {products &&
            products.map((product, i) => (
              <Box key={i}>
                <Box display={'flex'}>
                  <Box
                    component={'img'}
                    src={'https://media.graphassets.com/wEANADQnT5W9C9HgeaLv'}
                    alt={product.name}
                    sx={{
                      borderRadius: 2,
                      width: 1,
                      height: 1,
                      maxWidth: 120,
                      marginRight: 2,
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.7)'
                          : 'none',
                    }}
                  />
                  <Box
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    width={1}
                  >
                    <Box>
                      <Typography fontWeight={700} variant={'subtitle2'}>
                        {product.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography fontWeight={700} variant={'subtitle2'}>
                        <Price price={product.price} />
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider
                  sx={{
                    marginY: { xs: 2, sm: 4 },
                    display: i === products.length - 1 ? 'none' : 'block',
                  }}
                />
              </Box>
            ))}
          <Stack spacing={2} marginTop={{ xs: 2, sm: 4 }}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color={'text.secondary'}>{t('subtotal')}</Typography>
              <Typography color={'text.secondary'} fontWeight={700}>
                <Price price={cartTotal} />
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color={'text.secondary'}>{t('vat')}</Typography>
              <Typography color={'text.secondary'} fontWeight={700}>
                <Price price={vat} />
              </Typography>
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant={'h6'} fontWeight={700}>
                {t('total')}
              </Typography>
              <Typography variant={'h6'} fontWeight={700}>
                <Price price={cartTotal} />
              </Typography>
            </Box>
            <Button
              disabled={disabledCheckoutButton}
              component={Link}
              onClick={() => {
                handleSubmit();
              }}
              variant={'contained'}
              size={'large'}
              fullWidth
              marginBottom={0}
            >
              {t('order')}
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Orders;
