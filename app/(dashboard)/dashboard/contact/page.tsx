import { ContactsTable } from './components/ContactsTable';

import { getContacts } from '@/utils/data';

const DashboardContact = async () => {
  const { data } = await getContacts();

  if (!data) {
    return null;
  }

  return <ContactsTable contacts={data} />;
};

export default DashboardContact;
