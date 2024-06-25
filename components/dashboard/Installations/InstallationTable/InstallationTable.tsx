'use client';

import { ColumnDef, Table } from '@/features/dashboard/components/Table';
import { useSupabaseQuery } from '@/features/dashboard/hooks';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const InstallationTable = () => {
  const result = useSupabaseQuery({
    table: 'installations',
    select: '*',
  });

  const columns: ColumnDef[] = [
    {
      field: 'title',
      headerName: 'Titre',
    },
    {
      field: 'description',
      headerName: 'Description',
    },
    {
      field: 'created_at',
      headerName: 'Créé le',
    },
  ];

  console.log(result.count);

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Réalisations</CardTitle>
        <CardDescription>
          Ajouter ou mettre à jour des réalisations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table columns={columns} {...result} />
      </CardContent>
      {result.count && (
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Affichage de <strong>1-10</strong> sur
            <strong>{result.count}</strong>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default InstallationTable;
