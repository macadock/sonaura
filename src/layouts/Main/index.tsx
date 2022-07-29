import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from 'components/system/Container';

import { Pages } from '../../gql/__generated__/pages';
import { Categories } from '../../gql/__generated__/categories';
import Topbar from 'components/system/Topbar';
import Sidebar from 'components/system/Sidebar';
import Footer from 'components/system/Footer';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
  categories: Categories;
  pages: Pages;
}

const Main: React.FC<Props> = ({
  children,
  colorInvert = false,
  bgcolor = 'transparent',
  categories,
  pages,
}) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            pages={pages}
            categories={categories}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
        categories={categories}
      />
      <main style={{ minHeight: '75vh' }}>{children}</main>
      <Divider />
      <Container paddingY={4} component={'footer'}>
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
