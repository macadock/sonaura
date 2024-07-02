import { ContactsTable } from './components/ContactsTable';

import { getContacts } from '@/utils/data';
import { cookies } from 'next/headers';

const DashboardContact = async () => {
  const cookieStore = cookies();
  const { data } = await getContacts({ cookieStore });

  if (!data) {
    return null;
  }

  return <ContactsTable contacts={data} />;
};

export default DashboardContact;
