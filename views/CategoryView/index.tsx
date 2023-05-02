import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductGrid from 'components/core/Category';
import { Category } from 'lib/supabase/categories';
import { Product } from 'lib/supabase/products';

interface Props {
  category: Category;
  products: Product[];
}

const CategoryView: React.FC<Props> = ({ category, products }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <Typography variant="h1">{category.name}</Typography>
      <ProductGrid products={products} />
    </Box>
  );
};

export default CategoryView;
