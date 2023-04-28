import { Box, Button, Chip, Stack } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import supabase from 'lib/supabase';
import toast from 'react-hot-toast';
import { Variant, VariantImage, VariantReference } from 'types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  productId: string;
  variants: Variant[];
  onImageUpdate: (variantImage: VariantImage) => void;
}

const VariantsTable: React.FC<Props> = ({
  productId,
  variants,
  onImageUpdate,
}) => {
  const combinations = () => {
    if (variants.length === 0) return [];
    const values = variants
      .map((variant) => variant.values)
      .reduce((prev, curr) => [...prev, curr], []);

    const res: Array<{ content: Array<string>; id: string }> = [];
    let max = values.length - 1;
    const helper = (arr, i) => {
      for (let j = 0, l = values[i].length; j < l; j++) {
        let copy = arr.slice(0);
        copy.push(values[i][j]);
        if (i == max) res.push({ content: copy, id: uuidv4() });
        else helper(copy, i + 1);
      }
    };
    helper([], 0);
    return res;
  };

  const handleImageUpload = async (
    files: FileList,
    variant: VariantReference,
  ) => {
    const bucket = 'products';
    const fileName = `${productId}/${uuidv4()}`;
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, files[0]);
    if (error) {
      return;
    }

    const variantImage: VariantImage = {
      variants: [],
      image: {
        bucket,
        file: fileName,
      },
    };

    // onImageUpdate(variantImage);
  };

  const columns: GridColDef[] = [
    {
      field: 'content',
      renderCell: ({ value }: { value?: Array<string> }) => (
        <Stack direction={'row'} gap={'0.5rem'}>
          {value.map((option) => (
            <Chip key={value['id']} label={option} />
          ))}
        </Stack>
      ),
      flex: 30,
    },
    {
      field: 'image',
      renderCell: () => <p>Image</p>,
      flex: 20,
    },
    {
      field: 'cta',
      renderCell: () => (
        <Button variant="contained" component="label">
          {'Ajouter une image'}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              handleImageUpload(e.target.files, { id: '', option: '' });
            }}
          />
        </Button>
      ),
      flex: 15,
    },
  ];

  return (
    <Box padding={'1rem'} height={'100%'}>
      <DataGrid columns={columns} rows={combinations()} density="comfortable" />
    </Box>
  );
};

export default VariantsTable;
