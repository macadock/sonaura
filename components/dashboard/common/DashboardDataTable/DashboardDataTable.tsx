'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { DataTable, DataTableColumnHeader } from '@/components/common';
import { ColumnDef } from '@tanstack/table-core';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useMemo, useState } from 'react';

type IdType = {
  id: string;
};

export type DashboardTableProps<T extends IdType> = {
  data: Array<T> | undefined;
  columns: Array<ColumnDef<T>>;
  isLoading: boolean;
  isError: boolean;
  onClickRemove?: (itemId: string) => void | Promise<void>;
  onClickEdit?: (itemId: string) => void | Promise<void>;
};

export const DashboardDataTable = <T extends IdType>({
  data,
  columns,
  isLoading,
  isError,
  onClickEdit,
  onClickRemove,
}: DashboardTableProps<T>) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const memoizedColumns = useMemo(() => {
    const actionsColumn: Array<ColumnDef<T>> =
      onClickRemove || onClickEdit
        ? [
            {
              id: 'actions',
              header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actions" />
              ),
              cell: ({ row }) => {
                return (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {onClickEdit && (
                        <DropdownMenuItem
                          onClick={() => {
                            onClickEdit(row.original.id);
                          }}
                          className={'gap-2 cursor-pointer'}
                        >
                          <Pencil className={'size-4'} />
                          <p>Éditer</p>
                        </DropdownMenuItem>
                      )}
                      {onClickRemove && (
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedItemId(row.original.id);
                            setOpenDeleteDialog(true);
                          }}
                          className={'gap-2 cursor-pointer'}
                        >
                          <Trash className={'size-4'} />
                          <p>Supprimer</p>
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              },
            },
          ]
        : [];

    return [...columns, ...actionsColumn];
  }, [columns, onClickEdit, onClickRemove]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError || !data) {
    return <div>Erreur lors de la récupération des données</div>;
  }

  return (
    <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
      <DataTable columns={memoizedColumns} data={data} />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible, êtes-vous sûr de vouloir supprimer
            cet élément ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (onClickRemove && selectedItemId) {
                await onClickRemove(selectedItemId);
                setSelectedItemId(null);
              }
            }}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
