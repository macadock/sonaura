import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CategoryForm, {
  InsertOrUpdateCategory,
} from '@/components/dashboard/Categories/CategoryForm';
import {
  CategoryType,
  getCategoryById,
  removeCategory,
  updateCategory,
  UpdateCategoryInput,
} from '@/lib/supabase/categories';

const DashboardEditCategoryView = () => {
  const router = useRouter();
  const categoryId = `${router.query['id']}`;
  const { t } = useTranslation('dashboard');

  const [category, setCategory] = useState<CategoryType | null>(null);

  const fetchCategory = useCallback(async () => {
    const { data } = await getCategoryById(categoryId);
    if (data) {
      setCategory(data);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  const update = async (category: UpdateCategoryInput) => {
    const { error } = await updateCategory(category);
    if (error) {
      console.log(error);
      toast.error(t('categories.add.error'));
      return;
    }
    toast.success(t('categories.add.success'));
    router.push('/dashboard/categories');
  };

  const remove = async () => {
    const { error } = await removeCategory(categoryId);
    if (error) {
      console.log(error);
      toast.error(t('categories.remove.error'));
      return;
    }
    toast.success(t('categories.remove.success'));
    router.push('/dashboard/categories');
  };

  const onSubmit = (values: InsertOrUpdateCategory) => {
    const { id, name, slug, icon } = values;

    const input = {
      id,
      name,
      slug,
      icon,
    };

    update(input);
  };

  const rightButtons = (
    <Button
      variant={'outlined'}
      disabled={categoryId === null}
      onClick={remove}
      endIcon={<Delete />}
      color="error"
    >
      {t('categories.remove.cta')}
    </Button>
  );

  return (
    <Box>
      <Button
        sx={{ marginBottom: '1rem' }}
        startIcon={<ArrowBack />}
        onClick={() => {
          router.push('/dashboard/categories');
        }}
      >
        {t('back')}
      </Button>
      {category ? (
        <CategoryForm
          formMode={'edit'}
          initialValues={category}
          onSubmit={onSubmit}
          rightButtons={rightButtons}
        />
      ) : (
        false
      )}
    </Box>
  );
};

export default DashboardEditCategoryView;
