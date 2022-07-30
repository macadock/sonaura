import {
  Box,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import Orders from './components/Orders';
import Shipping from './components/Shipping';
import {
  checkoutForm,
  checkoutFormTypes,
  initialValues,
} from './checkout.validator';
import { Formik } from 'formik';
import { apiUrl, apiKey } from '../../../../common/payPlug';

const Checkout: React.FC = () => {
  const { t } = useTranslation('common', { keyPrefix: 'checkout' });
  const router = useRouter();

  const { isEmpty, cartTotal } = useCart();

  const onSubmit = async (values: checkoutFormTypes) => {
    const url = `${apiUrl}/payments`;
    const formatedAmount = cartTotal * 100;
    const {
      fullName,
      email,
      address,
      city,
      postalCode,
      country,
      hasBillingAddress,
      billingAddress,
      billingCity,
      billingCountry,
      billingPostalCode,
    } = values;

    const headers: HeadersInit = {
      Authorization: `Bearer ${apiKey}`,
      'PayPlug-Version': '2019-08-06',
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
      amount: formatedAmount,
      currency: 'EUR',
      billing: {
        first_name: fullName,
        last_name: fullName,
        email,
        // add mobile_phone_number E164 standard,
        address1: hasBillingAddress ? billingAddress : address,
        postcode: hasBillingAddress ? billingPostalCode : postalCode,
        city: hasBillingAddress ? billingCity : city,
        country: hasBillingAddress ? billingCountry.code : country.code,
        language: 'fr',
      },
      shipping: {
        first_name: fullName,
        last_name: fullName,
        email,
        // add mobile_phone_number E164 standard,
        address1: address,
        postcode: postalCode,
        city: city,
        country: country.code,
        language: 'fr',
        delivery_type: hasBillingAddress ? 'NEW' : 'BILLING',
      },
    });

    console.log(url, body, headers);

    const payment = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    console.log(payment);
  };

  useEffect(() => {
    if (isEmpty) {
      router.replace('/');
    }
  }, [isEmpty]);

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={checkoutForm}
      >
        <Box marginY={'2rem'}>
          <Grid container spacing={{ xs: 4, md: 8 }}>
            {isEmpty ? (
              <Grid item xs={12}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        height: '65vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        marginBottom={4}
                      >
                        {t('redirectingToShop')}
                      </Typography>
                      <CircularProgress />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <>
                <Grid item xs={12} md={7}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography
                        variant="h6"
                        fontWeight={700}
                        marginBottom={4}
                      >
                        {t('shippingAddress')}
                      </Typography>
                      <Shipping />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Typography variant="h6" fontWeight={700} marginBottom={4}>
                    {t('orderSummary')}
                  </Typography>
                  <Card
                    variant={'outlined'}
                    sx={{
                      padding: { xs: 2, sm: 4 },
                    }}
                  >
                    <Orders />
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Formik>
    </Container>
  );
};

export default Checkout;
