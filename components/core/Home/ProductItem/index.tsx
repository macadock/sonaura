import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import supabase from '@/lib/supabase';
import { Product } from '@/lib/supabase/products';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Price from '@/utils/Price';
import Button from '@mui/material/Button';
import Image from 'next/legacy/image';
import { pick } from 'lodash';

interface Props {
  product: Product;
  index: number;
}

const ProductItem = ({ product, index }: Props) => {
  const { t } = useTranslation('homepage', { keyPrefix: 'products' });
  const theme = useTheme();

  const getProductMainImage = (product: Product): string => {
    if (!product?.mainImage) return '';
    const bucket = pick(product.mainImage, 'bucket');
    const file = pick(product.mainImage, 'file');
    const { data } = supabase.storage
      .from(bucket as unknown as string)
      .getPublicUrl(file as unknown as string);
    return data.publicUrl;
  };

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      data-aos={'fade-up'}
      data-aos-delay={index * 100}
      data-aos-offset={100}
      data-aos-duration={600}
    >
      <Box display={'block'} width={1} height={1}>
        <Box
          component={Card}
          width={1}
          height={1}
          display={'flex'}
          flexDirection={'column'}
        >
          <Link
            passHref
            href={`/${product.categories.slug}/${product.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <CardMedia
              sx={{
                position: 'relative',
                height: { xs: 240, sm: 340, md: 280 },
                overflow: 'hidden',
                paddingBottom: 0,
                background: theme.palette.background.default,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Image
                src={getProductMainImage(product)}
                alt={product.name}
                layout={'fill'}
                objectFit={'contain'}
              />
            </CardMedia>
          </Link>
          <CardContent>
            <Typography variant={'h6'} align={'left'} sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>

            <CardActions sx={{ justifyContent: 'space-between' }}>
              {product.price ? (
                <Typography sx={{ fontWeight: 700 }} color={'primary'}>
                  <Price price={product.price} />
                </Typography>
              ) : (
                false
              )}
              {product.fromPrice ? (
                <Typography sx={{ fontWeight: 700 }} color={'primary'}>
                  {t('fromPrice')}
                  <Price price={product.fromPrice} />
                </Typography>
              ) : (
                false
              )}
              <Link
                href={`/${product.categories.slug}/${product.slug}`}
                style={{ textDecoration: 'none' }}
                passHref
              >
                <Button
                  variant={'outlined'}
                  startIcon={
                    <Box
                      component={'svg'}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={20}
                      height={20}
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </Box>
                  }
                >
                  {t('moreDetails')}
                </Button>
              </Link>
            </CardActions>
          </CardContent>
        </Box>
      </Box>
    </Grid>
  );
};

export default ProductItem;
