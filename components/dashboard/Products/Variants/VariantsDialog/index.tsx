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
import {
  Product,
  getProductById,
  updateProductVariants,
} from 'lib/supabase/products';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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

type Attribute = {
  name: string;
  values: string[];
};

const VariantsDialog: React.FC<Props> = ({ open, handleClose, productId }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [attributes, setAttributes] = useState<Attribute[]>([]);

  const handleMenu = (event?: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(!openMenu ? event?.currentTarget : null);
    setOpenMenu((prev) => !prev);
  };

  const fetchProduct = async () => {
    const { data } = await getProductById(productId);
    if (data) {
      setAttributes(
        data.variants === null ? [] : Array.from(data.variants as Attribute[]),
      );
    } else {
      setAttributes([]);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const saveVariants = async () => {
    const { error } = await updateProductVariants(productId, attributes);
    if (error) {
      toast.error("Erreur lors de l'enregistrement");
      return;
    }
    toast.success('Variantes mises à jour');
  };

  const addAttribute = (attr: string) => {
    const newAttribute: Attribute = {
      name: attr,
      values: [],
    };
    setAttributes((prev) => [...prev, newAttribute]);
  };

  const deleteAttribute = (attr: string) => {
    setAttributes((prev) => prev.filter((a) => a.name !== attr));
  };

  const addOption = (attrName: string, value: string) => {
    setAttributes((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = attr.values.filter((val) => val !== value);
      values.push(value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          values,
        },
      ];
    });
  };

  const deleteOption = (attrName: string, value: string) => {
    setAttributes((prev) => {
      const attr = prev.find((a) => a.name === attrName);

      const values = attr.values.filter((val) => val !== value);

      return [
        ...prev.filter((a) => a.name !== attrName),
        {
          name: attrName,
          values,
        },
      ];
    });
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
                  attributes &&
                  Boolean(attributes.find((attr) => attr.name === attribute))
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
        {attributes.length > 0 ? (
          <Box marginTop={'2rem'}>
            <Typography variant="h3">{'Attributs'}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} gap={'2rem'}>
              {attributes.map((attribute) => (
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
    </Dialog>
  );
};

interface CardProps {
  attribute: Attribute;
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
      <CardContent>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          marginBottom={'1rem'}
        >
          <Typography variant="h4">{attribute.name}</Typography>
          <Button
            onClick={() => {
              deleteAttribute(attribute.name);
            }}
            endIcon={<Delete />}
          >
            {"Supprimer l'attribut"}
          </Button>
        </Stack>
        <Typography variant="h5">{'Valeurs'}</Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={'0.5rem'}
          marginBottom={'1rem'}
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
