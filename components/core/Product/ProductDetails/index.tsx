import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Product } from 'gql/__generated__/product';
import { Categories } from 'types';
import { useCart } from 'react-use-cart';
import ProductDialog from './ProductDialog';
import { Info, Phone, ShoppingCartTwoTone } from '@mui/icons-material';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import Shops from './Shops';
import { Grid } from '@mui/material';
import Price from 'utils/Price';

type Image = Product['product']['mainAsset'];

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product = null }) => {
  const { t } = useTranslation('product');
  const theme = useTheme();

  if (product === null) return null;

  const { product: currentProduct } = product;
  const basicAssets = [currentProduct.mainAsset, ...currentProduct.assets];

  const [media, setMedia] = useState<Array<{ url: string }>>(basicAssets);
  const [current, setCurrent] = useState<Image>(media[0]);

  const [size, setSize] = useState<Product['product']['sizes'][number]>(null);
  const [color, setColor] =
    useState<Product['product']['colors'][number]>(null);
  const [positionning, setPositionning] =
    useState<Product['product']['positionnings'][number]>(null);
  const [frameColor, setFrameColor] =
    useState<Product['product']['frameColors'][number]>(null);
  const [soundbarColor, setSoundbarColor] =
    useState<Product['product']['soundbarColors'][number]>(null);
  const [supportColor, setSupportColor] =
    useState<Product['product']['supportColors'][number]>(null);
  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<boolean>(false);

  const isOccasion = currentProduct.category.name === Categories.OCCASION;

  const dialogTitle = isOccasion ? t('preOwned.book') : t('demonstration.book');
  const dialogOrigin = isOccasion
    ? t('preOwned.origin')
    : t('demonstration.origin');
  const dialogButton = isOccasion
    ? t('preOwned.button')
    : t('demonstration.button');

  const { addItem, items } = useCart();

  const addToCart = () => {
    addItem({ id: currentProduct.id, price: currentProduct.price / 100 });
    setAlreadyAddedToCart(true);
    toast.success(t('addedToCart'));
  };

  const openDialog = () => {
    setDialogState(true);
  };

  const onDialogClose = () => {
    setDialogState(false);
  };

  useEffect(() => {
    const item = items.find((item) => item.id === currentProduct.id);
    if (item) {
      setAlreadyAddedToCart(true);
      return;
    }
    setAlreadyAddedToCart(false);
  }, [items]);

  const variantAssets = useMemo(() => {
    if (currentProduct.assetsByProductVariants === null) return null;

    const selectedAttributes = [
      size,
      color,
      positionning,
      frameColor,
      soundbarColor,
      supportColor,
    ].filter((val) => val !== null);

    if (selectedAttributes.length === 0) return null;

    const { assetsByProductVariants } = currentProduct;

    return assetsByProductVariants.filter((asset) => {
      const filterResult = selectedAttributes.map((attribute) => {
        switch (attribute.__typename) {
          case 'ProductSize':
            return asset.size === attribute.size;
          case 'ProductFrameColor':
            return asset.frameColor === attribute.frameColor;
          case 'ProductColor':
            return asset.color === attribute.color;
          case 'ProductPositionning':
            return asset.positionning === attribute.positionning;
          case 'ProductSoundbarColor':
            return asset.soundbarColor === attribute.color;
          case 'ProductSupportColor':
            return asset.supportColor === attribute.supportColor;
        }
      });

      return filterResult.find((res) => res === false) === undefined
        ? true
        : false;
    });
  }, [size, color, positionning, frameColor, soundbarColor, supportColor]);

  useEffect(() => {
    if (currentProduct.assetsByProductVariants === null) return null;

    if (variantAssets) {
      const assetsToAdd = variantAssets.flatMap((variant) => variant.asset);
      setMedia([...assetsToAdd, ...basicAssets]);
    }
  }, [variantAssets]);

  useEffect(() => {
    setCurrent(media[0]);
  }, [media]);

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={7}>
          <Box>
            {current && (
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
                <img src={current.url} alt={currentProduct.name} />
              </Box>
            )}
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              {media.map((item, i) => (
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
                  <img src={item.url} alt={currentProduct.name} />
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            {currentProduct.isNew && (
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
              {currentProduct.name}
            </Typography>
            <Box marginY={3}>
              <Box display={'flex'} alignItems={'baseline'}>
                {currentProduct.price && (
                  <>
                    <Typography variant={'h5'} fontWeight={700}>
                      <Price priceWithCents={currentProduct.price} />
                    </Typography>
                    <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                      {t('pricePreOwnedConditions')}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            <Typography
              whiteSpace={'break-spaces'}
              variant={'subtitle2'}
              color={'text.secondary'}
            >
              {currentProduct.description}
            </Typography>
            <ProductDialog
              open={dialogState}
              onClose={onDialogClose}
              title={dialogTitle}
              origin={dialogOrigin}
              button={dialogButton}
              product={currentProduct}
            />
            {currentProduct.quantity > 0 && isOccasion ? (
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
                    onClick={openDialog}
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
                  onClick={openDialog}
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
            <Box marginY={3}>
              {currentProduct.sizes.length > 0 && (
                <Box>
                  <Typography>
                    {`${t('attributes.size')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {size?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.sizes.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setSize(item)}
                        sx={{
                          borderRadius: 1,
                          padding: 1,
                          border: `2px solid ${
                            size?.id === item.id
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          cursor: 'pointer',
                        }}
                      >
                        <Typography>{item.name}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {currentProduct.colors.length > 0 && (
                <Box marginY={2}>
                  <Typography>
                    {`${t('attributes.color')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {color?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.colors.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setColor(item)}
                        sx={{
                          borderRadius: '100%',
                          padding: 0.5,
                          border: `2px solid ${
                            color?.id === item.id
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
                            bgcolor: item.colorCode.hex,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {currentProduct.frameColors.length > 0 && (
                <Box marginY={2}>
                  <Typography>
                    {`${t('attributes.frameColor')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {frameColor?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.frameColors.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setFrameColor(item)}
                        sx={{
                          borderRadius: '100%',
                          padding: 0.5,
                          border: `2px solid ${
                            frameColor?.id === item.id
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
                            bgcolor: item.colorCode.hex,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {currentProduct.soundbarColors.length > 0 && (
                <Box marginY={2}>
                  <Typography>
                    {`${t('attributes.soundbarColor')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {soundbarColor?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.soundbarColors.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setSoundbarColor(item)}
                        sx={{
                          borderRadius: '100%',
                          padding: 0.5,
                          border: `2px solid ${
                            soundbarColor?.id === item.id
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
                            bgcolor: item.colorCode.hex,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {currentProduct.supportColors.length > 0 && (
                <Box marginY={2}>
                  <Typography>
                    {`${t('attributes.supportColor')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {supportColor?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.supportColors.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setSupportColor(item)}
                        sx={{
                          borderRadius: '100%',
                          padding: 0.5,
                          border: `2px solid ${
                            supportColor?.id === item.id
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
                            bgcolor: item.colorCode.hex,
                            border: `1px solid ${theme.palette.divider}`,
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
              {currentProduct.positionnings.length > 0 && (
                <Box marginY={2}>
                  <Typography>
                    {`${t('attributes.support')} : `}
                    <Typography component={'span'} fontWeight={700}>
                      {positionning?.name || ''}
                    </Typography>
                  </Typography>
                  <Stack direction={'row'} spacing={1} marginTop={0.5}>
                    {currentProduct.positionnings.map((item) => (
                      <Box
                        key={item.id}
                        onClick={() => setPositionning(item)}
                        sx={{
                          borderRadius: 1,
                          padding: 1,
                          border: `2px solid ${
                            positionning?.id === item.id
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          cursor: 'pointer',
                        }}
                      >
                        <Typography>{item.name}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}

              {isOccasion
                ? currentProduct?.shops && (
                    <Shops shops={currentProduct.shops} />
                  )
                : null}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
