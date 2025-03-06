import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useCart } from 'react-use-cart';
import ProductDialog from './ProductDialog';
import Info from '@mui/icons-material/Info';
import Phone from '@mui/icons-material/Phone';
import ShoppingCartTwoTone from '@mui/icons-material/ShoppingCartTwoTone';
import { useTranslation } from 'next-i18next';
import toast from 'react-hot-toast';
import Grid from '@mui/material/Grid';
import Price from '@/utils/Price';

import { Product } from 'lib/supabase/products';
import { useRouter } from 'next/router';
import supabase from 'lib/supabase';
import { VariantImage, Variant } from 'types';
import Chip from '@mui/material/Chip';
import Image from 'next/legacy/image';

interface Props {
  product: Product;
}

const ProductDetails: React.FC<Props> = ({ product = null }) => {
  const { t } = useTranslation('product');
  const theme = useTheme();
  const router = useRouter();
  const categorySlug = router.query.category as string;

  const getProductMainImage = useCallback((): string => {
    if (!product?.mainImage) return '';
    const bucket = product.mainImage['bucket'];
    const file = product.mainImage['file'];
    const { data } = supabase.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
  }, [product.mainImage]);

  const getProductImage = (image: VariantImage): string => {
    const bucket = image.image['bucket'];
    const file = image.image['file'];
    const { data } = supabase.storage.from(bucket).getPublicUrl(file);
    return data.publicUrl;
  };

  const [variants, variantNames] = useMemo(() => {
    if (product.variants === null) return [[], []];
    const variants = product.variants as Variant[];
    return [variants, variants.map((variant) => variant.name).sort()];
  }, [product.variants]);

  const [selectedVariants, setSelectedVariants] = useState<
    { name: string; value: string }[]
  >([]);

  const [variantImages, setVariantImages] = useState<VariantImage[]>([]);
  const mainImage = useMemo(() => {
    return getProductMainImage();
  }, [getProductMainImage]);
  const [current, setCurrent] = useState<string>(mainImage);

  const [alreadyAddedToCart, setAlreadyAddedToCart] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState<boolean>(false);

  const [priceVariant, setPriceVariant] = useState<number | undefined>(
    undefined,
  );

  const noOptionSelected = selectedVariants.length === 0;
  const isMissingOptionSelection =
    selectedVariants.length < variantNames.length;

  useEffect(() => {
    if (noOptionSelected || isMissingOptionSelection) {
      setVariantImages([]);
      setCurrent(getProductMainImage());
      setPriceVariant(undefined);
      return;
    }

    const keys = selectedVariants.map((variant) => variant.name);
    const images = (product.variantsImages as VariantImage[]).filter(
      (variantImage) => {
        const keep: boolean[] = [];
        keys.forEach((key) => {
          const getVariant = selectedVariants.find((s) => s.name === key);
          const variant = variantImage.variants.find(
            (variant) => variant.value === getVariant.value,
          );
          if (variant) {
            keep.push(true);
          } else {
            keep.push(false);
          }
        });
        const hasFalseValues = keep.find((k) => k === false);
        return hasFalseValues === undefined ? true : false;
      },
    );
    setPriceVariant(parseInt(images[0].price) || undefined);
    setVariantImages(images);
  }, [
    getProductMainImage,
    isMissingOptionSelection,
    noOptionSelected,
    product.variantsImages,
    selectedVariants,
  ]);

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
    addItem({
      id: product.id,
      price: priceVariant || product?.price,
      quantity: 1,
    });
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
  }, [items, product.id]);

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

  const handleVariantDeletion = (variantName: string) => {
    setSelectedVariants((prev) =>
      prev.filter((variant) => variant.name !== variantName),
    );
  };

  useEffect(() => {
    if (variantImages.length > 0) {
      setCurrent(getProductImage(variantImages[0]));
    }
  }, [variantImages]);

  if (product === null) return null;

  return (
    <Box sx={{ marginTop: '2rem' }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={7}>
          <Box>
            {current && (
              <Box
                position={'relative'}
                sx={{
                  marginBottom: 2,
                  width: '100%',
                  aspectRatio: '1 / 1',
                }}
              >
                <Image
                  src={current}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
            )}
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              flexWrap={'wrap'}
            >
              <Box
                position={'relative'}
                sx={{
                  width: 80,
                  height: 80,
                  cursor: 'pointer',
                  '& img': {
                    width: 1,
                    height: 1,
                    objectFit: 'cover',
                    borderRadius: 2,
                  },
                }}
                onClick={() => setCurrent(getProductMainImage())}
              >
                <Image
                  src={mainImage}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              {variantImages.map((item, i) => (
                <Box
                  key={i}
                  position={'relative'}
                  onClick={() => setCurrent(getProductImage(item))}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: 'pointer',
                    '& img': {
                      width: 1,
                      height: 1,
                      objectFit: 'cover',
                      borderRadius: 2,
                    },
                  }}
                >
                  <Bubble
                    color={theme.palette.primary.main}
                    position={'absolute'}
                  />
                  <Image
                    src={getProductImage(item)}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              ))}
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
                {priceVariant || product.price ? (
                  <>
                    <Typography variant={'h5'} fontWeight={700}>
                      <Price price={priceVariant || product.price} />
                    </Typography>
                    {isOccasion ? (
                      <Typography variant="body2" sx={{ marginLeft: '0.5rem' }}>
                        {t('pricePreOwnedConditions')}
                      </Typography>
                    ) : (
                      false
                    )}
                  </>
                ) : (
                  false
                )}
                {product.fromPrice && !priceVariant ? (
                  <>
                    <Typography variant={'h5'} fontWeight={700}>
                      {t('fromPrice')}
                      <Price price={product.fromPrice} />
                    </Typography>
                  </>
                ) : (
                  false
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
              isOccasion={isOccasion}
            />
            {isOccasion ? (
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
                <Typography fontWeight={'bold'}>
                  {t(`attributes.${variantName}`)}
                </Typography>
                <Stack
                  direction={'row'}
                  flexWrap={'wrap'}
                  gap={1}
                  marginTop={0.5}
                >
                  {variants
                    .find((v) => v.name === variantName)
                    .values.map((value) => (
                      <Chip
                        label={value}
                        key={value}
                        sx={{
                          border: `2px solid ${
                            selectedVariants.find(
                              (variant) => variant.name === variantName,
                            )?.value === value
                              ? theme.palette.primary.main
                              : theme.palette.divider
                          }`,
                        }}
                        onClick={() => {
                          handleVariantSelection(variantName, value);
                        }}
                        onDelete={
                          selectedVariants.find(
                            (variant) => variant.name === variantName,
                          )?.value === value
                            ? () => {
                                handleVariantDeletion(variantName);
                              }
                            : null
                        }
                      />
                    ))}
                </Stack>
              </Box>
            ))}
            {!noOptionSelected && isMissingOptionSelection ? (
              <Typography variant={'caption'}>
                {t('selectAllVariants')}
              </Typography>
            ) : (
              false
            )}
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
