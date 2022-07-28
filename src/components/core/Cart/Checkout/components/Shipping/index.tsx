import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'next-i18next';

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  {
    code: 'FR',
    label: 'France',
    phone: '33',
    suggested: true,
  },
];

const Shipping: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });
  const [defineBillingAddress, setDefineBillingAddress] =
    useState<boolean>(false);

  return (
    <Box>
      <form>
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12}>
            <TextField
              label={t('fullName')}
              variant="outlined"
              name={'fullName'}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('email')}
              variant="outlined"
              name={'email'}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={t('address')}
              variant="outlined"
              name={'address'}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
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
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label={t('city')}
              variant="outlined"
              name={'city'}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked={defineBillingAddress}
                    color="primary"
                  />
                }
                label={t('billingAddressDifferent')}
                onChange={(e, checked) => {
                  setDefineBillingAddress(checked);
                }}
              />
            </Box>
          </Grid>
          {defineBillingAddress && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={700}>
                  {t('billingAddress')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('address')}
                  variant="outlined"
                  name={'address'}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
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
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label={t('city')}
                  variant="outlined"
                  name={'city'}
                  fullWidth
                />
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Box>
  );
};

export default Shipping;
