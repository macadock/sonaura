import { getPageById } from '@/utils/data';
import { PagesForm } from '@/components/dashboard/Pages/PagesForm';

const PageEditor = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const { data } = await getPageById({ id: id });

  return <PagesForm page={data} key={data?.id} />;
};

export default PageEditor;
