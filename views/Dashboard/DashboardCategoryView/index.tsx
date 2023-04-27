import { Box, Grid, Typography } from '@mui/material';
import CategoryTable from 'components/dashboard/Categories/CategoryTable';
import CategoryForm from 'components/dashboard/Categories/CategoryForm';
import { useEffect, useState } from 'react';
import { Category, getCategories } from 'lib/supabase/categories';
import LoadingScreen from 'components/system/LoadingScreen';

const DashboardCategoryView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryId, setCategoryId] = useState<string>(null);
  const [categories, setCategories] = useState<Category[]>(null);

  const fetchCategories = async () => {
    const { data } = await getCategories();
    if (data) {
      setCategories(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <LoadingScreen />;

  const handleCategorySelection = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const onCompletedOrUpdated = () => {
    fetchCategories();
    setCategoryId(null);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h1">{'Catégories'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} height={'50vh'}>
          <CategoryTable
            data={categories}
            onSelectionModelChange={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CategoryForm
            categories={categories}
            categoryId={categoryId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCategoryView;
