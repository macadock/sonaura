import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { getShops, Shop } from 'lib/supabase/shops';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LoadingScreen from 'components/system/LoadingScreen';

const ShopsTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<Shop[]>([]);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

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

  const columns: GridColDef[] = [
    { field: 'city', headerName: t('shops.city'), flex: 10 },
    { field: 'address', headerName: t('shops.address'), flex: 10 },
    { field: 'postalCode', headerName: t('shops.postalCode'), flex: 10 },
    { field: 'country', headerName: t('shops.country'), flex: 10 },
    { field: 'phoneNumber', headerName: t('shops.phoneNumber'), flex: 10 },
    { field: 'email', headerName: t('shops.email'), flex: 10 },
    { field: 'googleMapsUrl', headerName: t('shops.googleMapsUrl'), flex: 10 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={shops}
      pageSize={10}
      onRowClick={({ id }) => {
        router.push(`/dashboard/shops/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default ShopsTable;
