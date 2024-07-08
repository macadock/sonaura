import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
  createShop,
  CreateShopInput,
  UpdateShopInput,
} from '@/lib/supabase/shops';
import ShopForm from '@/components/dashboard/Store/ShopsForm';
import { initialValues } from '@/components/dashboard/Store/ShopsForm/shops.validator';

const DashboardNewShopView = () => {
  const router = useRouter();

  const { t } = useTranslation('dashboard');

  const create = async (shop: CreateShopInput) => {
    const { error } = await createShop(shop);
    if (error) {
      console.log(error);
      toast.error(t('shops.add.error'));
      return;
    }
    toast.success(t('shops.add.success'));
    router.push('/dashboard/shops');
  };

  const onSubmit = (values: CreateShopInput | UpdateShopInput) => {
    const {
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    } = values;

    const input = {
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    };

    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/shops');
        }}
      >
        {t('back')}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {t('shops.add.title')}
      </Typography>
      <ShopForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewShopView;
