import React from 'react';
import Box from '@mui/material/Box';

import ThemeModeToggler from './ThemeModeToggler';

const TopNav: React.FC = () => {
  return (
    <Box display={'flex'} alignItems={'center'}>
      <Box>
        <ThemeModeToggler />
      </Box>
    </Box>
  );
};

export default TopNav;
