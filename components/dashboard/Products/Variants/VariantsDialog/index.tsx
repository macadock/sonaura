import { Add, Delete } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Variant, VariantImage } from 'types';
import VariantsTable from 'components/dashboard/Products/Variants/VariantsTable';
import {
  getProductById,
  updateProduct,
  updateProductVariants,
} from 'lib/supabase/products';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { v4 as uudiv4 } from 'uuid';

interface Props {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

const attributesName = [
  'color',
  'size',
  'frameColor',
  'positioning',
  'soundbarColor',
  'supportColor',
];

const VariantsDialog: React.FC<Props> = ({ open, handleClose, productId }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [variantsImages, setVariantsImages] = useState<VariantImage[]>([]);

  const handleMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(!openMenu ? event?.currentTarget : null);
    setOpenMenu((prev) => !prev);
  };

  const fetchProduct = async () => {
    const { data } = await getProductById(productId);
    if (data) {
      setVariants(
        data.variants === null ? [] : Array.from(data.variants as Variant[]),
      );
      setVariantsImages(
        data.variantsImages === null
          ? []
          : Array.from(data.variantsImages as VariantImage[]),
      );
    } else {
      setVariants([]);
      setVariantsImages([]);
    }
  };

  useEffect(() => {
    if (open) {
      fetchProduct();
    }
  }, [productId, open]);

  const saveVariants = async () => {
    const { error } = await updateProductVariants(productId, variants);
    if (error) {
      toast.error("Erreur lors de l'enregistrement");
      return;
    }
    toast.success('Variantes mises à jour');
  };

  const addAttribute = (attr: string) => {
    const newAttribute: Variant = {
      name: attr,
      id: uudiv4(),
      values: [],
    };
    setVariants((prev) => [...prev, newAttribute]);
  };

  const deleteAttribute = (attr: string) => {
    setVariants((prev) => prev.filter((a) => a.name !== attr));
  };

  const addOption = (attrName: string, value: string) => {
    setVariants((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = attr.values.filter((val) => val !== value);
      values.push(value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          id: attr.id,
          values,
        },
      ];
    });
  };

  const deleteOption = (attrName: string, value: string) => {
    setVariants((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = attr.values.filter((val) => val !== value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          id: attr.id,
          values,
        },
      ];
    });
  };

  const onImageUpdate = async (image: VariantImage) => {
    // const filteredVariants = variantsImages.filter(
    //   (variant) =>
    //     variant.variantId !== image.variantId &&
    //     variant.option !== image.option,
    // );
    // const { error } = await updateProduct({
    //   id: productId,
    //   variantsImages: [...filteredVariants, image],
    // });
    // if (error) {
    //   toast.error('Erreur lors du chargement');
    //   return;
    // }
    // toast.success('Image ajoutée');
    // fetchProduct();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Box padding={'1rem'} display={'flex'} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={'1rem'}>
          <Button variant={'contained'} onClick={saveVariants}>
            {'Enregistrer'}
          </Button>
          <Button endIcon={<Add />} variant={'outlined'} onClick={handleMenu}>
            {'Ajouter un attribut'}
          </Button>
          <Menu
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {attributesName.map((attribute) => (
              <MenuItem
                key={attribute}
                onClick={() => {
                  addAttribute(attribute);
                  handleMenu();
                }}
                disabled={
                  variants &&
                  Boolean(variants.find((attr) => attr.name === attribute))
                }
              >
                {attribute}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Button variant={'outlined'} onClick={handleClose}>
          {'Fermer'}
        </Button>
      </Box>
      <Box padding={'1rem'}>
        {variants.length > 0 ? (
          <Box marginTop={'2rem'}>
            <Typography variant="h3">{'Attributs'}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={'2rem'}>
              {variants.map((attribute) => (
                <AttributeCard
                  key={attribute.name}
                  attribute={attribute}
                  addOption={addOption}
                  deleteOption={deleteOption}
                  deleteAttribute={deleteAttribute}
                />
              ))}
            </Stack>
          </Box>
        ) : (
          <Typography variant="h4">{'Aucunes variantes'}</Typography>
        )}
      </Box>
      <VariantsTable
        variants={variants}
        onImageUpdate={onImageUpdate}
        productId={productId}
      />
    </Dialog>
  );
};

interface CardProps {
  attribute: Variant;
  addOption: (attrName: string, value: string) => void;
  deleteOption: (attrName: string, value: string) => void;
  deleteAttribute: (attrName: string) => void;
}

const AttributeCard: React.FC<CardProps> = ({
  attribute,
  addOption,
  deleteOption,
  deleteAttribute,
}) => {
  const [value, setValue] = useState<string>('');

  const handleAddOption = () => {
    if (value.trim().length === 0) return;
    addOption(attribute.name, value);
    setValue('');
  };

  return (
    <Card
      key={attribute.name}
      sx={{
        marginTop: '1.5rem',
        width: {
          xs: '100%',
          md: '33%',
          lg: '25%',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Box>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            marginBottom={'1rem'}
          >
            <Typography>{attribute.name}</Typography>
            <Button
              onClick={() => {
                deleteAttribute(attribute.name);
              }}
              endIcon={<Delete />}
            >
              {'Supprimer'}
            </Button>
          </Stack>
          {attribute.values.length === 0 ? (
            <Typography>{'Pas de valeurs'}</Typography>
          ) : null}
          <Stack
            direction={'row'}
            alignItems={'center'}
            gap={'0.5rem'}
            marginBottom={'1rem'}
            flexWrap={'wrap'}
          >
            {attribute.values.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => {
                  deleteOption(attribute.name, value);
                }}
              />
            ))}
          </Stack>
        </Box>
        <Stack>
          <TextField
            label={'Ajouter une option'}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddOption();
              }
            }}
            size="small"
          />
          <Button onClick={handleAddOption} endIcon={<Add />}>
            {'Ajouter'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VariantsDialog;
