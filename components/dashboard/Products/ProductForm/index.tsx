import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { productFrom } from './product.validator';
import { CreateProductInput, UpdateProductInput } from 'lib/supabase/products';
import supabase from 'lib/supabase';
import { CategoryType, getCategories } from 'lib/supabase/categories';
import { getShops, Shop } from 'lib/supabase/shops';
import NumericField from 'components/system/Form/NumericField';
import TextField from 'components/system/Form/TextField';
import SelectField from 'components/system/Form/SelectField';
import toast from 'react-hot-toast';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';

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

interface Props {
  formMode: 'create' | 'edit';
  initialValues: InsertOrUpdateProduct;
  onSubmit: (
    values: InsertOrUpdateProduct,
    actions?: FormikHelpers<InsertOrUpdateProduct>,
  ) => void;
  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;
}

const ProductForm: React.FC<Props> = ({
  formMode,
  initialValues,
  onSubmit,
  leftButtons = null,
  rightButtons = null,
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const { t } = useTranslation('dashboard');

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

  const uploadImage = async (files: FileList): Promise<object> => {
    const bucket = 'products';
    const fileName = crypto.randomUUID();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, files[0]);
    if (error) {
      toast.error(t('image.error'));
      return {};
    }
    toast.success(t('image.success'));
    return {
      bucket,
      file: fileName,
    };
  };

  return (
    <Formik<InsertOrUpdateProduct>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={productFrom}
    >
      {({ isValid, dirty, handleSubmit }) => (
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction={'row'}
                marginBottom={2}
                spacing={1}
                display={'flex'}
                justifyContent={'space-between'}
              >
                <Box display={'flex'} gap={'1rem'}>
                  <Button
                    variant={'contained'}
                    disabled={!isValid || !dirty}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {formMode === 'create'
                      ? t('products.add.cta')
                      : t('products.edit.cta')}
                  </Button>
                  {leftButtons}
                </Box>
                {rightButtons}
              </Stack>
            </Grid>
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
              {categories ? (
                <SelectField name={'categoryId'} datas={categories} />
              ) : (
                false
              )}
            </Grid>
            <Grid item xs={6}>
              {shops ? (
                <SelectField name={'shopId'} datas={shops} menuName={'city'} />
              ) : (
                false
              )}
            </Grid>
            <Grid item xs={6}>
              <NumericField name={'quantity'} />
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
                        alt={name}
                        style={{ maxWidth: '100%' }}
                      />
                    ) : null}
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
                  </>
                )}
              </Field>
            </Grid>
          </Grid>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default ProductForm;
