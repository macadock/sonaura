import { ArrowBack, Delete } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import ProductForm, {
  InsertOrUpdateProduct,
} from 'components/dashboard/Products/ProductForm';
import VariantsDialog from 'components/dashboard/Products/Variants/VariantsDialog';
import {
  getProductById,
  Product,
  removeProduct,
  updateProduct,
  UpdateProductInput,
} from 'lib/supabase/products';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const DashboardEditProductView: React.FC = () => {
  const router = useRouter();
  const productId = `${router.query['id']}`;

  const [product, setProduct] = useState<Product | null>(null);

  const [modal, setModal] = useState<boolean>(false);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const fetchProduct = async () => {
    const { data } = await getProductById(productId);
    if (data) {
      setProduct(data);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const update = async (product: UpdateProductInput) => {
    const { error } = await updateProduct(product);
    if (error) {
      console.log(error);
      toast.error('Erreur lors de la mise à jour');
      return;
    }
    toast.success('Le produit a été mis à jour');
    router.push('/dashboard/products');
  };

  const remove = async () => {
    const { error } = await removeProduct(productId);
    if (error) {
      console.log(error);
      toast.error('Erreur lors de la suppression');
      return;
    }
    toast.success(`Le produit a été supprimé`);
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
      {'Gérer les variantes'}
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
      {'Supprimer le produit'}
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
        {'Retour'}
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