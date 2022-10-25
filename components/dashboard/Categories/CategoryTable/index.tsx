import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Category } from '@prisma/client';

interface Props {
  data: Category[];
  onSelectionModelChange: (id: string) => void;
}

const CategoryTable: React.FC<Props> = ({ data, onSelectionModelChange }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom', flex: 40 },
    { field: 'slug', headerName: 'Slug', flex: 40 },
    {
      field: 'icon',
      headerName: 'Image',
      flex: 20,
      renderCell: ({ value }) => <img src={value} />,
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data}
      pageSize={5}
      onSelectionModelChange={(selectionModel) => {
        onSelectionModelChange(selectionModel[0] as string);
      }}
    />
  );
};

export default CategoryTable;
