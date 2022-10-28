import { Box, Typography } from '@mui/material';
import ProductGrid from 'components/core/Category';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
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
      <Typography variant="h1">{category.name}</Typography>
      <ProductGrid products={category.products} />
    </Box>
  );
};

export default CategoryView;
