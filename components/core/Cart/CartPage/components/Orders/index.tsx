import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCart } from 'react-use-cart';
import { useTranslation } from 'next-i18next';
import Delete from '@mui/icons-material/Delete';
import NextLink from 'next/link';
import Price from 'utils/Price';
import { getProductsByIds, Product } from 'lib/supabase/products';
import supabase from 'lib/supabase';

const Orders: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('checkout');
  const { removeItem, getItem, items } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

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

  const productsInCart = useMemo(() => {
    if (!items) return [];

    return items.map((item) => {
      if (!products) return;
      const product = products.find((product) => product.id === item.id);

      return {
        ...item,
        ...product,
      };
    });
  }, [products]);

  const getProductImage = (image: Product['mainImage']): string => {
    if (!image) return '';
    const bucket = image['bucket'];
    const file = image['file'];

    const { data } = supabase.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
  };

  return (
    <Box>
      {productsInCart.map((product, i) => (
        <Box key={product.id}>
          <Box display={'flex'}>
            <NextLink href={`/${product.categories?.slug}/${product.slug}`}>
              <Box
                component={'img'}
                src={getProductImage(product.mainImage)}
                alt={product.name}
                sx={{
                  ':hover': { cursor: 'pointer' },
                  borderRadius: 2,
                  width: 1,
                  height: 1,
                  maxWidth: { xs: 120, sm: 160 },
                  marginRight: 2,
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                }}
              />
            </NextLink>
            <Box
              display={'flex'}
              flexDirection={{ xs: 'column', sm: 'row' }}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
              width={1}
              position={'relative'}
            >
              <Box>
                <Link href={`/${product.categories?.slug}/${product.slug}`}>
                  <Typography fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>
                </Link>
                <Typography sx={{ fontWeight: 'bold' }}>
                  <Price price={product.price} />
                </Typography>
              </Box>
              <Typography>
                {`${t('quantity')} : ${getItem(product.id)?.quantity}`}
              </Typography>
              <Box
                sx={{
                  position: { xs: 'absolute', sm: 'initial' },
                  right: '2rem',
                  bottom: '2rem',
                }}
                title={t('delete')}
              >
                <Link
                  onClick={() => {
                    removeItem(product.id);
                  }}
                  underline={'none'}
                  variant={'subtitle2'}
                  noWrap={true}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Delete />
                  <Typography
                    variant={'button'}
                    display={{ xs: 'none', sm: 'block' }}
                  >
                    {t('delete')}
                  </Typography>
                </Link>
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
    </Box>
  );
};

export default Orders;
