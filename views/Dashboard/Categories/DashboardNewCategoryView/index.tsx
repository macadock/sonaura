import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { initialValues } from '@/components/dashboard/Categories/CategoryForm/category.validator';
import CategoryForm, {
  InsertOrUpdateCategory,
} from '@/components/dashboard/Categories/CategoryForm';

import { createCategory, CreateCategoryInput } from '@/lib/supabase/categories';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const DashboardNewCategoryView: React.FC = () => {
  const router = useRouter();

  const { t } = useTranslation('dashboard');

  const create = async (category: CreateCategoryInput) => {
    const { error } = await createCategory(category);
    if (error) {
      console.log(error);
      toast.error(t('categories.add.error'));
      return;
    }
    toast.success(t('categories.add.success'));
    router.push('/dashboard/categories');
  };

  const onSubmit = (values: InsertOrUpdateCategory) => {
    const { name, slug, icon } = values;

    const input = {
      name,
      slug,
      icon,
    };

    create(input);
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/categories');
        }}
      >
        {t('back')}
      </Button>
      <Typography sx={{ marginY: '1rem' }} variant="h1">
        {t('categories.add.title')}
      </Typography>
      <CategoryForm
        formMode={'create'}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />
    </Box>
  );
};

export default DashboardNewCategoryView;
