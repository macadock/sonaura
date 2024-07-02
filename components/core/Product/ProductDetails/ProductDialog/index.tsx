import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Product } from '@/lib/supabase/products';
import ProductForm from '../ProductForm';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  origin: string;
  button?: string;
  product: Product;
  isOccasion: boolean;
}

const ProductDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  origin,
  button,
  product,
  isOccasion,
}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Dialog open={open} onClose={onClose} fullScreen={!isSm}>
      <Box padding={'2rem'}>
        <Box textAlign={'right'}>
          <Close onClick={onClose} sx={{ ':hover': { cursor: 'pointer' } }} />
        </Box>
        <ProductForm
          title={title}
          origin={origin}
          button={button}
          product={product}
          isOccasion={isOccasion}
        />
      </Box>
    </Dialog>
  );
};

export default ProductDialog;
