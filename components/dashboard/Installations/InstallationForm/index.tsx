import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import supabase from 'lib/supabase';
import toast from 'react-hot-toast';
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import TextField from 'components/system/Form/TextField';
import {
  CreateInstallationInput,
  UpdateInstallationInput,
} from 'lib/supabase/installations';
import { installationForm } from 'components/dashboard/Installations/InstallationForm/installation.validator';

export type InsertOrUpdateInstallation =
  | CreateInstallationInput
  | UpdateInstallationInput;

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
  initialValues: InsertOrUpdateInstallation;
  onSubmit: (
    values: InsertOrUpdateInstallation,
    actions?: FormikHelpers<InsertOrUpdateInstallation>,
  ) => void;
  leftButtons?: React.ReactNode;
  rightButtons?: React.ReactNode;
}

const InstallationForm: React.FC<Props> = ({
  formMode,
  initialValues,
  onSubmit,
  leftButtons = null,
  rightButtons = null,
}) => {
  const { t } = useTranslation('dashboard');

  const uploadImage = async (files: FileList): Promise<object> => {
    const bucket = 'installations';
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
    <Formik<InsertOrUpdateInstallation>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={installationForm}
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
                      ? t('installations.add.cta')
                      : t('installations.edit.cta')}
                  </Button>
                  {leftButtons}
                </Box>
                {rightButtons}
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name={'title'} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField name={'description'} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field name={'images'}>
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

export default InstallationForm;
