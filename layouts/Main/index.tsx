import React, { useState } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Container from 'components/system/Container';

import Topbar from 'components/system/Topbar';
import Sidebar from 'components/system/Sidebar';
import Footer from 'components/system/Footer';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from 'gql/category';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
}

const Main: React.FC<Props> = ({ children, colorInvert = false }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const pages = [
    {
      id: 'ckyg109fkjweg0b45npsbm9yt',
      name: 'professionnels',
      pageType: 'Page',
      title: 'Professionnels',
      url: '/professionnels',
    },
    {
      id: 'ckyg11ye0jxr20c52r9fzhfn6',
      name: 'realisations',
      pageType: 'Page',
      title: 'Réalisations',
      url: '/realisations',
    },
    {
      id: 'ckyg129yojxhq0b06mzuvyyjp',
      name: 'contact',
      pageType: 'Page',
      title: 'Contact',
      url: '/contact',
    },
  ];

  const { data } = useQuery(GET_CATEGORIES);

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
          backgroundColor: trigger
            ? alpha(theme.palette.background.paper, 1)
            : alpha(theme.palette.background.paper, 0.4),
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            pages={pages}
            categories={data?.categories}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
        pages={pages}
        categories={data?.categories}
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
