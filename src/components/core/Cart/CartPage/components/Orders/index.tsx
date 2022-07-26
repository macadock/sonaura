import React, { useEffect, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useCart } from 'react-use-cart';
import { useQuery } from '@apollo/client';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../../../../../gql/__generated__/get-products-by-ids';
import { GET_PRODUCTS_BY_IDS } from '../../../../../../../gql/get-products';
import NumberFormat from 'react-number-format';
import { useTranslation } from 'next-i18next';
import { Delete } from '@mui/icons-material';
import NextLink from 'next/link';

const Orders: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('common', { keyPrefix: 'cart' });
  const { isEmpty, items, removeItem, getItem } = useCart();

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
      {isEmpty ? (
        <Box marginY={'1.5rem'}>
          <Typography>{t('empty')}</Typography>
          <Link href={'/occasion'}>{t('discoverPreOwnedProducts')}</Link>
        </Box>
      ) : (
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
                  >
                    <Box sx={{ order: 1 }}>
                      <Link href={`/${product.category.slug}/${product.slug}`}>
                        <Typography fontWeight={700} gutterBottom>
                          {product.name}
                        </Typography>
                      </Link>
                    </Box>
                    <Stack
                      spacing={1}
                      direction={{ xs: 'row', sm: 'column' }}
                      marginTop={{ xs: 2, sm: 0 }}
                      sx={{ order: { xs: 3, sm: 2 } }}
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
                        {t('delete')}
                      </Link>
                    </Stack>
                    <Stack
                      spacing={1}
                      direction={'row'}
                      alignItems={'center'}
                      marginTop={{ xs: 2, sm: 0 }}
                      sx={{ order: { xs: 2, sm: 3 } }}
                    >
                      <Typography>
                        {`${t('quantity')} : ${getItem(product.id).quantity}`}
                      </Typography>
                      <Typography fontWeight={700} marginLeft={2}>
                        <NumberFormat
                          value={product.price}
                          displayType="text"
                          thousandSeparator=" "
                          suffix=" €"
                          decimalSeparator=","
                        />
                      </Typography>
                    </Stack>
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
      )}
    </>
  );
};

export default Orders;
