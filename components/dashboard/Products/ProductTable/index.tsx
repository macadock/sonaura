import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import LoadingScreen from 'components/system/LoadingScreen';
import { Category, getCategories } from 'lib/supabase/categories';
import { getProducts, Product } from 'lib/supabase/products';
import { getShops, Shop } from 'lib/supabase/shops';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProductTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const router = useRouter();

  const fetchProducts = async () => {
    const { data } = await getProducts();
    if (data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) {
      setCategories(data);
    }
  };

  const fetchShops = async () => {
    const { data } = await getShops();
    if (data) {
      setShops(data);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchShops();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 15 },
    { field: 'slug', headerName: 'Slug', flex: 15 },
    { field: 'fromPrice', headerName: 'Prix à partir de', flex: 15 },
    { field: 'price', headerName: 'Prix fixe', flex: 15 },
    {
      field: 'categoryId',
      headerName: 'Catégorie',
      flex: 15,
      renderCell: ({ value }) =>
        categories.find((category) => category.id === value)?.name,
    },
    {
      field: 'shopId',
      headerName: 'Magasin',
      flex: 15,
      renderCell: ({ value }) => shops.find((shop) => shop.id === value)?.city,
    },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={products}
      pageSize={10}
      onRowClick={({ id }) => {
        router.push(`/dashboard/products/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default ProductTable;
