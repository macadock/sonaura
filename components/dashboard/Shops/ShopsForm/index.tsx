import { useMutation } from '@apollo/client';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { Shop } from '@prisma/client';
import { gql } from 'apollo-server-micro';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useMemo, useState } from 'react';
import { client } from 'lib/apollo';
import { initialValues, shopForm, shopFormTypes } from './shops.validator';

const CREATE_SHOP = gql`
  mutation CreateShop($createShopInput: CreateShopInput!) {
    createShop(createShopInput: $createShopInput) {
      id
      city
      country
      address
      postalCode
      phoneNumber
      image
      googleMapsUrl
      email
      openHours
    }
  }
`;

const UPDATE_SHOP = gql`
  mutation UpdateShop($updateShopInput: UpdateShopInput!) {
    updateShop(updateShopInput: $updateShopInput) {
      id
      city
      country
      address
      postalCode
      phoneNumber
      image
      googleMapsUrl
      email
      openHours
    }
  }
`;

interface Props {
  shopId: string;
  shops: Shop[];
  onCompletedOrUpdated: () => void;
}

const ShopForm: React.FC<Props> = ({ shopId, shops, onCompletedOrUpdated }) => {
  type FormMode = 'creation' | 'edit';

  const [formMode, setFormMode] = useState<FormMode>('creation');
  const selectedShop = useMemo((): Shop => {
    if (!shopId) return undefined;
    return shops.find((shop) => shop.id === shopId);
  }, [shopId]);

  const [createShop] = useMutation(CREATE_SHOP, {
    client,
    onCompleted: () => {
      onCompletedOrUpdated();
    },
  });

  const [updateShop] = useMutation(UPDATE_SHOP, {
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
    values: shopFormTypes,
    actions: FormikHelpers<shopFormTypes>,
  ) => {
    const {
      address,
      postalCode,
      city,
      country,
      email,
      phoneNumber,
      googleMapsUrl,
      image,
      openHours,
    } = values;
    const input = {
      address,
      postalCode,
      city,
      country,
      email,
      phoneNumber,
      googleMapsUrl,
      image,
      openHours,
    };

    if (formMode === 'creation') {
      return createShop({
        variables: {
          createShopInput: {
            ...input,
          },
        },
      });
    }

    updateShop({
      variables: {
        updateShopInput: {
          ...input,
          id: shopId,
        },
      },
    });

    actions.resetForm();
    setFormMode('creation');
  };

  return (
    <Formik<shopFormTypes>
      initialValues={formMode === 'creation' ? initialValues : selectedShop}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validationSchema={shopForm}
    >
      {({ isValid, dirty, handleSubmit }) => (
        <>
          <Stack direction={'row'} marginBottom={2} spacing={1}>
            <Button
              variant={'outlined'}
              disabled={shopId === null}
              onClick={handleEditMode}
            >
              {'Editer'}
            </Button>
            <Button variant={'outlined'} onClick={handleCreateMode}>
              {'Créer un nouveau magasin'}
            </Button>
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field name={'email'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'phoneNumber'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'address'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'postalCode'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'city'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'country'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'image'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'googleMapsUrl'}>
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
            <Grid item xs={12} md={6}>
              <Field name={'openHours'}>
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

export default ShopForm;
