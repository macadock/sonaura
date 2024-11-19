import { getStoreById } from '@/utils/data';
import { StoreForm } from '@/components/dashboard/Store/StoreForm';

export type EditStorePageProps = {
  params: Promise<{ id: string }>;
};

const EditStorePage = async ({ params }: EditStorePageProps) => {
  const { id } = await params;

  const store = await getStoreById({
    storeId: id,
  });

  return <StoreForm store={store} />;
};

export default EditStorePage;
