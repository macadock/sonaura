'use client';

import { DataTableColumnHeader } from 'components/common/Dashboard';
import { useSupabaseQuery } from '@/features/dashboard/hooks';
import { ColumnDef } from '@tanstack/table-core';
import { Page } from '@/utils/data';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardDataTable } from '@/components/dashboard/common/DashboardDataTable/DashboardDataTable';

export const PagesTable = () => {
  const supabase = createClient();
  const { data, isLoading, isError, refetch } = useSupabaseQuery<Page>({
    table: 'pages',
    select: '*',
  });

  const router = useRouter();

  const handleDelete = useCallback(
    async (itemId: string) => {
      if (!itemId) {
        return;
      }
      const { error } = await supabase.from('pages').delete().eq('id', itemId);
      if (error) {
        toast.error(
          'Erreur lors de la suppression de la page. Merci de réessayer',
        );
      } else {
        toast.success('Page supprimée');
        await refetch();
      }
    },
    [refetch, supabase],
  );

  const columns: Array<ColumnDef<Page>> = [
    {
      accessorKey: 'title',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom de la page" />
      ),
    },
    {
      accessorKey: 'slug',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="URL de la page" />
      ),
      cell: (row) => {
        const value = row.getValue() as string;
        switch (value) {
          case '[category]':
            return 'Page catégorie';
          case '[product]':
            return 'Page produit';
          default:
            return value;
        }
      },
    },
    {
      accessorKey: 'updated_at',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Mis à jour" />
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
        router.push(`/dashboard/pages/${id}`);
      }}
      onClickRemove={handleDelete}
    />
  );
};
