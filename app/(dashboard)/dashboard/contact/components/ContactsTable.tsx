'use client';

import { Contact } from '@/utils/data';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createClient } from '@/lib/supabase/client';

export type ContactsTableProps = {
  contacts: Contact[];
};

export const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const [data, setData] = useState<Contact[]>(contacts || []);

  const supabase = createClient();
  supabase
    .channel('contacts-inserts')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'contacts' },
      (payload: { new: Contact }) => {
        setData((prev) => [payload.new, ...prev]);
      },
    )
    .subscribe();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Code postal</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(
          ({
            id,
            first_name,
            last_name,
            email,
            message,
            phone,
            created_at,
            postal_code,
            status,
          }) => (
            <TableRow key={id}>
              <TableCell>{status}</TableCell>
              <TableCell>{created_at}</TableCell>
              <TableCell>{`${first_name} ${last_name}`}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{message}</TableCell>
              <TableCell>{postal_code}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
};
