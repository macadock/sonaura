import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  const installations = await getInstallations();

  if (!installations) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className={'p-4'}>
        <Link href={'/dashboard/installations/add'}>
          <Button>Ajouter</Button>
        </Link>
      </div>

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
          {installations.map(({ id, title, description }) => (
            <TableRow key={id}>
              <TableCell>
                <Link key={id} href={`/dashboard/installations/${id}`}>
                  <Edit strokeWidth="0.0625rem" />
                </Link>
              </TableCell>
              <TableCell>{title}</TableCell>
              <TableCell>{description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
