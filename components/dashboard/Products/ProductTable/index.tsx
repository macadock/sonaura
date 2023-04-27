import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Product } from 'lib/supabase/products';

interface Props {
  data: Product[];
  onSelectionModelChange: (id: string) => void;
}

const ProductTable: React.FC<Props> = ({ data, onSelectionModelChange }) => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nom' },
    { field: 'slug', headerName: 'Slug' },
    { field: 'description', headerName: 'Description' },
    { field: 'fromPrice', headerName: 'Prix à partir de' },
    { field: 'price', headerName: 'Prix fixe' },
    { field: 'mainAsset', headerName: 'image' },
    { field: 'quantity', headerName: 'Quantité' },
    { field: 'categoryId', headerName: 'Catégorie' },
    { field: 'shopId', headerName: 'Magasin' },
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

export default ProductTable;
