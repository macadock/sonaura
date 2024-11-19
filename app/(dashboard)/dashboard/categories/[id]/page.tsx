import { getCategoryById } from '@/utils/data';
import { CategoryForm } from '@/components/dashboard/Categories/CategoryForm/CategoryForm';

export type EditCategoryProps = {
  params: Promise<{ id: string }>;
};

const EditCategoryPage = async ({ params }: EditCategoryProps) => {
  const { id } = await params;

  const category = await getCategoryById({
    categoryId: id,
  });

  return <CategoryForm category={category} />;
};

export default EditCategoryPage;
