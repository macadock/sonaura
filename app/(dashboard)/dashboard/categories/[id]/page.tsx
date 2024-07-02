import { getCategoryById } from '@/utils/data';
import { cookies } from 'next/headers';
import { CategoryForm } from '@/components/dashboard/Categories/CategoryForm/CategoryForm';

export type InstallationUpdatePageProps = {
  params: { id: string };
};

const EditCategoryPage = async ({ params }: InstallationUpdatePageProps) => {
  const cookieStore = cookies();

  const category = await getCategoryById({
    cookieStore,
    categoryId: params.id,
  });

  return <CategoryForm category={category} />;
};

export default EditCategoryPage;
