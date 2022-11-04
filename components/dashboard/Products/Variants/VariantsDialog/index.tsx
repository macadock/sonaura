import { useLazyQuery } from '@apollo/client';
import { Box, Button, Dialog } from '@mui/material';
import { GET_VARIANTS_BY_PRODUCT_ID } from 'gql/variants';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

const VariantsDialog: React.FC<Props> = ({ open, handleClose, productId }) => {
  const [getVariants, { data }] = useLazyQuery(GET_VARIANTS_BY_PRODUCT_ID, {
    variables: {
      id: productId,
    },
  });

  useEffect(() => {
    if (open && productId) {
      getVariants();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <Box>
        <Button
          sx={{ margin: '1rem' }}
          variant={'outlined'}
          onClick={handleClose}
        >
          {'Fermer'}
        </Button>
      </Box>
    </Dialog>
  );
};

export default VariantsDialog;
