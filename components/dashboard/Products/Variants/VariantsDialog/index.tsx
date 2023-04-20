import { Box, Button, Dialog } from '@mui/material';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  handleClose: () => void;
  productId: string;
}

const VariantsDialog: React.FC<Props> = ({ open, handleClose, productId }) => {
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
