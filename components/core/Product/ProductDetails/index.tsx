import React, { useEffect, useMemo, useState } from 'react';
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
import { BoxProps } from '@mui/system';
import { Product } from 'lib/supabase/products';
import { useSiteData } from 'contexts/data';
import { useRouter } from 'next/router';
import supabase from 'lib/supabase';

interface Props {
  product: Product;
}

type Attribute = {
  name: string;
  values: string[];
};

const getProductMainImage = (productId: string): string => {
  const bucket = 'products';
  const file = `${productId}/main`;
  const { data } = supabase.storage.from(bucket).getPublicUrl(file);
  return data.publicUrl;
};

const ProductDetails: React.FC<Props> = ({ product = null }) => {
  const { t } = useTranslation('product');
  const theme = useTheme();
  const router = useRouter();
  const categorySlug = router.query.category as string;
  const { categories } = useSiteData();
  const category = useMemo(() => {
    if (!categories) {
      return null;
    }
    return categories.find((category) => category.slug === categorySlug);
  }, [categorySlug, categories?.length]);

  if (product === null) return null;

  const [variants, variantNames] = useMemo(() => {
    if (product.variants === null) return [[], []];
    const variants = product.variants as Attribute[];
    return [variants, variants.map((variant) => variant.name).sort()];
  }, []);

  const [selectedVariants, setSelectedVariants] = useState<
    { name: string; value: string }[]
  >([]);

  const [variantImages, setVariantImages] = useState<string[]>([]);
  const mainImage = useMemo(() => {
    return getProductMainImage(product.id);
  }, [categorySlug]);
  const [current, setCurrent] = useState(mainImage);

  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<boolean>(false);

  const isOccasion = categorySlug === 'occasion';

  const dialogTitle = isOccasion ? t('preOwned.book') : t('demonstration.book');
  const dialogOrigin = isOccasion
    ? t('preOwned.origin')
    : t('demonstration.origin');
  const dialogButton = isOccasion
    ? t('preOwned.button')
    : t('demonstration.button');

  const { addItem, items } = useCart();

  const addToCart = () => {
    addItem({ id: product.id, price: product?.price, quantity: 1 });
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
    const item = items.find((item) => item.id === product.id);
    if (item) {
      setAlreadyAddedToCart(true);
      return;
    }
    setAlreadyAddedToCart(false);
  }, [items]);

  // const variantAssets = useMemo(() => {
  //   if (currentProduct.assetsByProductVariants === null) return null;

  //   const selectedAttributes = [
  //     size,
  //     color,
  //     positionning,
  //     frameColor,
  //     soundbarColor,
  //     supportColor,
  //   ].filter((val) => val !== null);

  //   if (selectedAttributes.length === 0) return null;

  //   const { assetsByProductVariants } = currentProduct;

  //   return assetsByProductVariants.filter((asset) => {
  //     const filterResult = selectedAttributes.map((attribute) => {
  //       switch (attribute.__typename) {
  //         case 'ProductSize':
  //           return asset.size === attribute.size;
  //         case 'ProductFrameColor':
  //           return asset.frameColor === attribute.frameColor;
  //         case 'ProductColor':
  //           return asset.color === attribute.color;
  //         case 'ProductPositionning':
  //           return asset.positionning === attribute.positionning;
  //         case 'ProductSoundbarColor':
  //           return asset.soundbarColor === attribute.color;
  //         case 'ProductSupportColor':
  //           return asset.supportColor === attribute.supportColor;
  //       }
  //     });

  //     return filterResult.find((res) => res === false) === undefined
  //       ? true
  //       : false;
  //   });
  // }, [size, color, positionning, frameColor, soundbarColor, supportColor]);

  // useEffect(() => {
  //   if (currentProduct.assetsByProductVariants === null) return null;

  //   if (variantAssets) {
  //     const assetsToAdd = variantAssets.flatMap((variant) => variant.asset);
  //     setVariantImages([...assetsToAdd]);
  //   }
  // }, [variantAssets]);

  const handleVariantSelection = (variantName: string, value: string) => {
    setSelectedVariants((prev) => {
      const otherVariants = prev.filter(
        (variant) => variant.name !== variantName,
      );
      const selectedVariant = {
        name: variantName,
        value,
      };

      return [...otherVariants, selectedVariant];
    });
  };

  useEffect(() => {
    if (variantImages.length > 0) {
      setCurrent(variantImages[0]);
    }
  }, [variantImages]);

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
                <img src={current} alt={product.name} />
              </Box>
            )}
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Box
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
                <img src={mainImage} alt={product.name} />
              </Box>
              {variantImages.length > 0
                ? variantImages.map((item, i) => (
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
                        position: 'relative',
                      }}
                    >
                      <Bubble
                        color={theme.palette.primary.main}
                        position={'absolute'}
                      />
                      <img src={item} alt={product.name} />
                    </Box>
                  ))
                : null}
            </Stack>
            {variantImages.length > 0 ? (
              <Box display={'flex'} alignItems={'center'} gap={'0.5rem'}>
                <Bubble color={theme.palette.primary.main} />
                <Typography variant={'caption'}>
                  {'Dépend des options sélectionnées'}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box>
            {/* {currentProduct.isNew && (
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
            )} */}
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
            <Typography
              whiteSpace={'break-spaces'}
              variant={'subtitle2'}
              color={'text.secondary'}
            >
              {product.description}
            </Typography>
            <ProductDialog
              open={dialogState}
              onClose={onDialogClose}
              title={dialogTitle}
              origin={dialogOrigin}
              button={dialogButton}
              product={product}
            />
            {product.quantity > 0 && isOccasion ? (
              <>
                <Stack marginTop={3} direction={'column'} spacing={2}>
                  <Button
                    onClick={addToCart}
                    disabled={alreadyAddedToCart || product.quantity <= 0}
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
            {variantNames.map((variantName) => (
              <Box key={variantName} marginY={3}>
                <Typography>
                  {`${t(`attributes.${variantName}`)} : `}
                  <Typography component={'span'} fontWeight={700}>
                    {
                      selectedVariants.find(
                        (variant) => variant.name === variantName,
                      )?.value
                    }
                  </Typography>
                </Typography>
                <Stack direction={'row'} spacing={1} marginTop={0.5}>
                  {variants
                    .find((v) => v.name === variantName)
                    .values.map((value) => (
                      <Box
                        key={value}
                        onClick={() => {
                          handleVariantSelection(variantName, value);
                        }}
                        sx={{
                          borderRadius: 1,
                          padding: 1,
                          border: `2px solid ${
                            selectedVariants.find(
                              (variant) => variant.name === variantName,
                            )?.value === value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                          cursor: 'pointer',
                        }}
                      >
                        <Typography>{value}</Typography>
                      </Box>
                    ))}
                </Stack>
              </Box>
            ))}
            {/* <Box marginY={3}>
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

              {isOccasion
                ? product?.shopId && (
                    <Shops shops={currentProduct.shops} />
                  )
                : null}
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const Bubble: React.FC<BoxProps> = ({ color, ...props }) => (
  <Box
    {...props}
    sx={{
      borderRadius: '50%',
      width: '0.5rem',
      height: '0.5rem',
      backgroundColor: color,
    }}
  ></Box>
);

export default ProductDetails;
