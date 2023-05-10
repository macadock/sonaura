import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import VariantsTable from 'components/dashboard/Products/Variants/VariantsTable';

import { getProductById, updateProductVariants } from 'lib/supabase/products';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Variant } from 'types';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

const variantsName = [
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
  const { t } = useTranslation('dashboard');

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
    } else {
      setVariants([]);
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
      toast.error(t('products.variants.error'));
      return;
    }
    toast.success(t('products.variants.success'));
  };

  const addAttribute = (attr: string) => {
    const newAttribute: Variant = {
      id: uuidv4(),
      name: attr,
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

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Box padding={'1rem'} display={'flex'} justifyContent={'space-between'}>
        <Stack direction={'row'} gap={'1rem'}>
          <Button variant={'contained'} onClick={saveVariants}>
            {t('save')}
          </Button>
          <Button endIcon={<Add />} variant={'outlined'} onClick={handleMenu}>
            {t('products.variants.add')}
          </Button>
          <Menu
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {variantsName.map((attribute) => (
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
                {t(`attributes.${attribute}`)}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
        <Button variant={'outlined'} onClick={handleClose}>
          {t('close')}
        </Button>
      </Box>
      <Box padding={'1rem'}>
        {variants.length > 0 ? (
          <Box marginTop={'2rem'}>
            <Typography variant="h3">{t('attributes.name')}</Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={'2rem'}
              flexWrap={'wrap'}
            >
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
          <Typography variant="h4">{t('attributes.empty')}</Typography>
        )}
      </Box>
      <VariantsTable productId={productId} variants={variants} />
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
  const { t } = useTranslation('dashboard');

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
          md: '30%',
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
          <Typography variant="h4">
            {t(`attributes.${attribute.name}`)}
          </Typography>
          <Button
            onClick={() => {
              deleteAttribute(attribute.name);
            }}
            endIcon={<Delete />}
          >
            {t('delete')}
          </Button>
        </Stack>
        <Typography variant="h5">{t('attributes.values')}</Typography>
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
        <Stack>
          <TextField
            label={t('attributes.addOption')}
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
            {t('add')}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default VariantsDialog;
