import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'next-i18next';
import { useFormikContext, Field, FieldProps } from 'formik';
import { Country, checkoutFormTypes } from '../../checkout.validator';

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countries: Country[] = [
  {
    code: 'FR',
    label: 'France',
  },
];

const Shipping: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });

  const { values, setFieldValue } = useFormikContext<checkoutFormTypes>();
  const { hasBillingAddress } = values;

  return (
    <Box>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12}>
          <Field name={'fullName'}>
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
                helperText={touched && error ? t(`errors.${name}`) : null}
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
                helperText={touched && error ? t(`errors.${name}`) : null}
                label={t(name)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field name={'phoneNumber'}>
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
                helperText={touched && error ? t(`errors.${name}`) : null}
                label={t(name)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field name={'address'}>
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
                helperText={touched && error ? t(`errors.${name}`) : null}
                label={t(name)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={'country'}>
            {({ field: { name, onBlur, value } }: FieldProps) => (
              <Autocomplete
                onBlur={onBlur}
                onChange={(e, value) => {
                  setFieldValue(name, value);
                }}
                value={value}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.label === value.label
                }
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={t('chooseCountry')}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password',
                    }}
                  />
                )}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={'city'}>
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
                helperText={touched && error ? t(`errors.${name}`) : null}
                label={t(name)}
                variant="outlined"
                fullWidth
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Field name={'hasBillingAddress'}>
              {({ field: { name, onBlur, onChange, value } }: FieldProps) => (
                <FormControlLabel
                  name={name}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  control={<Checkbox color="primary" />}
                  label={t('billingAddressDifferent')}
                />
              )}
            </Field>
          </Box>
        </Grid>
        {hasBillingAddress ? (
          <>
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight={700}>
                {t('billingAddress')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field name={'billingAddress'}>
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
                    helperText={touched && error ? t(`errors.${name}`) : null}
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name={'billingCountry'}>
                {({ field: { name, onBlur, value } }: FieldProps) => (
                  <Autocomplete
                    onBlur={onBlur}
                    onChange={(e, value) => {
                      setFieldValue(name, value);
                    }}
                    value={value}
                    options={countries}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) =>
                      option.label === value.label
                    }
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option.label}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('chooseCountry')}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password',
                        }}
                      />
                    )}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name={'billingCity'}>
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
                    helperText={touched && error ? t(`errors.${name}`) : null}
                    label={t(name)}
                    variant="outlined"
                    fullWidth
                  />
                )}
              </Field>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Box>
  );
};

export default Shipping;
