import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import ProductForm from '@/components/dashboard/Products/ProductForm';
import { initialValues } from '@/components/dashboard/Products/ProductForm/product.validator';
import { createProduct, CreateProductInput } from '@/lib/supabase/products';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DashboardNewProductView = () => {
  const router = useRouter();

  const { t } = useTranslation('dashboard');

  const create = async (product: CreateProductInput) => {
    const { error } = await createProduct(product);
    if (error) {
      console.log(error);
      toast.error(t('products.add.error'));
      return;
    }
    toast.success(t('products.add.success'));
    router.push('/dashboard/products');
  };

  const sanitizeNumber = (number: string | number | null): number | null => {
    try {
      if (typeof number === 'string') {
        number = parseInt(number);
      }
    } catch (e) {
      number = null;
    }

    return number;
  };

  const onSubmit = (values: CreateProductInput) => {
    const {
      name,
      description,
      fromPrice,
      price,
      quantity,
      slug,
      categoryId,
      shopId,
      mainImage,
    } = values;

    const input = {
      name,
      description,
      fromPrice: sanitizeNumber(fromPrice || null),
      price: sanitizeNumber(price || null),
      quantity: sanitizeNumber(quantity || null),
      slug,
      categoryId,
      shopId: shopId === '' ? null : shopId,
      mainImage,
    };
    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/products');
        }}
      >
        {t('back')}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {t('products.add.title')}
      </Typography>
      <ProductForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewProductView;
