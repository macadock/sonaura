import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCart } from 'react-use-cart';
import { GetProductsByIds } from '../../../../../../gql/__generated__/get-products-by-ids';
import { useTranslation } from 'next-i18next';
import { Delete } from '@mui/icons-material';
import NextLink from 'next/link';
import Price from '../../../../../../utils/Price';

interface Props {
  products: GetProductsByIds['products'];
}

const Orders: React.FC<Props> = ({ products }) => {
  const theme = useTheme();
  const { t } = useTranslation('checkout');
  const { removeItem, getItem } = useCart();

  return (
    <Box>
      {products &&
        products.map((product, i) => (
          <Box key={product.id}>
            <Box display={'flex'}>
              <NextLink href={`/${product.category.slug}/${product.slug}`}>
                <Box
                  component={'img'}
                  src={product.mainAsset.url}
                  alt={product.name}
                  sx={{
                    ':hover': { cursor: 'pointer' },
                    borderRadius: 2,
                    width: 1,
                    height: 1,
                    maxWidth: { xs: 120, sm: 160 },
                    marginRight: 2,
                    filter:
                      theme.palette.mode === 'dark'
                        ? 'brightness(0.7)'
                        : 'none',
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
                  <Link href={`/${product.category.slug}/${product.slug}`}>
                    <Typography fontWeight={700} gutterBottom>
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    <Price priceWithCents={product.price} />
                  </Typography>
                </Box>
                <Typography>
                  {`${t('quantity')} : ${getItem(product.id).quantity}`}
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
