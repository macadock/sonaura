import React, { useEffect, useMemo } from 'react';
import Drawer from '@mui/material/Drawer';
import { Box, Button, Typography } from '@mui/material';
import { useCart } from 'react-use-cart';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_BY_IDS } from '../../../../../gql/get-products';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../../../gql/__generated__/get-products-by-ids';
import { Delete } from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

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
          <Typography variant={'h5'} textAlign={'center'}>
            {t('product', { count: totalItems })}
          </Typography>
        </Box>
        {isEmpty ? (
          <Box marginY={'1.5rem'} sx={{ textAlign: 'center' }}>
            {t('empty')}
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
                    <Link
                      passHref
                      href={`/${product.category.slug}/${product.slug}`}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center' }}
                        onClick={closeCart}
                      >
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
                          <Image
                            src={product.mainAsset.url}
                            objectFit={'cover'}
                            layout={'responsive'}
                            width={'5rem'}
                            height={'5rem'}
                          />
                        </Box>
                        <Typography
                          sx={{
                            ':hover': { cursor: 'pointer' },
                            textDecoration: 'underline',
                          }}
                        >
                          {product.name}
                        </Typography>
                      </Box>
                    </Link>
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

        <Box>
          <Button
            disabled
            variant={'contained'}
            sx={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              right: '1rem',
            }}
          >
            {t('order')}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
