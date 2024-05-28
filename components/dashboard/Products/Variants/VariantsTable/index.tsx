import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { isNumberString } from 'class-validator';
import AttributeDropdown from '@/components/dashboard/Products/Variants/VariantsTable/AttributeDropdown';
import supabase from '@/lib/supabase';
import {
  getProductById,
  updateProductVariantsImage,
} from '@/lib/supabase/products';
import { useTranslation } from 'next-i18next';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { VariantImage, Variant } from '@/types';

interface Props {
  productId: string;
  variants: Variant[];
}

const VariantsTable: React.FC<Props> = ({ productId, variants }) => {
  const { t } = useTranslation('dashboard');

  const [images, setImages] = useState<VariantImage[]>([]);

  const fetchProduct = useCallback(async () => {
    const { data } = await getProductById(productId);
    if (data?.variantsImages) {
      setImages(data.variantsImages as VariantImage[]);
    }
  }, [productId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleImageUpload = async (files: FileList) => {
    const bucket = 'products';
    const fileName = crypto.randomUUID();
    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, files[0]);
    if (error) {
      toast.error(t('image.error'));
      return;
    }

    const image: VariantImage = {
      image: {
        bucket,
        file: fileName,
      },
    };

    setImages((prev) => [...prev, image]);
  };

  const handleImageVariant = async (
    image: VariantImage,
    option: VariantImage['variants'][number],
  ) => {
    let variant = images.find(
      ({ image: im }) =>
        im.bucket === image.image.bucket && im.file === image.image.file,
    );
    if (variant === undefined) return;
    variant = {
      image: variant.image,
      variants: variant.variants
        ? [...variant.variants.filter((v) => v.name !== option.name), option]
        : [option],
    };
    setImages((prev) => [
      ...prev.filter((img) => img.image.file !== variant.image.file),
      variant,
    ]);
  };

  const handleDeleteImageVariant = (id: string) => {
    setImages((prev) => prev.filter((image) => image.image.file !== id));
  };

  const handlePriceUpdate = (id: string, price: string) => {
    setImages((prev) => {
      const imagesTemp = [...prev];
      const imageIndex = imagesTemp.findIndex((im) => im.image.file === id);
      imagesTemp[imageIndex].price = price;

      return imagesTemp;
    });
  };

  const handleSave = async () => {
    const { error } = await updateProductVariantsImage(productId, images);
    if (error) {
      toast.error(t('products.variants.error'));
      return;
    }
    toast.success(t('products.variants.success'));
  };

  const variantsColumns: GridColDef[] = variants.map((variant) => ({
    field: variant.name,
    headerName: t(`attributes.${variant.name}`),
    renderCell: ({ id }) => {
      const image = images.find(
        (im) => im.image.bucket === 'products' && im.image.file === id,
      );
      return (
        <AttributeDropdown
          variant={variant}
          image={image}
          handleChange={handleImageVariant}
        />
      );
    },
    flex: 20,
  }));

  const columns: GridColDef[] = [
    {
      field: 'delete',
      headerName: t('delete'),
      renderCell: ({ id }) => (
        <Button
          onClick={() => {
            handleDeleteImageVariant(id as string);
          }}
        >
          <Delete />
        </Button>
      ),
    },
    {
      field: 'image',
      renderCell: ({ value }) => {
        if (!value) return '';
        const bucket = value['bucket'];
        const file = value['file'];
        const { data } = supabase.storage.from(bucket).getPublicUrl(file);
        return (
          <img
            src={data.publicUrl}
            alt={file}
            width={50}
            height={50}
            style={{ objectFit: 'cover' }}
          />
        );
      },
    },
    {
      field: 'price',
      renderCell: ({ row, id }) => (
        <TextField
          value={row.price || ''}
          onChange={(e) => {
            const price = e.target.value.replace(',', '.');
            handlePriceUpdate(id.toString(), price);
          }}
        />
      ),
    },
    ...variantsColumns,
  ];

  return (
    <Box padding={'1rem'} height={'100%'}>
      <Typography variant="h3">{t('imageManagement')}</Typography>
      <Stack direction={'row'} gap={'1rem'} sx={{ marginY: '2rem' }}>
        <Button variant="contained" component="label">
          {t('addImage')}
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={(e) => {
              handleImageUpload(e.target.files);
            }}
          />
        </Button>
        <Button variant="contained" onClick={handleSave}>
          {t('save')}
        </Button>
      </Stack>

      {images.length > 0 ? (
        <DataGrid
          columns={columns}
          rows={images}
          density="comfortable"
          isRowSelectable={() => false}
          getRowId={(row) => row.image['file']}
        />
      ) : (
        <Typography>{t('attributes.addImagePerAttribute')}</Typography>
      )}
    </Box>
  );
};

export default VariantsTable;
