import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cookies } from 'next/headers';
import { getInstallations } from '@/utils/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit } from 'lucide-react';

export const InstallationList = async () => {
  const cookieStore = cookies();
  const installations = await getInstallations({ cookieStore });

  if (!installations) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Link className="p-4" href={'/dashboard/installations/add'}>
        <Button>Ajouter</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Titre</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Mis à jour</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {installations.map(
            ({ id, title, image, description, updated_at }) => (
              <TableRow key={id}>
                <TableCell>
                  <Link key={id} href={`/dashboard/installations/${id}`}>
                    <Edit strokeWidth="0.0625rem" />
                  </Link>
                </TableCell>
                <TableCell>{title}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{updated_at}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
