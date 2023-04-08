import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Shop } from 'lib/supabase/shops';

interface Props {
  data: Shop[];
  onSelectionModelChange: (id: string) => void;
}

const ShopsTable: React.FC<Props> = ({ data, onSelectionModelChange }) => {
  const columns: GridColDef[] = [
    { field: 'city', headerName: 'Ville' },
    { field: 'address', headerName: 'Adresse' },
    { field: 'postalCode', headerName: 'Code postal' },
    { field: 'country', headerName: 'Pays' },
    { field: 'phoneNumber', headerName: 'Numéro de téléphone' },
    { field: 'email', headerName: 'Adresse email' },
    { field: 'googleMapsUrl', headerName: 'Google Maps' },
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

export default ShopsTable;
