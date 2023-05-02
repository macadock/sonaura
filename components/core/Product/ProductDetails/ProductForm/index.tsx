import axios from 'axios';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';
import { useTranslation } from 'next-i18next';
import { ApiUrls, getRoutePath, PagesUrls } from 'appConstants';
import FormikSessionStorage from 'components/system/FormikSessionStorage';
import {
  productFormSchema,
  initialValues,
  productFormTypes,
} from './productForm.validator';
import SendEmailInput from 'SendInBlue/dto/send-customer-email.input';
import toast from 'react-hot-toast';
import { Product } from 'lib/supabase/products';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  title: string;
  origin: string;
  product: Product;
  isOccasion: boolean;
  button?: string;
}

const ProductForm: React.FC<Props> = ({
  title,
  origin,
  button,
  product,
  isOccasion,
}) => {
  const { t } = useTranslation('product', { keyPrefix: 'form' });
  const theme = useTheme();

  const router = useRouter();

  const onSubmit = (
    values: productFormTypes,
    actions: FormikHelpers<productFormTypes>,
  ) => {
    const { firstName, lastName, email, message, phone, gdpr } = values;

    if (!gdpr) {
      toast.error(t('acceptGdpr'));
    }

    const customerBody: SendEmailInput = {
      firstName,
      lastName,
      email,
      message,
      phone,
      templateId: {
        customer: isOccasion ? 7 : 6,
        merchant: isOccasion ? 9 : 8,
      },
      includeListIds: [isOccasion ? 6 : 5],
      params: {
        product: product.name,
        url: getRoutePath({ page: PagesUrls.PRODUCT })
          .replace('[category]', `${router.query['category']}`)
          .replace('[product]', `${router.query['product']}`),
      },
    };

    const customerEmail = axios.post(
      getRoutePath({ api: ApiUrls.SEND_CUSTOMER_EMAIL }),
      customerBody,
    );

    toast.promise(customerEmail, {
      loading: t('loading'),
      success: () => {
        actions.resetForm();
        return t('success');
      },
      error: t('error'),
    });
  };

  return (
    <Box
      maxWidth={600}
      margin={'0 auto'}
      component={'form'}
      sx={{
        '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
          padding: 0,
        },
        '& .MuiOutlinedInput-input': {
          background: theme.palette.background.paper,
          padding: 2,
        },
      }}
    >
      <Typography variant={'h4'} sx={{ marginY: '2rem' }}>
        {title}
      </Typography>
      <Formik<productFormTypes>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={productFormSchema}
      >
        {({ isValid, dirty, handleSubmit }) => (
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <FormikSessionStorage uniqueName={origin} />
            <Grid item xs={12} sm={6}>
              <Field name={'firstName'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={
                      touched && error ? `${t(name)} ${t('notValid')}` : null
                    }
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name={'lastName'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={
                      touched && error ? `${t(name)} ${t('notValid')}` : null
                    }
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'email'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={
                      touched && error ? `${t(name)} ${t('notValid')}` : null
                    }
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'phone'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={
                      touched && error ? `${t(name)} ${t('notValid')}` : null
                    }
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'message'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                }: FieldProps) => (
                  <TextField
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={touched && Boolean(error)}
                    helperText={
                      touched && error
                        ? `${t(name)} ${t('form.notValid')}`
                        : null
                    }
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12}>
              <Field name={'gdpr'}>
                {({ field: { name, onBlur, onChange, value } }: FieldProps) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                      />
                    }
                    label={t('gdpr')}
                  />
                )}
              </Field>
            </Grid>
            <Grid item container justifyContent="center" xs={12}>
              <Button
                disabled={!isValid || !dirty}
                onClick={() => {
                  handleSubmit();
                }}
                variant="contained"
                color="primary"
                size="large"
              >
                {button || t('form.send')}
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Box>
  );
};

export default ProductForm;
