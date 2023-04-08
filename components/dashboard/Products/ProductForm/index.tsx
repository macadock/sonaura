import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from 'gql/product';
import {
  initialValues,
  productFrom,
  productFormTypes,
} from './product.validator';
import { GET_CATEGORIES } from 'gql/category';
import { GET_SHOPS } from 'gql/shop';
import VariantsDialog from '../Variants/VariantsDialog';

interface Props {
  productId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any[];
  onCompletedOrUpdated: () => void;
}

const ProductForm: React.FC<Props> = ({
  productId,
  products,
  onCompletedOrUpdated,
}) => {
  type FormMode = 'creation' | 'edit';

  const [modal, setModal] = useState<boolean>(false);
  const [formMode, setFormMode] = useState<FormMode>('creation');
  const selectedProduct = useMemo(() => {
    if (!productId) return undefined;
    const product = products.find((category) => category.id === productId);
    return {
      ...product,
      categoryId: product.category.id || '',
      shopId: product.shop?.id || '',
    };
  }, [productId]);

  const [createCategory] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      onCompletedOrUpdated();
    },
  });

  const [updateCategory] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      onCompletedOrUpdated();
    },
  });

  const { data: categories } = useQuery(GET_CATEGORIES);

  const { data: shops } = useQuery(GET_SHOPS);

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
    values: productFormTypes,
    actions: FormikHelpers<productFormTypes>,
  ) => {
    const {
      name,
      description,
      fromPrice,
      mainAsset,
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
      mainAsset,
      price,
      quantity,
      slug,
      categoryId,
      shopId,
    };

    if (formMode === 'creation') {
      return createCategory({
        variables: {
          createProductInput: {
            ...input,
          },
        },
      });
    }

    updateCategory({
      variables: {
        updateProductInput: {
          ...input,
          id: productId,
        },
      },
    });

    actions.resetForm();
    setFormMode('creation');
  };

  return (
    <Formik<productFormTypes>
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
                    {categories?.categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
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
                    {shops?.shops.map((shop) => (
                      <MenuItem key={shop.id} value={shop.id}>
                        {shop.city}
                      </MenuItem>
                    ))}
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
