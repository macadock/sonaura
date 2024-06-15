import React, { useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useCart } from 'react-use-cart';
import { useTranslation } from 'next-i18next';
import OldPriceComponent from '@/utils/OldPriceComponent';
import { useFormikContext } from 'formik';
import { getProductsByIds, Product } from '@/lib/supabase/products';
import supabase from '@/lib/supabase';
import { pick } from 'lodash';

const Orders = (): JSX.Element => {
  const theme = useTheme();
  const { t } = useTranslation('checkout');
  const { handleSubmit, isValid, dirty } = useFormikContext();
  const [products, setProducts] = useState<Product[]>([]);

  const { isEmpty, items, cartTotal } = useCart();

  const disabledCheckoutButton = isEmpty || !isValid || !dirty;

  const vat = cartTotal * 0.2;

  const fetchProducts = useCallback(async () => {
    if (!items) return;

    const ids = items.map((item) => item.id);

    const { data } = await getProductsByIds(ids);

    if (!data) return;

    const products = items.map((item) => {
      const product = (data as unknown as Product[]).find(
        (product) => product.id === item.id,
      );

      return {
        ...item,
        ...product,
      };
    });

    setProducts(products as Product[]);
  }, [items]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, items]);

  const getProductImage = (image: Product['mainImage']): string => {
    const bucket = pick(image, 'bucket');
    const file = pick(image, 'file');

    const { data } = supabase.storage.from(`${bucket}`).getPublicUrl(`${file}`);
    return data.publicUrl;
  };

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
                    src={getProductImage(product.mainImage)}
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
                    {product.price && (
                      <Box>
                        <Typography fontWeight={700} variant={'subtitle2'}>
                          <OldPriceComponent price={product.price} />
                        </Typography>
                      </Box>
                    )}
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
                <OldPriceComponent price={cartTotal} />
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography color={'text.secondary'}>{t('vat')}</Typography>
              <Typography color={'text.secondary'} fontWeight={700}>
                <OldPriceComponent price={vat} />
              </Typography>
            </Box>
            <Divider />
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant={'h6'} fontWeight={700}>
                {t('total')}
              </Typography>
              <Typography variant={'h6'} fontWeight={700}>
                <OldPriceComponent price={cartTotal} />
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
