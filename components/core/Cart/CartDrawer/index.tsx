import React, { useEffect, useState } from 'react';
import Drawer from '@mui/material/Drawer';

import { useCart } from 'react-use-cart';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';

import Image from 'next/legacy/image';
import { useTranslation } from 'next-i18next';
import Price from 'utils/Price';
import { getProductsByIds, Product } from 'lib/supabase/products';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import supabase from 'lib/supabase';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
}

const CartDrawer: React.FC<Props> = ({ open, onClose }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { t } = useTranslation('common', { keyPrefix: 'cart' });
  const { isEmpty, items, removeItem, totalItems } = useCart();

  const fetchProducts = async () => {
    if (!items) return;

    const ids = items.map((item) => item.id);

    const { data } = await getProductsByIds(ids);

    if (!data) {
      setProducts([]);
      return;
    }

    const products = items.map((item) => {
      const product = data.find((product) => product.id === item.id);

      return {
        ...item,
        ...product,
      };
    });

    setProducts(products as Product[]);
  };

  useEffect(() => {
    fetchProducts();
  }, [items]);

  const closeCart = () => {
    onClose();
  };

  const getProductImage = (image: Product['mainImage']): string => {
    const bucket = image['bucket'];
    const file = image['file'];

    const { data } = supabase.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
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
                          href={`/${product.categories.slug}/${product.slug}`}
                          style={{ textDecoration: 'none' }}
                          passHref
                        >
                          <Image
                            src={getProductImage(product.mainImage)}
                            objectFit={'cover'}
                            layout={'responsive'}
                            width={1}
                            height={1}
                            onClick={closeCart}
                          />
                        </Link>
                      </Box>
                      <Box>
                        <Link
                          href={`/${product.categories.slug}/${product.slug}`}
                          style={{ textDecoration: 'none' }}
                          passHref
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
                          <Price price={product.price} />
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
              <Link
                href={'/contact'}
                style={{ textDecoration: 'none' }}
                target={'_blank'}
              >
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
