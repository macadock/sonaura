import { Box, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { gql } from 'apollo-server-micro';
import { Shop } from '@prisma/client';
import { useQuery } from '@apollo/client';
import { client } from 'lib/apollo';
import ShopsTable from 'components/dashboard/Shops/ShopsTable';
import ShopForm from 'components/dashboard/Shops/ShopsForm';

const DashboardShopView: React.FC = () => {
  const [shopId, setShopId] = useState<string>(null);

  const query = gql`
    query shops {
      shops {
        id
        city
        country
        address
        postalCode
        phoneNumber
        image
        googleMapsUrl
        email
        openHours
      }
    }
  `;

  type Shops = {
    shops: Shop[];
  };

  const { data, loading, error, refetch } = useQuery<Shops>(query, {
    client,
  });

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
