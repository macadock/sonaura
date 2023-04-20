import {
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
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
import { Categories } from 'types';
import { getShops, Shop } from 'lib/supabase/shops';

interface Props {
  productId: string;
  products: Product[];
  onCompletedOrUpdated: () => void;
}

export type InsertOrUpdateProduct = CreateProductInput | UpdateProductInput;

const getImageUrl = (value: string | object): string => {
  let image: object;
  console.log(value);
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
      return;
    }
    onCompletedOrUpdated();
  };

  const remove = async () => {
    const { error } = await removeProduct(productId);
    if (error) {
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
    } = values;

    const input = {
      name,
      description,
      fromPrice,
      price,
      quantity,
      slug,
      categoryId,
      shopId,
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

  return (
    <Formik<InsertOrUpdateProduct>
      initialValues={formMode === 'creation' ? initialValues : selectedProduct}
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
              {'Créer un nouveau produit'}
            </Button>
            <Button
              variant={'outlined'}
              disabled={productId === null}
              onClick={handleModal}
            >
              {'Gérer les variantes'}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Field name={'name'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name={'slug'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'description'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name={'price'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    type={'number'}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name={'fromPrice'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    type={'number'}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name={'categoryId'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <Select
                    fullWidth
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={touched && Boolean(error)}
                  >
                    {categories
                      ? categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))
                      : false}
                  </Select>
                )}
              </Field>
            </Grid>
            <Grid item xs={6}>
              <Field name={'shopId'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <Select
                    fullWidth
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={touched && Boolean(error)}
                  >
                    {shops
                      ? shops.map((shop) => (
                          <MenuItem key={shop.id} value={shop.id}>
                            {shop.city}
                          </MenuItem>
                        ))
                      : false}
                  </Select>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'mainAsset'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    label={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={touched && error ? '' : null}
                    fullWidth
                  />
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
