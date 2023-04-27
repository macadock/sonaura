import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ShopsTable from 'components/dashboard/Shops/ShopsTable';
import ShopForm from 'components/dashboard/Shops/ShopsForm';
import { getShops, Shop } from 'lib/supabase/shops';
import LoadingScreen from 'components/system/LoadingScreen';

const DashboardShopView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shopId, setShopId] = useState<string>(null);
  const [shops, setShops] = useState<Shop[]>(null);

  const fetchShops = async () => {
    const { data } = await getShops();
    if (data) {
      setShops(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  if (loading) return <LoadingScreen />;

  const handleShopSelection = (shopId: string) => {
    setShopId(shopId);
  };

  const onCompletedOrUpdated = () => {
    fetchShops();
    setShopId(null);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1">{'Magasins'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} height={'50vh'}>
          <ShopsTable
            data={shops}
            onSelectionModelChange={handleShopSelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShopForm
            shops={shops}
            shopId={shopId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardShopView;
