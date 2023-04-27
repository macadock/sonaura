import React, { useEffect, useMemo, useState } from 'react';
import Drawer from '@mui/material/Drawer';
import {
  Box,
  Button,
  Typography,
  Link as MuiLink,
  Stack,
  Link,
} from '@mui/material';
import { useCart } from 'react-use-cart';
import { Close, Delete } from '@mui/icons-material';

import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Price from 'utils/Price';
import supabase from 'lib/supabase';
import { getProductsByIds } from 'lib/supabase/products';
import { useSiteData } from 'contexts/data';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
}

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const [products, setProducts] = useState(null);
  const { t } = useTranslation('common', { keyPrefix: 'cart' });
  const { isEmpty, items, removeItem, totalItems } = useCart();
  const { categories } = useSiteData();

  const getCategorySlug = (categoryId: string): string => {
    if (!categories) return '';
    return categories.find((category) => category.id === categoryId).slug;
  };

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

  const closeCart = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 380,
        },
      }}
    >
      <Box position={'relative'} title={t('close')}>
        <Close
          onClick={closeCart}
          sx={{
            cursor: 'pointer',
            width: { xs: '3rem', sm: '2.5rem', md: '2rem' },
            height: { xs: '3rem', sm: '2.5rem', md: '2rem' },
            position: 'absolute',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          paddingRight: 0,
        }}
      >
        <Box sx={{ margin: '1rem' }}>
          <Typography variant={'h3'} textAlign={'center'}>
            {t('title')}
          </Typography>
          {totalItems > 0 && (
            <Typography variant={'h5'} textAlign={'center'}>
              {t('product', { count: totalItems })}
            </Typography>
          )}
        </Box>
        {isEmpty ? (
          <Box marginY={'1.5rem'} sx={{ textAlign: 'center' }}>
            <Typography>{t('empty')}</Typography>
            <MuiLink href={'/occasion'}>
              {t('discoverPreOwnedProducts')}
            </MuiLink>
          </Box>
        ) : (
          <Box>
            {products &&
              products.map((product) => (
                <Box
                  key={product.id}
                  marginY={'1rem'}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          ':hover': { cursor: 'pointer' },
                          position: 'relative',
                          width: '5rem',
                          height: '5rem',
                          marginRight: '0.5rem',
                          borderRadius: '1rem',
                          overflow: 'hidden',
                        }}
                      >
                        <Link
                          href={`/${getCategorySlug(product.categoryId)}/${
                            product.slug
                          }`}
                        >
                          <Image
                            src={
                              'https://media.graphassets.com/wEANADQnT5W9C9HgeaLv'
                            }
                            objectFit={'cover'}
                            layout={'responsive'}
                            width={'5rem'}
                            height={'5rem'}
                            onClick={closeCart}
                          />
                        </Link>
                      </Box>
                      <Box>
                        <Link
                          href={`/${product.categories.slug}/${product.slug}`}
                        >
                          <Typography
                            sx={{
                              ':hover': { cursor: 'pointer' },
                              textDecoration: 'underline',
                            }}
                            onClick={closeCart}
                          >
                            {product.name}
                          </Typography>
                        </Link>
                        <Typography>
                          <Price priceWithCents={product.price} />
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => {
                        removeItem(product.id);
                      }}
                    >
                      <Delete />
                    </Button>
                  </Box>
                </Box>
              ))}
          </Box>
        )}

        <Stack
          sx={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
          }}
          onClick={closeCart}
        >
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant={'caption'} fontWeight={'bold'}>
              {t('noDelivery')}
            </Typography>
            <Typography variant={'caption'}>
              {t('contactUsToCollect')}
            </Typography>
            <Typography variant={'caption'}>
              <Link href={'/contact'} target={'_blank'}>
                {t('ourShops')}
              </Link>
            </Typography>
          </Box>
          <Button href={'/panier'} variant={'text'}>
            {t('displayCart')}
          </Button>
          <Button
            disabled={totalItems === 0}
            href={'/panier/commander'}
            variant={'contained'}
          >
            {t('continueOrder')}
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
