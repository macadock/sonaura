import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { GridColDef } from '@mui/x-data-grid/models/colDef';
import { CategoryType, getCategories } from '@/lib/supabase/categories';
import LoadingScreen from '@/components/system/LoadingScreen';

const CategoryTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const router = useRouter();
  const { t } = useTranslation('dashboard');

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) {
      setCategories(data as unknown as CategoryType[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const columns: GridColDef[] = [
    { field: 'name', headerName: t('name'), flex: 50 },
    { field: 'slug', headerName: t('slug'), flex: 50 },
  ];

  if (loading) return <LoadingScreen />;

  return (
    <DataGrid
      columns={columns}
      rows={categories}
      onRowClick={({ id }) => {
        router.push(`/dashboard/categories/${id}`);
      }}
      autoHeight
      sx={{ cursor: 'pointer' }}
    />
  );
};

export default CategoryTable;
