import { useMutation } from '@apollo/client';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Category } from '@prisma/client';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from 'gql/category';
import { client } from 'lib/apollo';
import {
  initialValues,
  categoryForm,
  categoryFormTypes,
} from './category.validator';

interface Props {
  categoryId: string;
  categories: Category[];
  onCompletedOrUpdated: () => void;
}

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

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    client,
    onCompleted: () => {
      onCompletedOrUpdated();
    },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    client,
    onCompleted: () => {
      onCompletedOrUpdated();
    },
  });

  const handleEditMode = () => {
    setFormMode('edit');
  };

  const handleCreateMode = () => {
    setFormMode('creation');
  };

  const onSubmit = (
    values: categoryFormTypes,
    actions: FormikHelpers<categoryFormTypes>,
  ) => {
    const { icon, name, slug } = values;
    const input = {
      name,
      slug,
      icon,
    };

    if (formMode === 'creation') {
      return createCategory({
        variables: {
          createCategoryInput: {
            ...input,
          },
        },
      });
    }

    updateCategory({
      variables: {
        updateCategoryInput: {
          ...input,
          id: categoryId,
        },
      },
    });

    actions.resetForm();
    setFormMode('creation');
  };

  return (
    <Formik<categoryFormTypes>
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
            <Field name={'icon'}>
              {({
                field: { name, onBlur, onChange, value },
                meta: { error, touched },
              }: FieldProps) => (
                <>
                  <Grid item xs={6}>
                    <TextField
                      name={name}
                      label={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={touched && Boolean(error)}
                      helperText={touched && error ? '' : null}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {value && !error ? <img src={value} /> : null}
                  </Grid>
                </>
              )}
            </Field>
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
