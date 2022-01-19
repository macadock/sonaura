import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styled from 'styled-components';
import Drawer from '../Drawer';
import { useState } from 'react';
import { Box } from '@mui/system';
import List from './List';
import { useTheme } from '@mui/material/styles';
import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GET_PAGES_HEADER } from '../../../gql/get-pages';
import { Pages } from '../../../gql/__generated__/pages';

const Header: React.FC = () => {
  const [drawerState, setDrawerState] = useState<boolean>(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const { data: menuItems } = useQuery<Pages>(GET_PAGES_HEADER);

  const handleClick = () => {
    setDrawerState(true);
  };

  const onClose = () => {
    setDrawerState(!drawerState);
  };

  if (menuItems && isDesktop) {
    return (
      <StyledAppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href={'/'}>
              <Title>Sonaura</Title>
            </Link>
            {menuItems && (
              <Wrapper>
                {menuItems.pages.map((menuItem) => (
                  <Link href={menuItem.url || '/'} key={menuItem.name}>
                    <MenuItem disableRipple key={menuItem.url}>
                      {menuItem.name}
                    </MenuItem>
                  </Link>
                ))}
              </Wrapper>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>
    );
  }

  return (
    <>
      <StyledAppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Wrapper>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Wrapper>
            <Link href={'/'}>
              <Title>Sonaura</Title>
            </Link>
          </Toolbar>
        </Container>
      </StyledAppBar>
      <Drawer open={drawerState} onClose={onClose}>
        <List menuItems={menuItems} onClick={onClose} />
      </Drawer>
    </>
  );
};

const StyledAppBar = styled(AppBar)``;

const Title = styled(Typography).attrs({
  variant: 'h6',
  noWrap: true,
})`
  display: flex;
  flex-grow: 1;
  :hover {
    cursor: pointer;
  }
`;

const Wrapper = styled(Box)`
  display: flex;
  flex-grow: 1;
`;

const MenuItem = styled(Button)`
  display: block;
  color: ${({ theme }) => theme.palette.common.white};
`;

export default Header;
