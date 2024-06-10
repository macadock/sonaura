import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import LoadingScreen from '@/components/system/LoadingScreen';
import { CategoryType, getCategories } from '@/lib/supabase/categories';
import { getProducts, Product } from '@/lib/supabase/products';
import { getShops, Shop } from '@/lib/supabase/shops';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  const fetchProducts = async () => {
    const { data } = await getProducts();
    if (data) {
      setProducts(data as unknown as Product[]);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) {
      setCategories(data as unknown as CategoryType[]);
    }
  };

  const fetchShops = async () => {
    const { data } = await getShops();
    if (data) {
      setShops(data as unknown as Shop[]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchShops();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 15 },
    { field: 'slug', headerName: t('slug'), flex: 15 },
    { field: 'fromPrice', headerName: t('fromPrice'), flex: 15 },
    { field: 'price', headerName: t('price'), flex: 15 },
    {
      field: 'categoryId',
      headerName: t('category'),
      flex: 15,
      renderCell: ({ value }) =>
        categories.find((category) => category.id === value)?.name,
    },
    {
      field: 'shopId',
      headerName: t('shop'),
      flex: 15,
      renderCell: ({ value }) => shops.find((shop) => shop.id === value)?.city,
    },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={products}
      onRowClick={({ id }) => {
        router.push(`/dashboard/products/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default ProductTable;
