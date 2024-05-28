/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { useTheme } from '@mui/material/styles';
import Container from '@/components/system/Container';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { ApiUrls, getRoutePath } from '@/appConstants';
import {
  initialValues,
  newsletterForm,
  newsletterFormTypes,
} from './newsletterForm.validator';
import { Field, FieldProps, Formik, FormikHelpers } from 'formik';

const Newsletter = () => {
  const { t } = useTranslation('homepage', { keyPrefix: 'newsletter' });
  const theme = useTheme();

  const onSubmit = (
    { email }: newsletterFormTypes,
    actions: FormikHelpers<newsletterFormTypes>,
  ) => {
    const subscribe = axios.post(
      getRoutePath({ api: ApiUrls.SUBSCRIBE_NEWSLETTER }),
      { email },
    );

    toast.promise(subscribe, {
      loading: t('loading'),
      success: t('success'),
      error: t('error'),
    });

    actions.resetForm();
  };

  return (
    <Box bgcolor={'primary.main'} borderRadius={2}>
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box marginBottom={4}>
            <Typography
              variant="h4"
              align={'center'}
              data-aos={'fade-up'}
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.common.white,
              }}
            >
              {t('title')}
            </Typography>
            <Typography
              variant="h6"
              align={'center'}
              sx={{
                color: theme.palette.common.white,
              }}
              data-aos={'fade-up'}
            >
              {t('subtitle')}
            </Typography>
          </Box>
          <Box
            component={'form'}
            display={'flex'}
            justifyContent={'center'}
            sx={{
              maxWidth: 400,
              width: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputBase-root': {
                color: 'white',
              },
              '& .MuiInputAdornment-root svg': {
                color: 'white !important',
              },
            }}
            data-aos="fade-up"
          >
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={newsletterForm}
            >
              <Field name={'email'}>
                {({
                  field: { name, onBlur, onChange, value },
                  meta: { error, touched },
                  form: { handleSubmit },
                }: FieldProps) => (
                  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
                    <OutlinedInput
                      name={name}
                      type="email"
                      value={value}
                      error={touched && Boolean(error)}
                      onBlur={onBlur}
                      onChange={onChange}
                      onKeyPress={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSubmit();
                        }
                      }}
                      endAdornment={
                        <InputAdornment
                          sx={{ cursor: 'pointer' }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                          }}
                          position="end"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            width={24}
                            height={24}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        </InputAdornment>
                      }
                      placeholder={t('placeholder')}
                    />
                    {touched && Boolean(error) && (
                      <Typography color={'white'} sx={{ margin: '0.5rem' }}>
                        {t('wrongEmail')}
                      </Typography>
                    )}
                  </Box>
                )}
              </Field>
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
