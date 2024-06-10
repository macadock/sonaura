import { ContactsTable } from '@/app/dashboard/contact/components/ContactsTable';

import { getContacts } from '@/utils/data';
import { cookies } from 'next/headers';

const DashboardContact = async () => {
  const cookiesStore = cookies();
  const { data } = await getContacts(cookiesStore);

  if (!data) {
    return null;
  }

  return <ContactsTable contacts={data} />;
};

export default DashboardContact;
