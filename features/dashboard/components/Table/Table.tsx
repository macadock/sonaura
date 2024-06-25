import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as ShadcnTable,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export type ColumnDef = {
  field: string;
  headerName: string;
};

type DataType = {
  id: string;
};

export type TableProps<T extends object = DataType> = {
  columns: Array<ColumnDef>;
  data: Array<T> | undefined;
  isLoading: boolean;
  isError: boolean;
  count: number | undefined;
};

export const Table = ({
  columns,
  data,
  count,
  isError,
  isLoading,
}: TableProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ShadcnTable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.field}>{column.headerName}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data && (
          <>
            {data.map((row) => (
              <>
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.field}>
                      {row[column.field]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </>
        )}
      </TableBody>
    </ShadcnTable>
  );
};
