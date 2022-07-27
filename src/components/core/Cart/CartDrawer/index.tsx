import React, { useEffect, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Button, Typography, Link as MuiLink, Stack } from '@mui/material';
import { useCart } from 'react-use-cart';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_IDS } from '../../../../gql/get-products';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../../gql/__generated__/get-products-by-ids';
import { Close, Delete } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Price from '../../../../utils/Price';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
}

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation('common', { keyPrefix: 'cart' });
  const { isEmpty, items, removeItem, totalItems } = useCart();

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
                          passHref
                          href={`/${product.category.slug}/${product.slug}`}
                        >
                          <Image
                            src={product.mainAsset.url}
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
                          passHref
                          href={`/${product.category.slug}/${product.slug}`}
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
