import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid';
import { Category } from 'lib/supabase/categories';

interface Props {
  data: Category[];
  onSelectionModelChange: (id: string) => void;
}

const CategoryTable: React.FC<Props> = ({ data, onSelectionModelChange }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 50 },
    { field: 'slug', headerName: 'Slug', flex: 50 },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data}
      pageSize={10}
      onSelectionModelChange={(selectionModel) => {
        onSelectionModelChange(selectionModel[0] as string);
      }}
    />
  );
};

export default CategoryTable;
