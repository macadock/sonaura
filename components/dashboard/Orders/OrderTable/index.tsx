import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from 'components/system/LoadingScreen';
import { getOrders, Order, useOrdersRealTime } from 'lib/supabase/orders';

const OrderTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  const { newOrder, updatedOrder } = useOrdersRealTime();

  const sortOrders = (prev: Order, order: Order) => {
    const prevDate = new Date(prev.created_at);
    const newDate = new Date(order.created_at);
    if (prevDate > newDate) return -1;
    if (prevDate < newDate) return 1;
    return 0;
  };

  const handleNewOrder = (newOrder: Order) => {
    setOrders((prev) => [...prev, newOrder].sort(sortOrders));
  };

  const handleUpdatedOrder = (updatedOrder: Order) => {
    setOrders((prev) => {
      const filteredOrders = prev.filter(
        (order) => order.id !== updatedOrder.id,
      );
      return [...filteredOrders, updatedOrder].sort(sortOrders);
    });
  };

  newOrder(handleNewOrder);
  updatedOrder(handleUpdatedOrder);

  const fetchOrders = async () => {
    const { data } = await getOrders();
    if (data) {
      setOrders(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'created_at',
      headerName: 'Date',
      renderCell: ({ value }) =>
        new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(value)),
      flex: 1,
    },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'firstName', headerName: 'Prénom', flex: 1 },
    { field: 'lastName', headerName: 'Nom', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Téléphone', flex: 1 },
    { field: 'companyName', headerName: 'Raison sociale', flex: 1 },
    { field: 'paymentStatus', headerName: 'Status du paiement', flex: 1 },
    { field: 'paymentDate', headerName: 'Date du paiement', flex: 1 },
    { field: 'paymentProvider', headerName: 'Payé via', flex: 1 },
    { field: 'deliveryDate', headerName: 'Date de retrait', flex: 1 },
    { field: 'deliveryShopId', headerName: 'Lieu de retrait', flex: 1 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={orders}
      onRowClick={({ id }) => {
        router.push(`/dashboard/orders/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default OrderTable;
