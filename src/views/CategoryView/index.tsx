import { Category } from '../../../gql/__generated__/category';
import { Box, Typography } from '@mui/material';
import ProductGrid from '../../components/core/Category';

interface Props {
  category: Category;
}

const CategoryView: React.FC<Props> = ({ category }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h1">{category.category.name}</Typography>
      <ProductGrid products={category.category.products} />
    </Box>
  );
};

export default CategoryView;
