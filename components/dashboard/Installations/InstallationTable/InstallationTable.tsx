'use client';

import { DataTableColumnHeader } from 'components/common/Dashboard';
import { useSupabaseQuery } from '@/features/dashboard/hooks';
import { ColumnDef } from '@tanstack/table-core';
import { Installation } from '@/utils/data';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardDataTable } from '@/components/dashboard/common/DashboardDataTable/DashboardDataTable';

export const InstallationTable = () => {
  const supabase = createClient();
  const { data, isLoading, isError, refetch } = useSupabaseQuery<Installation>({
    table: 'installations',
    select: '*',
  });

  const router = useRouter();

  const handleDelete = useCallback(
    async (itemId: string) => {
      if (!itemId) {
        return;
      }
      const { error } = await supabase
        .from('installations')
        .delete()
        .eq('id', itemId);
      if (error) {
        toast.error(
          'Erreur lors de la suppression de la réalisation. Merci de réessayer',
        );
      } else {
        toast.success('Réalisation supprimée');
        await refetch();
      }
    },
    [refetch, supabase],
  );

  const columns: Array<ColumnDef<Installation>> = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Titre" />
      ),
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Créé le" />
      ),
      cell: (row) => new Date(row.getValue() as string).toLocaleDateString(),
    },
  ];

  return (
    <DashboardDataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      isError={isError}
      onClickEdit={(id) => {
        router.push(`/dashboard/installations/${id}`);
      }}
      onClickRemove={handleDelete}
    />
  );
};
