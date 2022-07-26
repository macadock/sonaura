import React, { useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useCart } from 'react-use-cart';
import { useQuery } from '@apollo/client';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../../../../../gql/__generated__/get-products-by-ids';
import { GET_PRODUCTS_BY_IDS } from '../../../../../../../gql/get-products';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'next-i18next';

const paymentUrl = `${process.env.NEXT_PUBLIC_PAYPLUG_API_URL}/payments`;
const apiKey = process.env.NEXT_PUBLIC_PAYPLUG_SECRET_KEY;

const Orders = (): JSX.Element => {
  const theme = useTheme();

  const handlePayment = () => {
    fetch(paymentUrl, {
      method: 'POST',
      body: null,
    });
  };

  const { t } = useTranslation('common', { keyPrefix: 'cart' });

  const { isEmpty, items, cartTotal } = useCart();

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
    <>
      {isEmpty ? null : (
        <Box>
          {products &&
            products.map((product, i) => (
              <Box key={i}>
                <Box display={'flex'}>
                  <Box
                    component={'img'}
                    src={product.mainAsset.url}
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
                    flexDirection={{ xs: 'column', sm: 'row' }}
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
                        <NumberFormat
                          value={product.price}
                          displayType="text"
                          thousandSeparator=" "
                          suffix=" €"
                          decimalSeparator=","
                        />
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
          <Stack spacing={2} marginY={{ xs: 2, sm: 4 }}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color={'text.secondary'}>{t('subtotal')}</Typography>
              <Typography color={'text.secondary'} fontWeight={700}>
                <NumberFormat
                  value={cartTotal}
                  displayType="text"
                  thousandSeparator=" "
                  suffix=" €"
                  decimalSeparator=","
                />
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color={'text.secondary'}>{t('vat')}</Typography>
              <Typography color={'text.secondary'} fontWeight={700}>
                <NumberFormat
                  value={cartTotal * 0.2}
                  displayType="text"
                  thousandSeparator=" "
                  suffix=" €"
                  decimalSeparator=","
                />
              </Typography>
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant={'h6'} fontWeight={700}>
                {t('total')}
              </Typography>
              <Typography variant={'h6'} fontWeight={700}>
                <NumberFormat
                  value={cartTotal}
                  displayType="text"
                  thousandSeparator=" "
                  suffix=" €"
                  decimalSeparator=","
                />
              </Typography>
            </Box>
            <Button
              disabled={isEmpty}
              onClick={handlePayment}
              component={Link}
              variant={'contained'}
              size={'large'}
              fullWidth
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
