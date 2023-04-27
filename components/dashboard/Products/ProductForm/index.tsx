import { Button, Grid, Stack } from '@mui/material';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { initialValues, productFrom } from './product.validator';
import VariantsDialog from '../Variants/VariantsDialog';
import {
  createProduct,
  CreateProductInput,
  Product,
  removeProduct,
  updateProduct,
  UpdateProductInput,
} from 'lib/supabase/products';
import supabase from 'lib/supabase';
import { Category, getCategories } from 'lib/supabase/categories';
import { getShops, Shop } from 'lib/supabase/shops';
import NumericField from 'components/dashboard/Products/ProductForm/NumericField';
import TextField from 'components/dashboard/Products/ProductForm/TextField';
import SelectField from 'components/dashboard/Products/ProductForm/SelectField';
import { Delete } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { isNumber } from 'class-validator';

interface Props {
  productId: string;
  products: Product[];
  onCompletedOrUpdated: () => void;
}

export type InsertOrUpdateProduct = CreateProductInput | UpdateProductInput;

const getImageUrl = (value: string | object): string => {
  let image: object;
  try {
    image = typeof value === 'string' ? JSON.parse(value) : value;
  } catch (e) {
    return '';
  }
  const bucket = image['bucket'];
  const file = image['file'];
  const { data } = supabase.storage.from(bucket).getPublicUrl(file);
  return data ? data.publicUrl : '';
};

const ProductForm: React.FC<Props> = ({
  productId,
  products,
  onCompletedOrUpdated,
}) => {
  type FormMode = 'creation' | 'edit';

  const [modal, setModal] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<FormMode>('creation');
  const [categories, setCategories] = useState<Category[]>(null);
  const [shops, setShops] = useState<Shop[]>(null);

  const selectedProduct = useMemo(() => {
    if (!productId) return undefined;
    const product = products.find((category) => category.id === productId);
    return {
      ...product,
      categoryId: product.categoryId || '',
      shopId: product.shopId || '',
    };
  }, [productId]);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const fetchShops = async () => {
    const { data } = await getShops();
    if (data) {
      setShops(data);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchShops();
  }, []);

  const create = async (product: CreateProductInput) => {
    const { error } = await createProduct(product);
    if (error) {
      return;
    }
    onCompletedOrUpdated();
  };

  const update = async (product: UpdateProductInput) => {
    const { error } = await updateProduct(product);
    if (error) {
      console.log(error);
      return;
    }
    onCompletedOrUpdated();
  };

  const remove = async () => {
    const { error } = await removeProduct(productId);
    if (error) {
      console.log(error);
      return;
    }
    onCompletedOrUpdated();
  };

  const handleEditMode = () => {
    setFormMode('edit');
  };

  const handleCreateMode = () => {
    setFormMode('creation');
  };

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const onSubmit = (
    values: InsertOrUpdateProduct,
    actions: FormikHelpers<InsertOrUpdateProduct>,
  ) => {
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

    const sanitizeNumber = (number: number): number => {
      if (!isNumber(number)) {
        number = null;
      }
      return number;
    };

    const input = {
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

    if (formMode === 'creation') {
      return create(input);
    }

    update({
      ...input,
      id: productId,
    });

    actions.resetForm();
    setFormMode('creation');
  };

  const formValues = useMemo(() => {
    const input = {
      ...initialValues,
      price: '',
      fromPrice: '',
    };
    if (formMode === 'creation') {
      return input;
    }

    return {
      ...input,
      ...selectedProduct,
    };
  }, [formMode, selectedProduct?.id]);

  const uploadImage = async (files: FileList): Promise<object> => {
    const bucket = 'products';
    const fileName = `${productId}/main`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, files[0]);
    if (error) {
      toast.error('Erreur lors du chargement');
      return {};
    }
    toast.success('Image chargée');
    return {
      bucket,
      file: fileName,
    };
  };

  return (
    <Formik<InsertOrUpdateProduct>
      initialValues={formValues as InsertOrUpdateProduct}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={productFrom}
    >
      {({ isValid, dirty, handleSubmit }) => (
        <>
          <Stack direction={'row'} marginBottom={2} spacing={1}>
            <Button
              variant={'contained'}
              disabled={productId === null}
              onClick={handleEditMode}
            >
              {'Editer'}
            </Button>
            <Button variant={'outlined'} onClick={handleCreateMode}>
              {'Nouveau produit'}
            </Button>
            <Button
              variant={'outlined'}
              disabled={productId === null}
              onClick={remove}
            >
              <Delete />
            </Button>
            <Button
              variant={'outlined'}
              disabled={productId === null || formMode === 'creation'}
              onClick={handleModal}
            >
              {'Gérer les variantes'}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField name={'name'} />
            </Grid>
            <Grid item xs={6}>
              <TextField name={'slug'} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name={'description'}
                multiline
                minRows={2}
                maxRows={10}
              />
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'price'} />
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'fromPrice'} />
            </Grid>
            <Grid item xs={6}>
              <SelectField name={'categoryId'} datas={categories} />
            </Grid>
            <Grid item xs={6}>
              <SelectField name={'shopId'} datas={shops} menuName={'city'} />
            </Grid>
            <Grid item xs={12}>
              <Field name={'mainImage'}>
                {({
                  field: { name, value },
                  form: { setFieldValue },
                }: FieldProps) => (
                  <>
                    {value ? (
                      <img
                        src={getImageUrl(value)}
                        style={{ maxWidth: '100%' }}
                      />
                    ) : null}
                    {formMode === 'edit' ? (
                      <Button variant="contained" component="label">
                        {value ? "Remplacer l'image" : 'Ajouter une image'}
                        <input
                          name={name}
                          hidden
                          accept="image/*"
                          multiple
                          type="file"
                          onChange={async (e) => {
                            const image = await uploadImage(e.target.files);
                            setFieldValue(name, image);
                          }}
                        />
                      </Button>
                    ) : null}
                  </>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={'contained'}
                disabled={!isValid || !dirty}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {formMode === 'creation' ? 'Créer le produit' : 'Mettre à jour'}
              </Button>
            </Grid>
          </Grid>
          <VariantsDialog
            open={modal}
            handleClose={handleModal}
            productId={productId}
          />
        </>
      )}
    </Formik>
  );
};

export default ProductForm;
