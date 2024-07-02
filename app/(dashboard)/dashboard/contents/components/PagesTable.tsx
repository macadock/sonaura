import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { Page } from '@/utils/data';
import { Edit } from 'lucide-react';
import Link from 'next/link';

export type PagesTableProps = {
  pages: Page[];
};

export const PagesTable = ({ pages }: PagesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Mis à jour</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map(({ id, title, slug, updated_at }) => (
          <TableRow key={id}>
            <TableCell>
              <Link key={id} href={`/dashboard/contents/${id}`}>
                <Edit strokeWidth="0.0625rem" />
              </Link>
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{slug}</TableCell>
            <TableCell>{updated_at}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
