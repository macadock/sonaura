import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import SidebarNav from './SidebarNav';
import moveCategoryToPage from '../Topbar/exlude-from-menu';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any;
}

const Sidebar: React.FC<Props> = ({
  pages,
  categories,
  open,
  variant,
  onClose,
}) => {
  const [customCategories, customPages] = moveCategoryToPage(categories, pages);

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
          <SidebarNav pages={customPages} categories={customCategories} />
        )}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
