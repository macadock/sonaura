import { cookies } from 'next/headers';
import { getStoreById } from '@/utils/data';
import { StoreForm } from '@/components/dashboard/Store/StoreForm';

export type EditStorePageProps = {
  params: { id: string };
};

const EditStorePage = async ({ params }: EditStorePageProps) => {
  const cookieStore = cookies();

  const store = await getStoreById({
    cookieStore,
    storeId: params.id,
  });

  return <StoreForm store={store} />;
};

export default EditStorePage;
