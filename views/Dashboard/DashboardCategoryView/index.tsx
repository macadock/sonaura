import { Box, Grid, Typography } from '@mui/material';
import CategoryTable from 'components/dashboard/Categories/CategoryTable';
import CategoryForm from 'components/dashboard/Categories/CategoryForm';
import { useState } from 'react';
import { gql } from 'apollo-server-micro';
import { Category } from '@prisma/client';
import { useQuery } from '@apollo/client';
import { client } from 'lib/apollo';

const DashboardCategoryView: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>(null);

  const query = gql`
    query categories {
      categories {
        id
        name
        slug
        icon
      }
    }
  `;

  type Categories = {
    categories: Category[];
  };

  const { data, loading, error, refetch } = useQuery<Categories>(query, {
    client,
  });

  if (loading || error) return null;

  const handleCategorySelection = (categoryId: string) => {
    setCategoryId(categoryId);
  };

  const onCompletedOrUpdated = () => {
    refetch();
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
            data={data.categories}
            onSelectionModelChange={handleCategorySelection}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CategoryForm
            categories={data.categories}
            categoryId={categoryId}
            onCompletedOrUpdated={onCompletedOrUpdated}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCategoryView;
