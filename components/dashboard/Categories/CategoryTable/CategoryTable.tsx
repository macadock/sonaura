'use client';

import { DataTableColumnHeader } from 'components/common/Dashboard';
import { useSupabaseQuery } from '@/features/dashboard/hooks';
import { ColumnDef } from '@tanstack/table-core';
import { Category, Installation } from '@/utils/data';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardDataTable } from '@/components/dashboard/common/DashboardDataTable/DashboardDataTable';

export const CategoryTable = () => {
  const supabase = createClient();
  const { data, isLoading, isError, refetch } = useSupabaseQuery<Category>({
    table: 'categories',
    select: '*',
  });

  const router = useRouter();

  const handleDelete = useCallback(
    async (itemId: string) => {
      if (!itemId) {
        return;
      }
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', itemId);
      if (error) {
        toast.error(
          'Erreur lors de la suppression de la catégorie. Merci de réessayer',
        );
      } else {
        toast.success('Catégorie supprimée');
        await refetch();
      }
    },
    [refetch, supabase],
  );

  const columns: Array<ColumnDef<Category>> = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
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
        router.push(`/dashboard/categories/${id}`);
      }}
      onClickRemove={handleDelete}
    />
  );
};
