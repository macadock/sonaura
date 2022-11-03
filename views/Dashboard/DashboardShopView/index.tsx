import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { Shop } from '@prisma/client';
import { useQuery } from '@apollo/client';
import ShopsTable from 'components/dashboard/Shops/ShopsTable';
import ShopForm from 'components/dashboard/Shops/ShopsForm';
import { GET_SHOPS } from '../../../gql/shop';

const DashboardShopView: React.FC = () => {
  const [shopId, setShopId] = useState<string>(null);

  type Shops = {
    shops: Shop[];
  };

  const { data, loading, error, refetch } = useQuery<Shops>(GET_SHOPS);

  if (loading || error) return null;

  const handleShopSelection = (shopId: string) => {
    setShopId(shopId);
  };

  const onCompletedOrUpdated = () => {
    refetch();
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
            data={data.shops}
            onSelectionModelChange={handleShopSelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ShopForm
            shops={data.shops}
            shopId={shopId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardShopView;
