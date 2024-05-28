import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProductForm, {
  InsertOrUpdateProduct,
} from '@/components/dashboard/Products/ProductForm';
import VariantsDialog from '@/components/dashboard/Products/Variants/VariantsDialog';
import {
  getProductById,
  Product,
  removeProduct,
  updateProduct,
  UpdateProductInput,
} from '@/lib/supabase/products';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DashboardEditProductView = () => {
  const router = useRouter();
  const productId = `${router.query['id']}`;
  const { t } = useTranslation('dashboard');

  const [product, setProduct] = useState<Product | null>(null);

  const [modal, setModal] = useState<boolean>(false);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const fetchProduct = useCallback(async () => {
    const { data } = await getProductById(productId);
    if (data) {
      setProduct(data as Product);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const update = async (product: UpdateProductInput) => {
    const { error } = await updateProduct(product);
    if (error) {
      console.log(error);
      toast.error(t('products.add.error'));
      return;
    }
    toast.success(t('products.add.success'));
    router.push('/dashboard/products');
  };

  const remove = async () => {
    const { error } = await removeProduct(productId);
    if (error) {
      console.log(error);
      toast.error(t('products.remove.error'));
      return;
    }
    toast.success(t('products.remove.success'));
    router.push('/dashboard/products');
  };

  const sanitizeNumber = (number: number): number => {
    try {
      if (typeof number === 'string') {
        number = parseInt(number);
      }
    } catch (e) {
      number = null;
    }

    return number;
  };

  const onSubmit = (values: InsertOrUpdateProduct) => {
    const {
      id,
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
      id,
      name,
      description,
      fromPrice: sanitizeNumber(fromPrice),
      price: sanitizeNumber(price),
      quantity: sanitizeNumber(quantity),
      slug,
      categoryId,
      shopId: shopId === '' ? null : shopId,
      mainImage,
    };

    update(input);
  };

  const leftButtons = (
    <Button variant={'outlined'} onClick={handleModal}>
      {t('products.manageVariants')}
    </Button>
  );

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={productId === null}
      onClick={remove}
      endIcon={<Delete />}
      color="error"
    >
      {t('products.remove.cta')}
    </Button>
  );

  return (
    <Box>
      <Button
        sx={{ marginBottom: '1rem' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/products');
        }}
      >
        {t('back')}
      </Button>
      {product ? (
        <ProductForm
          formMode={'edit'}
          initialValues={product}
          onSubmit={onSubmit}
          leftButtons={leftButtons}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
      <VariantsDialog
        open={modal}
        handleClose={handleModal}
        productId={productId}
      />
    </Box>
  );
};

export default DashboardEditProductView;
