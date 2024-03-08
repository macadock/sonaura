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
import { Typography } from '@mui/material';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
}

const Main: React.FC<Props> = ({ children, colorInvert = false }) => {
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

  const today = new Date();
  const endDate = new Date(2024, 5, 1, 9, 0); // 01/06/2024 9:00 UTC+2
  const displayClosedMessage = today <= endDate;

  return (
    <Box>
      {displayClosedMessage ? (
        <Box
          sx={{
            paddingX: '1rem',
            paddingY: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <Typography
            color={theme.palette.text.primary}
            sx={{
              fontSize: { xs: '0.875rem', md: '1rem' },
            }}
          >
            Ouverture de notre nouveau point de vente à Annecy - Printemps 2024
          </Typography>
        </Box>
      ) : null}
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
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <Sidebar onClose={handleSidebarClose} open={open} variant="temporary" />
      <main style={{ minHeight: '75vh' }}>{children}</main>
      <Divider />
      <Container paddingY={4} component={'footer'}>
        <Footer />
      </Container>
    </Box>
  );
};

export default Main;
