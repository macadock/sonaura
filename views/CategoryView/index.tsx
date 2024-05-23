import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProductGrid from 'components/core/Category';
import { CategoryType } from 'lib/supabase/categories';
import { Product } from 'lib/supabase/products';
import { useTranslation } from 'next-i18next';

interface Props {
  category: CategoryType;
  products: Product[];
}

const CategoryView: React.FC<Props> = ({ category, products }) => {
  const isOccasion = category.slug === 'occasion';

  const { t } = useTranslation('common', { keyPrefix: 'preOwned' });

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
      {isOccasion ? (
        <Box paddingX={'2rem'} paddingY={'1rem'} textAlign={'center'}>
          <Typography>{t('title')}</Typography>
          <Typography>{t('subtitle')}</Typography>
        </Box>
      ) : (
        false
      )}
      <ProductGrid products={products} />
    </Box>
  );
};

export default CategoryView;
