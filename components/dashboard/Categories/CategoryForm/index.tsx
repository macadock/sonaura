import { Box, Button, Grid, Input, Stack, TextField } from '@mui/material';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import supabase from 'lib/supabase';
import {
  Category,
  createCategory,
  CreateCategoryInput,
  removeCategory,
  updateCategory,
  UpdateCategoryInput,
} from 'lib/supabase/categories';
import { ChangeEvent, useMemo, useState } from 'react';
import { initialValues, categoryForm } from './category.validator';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

interface Props {
  categoryId: string;
  categories: Category[];
  onCompletedOrUpdated: () => void;
}

export type InsertOrUpdateCategory = CreateCategoryInput | UpdateCategoryInput;

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

const CategoryForm: React.FC<Props> = ({
  categoryId,
  categories,
  onCompletedOrUpdated,
}) => {
  type FormMode = 'creation' | 'edit';
  const [formMode, setFormMode] = useState<FormMode>('creation');
  const selectedCategory = useMemo((): Category => {
    if (!categoryId) return undefined;
    return categories.find((category) => category.id === categoryId);
  }, [categoryId]);

  const create = async (category: CreateCategoryInput) => {
    const { error } = await createCategory(category);
    if (error) {
      return;
    }
    onCompletedOrUpdated();
  };

  const update = async (category: UpdateCategoryInput) => {
    const { error } = await updateCategory(category);
    if (error) {
      return;
    }
    onCompletedOrUpdated();
  };

  const remove = async () => {
    const { error } = await removeCategory(categoryId);
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

  const onSubmit = (
    values: InsertOrUpdateCategory,
    actions: FormikHelpers<InsertOrUpdateCategory>,
  ) => {
    const { icon, name, slug } = values;
    const input = {
      name,
      slug,
      icon,
    };

    if (formMode === 'creation') {
      return create(input);
    }

    update({
      ...input,
      id: categoryId,
    });

    actions.resetForm();
    setFormMode('creation');
  };

  const uploadImage = async (files: FileList): Promise<object> => {
    const bucket = 'categories';
    const fileName = uuidv4();
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
    <Formik<InsertOrUpdateCategory>
      initialValues={formMode === 'creation' ? initialValues : selectedCategory}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={categoryForm}
    >
      {({ isValid, dirty, handleSubmit }) => (
        <>
          <Stack direction={'row'} marginBottom={2} spacing={1}>
            <Button
              variant={'outlined'}
              disabled={categoryId === null}
              onClick={handleEditMode}
            >
              {'Editer'}
            </Button>
            <Button
              variant={'outlined'}
              disabled={categoryId === null}
              onClick={remove}
            >
              {'Supprimer'}
            </Button>
            <Button variant={'outlined'} onClick={handleCreateMode}>
              {'Créer une nouvelle catégorie'}
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
              <Field name={'icon'}>
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
            <Grid item xs={12}>
              <Button
                variant={'contained'}
                disabled={!isValid || !dirty}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {formMode === 'creation'
                  ? 'Créer la catégorie'
                  : 'Mettre à jour'}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Formik>
  );
};

export default CategoryForm;
