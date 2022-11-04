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
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useCart } from 'react-use-cart';
import Orders from './components/Orders';
import Shipping from './components/Shipping';
import {
  checkoutForm,
  checkoutFormTypes,
  initialValues,
} from './checkout.validator';
import { Formik } from 'formik';
import LoadingScreen from 'components/system/LoadingScreen';
import { formatPhoneNumber } from 'utils/phone-number';
import { ApiUrls, getRoutePath } from 'appConstants';
import toast from 'react-hot-toast';
import FormikSessionStorage from 'components/system/FormikSessionStorage';
import CreatePaymentInput from 'PayPlug/dto/create-payment.input';
import { useQuery } from '@apollo/client';
import {
  GetProductsByIds,
  GetProductsByIdsVariables,
} from '../../../gql/__generated__/get-products-by-ids';
import { GET_PRODUCTS_BY_IDS } from '../../../gql/get-products';

export const uniqueName = 'checkout';

const Checkout: React.FC = () => {
  const { t } = useTranslation('checkout');
  const router = useRouter();

  const [paymentInProgress, setPaymentInProgress] = useState<boolean>(false);

  const { isEmpty, cartTotal, items } = useCart();

  const ids = items.map((item) => item.id);

  const { data } = useQuery<GetProductsByIds, GetProductsByIdsVariables>(
    GET_PRODUCTS_BY_IDS,
    {
      variables: {
        ids,
      },
      skip: !ids,
    },
  );

  const products = useMemo(() => {
    if (!data) return null;

    return data.products.map((product) => {
      const item = items.find((item) => item.id === product.id);
      return {
        [product.name]: {
          quantity: item.quantity,
          price: item.price,
        },
      };
    });
  }, [items, data?.products]);

  const onSubmit = async (values: checkoutFormTypes) => {
    interface PaymentResponseBody {
      hosted_payment: {
        payment_url: string;
      };
    }

    setPaymentInProgress(true);

    const body: CreatePaymentInput = {
      ...values,
      phoneNumber: formatPhoneNumber(values.phoneNumber),
      amount: cartTotal,
      products: products,
    };

    try {
      const { data, status } = await axios.post<PaymentResponseBody>(
        getRoutePath({ api: ApiUrls.MAKE_PAYMENT }),
        body,
      );

      if (status !== 201) {
        toast.error(t('error'));
        setPaymentInProgress(false);
        return;
      }

      router.push(data.hosted_payment.payment_url);
    } catch (e) {
      toast.error(t('error'));
      setPaymentInProgress(false);
    }
  };

  useEffect(() => {
    if (isEmpty) {
      router.replace('/');
    }
  }, [isEmpty]);

  if (paymentInProgress) {
    return <LoadingScreen loadingText={t('inProgress')} />;
  }

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
                <FormikSessionStorage uniqueName={uniqueName} />
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
