import { PagesTable } from '@/app/dashboard/contents/components/PagesTable';
import { Button } from '@/components/ui/button';
import { getPages } from '@/utils/data';
import { cookies } from 'next/headers';
import Link from 'next/link';

const ContentSettingsPage = async () => {
  const cookiesStore = cookies();
  const { data } = await getPages(cookiesStore);

  if (!data) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Link className="p-4" href={'/dashboard/contents/add'}>
        <Button>Créer une page</Button>
      </Link>
      <PagesTable pages={data} />
    </div>
  );
};

export default ContentSettingsPage;
