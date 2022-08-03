import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SidebarNav from './SidebarNav';
import { Pages } from '../../../gql/__generated__/pages';
import { Categories } from '../../../gql/__generated__/categories';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  pages: Pages['pages'];
  categories: Categories['categories'];
}

const Sidebar: React.FC<Props> = ({
  pages,
  categories,
  open,
  variant,
  onClose,
}) => {
  return (
    <Drawer
      anchor="left"
      onClose={() => onClose()}
      open={open}
      variant={variant}
      sx={{
        '& .MuiPaper-root': {
          width: '100%',
          maxWidth: 280,
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          padding: 1,
        }}
      >
        {pages && categories && (
          <SidebarNav pages={pages} categories={categories} />
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
