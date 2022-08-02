/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import { Formik, Field, FieldProps, FormikHelpers } from 'formik';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { ApiUrls, getRoutePath } from 'appConstants';
import SendEmailInput from 'common/send-in-blue/dto/send-customer-email.input';
import {
  contactForm,
  contactFormTypes,
  initialValues,
} from './contact-form.validator';
import FormikSessionStorage from 'components/system/FormikSessionStorage';

const Form: React.FC = () => {
  const { t } = useTranslation('contact');
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const onSubmit = async (
    values: contactFormTypes,
    actions: FormikHelpers<contactFormTypes>,
  ) => {
    const { firstName, lastName, email, message, phone } = values;

    const customerBody: SendEmailInput = {
      firstName,
      lastName,
      email,
      message,
      phone,
      templateId: {
        customer: 3,
        merchant: 4,
      },
      includeListIds: [4],
    };

    const customerEmail = axios.post(
      getRoutePath({ api: ApiUrls.SEND_CUSTOMER_EMAIL }),
      customerBody,
    );

    toast.promise(customerEmail, {
      loading: t('form.loading'),
      success: () => {
        actions.resetForm();
        return t('form.success');
      },
      error: t('form.error'),
    });
  };

  return (
    <Box>
      <Box marginBottom={2}>
        <Typography
          variant={'h4'}
          sx={{ fontWeight: 700, paddingBottom: '1rem' }}
          gutterBottom
          align={'center'}
        >
          {t('formTitle')}
        </Typography>
      </Box>
      <Formik<contactFormTypes>
        validationSchema={contactForm}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, handleSubmit }) => (
          <Box
            component={'form'}
            maxWidth={600}
            margin={'0 auto'}
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
            <FormikSessionStorage uniqueName={'contact-form'} />
            <Grid container spacing={isMd ? 4 : 2}>
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
                        touched && error
                          ? `${t(name)} ${t('form.notValid')}`
                          : null
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
                        touched && error
                          ? `${t(name)} ${t('form.notValid')}`
                          : null
                      }
                      label={t(name)}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                        touched && error
                          ? `${t(name)} ${t('form.notValid')}`
                          : null
                      }
                      label={t(name)}
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                        touched && error
                          ? `${t(name)} ${t('form.notValid')}`
                          : null
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
                  {t('form.send')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
