import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
  getShopById,
  removeShop,
  Shop,
  updateShop,
  UpdateShopInput,
} from '@/lib/supabase/shops';
import ShopForm from '@/components/dashboard/Store/ShopsForm';

const DashboardEditShopView = () => {
  const router = useRouter();
  const shopId = `${router.query['id']}`;
  const { t } = useTranslation('dashboard');

  const [shop, setShop] = useState<Shop | null>(null);

  const fetchShop = useCallback(async () => {
    const { data } = await getShopById(shopId);
    if (data) {
      setShop(data as unknown as Shop);
    }
  }, [shopId]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  const update = async (shop: UpdateShopInput) => {
    const { error } = await updateShop(shop);
    if (error) {
      console.log(error);
      toast.error(t('shops.add.error'));
      return;
    }
    toast.success(t('shops.add.success'));
    router.push('/dashboard/shops');
  };

  const remove = async () => {
    const { error } = await removeShop(shopId);
    if (error) {
      console.log(error);
      toast.error(t('shops.remove.error'));
      return;
    }
    toast.success(t('shops.remove.success'));
    router.push('/dashboard/shops');
  };

  const onSubmit = (values: UpdateShopInput) => {
    const {
      id,
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    } = values;

    const input = {
      id,
      city,
      address,
      postalCode,
      country,
      phoneNumber,
      email,
      googleMapsUrl,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={shopId === null}
      onClick={remove}
      endIcon={<Delete />}
      color="error"
    >
      {t('shops.remove.cta')}
    </Button>
  );

  return (
    <Box>
      <Button
        sx={{ marginBottom: '1rem' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/shops');
        }}
      >
        {t('back')}
      </Button>
      {shop ? (
        <ShopForm
          formMode={'edit'}
          initialValues={shop}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};

export default DashboardEditShopView;
