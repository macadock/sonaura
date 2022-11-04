import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Categories } from 'types';
import { useCart } from 'react-use-cart';
import ProductDialog from './ProductDialog';
import { Info, Phone, ShoppingCartTwoTone } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import Shops from './Shops';
import { Grid } from '@mui/material';
import Price from 'utils/Price';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
}

const ProductDetails: React.FC<Props> = ({ product = null }) => {
  const { t } = useTranslation('product');
  const theme = useTheme();

  if (product === null) return null;

  const [selectedVariants, setSelectedVariants] = useState({});

  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<boolean>(false);

  const isOccasion = product.category.name === Categories.OCCASION;

  const dialogTitle = isOccasion ? t('preOwned.book') : t('demonstration.book');
  const dialogOrigin = isOccasion
    ? t('preOwned.origin')
    : t('demonstration.origin');
  const dialogButton = isOccasion
    ? t('preOwned.button')
    : t('demonstration.button');

  const { addItem, items } = useCart();

  const addToCart = () => {
    addItem({ id: product.id, price: product.price / 100 });
    setAlreadyAddedToCart(true);
    toast.success(t('addedToCart'));
  };

  const changeDialogState = () => {
    setDialogState((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const item = items.find((item) => item.id === product.id);
    if (item) {
      setAlreadyAddedToCart(true);
      return;
    }
    setAlreadyAddedToCart(false);
  }, [items]);

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={7}>
          <Box>
            {product.mainAsset ? (
              <Box
                sx={{
                  marginBottom: 2,
                  width: 1,
                  height: 'auto',
                  '& img': {
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                    borderRadius: 2,
                  },
                }}
              >
                <img src={product.mainAsset} alt={product.name} />
              </Box>
            ) : null}
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              {/* {media.map((item, i) => (
                <Box
                  key={i}
                  onClick={() => setCurrent(item)}
                  sx={{
                    width: 80,
                    height: 'auto',
                    cursor: 'pointer',
                    '& img': {
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                      borderRadius: 2,
                    },
                  }}
                >
                  <img src={item} alt={product.name} />
                </Box>
              ))} */}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            {product?.isNew && (
              <Box
                padding={1}
                display={'inline-flex'}
                borderRadius={1}
                bgcolor={'primary.main'}
                marginBottom={1}
              >
                <Typography sx={{ color: 'common.white', lineHeight: 1 }}>
                  {t('new')}
                </Typography>
              </Box>
            )}
            <Typography variant={'h4'} fontWeight={700}>
              {product.name}
            </Typography>
            <Box marginY={3}>
              <Box display={'flex'} alignItems={'baseline'}>
                {product.price && (
                  <>
                    <Typography variant={'h5'} fontWeight={700}>
                      <Price priceWithCents={product.price} />
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                      {t('pricePreOwnedConditions')}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Typography variant={'subtitle2'} color={'text.secondary'}>
              {product.description}
            </Typography>
            <ProductDialog
              open={dialogState}
              onClose={changeDialogState}
              title={dialogTitle}
              origin={dialogOrigin}
              button={dialogButton}
              product={product}
            />
            {product?.quantity > 0 && isOccasion ? (
              <>
                <Stack marginTop={3} direction={'column'} spacing={2}>
                  <Button
                    onClick={addToCart}
                    disabled={alreadyAddedToCart}
                    variant={'contained'}
                    color={'primary'}
                    size={'large'}
                    fullWidth
                    startIcon={<ShoppingCartTwoTone />}
                  >
                    {t('addToCart')}
                  </Button>
                  <Button
                    onClick={changeDialogState}
                    variant={'text'}
                    color={'inherit'}
                    size={'medium'}
                    fullWidth
                    startIcon={<Phone />}
                  >
                    {t('preOwned.book')}
                  </Button>
                </Stack>
              </>
            ) : (
              <Stack
                marginTop={3}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
              >
                <Button
                  onClick={changeDialogState}
                  variant={'contained'}
                  color={'primary'}
                  size={'large'}
                  fullWidth
                  startIcon={<Info />}
                >
                  {t('demonstration.book')}
                </Button>
              </Stack>
            )}
            {product.variants.length === 0 ? null : (
              <Box marginY={3}>
                {product.variants.map(({ id, type, uniqueName, values }) => {
                  switch (type) {
                    case 'COLOR':
                      return (
                        <Box key={id} marginY={2}>
                          <Typography>
                            {`${t(`attributes.${uniqueName}`)} : `}
                            <Typography component={'span'} fontWeight={700}>
                              {selectedVariants[uniqueName]?.value || ''}
                            </Typography>
                          </Typography>
                          <Stack direction={'row'} spacing={1} marginTop={0.5}>
                            {values.map((value) => (
                              <Box
                                key={value.id}
                                onClick={() =>
                                  setSelectedVariants((prev) => {
                                    return {
                                      ...prev,
                                      [uniqueName]: value,
                                    };
                                  })
                                }
                                sx={{
                                  borderRadius: '100%',
                                  padding: 0.5,
                                  border: `2px solid ${
                                    selectedVariants[uniqueName]?.id ===
                                    value.id
                                      ? theme.palette.primary.main
                                      : theme.palette.divider
                                  }`,
                                  cursor: 'pointer',
                                }}
                              >
                                <Box
                                  sx={{
                                    borderRadius: '100%',
                                    padding: 1.5,
                                    bgcolor: value.colorHex,
                                    border: `1px solid ${theme.palette.divider}`,
                                  }}
                                />
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      );

                    default:
                      return (
                        <Box key={id}>
                          <Typography>
                            {`${t(`attributes.${uniqueName}`)} : `}
                            <Typography component={'span'} fontWeight={700}>
                              {selectedVariants[uniqueName]
                                ? selectedVariants[uniqueName].value
                                : ''}
                            </Typography>
                          </Typography>
                          <Stack direction={'row'} spacing={1} marginTop={0.5}>
                            {values.map((value) => (
                              <Box
                                key={value.id}
                                onClick={() =>
                                  setSelectedVariants((prev) => {
                                    return {
                                      ...prev,
                                      [uniqueName]: value,
                                    };
                                  })
                                }
                                sx={{
                                  borderRadius: 1,
                                  padding: 1,
                                  border: `2px solid ${
                                    selectedVariants[uniqueName]?.id ===
                                    value.id
                                      ? theme.palette.primary.main
                                      : theme.palette.divider
                                  }`,
                                  cursor: 'pointer',
                                }}
                              >
                                <Typography>{value.value}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      );
                  }
                })}

                {isOccasion
                  ? product?.shops && <Shops shops={product.shops} />
                  : null}
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
