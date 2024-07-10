import { cookies } from 'next/headers';
import { getPageById } from '@/utils/data';
import { PagesForm } from '@/components/dashboard/Pages/PagesForm';

const PageEditor = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies();

  const { data } = await getPageById({ id: params.id, cookieStore });

  return <PagesForm page={data} key={data?.id} />;
};

export default PageEditor;
