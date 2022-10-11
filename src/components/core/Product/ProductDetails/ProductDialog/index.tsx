import { Close } from '@mui/icons-material';
import { Box, Dialog, useMediaQuery, useTheme } from '@mui/material';
import { ProductFragment } from '../../../../../gql/__generated__/product-fragment';
import ProductForm from '../ProductForm';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  origin: string;
  button?: string;
  product: ProductFragment;
}

const ProductDialog: React.FC<Props> = ({
  open,
  onClose,
  title,
  origin,
  button,
  product,
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
        />
      </Box>
    </Dialog>
  );
};

export default ProductDialog;
