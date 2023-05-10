import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import supabase from 'lib/supabase';
import {
  createShop,
  CreateShopInput,
  removeShop,
  Shop,
  updateShop,
  UpdateShopInput,
} from 'lib/supabase/shops';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { initialValues, shopForm } from './shops.validator';
import { v4 as uuidv4 } from 'uuid';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import ShopTimeTable from 'components/dashboard/Shops/ShopTimeTable';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface Props {
  shopId: string;
  shops: Shop[];
  onCompletedOrUpdated: () => void;
}

export type InsertOrUpdateShop = CreateShopInput | UpdateShopInput;

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

const ShopForm: React.FC<Props> = ({ shopId, shops, onCompletedOrUpdated }) => {
  type FormMode = 'creation' | 'edit';

  const [formMode, setFormMode] = useState<FormMode>('creation');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const selectedShop = useMemo((): Shop => {
    if (!shopId) return undefined;
    return shops.find((shop) => shop.id === shopId);
  }, [shopId]);

  const create = async (shop: CreateShopInput) => {
    const { error } = await createShop(shop);
    if (error) {
      return;
    }
    onCompletedOrUpdated();
  };

  const update = async (shop: UpdateShopInput) => {
    const { error } = await updateShop(shop);
    if (error) {
      return;
    }
    onCompletedOrUpdated();
  };

  const remove = async () => {
    const { error } = await removeShop(shopId);
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
    values: InsertOrUpdateShop,
    actions: FormikHelpers<InsertOrUpdateShop>,
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
      return create(input);
    }

    update({ ...input, id: shopId });

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
    <Formik<InsertOrUpdateShop>
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
            <Button
              variant={'outlined'}
              disabled={shopId === null}
              onClick={remove}
            >
              <Delete />
            </Button>
            <Button variant={'outlined'} onClick={handleCreateMode}>
              {'Nouveau magasin'}
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
                {({ field: { value }, form: { setValues } }: FieldProps) => (
                  <>
                    {/* <Button
                      variant={'contained'}
                      onClick={() => {
                        setOpenModal((prev) => !prev);
                      }}
                    >
                      Horaires : ajouter/modifier
                    </Button> */}
                    <Modal open={openModal}>
                      <Box
                        display={'flex'}
                        flexDirection={'column'}
                        position={'relative'}
                        bgcolor={'#fff'}
                        margin={5}
                        padding={5}
                        borderRadius={2}
                      >
                        <Close
                          cursor={'pointer'}
                          sx={{ position: 'absolute', top: 3, left: 3 }}
                          onClick={() => {
                            setOpenModal((prev) => !prev);
                          }}
                        />
                        <ShopTimeTable
                          openHours={value}
                          onUpdate={(openHours) => {
                            setValues(openHours);
                          }}
                        />
                        <Button
                          variant={'contained'}
                          onClick={() => {
                            setOpenModal((prev) => !prev);
                          }}
                          sx={{ marginTop: 4 }}
                        >
                          Enregistrer
                        </Button>
                      </Box>
                    </Modal>
                  </>
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'image'}>
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
                {formMode === 'creation' ? 'Créer le magasin' : 'Mettre à jour'}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Formik>
  );
};

export default ShopForm;
