'use client';

import { DataTableColumnHeader } from 'components/common/Dashboard';
import { useSupabaseQuery } from '@/features/dashboard/hooks';
import { ColumnDef } from '@tanstack/table-core';
import { Store } from '@/utils/data';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardDataTable } from '@/components/dashboard/common/DashboardDataTable/DashboardDataTable';

export const StoreTable = () => {
  const supabase = createClient();
  const { data, isLoading, isError, refetch } = useSupabaseQuery<Store>({
    table: 'shops',
    select: '*',
  });

  const router = useRouter();

  const handleDelete = useCallback(
    async (itemId: string) => {
      if (!itemId) {
        return;
      }
      const { error } = await supabase.from('shops').delete().eq('id', itemId);
      if (error) {
        toast.error(
          'Erreur lors de la suppression du magasin. Merci de réessayer',
        );
      } else {
        toast.success('Magasin supprimé');
        await refetch();
      }
    },
    [refetch, supabase],
  );

  const columns: Array<ColumnDef<Store>> = [
    {
      accessorKey: 'city',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Ville" />
      ),
    },
    {
      accessorKey: 'address',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Adresse" />
      ),
    },
    {
      accessorKey: 'phoneNumber',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Téléphone" />
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
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
        router.push(`/dashboard/stores/${id}`);
      }}
      onClickRemove={handleDelete}
    />
  );
};
